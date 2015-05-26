
/**
 * Http proxy server
 *
 */
var RSVP = require('rsvp');

var httpServer = (function() {
  'use strict';

  var options = {};
  var server = null;
  var serverIsRunning = false;

  /**
   * Try to run the server on provided port. If this port is unaccessible it will try next port.
   * It will stop when server will be running.
   *
   * @TODO Add failsafe, so it will check only few hundreds or thousands ports and not stay always in a loop.
   *
   * @param  {[int]} port starting port number
   * @return {[int]} port on which the server has been started.
   */
  function listenOnPort(port, resolve, reject) {
      server.listen(port, function() {
        //alert("Server running on: " + port);
        serverIsRunning = true;
        resolve(port);
      }).on('error', function(err) {
        //alert('error listen port ' + port);
        port++;
        if (port > 8000) {
          alert('Error. Server could\'t not find any free port.');
          reject(this);
        }
        else {
          return listenOnPort(port, resolve, reject);
        }
    });
  }

  /**
   * Http server object
   */
  function HttpServer() {
    this.port = undefined;

    var express = require('express');
    var request = require('request');

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    server = express();

    server.use('/', function(req, res) {
      var url = options.chosenUrl + req.url;
      var r = null;

      if(req.method === 'POST') {
        r = request.post({uri: url, json: req.body});
      } else {
        r = request({url: url});
      }
      req.pipe(r).pipe(res);
    });
  }

  /**
   * Function for setting server options.
   * @param {[array]} addOptions
   */
  HttpServer.prototype.setOptions = function(addOptions) {
    if (typeof addOptions === 'object') {
      Object.keys(addOptions).forEach(function(key){
        options[key] = addOptions[key];
      });
    }
  };

  /**
   * Start server
   * @return {[RSVP.Promise]} Returns a promise
   */
  HttpServer.prototype.listen = function() {
    var promise = new RSVP.Promise(function(resolve, reject){
      if (serverIsRunning === true) {
        resolve(this.port);
      }
      else {
        listenOnPort(1040, resolve, reject);
      }
    }.bind(this));
    return promise;
  };

  /**
   * Returns server port if any has been set already.
   * @return {[int]} port
   */
  HttpServer.prototype.getPort = function() {
    return this.port;
  };

  return new HttpServer;
}());