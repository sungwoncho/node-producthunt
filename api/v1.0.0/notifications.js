var request = require('request');
var notifications = {};

module.exports = function (client) {
  notifications.show = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {
        params: {}
      };
    }

    client.httpGet('/notifications', options.params, done);
  };

  notifications.destroy = function (done) {
    client.httpDelete('/notifications', {}, done);
  };

  return notifications;
};
