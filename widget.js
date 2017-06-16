(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mu-jquery-widget/widget"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("mu-jquery-widget/widget"));
  } else {
    root["mu-jquery-widget-cyoa/widget"] = factory(root["mu-jquery-widget/widget"]);
  }
})(this, function (widget) {
  return widget.extend(function ($element, ns) {
    var me = this;
    var json = me.json = $element.data("mu-jquery-widget-cyoa");

    json.widget = function () {
      return me;
    };
  });
});
