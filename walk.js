(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-jquery-widget-cyoa/walk"] = factory();
  }
})(this, function () {
  function noop() { }

  function walk($, json, create, prepare) {
    var me = this;
    var parent = function () {
      return json;
    };
    var $children = $.map(json["@children"] || [], function (child, key) {
      child.parent = child.parent || parent;
      child.key = child.key || function () {
        return key;
      }
      return walk.call(me, $, prepare ? prepare.call(me, child) || child : child, create, prepare);
    });
    var $element;
    if ($.isFunction(json.$element)) {
      $element = json.$element();
    }
    else {
      if ($element = create.call(me, $, json)) {
        $element
          .data("mu-jquery-widget-cyoa", json)
          .append($children);
      }

      json.$element = $element
        ? function () {
          return $element;
        }
        : noop;
    }

    return $element || $children;
  }

  return function ($, json, create, prepare) {
    json.parent = json.parent || noop;
    json.key = json.key || noop;
    return walk.call(this, $, prepare.call(this, json) || json, create, prepare);
  }
});
