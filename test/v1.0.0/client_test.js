var expect = require('chai').expect;
var nock = require('nock');
var Client = require('../../index');

const CLIENT_ID = 'test_client_id';
const CLIENT_SECRET = 'test_client_secret';
const ACCESS_TOKEN = 'test_access_token';

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
  });
});
