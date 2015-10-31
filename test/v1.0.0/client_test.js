var expect = require('chai').expect;
var nock = require('nock');
var Client = require('../../index');

const CLIENT_ID = 'test_client_id';
const CLIENT_SECRET = 'test_client_secret';
const REDIRECT_URL = 'http://localhost:3000';
const ACCESS_TOKEN = 'test_access_token';
const ACCESS_GRANT_CODE = 'access_grant_code';

describe("client", function() {
  describe("#authenticate", function() {
    it("handles client level authentication", function(done) {
      nock('https://api.producthunt.com/v1')
        .post('/oauth/token', {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'client_credentials'
        })
        .reply(200, {
          access_token: ACCESS_TOKEN,
          token_type: 'bearer',
          expires_in: 5184000,
          scope: 'public'
        });

      var client = new Client({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
      });

      client.authenticate(function (err, access_token) {
        expect(err).to.equal(null);
        expect(access_token).to.equal(ACCESS_TOKEN);
        done();
      });
    });

    it("handles user authentication", function(done) {
      nock('https://api.producthunt.com/v1')
        .post('/oauth/token', {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URL,
          grant_type: 'authorization_code',
          code: ACCESS_GRANT_CODE
        })
        .reply(200, {
          access_token : ACCESS_TOKEN,
          token_type : "bearer",
          expires_in : 5184000
        });

        var client = new Client({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URL,
          grant_type: 'authorization_code',
          code: ACCESS_GRANT_CODE
        });

        client.authenticate(function (err, access_token) {
          expect(err).to.equal(null);
          expect(access_token).to.equal(ACCESS_TOKEN);
          done();
        });
    });
  });
});
