var request = require('request');
var settings = {};

module.exports = function (client) {
  settings.show = function (done) {
    client.httpGet('/me', {}, done);
  };

  settings.update = function (options, done) {
    var opts = {
      body: {
        user: options
      }
    };

    client.httpPut('/me', opts, done);
  };

  return settings;
};
