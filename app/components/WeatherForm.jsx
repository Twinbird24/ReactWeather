var React = require('react');

var WeatherForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();

    // take what the user inputted
    var location = this.refs.location.value;

    if (location.length > 0) {
      // empty input field
      this.refs.location.value = '';
      // run the onSearch function inside of the parent component
      this.props.onSearch(location);
    }
  },
  render: function () {
    return (
        <div>
          <form onSubmit={this.onFormSubmit}>
            <input type="text" ref="location"/>
            <button className="button expanded hollow">Get Weather</button>
          </form>
        </div>
    );
  }
});

module.exports = WeatherForm;
