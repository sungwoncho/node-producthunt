var request = require('request');
/** @namespace */
var categories = {};

module.exports = function (client) {
  /**
   * @summary List of all categories
   * @memberof categories
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/categories/categories_index_list_of_all_categories
   */
  categories.index = function (done) {
    client.httpGet('/categories', {}, done);
  };

  return categories;
};
