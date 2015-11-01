var request = require('request');
/** @namespace */
var notifications = {};

module.exports = function (client) {
  /**
   * @summary Receive your latest notifications
   * @memberof notifications
   * @param {Object} [options] - options
   * @param {Number} [options.params.older] - Filter parameter: get only records older than the provided id
   * @param {Number} [options.params.newer] - Filter parameter: get only records newer than the provided id
   * @param {Number} [options.params.per_page] - Filter parameter: define the amount of records sent per call (max 50)
   * @param {String} [options.params.order] - Filter parameter: define the order you want to receive the records (does not affect older/newer behaviour). Valid values are asc or desc.
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/notifications/notifications_show_receive_your_latest_notifications
   */
  notifications.show = function (options, done) {
    if (typeof options === 'function') {
      done = options;
      options = {
        params: {}
      };
    }

    client.httpGet('/notifications', options.params, done);
  };

  /**
   * @summary Clear your notifications count
   * @memberof notifications
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/notifications/notifications_show_receive_your_latest_notifications
   */
  notifications.destroy = function (done) {
    client.httpDelete('/notifications', {}, done);
  };

  return notifications;
};
