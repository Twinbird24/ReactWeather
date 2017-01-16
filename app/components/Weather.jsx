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

    // when searching, we want to show the loading message and clearn our any previous error messages, the location, and temp, if any previous
    // ones exist in the state
    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
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
  // this method fires once the component has been successfully mounted into the browser
  componentDidMount: function () {
    // grab the location query string in the url
    var location = this.props.location.query.location;

    // if we have a location and it's more than just an empty string, then trigger a search
    // React Router already parses the location for us and passes it to our RouteComponent
    if (location && location.length > 0) {
      this.handleSearch(location);
      // after we run search, let's empty the query parameter
      window.location.hash = '#/' // the root of our app
    }
  },
  // function will get called anytime the component's props get updated, it only takes the new props as argument
  componentWillReceiveProps: function (newProps) {
    // grab the location query string in the url if the locatoin prop get's updated (i.e. via the search bar in the nav)
    var location = newProps.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      // after we run search, let's empty the query parameter
      window.location.hash = '#/' // the root of our app
    }
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
