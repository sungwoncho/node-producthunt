var request = require('request');
var relatedLinks = {};

module.exports = function(client) {
  relatedLinks.index = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {
        params: {}
      };
    }

    client.httpGet('/related_links', options.params, done);
  };

  relatedLinks.create = function (options, done) {
    var opts = {
      body: options.params
    };

    client.httpPost(`/posts/${options.post_id}/related_links`, opts, done);
  };

  relatedLinks.update = function (options, done) {
    var opts = {
      body: options.params
    };

    var path = `/posts/${options.post_id}/related_links/${options.related_link_id}`;
    client.httpPut(path, opts, done);
  };

  relatedLinks.destroy = function (options, done) {
    var path = `/posts/${options.post_id}/related_links/${options.related_link_id}`;
    client.httpDelete(path, {}, done);
  };

  return relatedLinks;
};
