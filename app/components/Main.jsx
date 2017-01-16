var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
  return (
    <div>
      <Nav/>
      <div className="row">
        <div className="columns medium-6 large-6 small-centered">
          {/* render the nested Routes/ componenets of Main inside of app.jsx*/}
          {props.children}
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
