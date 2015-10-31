var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var relatedLinks = require('../../api/v1.0.0/related_links')();

describe("relatedLinks", function() {
  beforeEach(function() {
    // Stub authenticate to be always successful
    sinon.stub(Client.prototype, 'authenticate', function (done) {
      done(null, 'test_access_token');
    });
  });

  afterEach(function() {
    // Remove the stub
    Client.prototype.authenticate.restore();
  });

  describe("#index", function() {
    it("can be called without option", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/related_links')
        .reply(200);

      relatedLinks.index(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    // FIXME: request and nock are not playing well with each other
    // Seems like URL encoding issue with query parameters
    // it("can be called with params", function(done) {
    //   var params = {
    //     search: {
    //       url: 'https://random.url'
    //     }
    //   };
    //   var options = {
    //     params: params
    //   };
    //
    //   nock('https://api.producthunt.com/v1')
    //     .get('/related_links')
    //     .query(params)
    //     .reply(200);
    //
    //   relatedLinks.index(options, function (err, res) {
    //     expect(err).to.equal(null);
    //     expect(res.statusCode).to.equal(200);
    //     done();
    //   });
    // });
  });

  describe("#create", function() {
    it("is successful", function(done) {
      var params = {
        url: 'http://random.url',
        title: 'test title'
      };
      var options = {
        post_id: 1,
        params: params
      };

      nock('https://api.producthunt.com/v1')
        .post(`/posts/${options.post_id}/related_links`, params)
        .reply(201);

      relatedLinks.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe("#update", function() {
    it("is successful", function(done) {
      var params = {
        url: 'http://random.url',
        title: 'test title'
      };
      var options = {
        post_id: 1,
        related_link_id: 1,
        params: params
      };

      nock('https://api.producthunt.com/v1')
        .put(`/posts/${options.post_id}/related_links/${options.related_link_id}`, params)
        .reply(200);

      relatedLinks.update(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#destroy", function() {
    it("is successful", function(done) {
      var options = {
        post_id: 1,
        related_link_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .delete(`/posts/${options.post_id}/related_links/${options.related_link_id}`)
        .reply(200);

      relatedLinks.destroy(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
