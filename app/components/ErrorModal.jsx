var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ErrorModal = React.createClass({
  // similar to getInitialState, if a prop value is provided, we use it, otherwise we use a default value in here
  getDefaultProps: function () {
    return {
      title: 'Error'
    }
  },
  // declare that a prop is a specific JS primitive, or make a specific prop required
  propTypes: {
    // not required, but must be a string
    title: React.PropTypes.string,
    // message is not optional
    message: React.PropTypes.string.isRequired
  },
  // componentDidMount is executed after first render only on the client side
  componentDidMount: function () {
    var {title, message} = this.props;

    // we want to create these elements in jQuery, and add them into the browser
    var modalMarkup = (
      // If we add data-close to JSX the resulting HTML attribute will be data-close="true" when compiling
      // adding data-close="" results in HTML that compiles to 'data-close' this is what Foundation expects
      <div id="error-modal" className="reveal medium text-center" data-reveal="">
        <h4>{title}</h4>
        <p>{message}</p>
        <p>
          {/* button to close the modal*/}
          <button className="button hollow" data-close="">
            Okay
          </button>
        </p>
      </div>
    );

    // renderToString() takes JSX code and returns the string version of it, which lets us create elements and show them to the screen
    // $modal is our jQuery object that has the contents we want to add to the DOM
    var $modal = $(ReactDOMServer.renderToString(modalMarkup));
    // findDOMNode take the component, we pass in 'this', which returns the DOM node where this component lives
    // then we use jQuery's html method to pass in the markup we want to show to the screen, which in this case is $modal
    $(ReactDOM.findDOMNode(this)).html($modal);

    // this creates a new instance of our modal, modal.open shows the new instance
    // I am using Foundation to create the modal
    var modal = new Foundation.Reveal($('#error-modal'));
    // to actually open the modal
    modal.open();
  },
  render: function () {
    return (
      // component renders nothing
      <div>
      </div>
    )
  }
});


module.exports = ErrorModal;
