var request = require('request');
var collections = {};

// Returns an object suitable for request module's POST and PUT call
function getRequestOption(options) {
  return {
    body: {
      collection: {
        name: options.name,
        title: options.title,
        color: options.color,
        background_image: options.background_image
      }
    }
  };
}

module.exports = function (client) {
  collections.index = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {
        params: {}
      };
    }

    var path;
    if (options.user_id) {
      path = `/users/${options.user_id}/collections`;
    } else if (options.post_id) {
      path = `/posts/${options.post_id}/collections`;
    } else {
      path = '/collections';
    }

    client.httpGet(path, options.params, done);
  };

  collections.create = function (options, done) {
    var opts = getRequestOption(options);

    client.httpPost('/collections', opts, done);
  };

  collections.show = function (options, done) {
    client.httpGet(`/collections/${options.id}`, {}, done);
  };

  collections.update = function (options, done) {
    var opts = getRequestOption(options);

    client.httpPut(`/collections/${options.id}`, opts, done);
  };

  collections.destroy = function (options, done) {
    client.httpDelete(`/collections/${options.id}`, {}, done);
  };

  return collections;
};
