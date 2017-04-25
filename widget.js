(function (modules, factory) {
  var root = this;

  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget-cyoa/widget"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-jquery-widget/widget"], function (widget) {
  return widget.extend(function ($element, ns) {
    var me = this;
    var json = me.json = $element.data("mu-jquery-widget-cyoa");

    json.widget = function () {
      return me;
    };
  });
});
