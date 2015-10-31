var request = require('request');

var Client = module.exports = function (config) {
  if (! config) config = {};

  this.version = config.version || '1.0.0';
  this.protocol = 'https';
  this.host = 'api.producthunt.com';
  this.pathPrefix = '/v1';
  this.credentials = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    grant_type: config.grant_type
  };

  if (config.redirect_uri && config.code) {
    this.credentials.redirect_uri = config.redirect_uri;
    this.credentials.code = config.code;
  }

  this.setupAPI();
};

Client.prototype.setupAPI = function () {
  this.posts = require(`./api/v${this.version}/posts`)(this);
};

Client.prototype.getEndpoint = function(path) {
  var base = `${this.protocol}://${this.host}`;
  var route = `${this.pathPrefix}${path}`;

  return `${base}${route}`;
};

Client.prototype.authenticate = function (done) {
  var endpoint = this.getEndpoint('/oauth/token');
  var options = {
    url: endpoint,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Host': 'api.producthunt.com'
    },
    json: this.credentials
  };

  request.post(options, (err, res, body) => {
    if (err) {
      console.log('Error while authenticating');
      done(err);
    }

    if (res.statusCode === 200) {
      done(null, body.access_token);
    } else {
      //TODO: JSON.stringify?
      var error = res.body;
      done(error);
    }
  });
};

Client.prototype.sendGetRequest = function (path, params, done) {
  var endpoint = this.getEndpoint(path);
  this.authenticate(function (err, access_token) {
    var options = {
      url: endpoint,
      qs: params,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        'Host': 'api.producthunt.com'
      },
    };

    request.get(options, (err, res, body) => {
      if (err) done(err);

      done(null, res);
    });
  });
};
