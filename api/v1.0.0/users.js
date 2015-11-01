var request = require('request');
/** @namespace */
var users = {};

module.exports = function (client) {
  /**
   * @summary Get all users
   * @memberof users
   * @param {Object} [options] - options
   * @param {Number} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {Number} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {Number} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {String} [options.params.order] - Filter parameter: define the order you want to receive the records (does not affect older/newer behaviour). Valid values are asc or desc.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/users/users_index_get_all_users
   */
  users.index = function (params, done) {
    if (typeof params === 'function') {
      done = params;
      params = {};
    }

    client.httpGet('/users', params, done);
  };

  /**
   * @summary Get details of a user
   * @memberof users
   * @param {Object} options - options
   * @param {Number} options.id - The ID or username of the User you want to fetch
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/users/users_show_get_details_of_a_user
   */
  users.show = function (params, done) {
    client.httpGet(`/users/${params.id}`, {}, done);
  };

  return users;
};
