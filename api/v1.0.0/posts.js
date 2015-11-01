var request = require('request');
/** @namespace */
var posts = {};

/**
 * Callback for all APIs.
 * @callback done
 * @param {Error} err - Error. If the call was successful, this will be null
 * @param {String} res - Raw response from Product Hunt
 */

module.exports = function(client) {
  /**
   * @summary Get the tech posts of today
   * @memberof posts
   * @param {Object} [options] - options
   * @param {String} [options.category_name] - Name of the category
   * @param {Number} [options.params.days_ago] - Parameter for pagination
   * @param {String} [options.params.day] - Alternate parameter for requesting specific days (Format: day=YYYY-MM-DD)
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/posts/posts_index_get_the_tech_posts_of_today
   */
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

  /**
   * @summary Get all the newest posts
   * @memberof posts
   * @param {Object} [options] - options
   * @param {String} [options.params.search.url] - Filter parameter: can filter posts by url
   * @param {Number} [options.params.search.category] - Filter parameter: can filter posts by category. Default = unspecified (All categories)
   * @param {String} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {String} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {String} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/posts/posts_all_get_all_the_newest_posts
   */
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

  /**
   * @summary Get details of a post
   * @memberof posts
   * @param {Object} options - options
   * @param {Number} options.id - The numeric ID of the Post you want to fetch
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/posts/posts_show_get_details_of_a_post
   */
  posts.show = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {};
    }

    client.httpGet(`/posts/${options.id}`, {}, done);
  };

  /**
   * @summary Create a post
   * @memberof posts
   * @param {Object} options - options
   * @param {String} options.url - The url of the product
   * @param {String} options.name - The name of the product
   * @param {String} options.tagline - Your short description of the product
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/posts/posts_create_create_a_post
   */
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

  /**
   * @summary Create a post
   * @memberof posts
   * @param {Object} options - options
   * @param {String} options.collection_id - The numeric ID of the collection
   * @param {String} options.type - Type of action. Valid options are 'add' or 'remove'.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/posts/posts_collect_add_a_post_to_a_collection
   */
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
