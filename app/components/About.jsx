var React = require('react');

var About = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">About</h1>
      <p>This is a weather application built using React. The page navigation at the top is a separate React component that incorporates
      the React Router to seamlessly jump between pages, each of which is also a separate component. To fetch the weather, axios is used.
      Axios is a promise based HTTP client for the browser that is used to grab the weather API (in JSON format) which we than handle in
      the weather component (in the Get Weather page).</p>
      <p>
        Here is more information about some of the tools used in this app:
      </p>
      <ul>
        <li>
          <a href="https://facebook.github.io/react/" target="_blank">React</a> - the JavaScript framework
        </li>
        <li>
          <a href="http://openweathermap.org" target="_blank">Open Weather Map</a> - the website used for weather data
        </li>
        <li>
          <a href="https://github.com/Twinbird24/ReactWeather" target="_blank">GitHub</a> - view the code on GitHub
        </li>
      </ul>
    </div>
  )
};

module.exports = About;
