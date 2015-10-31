var request = require('request');
var votes = {};

module.exports = function (client) {
  votes.create = function (options, done) {
    client.httpPost(`/posts/${options.post_id}/vote`, {}, done);
  };

  votes.destroy = function (options, done) {
    client.httpDelete(`/posts/${options.post_id}/vote`, {}, done);
  };

  votes.index = function (options, done) {
    function getPath(options) {
      if (options.post_id) {
        return `/posts/${options.post_id}/votes`;
      } else if (options.user_id) {
        return `/users/${options.user_id}/votes`;
      }
    }

    client.httpGet(getPath(options), options.params, done);
  };

  return votes;
};
