var express = require('express');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'http') {
    // req.headers obj will be either http or https, if it's http we will continue normal
    // our weatherapi can only handle http, so we need to make sure to use that
    next();
  } else {
    // otherwise redirect to the http version of url
    res.redirect('http://' + req.hostname + req.url);
  }
})

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
