var request = require('request');
/** @namespace */
var followers = {};

module.exports = function (client) {
  /**
   * @summary List all followers
   * @memberof followers
   * @param {Object} options - options
   * @param {String} options.user_id - The ID of the user you want to fetch all followers from
   * @param {String} options.type - Specify action. Valid values are 'followers' or 'followings'
   * @param {Number} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {Number} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {Number} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {String} [options.params.order] - Filter parameter: define the order you want to receive the records (does not
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/followers_followings/followers_index_list_all_followers
   */
  followers.index = function (options, done) {
    if (options.type !== 'followers' && options.type !== 'followings') {
      var msg = `Invalid type: [${options.type}]. Valid types are 'followers', or 'following'.`;
      return done(new Error(msg));
    }

    function getPath(options) {
      if (options.type === 'followers') {
        return `/users/${options.user_id}/followers`;
      } else if (options.type === 'followings') {
        return `/users/${options.user_id}/followings`;
      }
    }

    client.httpGet(getPath(options), options.params, done);
  };

  /**
   * @summary Follow a user
   * @memberof followers
   * @param {Object} options - options
   * @param {String} options.user_id - The ID of the user you want to follow
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/followers_followings/followers_create_follow_a_user
   */
  followers.create = function (options, done) {
    client.httpPost(`/users/${options.user_id}/followers`, {}, done);
  };

  /**
   * @summary Un-follow a user
   * @memberof followers
   * @param {Object} options - options
   * @param {String} options.user_id - The ID of the user you want to un-follow
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/followers_followings/followers_destroy_un-follow_a_user
   */
  followers.destroy = function (options, done) {
    client.httpDelete(`/users/${options.user_id}/followers`, {}, done);
  };

  return followers;
};
