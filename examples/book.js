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
})(["../book"], function (book) {
  function create(json) {
    return {
      "element": "<" + json["@component"] + ">",
      "widget": "mu-jquery-widget-cyoa/widget"
    };
  }

  return book.extend({
    "on/initialize": function () {
      var me = this;

      return me.$.ajax("book.json")
        .catch(function (data, textStatus, errorThrown) {
          throw new Error("data.json [" + textStatus + "] " + errorThrown);
        })
        .then(function (json) {
          return me.$element.append(me.prepare(me.json = json, create)).weave();
        });
    }
  })
});
