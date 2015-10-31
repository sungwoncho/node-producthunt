var request = require('request');
var live = {};

module.exports = function (client) {
  live.index = function (params, done) {
    if (typeof params === 'function') {
      done = params;
      params = {};
    }

    client.httpGet('/live', params, done);
  };

  live.show = function (options, done) {
    client.httpGet(`/live/${options.id}`, {}, done);
  };

  return live;
};
