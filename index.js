var onFinished = require('on-finished')

function logger(start, finish) {
    return function (req, res, next) {
        start(req, res)
        onFinished(res, function(err, res) {
            finish(err, req, res)
        })
        next()
    }
}

module.exports = logger
