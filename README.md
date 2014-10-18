# Twitter driver for Zettajs

This is the twitter driver for zettajs. 

## Driver usage

```javascript
var zetta = require('zetta');
var Twitter = require('zetta-twitter-driver');

var twitterOpts = {
  consumer_key: "<Your key>"
  consumer_secret: "<Your secret>"
  access_token_key: "<Access token>"
  access_token_secret: "<Access token secret>"
};

var name = "Matt's Twitter";

zetta()
  .use(Twitter, name, twitterOpts)
  .listen(1337);
```

# Transitions
Simply use the `"tweet"` transition with an argument of the body of the tweet.

```javascript
module.exports = function(server) {
  var twitterQuery = server.where({ type: 'twitter' });
  server.observe([tweitterQuery], function(twitter){
    if(twitter.available('tweet')) {
      twitter.call('tweet', 'Hello @zettajs! Thanks for the tweet help.');
    }
  });
}
```
