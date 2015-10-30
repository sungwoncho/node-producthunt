var request = require('request');

var Client = module.exports = function (config) {
  this.version = config.version || '1.0.0';
  this.protocol = 'https';
  this.host = 'api.producthunt.com';
  this.pathPrefix = '/v1';

  this.constructEndpoint = function(path) {
    var base = `${this.protocol}://${this.host}`;
    var route = `${this.pathPrefix}${path}`;

    return `${base}${route}`;
  };
};

Client.prototype.authenticate = function (credentials) {
  var endpoint = this.constructEndpoint('/oauth/token');
  var options = {
    url: endpoint,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Host': 'api.producthunt.com'
    },
    json: credentials
  };

  request.post(options, (err, res, body) => {
    if (err) {
      console.log('Error while authenticating');
      throw err;
    }

    if (res.statusCode === 200) {
      this.auth = body;
    } else {
      console.log('Product Hunt authentication failed');
      console.log(body);
    }
  });
};
