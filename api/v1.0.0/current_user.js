var request = require('request');
/** @namespace */
var currentUser = {};

module.exports = function (client) {
  /**
   * @summary Get notifications
   * @memberof currentUser
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/current_user/me_notifications
   */
  currentUser.notifications = function (done) {
    client.httpGet('/me/notifications', {}, done);
  };

  /**
   * @summary Fetch a stream of all recent comments
   * @memberof currentUser
   * @param {Object} options - options
   * @param {String} options.include - Interactions to be included. Possible values: following_user_ids, voted_post_ids, voted_comment_ids, collected_post_ids, subscribed_collection_ids, subscribed_live_event_ids
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/current_user/me_interactions
   */
  currentUser.interactions = function (params, done) {
    if (typeof params === 'function') {
      done = params;
      params = {};
    }

    client.httpGet('/me/interactions', params, done);
  };

  return currentUser;
};
