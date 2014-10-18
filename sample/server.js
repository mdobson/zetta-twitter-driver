var zetta = require('zetta');
var Twitter = require('../');

var twitterOpts = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

var name = 'Matt\'s Twitter';

zetta()
  .use(Twitter, name, twitterOpts)
  .listen(1337);
