var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');


var Likes = React.createClass({

  

  render: function () {
    return (
      <div className="main-container likes">
        <div className="tracks">
        </div>
        <div className="playlists">
        </div>
      </div>
    );
  }
});


module.exports = Likes;
