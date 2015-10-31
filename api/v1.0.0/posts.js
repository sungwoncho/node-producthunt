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

    client.sendGetRequest(path, options.params, done);
  };

  return posts;
};
