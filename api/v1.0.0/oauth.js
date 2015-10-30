var oauth = {
  authorize: {}
};

// oauth.authorize = function () {
//   console.log(this.clientId);
// };

module.exports = oauth;

(function () {
  this.authorize = function () {
    console.log(this.clientId);
  };
})(oauth.authorize);
