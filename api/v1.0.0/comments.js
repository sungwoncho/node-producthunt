var request = require('request');
/** @namespace */
var comments = {};
/** @namespace */
comments.votes = {};

module.exports = function (client) {
  /**
   * @summary Fetch a stream of all recent comments
   * @memberof comments
   * @param {Object} options - options
   * @param {Number} [options.user_id] - Provide if you want to fetch comments of a user (not nested)
   * @param {Number} [options.post_id] - Provide if you want to fetch all threads of a post (nested and sorted))
   * @param {Number} [options.live_event_id] - Provide if you want to fetch all threads of a live event (nested and sorted)
   * @param {Number} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {Number} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {Number} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {String} [options.params.order] - Filter parameter: define the order you want to receive the records (does not affect older/newer behaviour). Valid values are asc or desc.
   * @param {Boolean} [options.params.search.user_id] - The id of a user you want to filter for. If you pass this id the user won't be nested.
   * @param {String} [options.params.search.post_id] - The id of a post you want to filter for. If you pass this id the post won't be nested.
   * @param {String} [options.params.search.ama_event_id] - The id of a post you want to filter for. If you pass this id the ama_event won't be nested.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/collections/collections_index_get_newest_collections
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/comments_index_fetch_comments_of_a_user_(not_nested)
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/comments_index_fetch_all_threads_of_a_post_(nested_and_sorted)
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/comments_index_fetch_all_threads_of_a_live_event_(nested_and_sorted)
   */
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

  /**
   * @summary Create a new comment
   * @memberof comments
   * @param {Object} options - options
   * @param {Number} options.body - The text of the comment you want to save. Allowed html tags are: `br strong b em i img a`
   * @param {Number} [options.post_id] - The id the post the comment belongs to (passed via URL)
   * @param {Number} [options.live_event_id] - The id the LIVE event the comment belongs to (passed via URL)
   * @param {Number} [options.parent_comment_id] - The id of the parent comment if this is a nested reply
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/comments_create_create_a_new_comment
   */
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

  /**
   * @summary Update a comment
   * @memberof comments
   * @param {Object} options - options
   * @param {Number} options.body - The text of the comment you want to save. Allowed html tags are: `br strong b em i img a`
   * @param {Number} [options.parent_comment_id] - The id of the parent comment if this is a nested reply
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/comments_update_update_a_comment
   */
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

  /**
   * @summary Fetch a stream of all recent comments
   * @memberof comments
   * @param {Object} options - options
   * @param {Number} options.comment_id - The ID of the comment you want to find votes for
   * @param {Number} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {Number} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {Number} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {String} [options.params.order] - Filter parameter: define the order you want to receive the records (does not affect older/newer behaviour). Valid values are asc or desc.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/comments_votes_index_see_all_votes_for_a_comment
   */
  comments.votes.index = function (options, done) {
    client.httpGet(`/comments/${options.comment_id}/votes`, options.params, done);
  };

  /**
   * @summary Vote for a comment
   * @memberof comments
   * @param {Object} options - options
   * @param {Number} options.comment_id - The ID of the comment you want to vote for
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/comments_votes_create_vote_for_a_comment
   */
  comments.votes.create = function (options, done) {
    client.httpPost(`/comments/${options.comment_id}/vote`, {}, done);
  };


  /**
   * @summary Unvote a comment
   * @memberof comments
   * @param {Object} options - options
   * @param {Number} options.comment_id - The ID of the comment you want to un-vote
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/comments_and_comment_threads/votes_destroy_unvote_a_comment
   */
  comments.votes.destroy = function (options, done) {
    client.httpDelete(`/comments/${options.comment_id}/vote`, {}, done);
  };

  return comments;
};
