var onFinished = require('on-finished')

function logger(start, finish) {
    if (arguments.length === 1) {
        finish = start
        start = null
    }
    return function (req, res, next) {
        if (typeof start === 'function') {
            start(req, res)
        }
        onFinished(res, function(err, res) {
            if (typeof finish === 'function') {
                finish(err, req, res)
            }
        })
        next()
    }
}

module.exports = logger
