var request = require('request');
/** @namespace */
var topics = {};

module.exports = function (client) {
  /**
   * @summary List of all topics
   * @memberof topics
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/topics/topics_index_list_topics
   */
  topics.index = function (done) {
    client.httpGet('/topics', {}, done);
  };

  return topics;
};
