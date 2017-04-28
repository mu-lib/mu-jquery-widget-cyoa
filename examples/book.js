(function (modules, factory) {
  var root = this;

  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget-cyoa/examples/book"] = factory.apply(root, modules.map(function (m) {
      return root[m.replace(/^\.{2}/, "mu-jquery-widget-cyoa")];
    }));
  }
})(["mu-jquery-widget/widget", "../walk"], function (widget, walk) {
  function create($, json) {
    return $("<" + json["@component"] + ">", { "mu-widget": "mu-jquery-widget-cyoa/widget" });
  }

  return widget.extend({
    "on/initialize": function () {
      var me = this;
      var $ = me.$;

      return $.ajax("book.json")
        .catch(function (data, textStatus, errorThrown) {
          throw new Error("data.json [" + textStatus + "] " + errorThrown);
        })
        .then(function (json) {
          return me.$element.append(walk($, me.json = json, create)).weave();
        });
    }
  })
});
