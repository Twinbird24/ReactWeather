// the promise based HTTP client for the browser and node.js
var axios = require('axios');

// store the url to our endpoint, where our lovely JSON data and weather data sits, in metric of course
const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=c4e735ea8bd7e7b6dc8368c752517b2d&units=metric';

// export an object, which contains the getTemp method/ function
module.exports = {
  // location ultimately gets passed in from the user input
  getTemp: function (location) {
    var encodedLocation = encodeURIComponent(location); // encode special characters and things like spaces
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`; // template string, contains url to api + the encoded location

    // we return the promise: request url followed by success and error callbacks, which get's returned. After the first .then,
    // we are digging through the response object, which includes other stuff but we are looking for the message or the temp.
    // We can send this to the error handler by calling 'throw new error' and we can also send it to the success case returning the temp value.
    // Weather.jsx will be able to use this.
    return axios.get(requestUrl).then(function (res) {
      if (res.data.cod && res.data.message) {
        // the api has it's open special error messages too apparently, so we can get get a response but the response will be an error if the api isn't working properly
        throw new Error(res.data.message);
      } else {
        // this is what we want, the sweet succulent weather data returned to us
        return res.data.main.temp;
      }
    }, function (err) {
      // if we get error, we will throw the error message
      //throw new Error(err.data.message); <-- we won't use this, because the api can be glitchy and throw some undefined message,
      // so we are just going to throw a static 'catch-all' string response instead
      throw new Error('Unable to fetch weather for that location.');
    });
  }
}
