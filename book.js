(function (modules, factory) {
  var root = this;

  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget-cyoa/book"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-jquery-widget/widget"], function (widget) {
  return widget.extend({
    "prepare": function (json, conf) {
      var me = this;
      var $ = me.$;
      var $element = me.$element;

      function prepare(json) {
        var parent = function () {
          return json;
        };
        var $children = $.map(json["@children"] || false, function (child) {
          child.parent = parent;
          return prepare(child);
        });
        var cfg = conf.call(me, json);

        return cfg
          ? $(cfg.element, { "mu-widget": cfg.widget })
            .data("@component", json)
            .append($children)
          : $children;
      }

      return prepare(json);
    }
  });
});
