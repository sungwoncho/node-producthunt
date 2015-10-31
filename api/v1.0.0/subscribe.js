var request = require('request');
var subscribe = {};

function getOption(options) {
  if (options.email) {
    return {
      body: {
        email: options.email
      }
    };
  } else {
    return {};
  }
}

function getPath(options) {
  return `/collections/${options.collection_id}/subscribe`;
}

module.exports = function (client) {
  subscribe.create = function (options, done) {
    client.httpPost(getPath(options), getOption(options), done);
  };

  subscribe.destroy = function (options, done) {
    client.httpDelete(getPath(options), getOption(options), done);
  };

  return subscribe;
};
