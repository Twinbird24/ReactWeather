var React = require('react');

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
    // this creates a new instance of our modal, modal.open shows the new instance
    // I am using Foundation to create the modal
    var modal = new Foundation.Reveal($('#error-modal'));
    // to actually open the modal
    modal.open();
  },
  render: function () {
    var {title, message} = this.props;

    return (
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
  }
});


module.exports = ErrorModal;
