[![NPM](https://nodei.co/npm/req-res-logger.png?compact=true)](https://nodei.co/npm/req-res-logger/)

[![Build Status](https://travis-ci.org/avoronkin/req-res-logger.svg?branch=master)](https://travis-ci.org/avoronkin/req-res-logger)

[![Coverage Status](https://coveralls.io/repos/github/avoronkin/req-res-logger/badge.svg?branch=master)](https://coveralls.io/github/avoronkin/req-res-logger?branch=master)

```javascript
var express = require('express')
var rrlogger = require('req-res-logger');
var app = express()
app.use(rrlogger(function(req, res) {
        res.__start = process.hrtime()
    },
    function (err, req, res) {
        var end = process.hrtime(req.__start)
        var responseTime = (end[0]*1e9 + end[1])/1e6
        console.log('response time', responseTime)
    }))
```

```javascript
var express = require('express')
var rrlogger = require('req-res-logger');
var app = express()

app.use(rrlogger(function (err, req, res) {
    console.log('response status', res.statusCode)
}))

```
