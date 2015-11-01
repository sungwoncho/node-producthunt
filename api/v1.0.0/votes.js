var request = require('request');
/** @namespace */
var votes = {};

module.exports = function (client) {
  /**
   * @summary Vote for a post
   * @memberof votes
   * @param {Object} options - options
   * @param {Number} post_id - The ID of the post you want to vote for
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/postvotes/votes_create_vote_for_a_post
   */
  votes.create = function (options, done) {
    client.httpPost(`/posts/${options.post_id}/vote`, {}, done);
  };

  /**
   * @summary Unvote a post
   * @memberof votes
   * @param {Object} options - options
   * @param {Number} post_id - The ID of the post you want to un-vote
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/postvotes/votes_destroy_unvote_a_post
   */
  votes.destroy = function (options, done) {
    client.httpDelete(`/posts/${options.post_id}/vote`, {}, done);
  };

  /**
   * @summary See all votes for a post
   * @memberof votes
   * @param {Object} options - options
   * @param {Number} [options.post_id] - The ID of the post (You must provide either post_id or user_id)
   * @param {Number} [options.user_id] - The ID of the user (You must provide either post_id or user_id)
   * @param {Number} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {Number} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {Number} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {String} [options.params.order] - Filter parameter: define the order you want to receive the records (does not affect older/newer behaviour). Valid values are asc or desc.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/postvotes/votes_index_see_all_votes_for_a_post
   */
  votes.index = function (options, done) {
    function getPath(options) {
      if (options.post_id) {
        return `/posts/${options.post_id}/votes`;
      } else if (options.user_id) {
        return `/users/${options.user_id}/votes`;
      }
    }

    client.httpGet(getPath(options), options.params, done);
  };

  return votes;
};
