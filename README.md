# node-producthunt [![Build Status](https://travis-ci.org/sungwoncho/node-producthunt.svg?branch=master)](https://travis-ci.org/sungwoncho/node-producthunt)

Fully tested and documented node.js wrapper for the Product Hunt API

## Install

    npm install producthunt


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

## Documentation

The sources files are fully documented. You can also refer to this
[auto-generated documentation](http://sungwoncho.github.io/node-producthunt/).


## API Version

This module supports the latest v1 API of Product Hunt.


## Contributing

Please open issues with feature requests and bugs.


## License

MIT
