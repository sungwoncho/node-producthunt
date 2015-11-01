var request = require('request');
/** @namespace */
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
  /**
   * @summary Get newest collections
   * @memberof collections
   * @param {Object} [options] - options
   * @param {Number} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {Number} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {Number} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {Boolean} [options.params.search.featured] - Only return collections that have been featured on Product Hunt. true or false. Default = false.
   * @param {String} [options.params.search.category] - Only return collections from certain category. Default = unspecified (All categories)
   * @param {String} [options.params.sort_by] - Filter parameter: valid values are created_at, updated_at or featured_at
   * @param {String} [options.params.order] - Filter parameter: define the order you want to receive the records (does not affect older/newer behaviour). Valid values are asc or desc.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/collections/collections_index_get_newest_collections
   */
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

  /**
   * @summary Create a collection
   * @memberof collections
   * @param {Object} options - options
   * @param {Number} options.name - The name of the collection
   * @param {Number} options.title - The title of the collection
   * @param {Number} options.color - The color of the collection. Valid values are: brown,red,blue,light_green,green
   * @param {String} options.background_image - The background image of the collection. Recommended: width: 1250px, height: 250px.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/collections/collections_create_create_a_collection
   */
  collections.create = function (options, done) {
    var opts = getRequestOption(options);

    client.httpPost('/collections', opts, done);
  };

  /**
   * @summary Get details of a collection
   * @memberof collections
   * @param {Object} options - options
   * @param {Number} options.id - The id of the collection
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/collections/collection_show_get_details_of_a_collection
   */
  collections.show = function (options, done) {
    client.httpGet(`/collections/${options.id}`, {}, done);
  };

  /**
   * @summary Update a collection
   * @memberof collections
   * @param {Object} options - options
   * @param {Number} options.name - The name of the collection
   * @param {Number} options.title - The title of the collection
   * @param {Number} options.color - The color of the collection. Valid values are: brown,red,blue,light_green,green
   * @param {String} options.background_image - The background image of the collection. Recommended: width: 1250px, height: 250px.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/collections/collections_update_update_a_collection
   */
  collections.update = function (options, done) {
    var opts = getRequestOption(options);

    client.httpPut(`/collections/${options.id}`, opts, done);
  };

  /**
   * @summary Delete a collection
   * @memberof collections
   * @param {Object} options - options
   * @param {Number} options.id - The id of the collection
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/collections/collections_destroy_delete_a_collection
   */
  collections.destroy = function (options, done) {
    client.httpDelete(`/collections/${options.id}`, {}, done);
  };

  return collections;
};
