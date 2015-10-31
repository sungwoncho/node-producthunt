var request = require('request');
var users = {};

module.exports = function (client) {
  users.index = function (params, done) {
    if (typeof params === 'function') {
      done = params;
      params = {};
    }

    client.httpGet('/users', params, done);
  };

  users.show = function (params, done) {
    client.httpGet(`/users/${params.id}`, {}, done);
  };

  return users;
};
