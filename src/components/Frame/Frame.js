var React = require('react');

var Frame = React.createClass({
  propTypes: {
    head:  React.PropTypes.renderable
  },
  render: function() {
    return this.transferPropsTo(React.DOM.iframe());
  },
  componentDidMount: function() {
    this.renderFrameContents();
  },
  renderFrameContents: function() {
    var doc = this.getDOMNode().contentDocument;
    if(doc && doc.readyState === 'complete') {
      var contents = React.DOM.div(null,
        this.props.head,
        this.props.children
      );

      React.renderComponent(contents, doc.body);
    } else {
       setTimeout(this.renderFrameContents, 0);
    }
  },
  componentDidUpdate: function() {
    this.renderFrameContents();
  },
  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
  }
});

module.exports = Frame;