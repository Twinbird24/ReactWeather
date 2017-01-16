var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },
  handleSearch: function (location) {
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined
    });

    // call the method inside of the openWeatherMap.jsx file, which get's passed the location the user entered, if we don't get an error, then
    // we'll take the temp we got, and updated the state
    openWeatherMap.getTemp(location).then(function (temp) {
      that.setState({
        // success callback
        location: location,
        temp: temp,
        isLoading: false
      });
    }, function (e) {
      // error callback, error object gets passed back inside e, e.message property is where we find the message to display, but hopefully
      // we get proper tempurature on every request :)
        that.setState({
          isLoading: false,
          errorMessage: e.message
        });
    });
  },
  render: function () {
    var {isLoading, temp, location, errorMessage} = this.state;

    function renderMessage () {
      if(isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>
      } else if (temp != null && location != null) {
        return <WeatherMessage temp={temp} location={location}/>
      }
    }

    function renderError () {
      // if we have an error message, then return the ErrorModal component, which then displays the error in a pop-up modal
      if(typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderError()}
      </div>
    )
  }
});

module.exports = Weather;
