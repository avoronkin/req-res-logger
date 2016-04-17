var assert = require('assert')
var express = require('express')
var request = require('supertest')
var rrlogger = require('../')
var sinon = require('sinon')

describe('req-res-logger', function () {
  describe('middleware', function () {
    it('middleware', function () {
      var logger = rrlogger(function () {})

      assert(logger.length === 3)
    })

    it('always call next()', function () {
      var nextSpy = sinon.spy()
      var logger = rrlogger(function () {})

      logger({}, {}, nextSpy)

      assert(nextSpy.calledOnce)
    })
  })

  describe('only onFinish', function () {
    var app, onFinish

    beforeEach(function () {
      app = express()
      onFinish = sinon.spy()
      app.use(rrlogger(onFinish))
      app.get('/', function (req, res) {
        res.send('hello world')
      })
    })

    it('called once', function (done) {
      request(app)
        .get('/')
        .end(function (err, res) {
          if (err) return done(err)

          assert(onFinish.calledOnce)
          done()
        })
    })

    it('called with three arguments', function (done) {
      request(app)
        .get('/')
        .end(function (err, res) {
          if (err) return done(err)

          assert(onFinish.args[0].length === 3)
          done()
        })
    })
  })

  describe('onStart & onFinish', function () {
    var app, onStart, onFinish

    beforeEach(function () {
      app = express()
      onStart = sinon.spy()
      onFinish = sinon.spy()

      app.use(rrlogger(onStart, onFinish))
      app.get('/', function (req, res) {
        res.send('hello world')
      })
    })

    it('onStart called before onFinish', function (done) {
      request(app)
        .get('/')
        .end(function (err, res) {
          if (err) return done(err)

          assert(onStart.calledBefore(onFinish))
          done()
        })
    })

    describe('onStart', function () {
      it('called once', function (done) {
        request(app)
          .get('/')
          .end(function (err, res) {
            if (err) return done(err)

            assert(onStart.calledOnce)
            done()
          })
      })

      it('called with two arguments', function (done) {
        request(app)
          .get('/')
          .end(function (err, res) {
            if (err) return done(err)

            assert(onStart.args[0].length === 2)
            done()
          })
      })
    })

    describe('onFinish', function () {
      it('called once', function (done) {
        request(app)
          .get('/')
          .end(function (err, res) {
            if (err) return done(err)

            assert(onFinish.calledOnce)
            done()
          })
      })

      it('called with three arguments', function (done) {
        request(app)
          .get('/')
          .end(function (err, res) {
            if (err) return done(err)

            assert(onFinish.args[0].length === 3)
            done()
          })
      })
    })
  })
})
