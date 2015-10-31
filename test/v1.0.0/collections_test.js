var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var collections = require('../../api/v1.0.0/collections')();

describe("collections", function() {
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
    it("can be called without options", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/collections')
        .reply(200);

      collections.index(function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        newer: 1
      };

      nock('https://api.producthunt.com/v1')
        .get('/collections')
        .query(params)
        .reply(200);

      collections.index({params: params}, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can get all collections by a user", function(done) {
      var options = {
        user_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get(`/users/${options.user_id}/collections`)
        .reply(200);

      collections.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can get all collections including a post", function(done) {
      var options = {
        post_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get(`/posts/${options.post_id}/collections`)
        .reply(200);

      collections.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#create", function() {
    it("is successful", function(done) {
      var options = {
        name: 'Digital Nomad Essentials',
        title: 'Digital Nomad Essentials',
        color: 'green'
      };

      nock('https://api.producthunt.com/v1')
        .post(`/collections`, {
          collection: options
        })
        .reply(201);

      collections.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe("#show", function() {
    it("is successful", function(done) {
      var options = {
        id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get(`/collections/${options.id}`)
        .reply(200);

      collections.show(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#update", function() {
    it("is successful", function(done) {
      var options = {
        id: 1,
        name: 'New name',
        title: 'New title',
        color: 'blue'
      };

      nock('https://api.producthunt.com/v1')
        .put(`/collections/${options.id}`, {
          collection: {
            name: 'New name',
            title: 'New title',
            color: 'blue'
          }
        })
        .reply(200);

      collections.update(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#destroy", function() {
    it("is successful", function(done) {
      var options = {
        id: 1
      };

      nock('https://api.producthunt.com/v1')
        .delete(`/collections/${options.id}`)
        .reply(200);

      collections.destroy(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
