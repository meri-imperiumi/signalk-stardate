const stardate = require('stardate-converter');

module.exports = (app) => {
  const plugin = {};
  let timer;

  plugin.id = 'signalk-stardate';
  plugin.name = 'Stardate';
  plugin.description = 'Provides SignalK the current stardate';

  plugin.start = () => {
    plugin.stardate();
    timer = setInterval(() => {
      plugin.stardate();
    }, 60000);
    app.debug('stardate started');
  };

  plugin.stardate = () => {
    app.handleMessage(plugin.id, {
      updates: [
        {
          values: [
            {
              path: 'navigation.stardate',
              value: stardate(new Date()),
              meta: {
                displayName: 'Stardate',
                units: 'stardate',
              },
            },
          ],
        },
      ],
    });
  };

  plugin.stop = () => {
    clearInterval(timer);
    app.debug('stardate stopped');
  };
  return plugin;
};
