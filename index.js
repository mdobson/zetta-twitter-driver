var Device = require('zetta-device');
var util = require('util');
var twitter = require('twitter');

var Twitter = module.exports = function(name, authOpts) {
  Device.call(this);
  this._twitter = new twitter(authOpts);
  if(name) {
    this._n = name;
  } 

};
util.inherits(Twitter, Device);

Twitter.prototype.init = function(config) {
  config
    .type('twitter')
    .name(this._n)
    .state('authenticated')
    .when('authenticated', { allow: ['tweet'] })
    .when('tweeting', { allow: [] })
    .map('tweet', this.tweet, [{type: 'text', name: 'body'}]);
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
