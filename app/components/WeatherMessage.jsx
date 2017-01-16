var React = require('react');

var WeatherMessage = ({temp, location}) => {
  return (
    // presentational component, just displayed the temp from the api, which is set on the parent component's sate
    <h3 className="text-center">It is {temp}&deg;C in {location}.</h3>
  )
}

module.exports = WeatherMessage;
