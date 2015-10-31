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
  this.users = require(`./api/v${this.version}/users`)(this);
  this.collections = require(`./api/v${this.version}/collections`)(this);
  this.comments = require(`./api/v${this.version}/comments`)(this);
  this.notifications = require(`./api/v${this.version}/notifications`)(this);
  this.votes = require(`./api/v${this.version}/votes`)(this);
  this.settings = require(`./api/v${this.version}/settings`)(this);
  this.relatedLinks = require(`./api/v${this.version}/related_links`)(this);
  this.followers = require(`./api/v${this.version}/followers`)(this);
  this.currentUser = require(`./api/v${this.version}/current_user`)(this);
  this.categories = require(`./api/v${this.version}/categories`)(this);
  this.live = require(`./api/v${this.version}/live`)(this);
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

Client.prototype._sendHttpRequest = function (method, path, options, done) {
  var endpoint = this.getEndpoint(path);
  this.authenticate(function (error, access_token) {
    if (error) return done(error);

    var opts = {
      url: endpoint,
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        'Host': 'api.producthunt.com'
      },
    };

    if (options.params) {
      opts.qs = options.params;
    }

    if (options.body) {
      opts.json = true;
      opts.body = options.body;
    }

    request(opts, (err, res) => {
      if (err) return done(err);

      done(null, res);
    });
  });
};

Client.prototype.httpGet = function (path, params, done) {
  var options = {
    params: params
  };

  this._sendHttpRequest('GET', path, options, done);
};

Client.prototype.httpPost = function (path, options, done) {
  this._sendHttpRequest('POST', path, options, done);
};

Client.prototype.httpPut = function (path, options, done) {
  this._sendHttpRequest('PUT', path, options, done);
};

Client.prototype.httpDelete = function (path, options, done) {
  this._sendHttpRequest('DELETE', path, options, done);
};
