var Device = require('zetta-device');
var util = require('util');
var twitter = require('twitter');

var Twitter = module.exports = function(name, authOpts) {
  Device.call(this);
  this._twitter = null;
  if(name) {
    this._n = name;
  } 

  if(authOpts) {
    this._auth = authOpts;
  }

};
util.inherits(Twitter, Device);

Twitter.prototype.init = function(config) {
  config
    .type('twitter')
    .name(this._n)
    .state('unauthenticated')
    .when('unauthenticated', {allow: ['authenticate'] })
    .when('authenticated', { allow: ['tweet'] })
    .when('tweeting', { allow: [] })
    .map('authenticate', this.authenticate)
    .map('tweet', this.tweet, [{type: 'text', name: 'body'}]);
};

Twitter.prototype.authenticate = function(cb) {
  this.state = 'authenticating';
  if(!this._twitter) {
    this._twitter = new twitter(this._auth);
  }

  this.state = 'authenticated';
  if(cb) {
    cb();
  }
};

Twitter.prototype.tweet = function(body, cb) {
  this.state = 'tweeting';
  var self = this;
  this._twitter.updateStatus(body, function(data) {
    self.state = 'authenticated';
    if(data.name === 'Error') {
      if(cb) {
        cb(data);
      }
    } else {
      if(cb) {
        cb();
      }
    }
  });
};
