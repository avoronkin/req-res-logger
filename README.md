[![Build Status](https://travis-ci.org/avoronkin/req-res-logger.svg?branch=master)](https://travis-ci.org/avoronkin/req-res-logger)

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
