var request = require('request');
var comments = {};

module.exports = function (client) {
  comments.index = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {
        params: {}
      };
    }

    function getPath(options) {
      if (options.user_id) {
        return `/users/${options.user_id}/comments`;
      } else if (options.post_id) {
        return `/posts/${options.post_id}/comments`;
      } else if (options.live_event_id) {
        return `/live/${options.live_event_id}/comments`;
      } else {
        return '/comments';
      }
    }

    client.httpGet(getPath(options), options.params, done);
  };

  comments.create = function (options, done) {
    var opts = {
      body: {
        comment: {
          body: options.body,
          post_id: options.post_id,
          live_event_id: options.live_event_id,
          parent_comment_id: options.parent_comment_id
        }
      }
    };

    client.httpPost('/comments', opts, done);
  };

  comments.update = function (options, done) {
    var opts = {
      body: {
        comment: {
          body: options.body,
          parent_comment_id: options.parent_comment_id
        }
      }
    };

    client.httpPut(`/comments/${options.comment_id}`, opts, done);
  };

  return comments;
};
