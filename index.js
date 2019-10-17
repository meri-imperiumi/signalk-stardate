const stardate = require("stardate-converter");

module.exports = function(app) {
  var plugin = {};
  var timer;

  plugin.id = "signalk-stardate";
  plugin.name = "Stardate";
  plugin.description = "Provides SignalK the current stardate";

  plugin.start = function(options, restartPlugin) {
    timer = setInterval(function() {
      app.handleMessage(plugin.id, {
        updates: [
          {
            values: [
              {
                path: "navigation.stardate",
                value: stardate(new Date()),
                meta: {
                  displayName: "Stardate",
                  units: "stardate"
                }
              }
            ]
          }
        ]
      });
    }, 60000);
    app.debug("stardate started");
  };

  plugin.stop = function() {
    clearInterval(timer);
    app.debug("stardate stopped");
  };
  return plugin;
};
