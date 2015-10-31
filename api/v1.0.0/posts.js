var request = require('request');
var posts = {};

module.exports = function(client) {

  /**
   * posts#index(params, done)
   *     - options (Object): Object of options
   *     - done (Function): Callback that takes error as the first argument and
   *              the response as the second argument.
   *
   * ### Possible keys of options
   *      category_name (String): Optional name of the category
   *      params (Object):
   *        days_ago: Parameter for pagination
   *        day: Alternate parameter for requesting specific days (Format: day=YYYY-MM-DD)
   *
   * https://api.producthunt.com/v1/docs/posts/posts_index_get_the_tech_posts_of_today
   **/
  posts.index = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {
        params: {}
      };
    }

    var path;
    if (options.category_name) {
      path = `/categories/${options.category_name}/posts`;
    } else {
      path = '/posts';
    }
    client.httpGet(path, options.params, done);
  };

  posts.all = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {};
    }

    var path;
    if (options.user) {
      path = `/users/${options.user}/${options.type}`;
    } else {
      path = '/posts/all';
    }

    client.httpGet(path, options.params, done);
  };

  posts.show = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {};
    }

    client.httpGet(`/posts/${options.id}`, {}, done);
  };

  posts.create = function (options, done) {
    var opts = {
      body: {
        post: {
          url: options.url,
          name: options.name,
          tagline: options.tagline
        }
      }
    };

    client.httpPost('/posts', opts, done);
  };

  posts.collect = function (options, done) {
    var opts = {
      body: {
        collection_id: options.collection_id
      }
    };

    var path = `/posts/${options.post_id}/collect`;

    if (options.type === 'add') {
      client.httpPost(path, opts, done);
    } else if (options.type === 'remove') {
      client.httpDelete(path, opts, done);
    }
  };

  return posts;
};
