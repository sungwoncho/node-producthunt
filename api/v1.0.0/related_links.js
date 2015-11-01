var request = require('request');
/** @namespace */
var relatedLinks = {};

module.exports = function(client) {
  /**
   * @summary Fetch all related links
   * @memberof relatedLinks
   * @param {Object} [options] - options
   * @param {Number} [options.params.search.url] - Search for related links with a specific url
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/related_links/related_links_index_search_for_related_links_with_a_specific_url
   */
  relatedLinks.index = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {
        params: {}
      };
    }

    client.httpGet('/related_links', options.params, done);
  };

  /**
   * @summary Create a related_link
   * @memberof relatedLinks
   * @param {Object} options - options
   * @param {String} options.url - The url of the related link
   * @param {Number} [options.params.title] - A title - if left blank we will fetch it from the url you provide
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/related_links/related_links_create_create_a_related_link
   */
  relatedLinks.create = function (options, done) {
    var opts = {
      body: options.params
    };

    client.httpPost(`/posts/${options.post_id}/related_links`, opts, done);
  };

  /**
   * @summary Update a related_link
   * @memberof relatedLinks
   * @param {Object} options - options
   * @param {Number} options.post_id - id of the post
   * @param {String} options.url - The url of the related link
   * @param {Number} [options.params.title] - A title - if left blank we will fetch it from the url you provide
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/related_links/related_links_update_update_a_related_link
   */
  relatedLinks.update = function (options, done) {
    var opts = {
      body: options.params
    };

    var path = `/posts/${options.post_id}/related_links/${options.related_link_id}`;
    client.httpPut(path, opts, done);
  };

  /**
   * @summary Update a related_link
   * @memberof relatedLinks
   * @param {Object} options - options
   * @param {Number} options.post_id - id of the post
   *
   * @see https://api.producthunt.com/v1/docs/related_links/related_links_destroy_delete_a_related_link
   */
  relatedLinks.destroy = function (options, done) {
    var path = `/posts/${options.post_id}/related_links/${options.related_link_id}`;
    client.httpDelete(path, {}, done);
  };

  return relatedLinks;
};
