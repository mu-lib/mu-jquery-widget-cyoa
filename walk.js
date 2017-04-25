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
    var parent = function () {
      return json;
    };
    var $children = me.$.map(json["@children"] || false, function (child, key) {
      child.parent = parent;
      child.key = function() {
        return key;
      };
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
