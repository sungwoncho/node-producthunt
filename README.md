# node-producthunt

[![Build Status](https://travis-ci.org/sungwoncho/node-producthunt.svg?branch=master)](https://travis-ci.org/sungwoncho/node-producthunt)

node.js wrapper for the Product Hunt API


## Usage

The following is an example usage with a client level authentication.

```javascript
var productHuntAPI = require('producthunt');

var productHunt = new productHuntAPI({
  client_id: // your client_id
  client_secret: // your client_secret
  grant_type: // grant_type
});

// List all live events and filter by category
productHunt.live.index({search: {category: 'tech'}}, function (err, res) {
  // do something with the response
});
```
