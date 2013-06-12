var require = {
  baseUrl: "/js",
  paths: {
    jquery: ["http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min", "libs/jquery"],
    jsapi: "http://www.google.com/jsapi?callback=define",
    backbone: "libs/backbone",
    underscore: "libs/underscore",
    text: "libs/text",
    bootstrap: "libs/bootstrap",
    moment: "libs/moment",
    socketio: "../../socket.io/socket.io.js"
  },
  shim: {
    "backbone": {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    "underscore": {
      exports: "_"
    }
  }
};