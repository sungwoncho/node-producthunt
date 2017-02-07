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
  grant_type: 'client_credentials'
});

// List all live events and filter by category
productHunt.live.index({search: {category: 'tech'}}, function (err, res) {
  // do something with the response
});
```

<div style="margin: 25px;">
<a href="https://rapidapi.com/package/ProductHuntAPI/functions?utm_source=ProductHuntGitHub-Node&utm_medium=button&utm_content=Vendor_GitHub" style="
    all: initial;
    background-color: #498FE1;
    border-width: 0;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    font-family: 'Helvetica';
    font-size: 12pt;
    background-image: url(https://scdn.rapidapi.com/logo-small.png);
    background-size: 25px;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;
    padding-left: 44px;
    cursor: pointer;">
  Run now on <b>RapidAPI</b>
</a>
</div>

## Documentation

The sources files are fully documented. You can also refer to this
[auto-generated documentation](http://sungwoncho.github.io/node-producthunt/).


## API Version

This module supports the latest v1 API of Product Hunt.


## Contributing

Please open issues with feature requests and bugs.


## License

MIT
