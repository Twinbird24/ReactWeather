var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Weather = require('Weather');
var About = require('About');
var Examples = require('Examples');

// load foundation, require doesn't know how to load css files, so we use css-loader css!, we also need to inject this into
// our html so our styles actually show up, using style!
require('style!css!foundation-sites/dist/foundation.min.css');
// fire up foundation, by calling the foundation method
$('document').foundation();

// app css
require('style!css!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={About}/>
      <Route path="examples" component={Examples}/>
      <IndexRoute component={Weather}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
