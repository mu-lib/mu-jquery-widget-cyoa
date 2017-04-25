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
  return function walk(json, create) {
    var me = this;
    var $ = me.$;
    var parent = function () {
      return json;
    };
    var $children = $.map(json["@children"] || false, function (child) {
      child.parent = parent;
      return walk.call(me, child, create);
    });
    var $element = create.call(me, json);

    return $element
      ? $element
        .data("mu-jquery-widget-cyoa", json)
        .append($children)
      : $children;
  }
});
