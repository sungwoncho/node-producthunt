var request = require('request');
/** @namespace */
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
  if (options.collection_id) {
    return `/collections/${options.collection_id}/subscribe`;
  } else if (options.live_id) {
    return `/live/${options.live_id}/subscribe`;
  }
}

module.exports = function (client) {
  /**
   * @summary Subscribe to collection as logged user
   * @memberof subscribe
   * @param {Object} options - options
   * @param {Number} [options.collection_id] - The ID of the collection you want to subscribe (You must provide either collection_id or live_id)
   * @param {Number} [options.live_id] - The ID of the live event you want to subscribe (You must provide either collection_id or live_id)
   * @param {Number} [options.email] - The email you want to subscribe to a collection (if not logged)
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/subscribe_to_collections/subscribe_create_subscribe_to_collection_as_logged_user
   */
  subscribe.create = function (options, done) {
    client.httpPost(getPath(options), getOption(options), done);
  };

  /**
   * @summary Unsubscribe to collection as logged user
   * @memberof subscribe
   * @param {Object} options - options
   * @param {Number} [options.collection_id] - The ID of the collection you want to subscribe (You must provide either collection_id or live_id)
   * @param {Number} [options.live_id] - The ID of the live event you want to subscribe (You must provide either collection_id or live_id)
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/subscribe_to_collections/subscribe_destroy_unsubscribe_to_collection_as_logged_user
   */
  subscribe.destroy = function (options, done) {
    client.httpDelete(getPath(options), getOption(options), done);
  };

  return subscribe;
};
