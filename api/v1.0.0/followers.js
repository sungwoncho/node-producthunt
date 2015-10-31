var request = require('request');
var followers = {};

module.exports = function (client) {
  followers.index = function (options, done) {
    if (options.type !== 'followers' && options.type !== 'followings') {
      var msg = `Invalid type: [${options.type}]. Valid types are 'followers', or 'following'.`;
      return done(new Error(msg));
    }

    function getPath(options) {
      if (options.type === 'followers') {
        return `/users/${options.user_id}/followers`;
      } else if (options.type === 'followings') {
        return `/users/${options.user_id}/followings`;
      }
    }

    client.httpGet(getPath(options), options.params, done);
  };

  followers.create = function (options, done) {
    client.httpPost(`/users/${options.user_id}/followers`, {}, done);
  };

  followers.destroy = function (options, done) {
    client.httpDelete(`/users/${options.user_id}/followers`, {}, done);
  };

  return followers;
};
