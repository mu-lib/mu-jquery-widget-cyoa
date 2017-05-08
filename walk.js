(function (modules, factory) {
  var root = this;

  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget-cyoa/walk"] = factory.apply(root, modules);
  }
})([], function () {
  function noop() { }

  function walk($, json, create) {
    var me = this;
    var parent = function () {
      return json;
    };
    var $children = $.map(json["@children"] || false, function (child, key) {
      child.parent = child.parent || parent;
      child.key = child.key || function () {
        return key;
      }
      return walk.call(me, $, child, create);
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

  return function ($, json, create) {
    json.parent = json.parent || noop;
    json.key = json.key || noop;
    return walk.call(this, $, json, create);
  }
});
