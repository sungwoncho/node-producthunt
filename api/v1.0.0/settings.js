var request = require('request');
/** @namespace */
var settings = {};

module.exports = function (client) {
  /**
   * @summary Get your own details
   * @memberof settings
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/related_links/related_links_update_update_a_related_link
   */
  settings.show = function (done) {
    client.httpGet('/me', {}, done);
  };

  /**
   * @summary Get your own details
   * @memberof settings
   * @param {Object} [options] - options
   * @param {String} [options.email]
   * @param {String} [options.name]
   * @param {String} [options.headline]
   * @param {Bollean} [options.send_mention_email]
   * @param {Bollean} [options.send_mention_push]
   * @param {Bollean} [options.send_friend_post_email]
   * @param {Bollean} [options.send_friend_post_push]
   * @param {Bollean} [options.send_new_follower_push]
   * @param {Bollean} [options.send_new_follower_email]
   * @param {Bollean} [options.send_announcement_push]
   * @param {Bollean} [options.send_announcement_email]
   * @param {Bollean} [options.send_product_recommendation_push]
   * @param {Bollean} [options.send_product_recommendation_email]
   * @param {Bollean} [options.subscribed_to_push]
   * @param {done} done - Callback
   *
   * @see https://api.producthunt.com/v1/docs/settings/settings_update_update_your_details
   */
  settings.update = function (options, done) {
    var opts = {
      body: {
        user: options
      }
    };

    client.httpPut('/me', opts, done);
  };

  return settings;
};
