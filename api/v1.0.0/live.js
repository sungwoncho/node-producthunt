var request = require('request');
/** @namespace */
var live = {};

module.exports = function (client) {
  /**
   * @summary List of live events
   * @memberof live
   * @param {Object} [options] - options
   * @param {Number} [options.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {String} [options.search.category] - Retrieve events for a specific category
   * @param {String} [options.search.date] - Retrieve events for a specific month (format "YYYY-MM"), use "false" for events without a start_at date
   * @param {Boolean} [options.search.live_video] - Retrieve LIVE on camera events. true or false. Default: false
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/live_events/live_index_list_of_live_events
   */
  live.index = function (params, done) {
    if (typeof params === 'function') {
      done = params;
      params = {};
    }

    client.httpGet('/live', params, done);
  };

  /**
   * @summary List of live events
   * @memberof live
   * @param {Object} options - options
   * @param {Number} options.id - The numeric ID of the live event you want to fetch
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/live_events/live_show_get_details_of_a_live_event
   */
  live.show = function (options, done) {
    client.httpGet(`/live/${options.id}`, {}, done);
  };

  return live;
};
