var request = require('request');
var currentUser = {};

module.exports = function (client) {
  currentUser.notifications = function (done) {
    client.httpGet('/me/notifications', {}, done);
  };

  currentUser.interactions = function (params, done) {
    if (typeof params === 'function') {
      done = params;
      params = {};
    }

    client.httpGet('/me/interactions', params, done);
  };

  return currentUser;
};
