var request = require('request');
var categories = {};

module.exports = function (client) {
  categories.index = function (done) {
    client.httpGet('/categories', {}, done);
  };

  return categories;
};
