var React = require('react');
var Reflux = require('reflux');
// var shell = remote.require('shell');



var AudioPlayer = React.createClass({

  getInitialState: function () {
    var song = localStorage.getItem('currentsong');
  },

  componentDidMount: function () {
  },

  render: function () {
    return (
      <div className="main-container">
      </div>
    );
  }
});


module.exports = AudioPlayer;
// html
