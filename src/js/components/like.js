var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var _ = require('underscore');
var LikeStore = require('../stores/like');
var SearchItems = require('./searchItems');
var AuthStore = require('./stores/auth');

var Likes = React.createClass({

  mixins: [
    Reflux.connect(LikeStore, 'like'),
    Reflux.listenTo(Actions.getLikes.completed, 'completedLikes'),
    Reflux.listenTo(Actions.getLikes.failed, 'failedLikes')
  ],

  getInitialState: function () {
    var initState = window.localStorage.getItem('liked-component-tab');
    if(!initState) {
      window.localStorage.setItem('liked-component-tab', 'Tracks');
      initState = 'Tracks';
    }
    return { likeTab: initState };
  },

  componentWillMount: function () {
    Actions.getLikes();
  },

  completedLikes: function () {
    this.setState({
      loading: false,
      errors: false
    });
  },

  failedLikes: function () {
    AuthStore.refreshToken();
    this.setState({
      loading: false,
      errors: true
    });
  },

  renderSongs: function () {
    // TODO: Implement
  },

  toggleTab: function (event) {
    var tabText = event.target.id;
    if(tabText !== this.state.likeTab) {
      this.setState({
        likeTab: tabText
      });
      window.localStorage.setItem('liked-component-tab', tabText);
      Actions.getLikes();
    }
    event.stopPropagation();
  },

  render: function () {
    return (
      <div className="main-container likes">
        <h1>My Music</h1>

        <ul className="tabs nav group" onClick={this.toggleTab}>
          <li className={(this.state.likeTab === "Tracks") ? "active" : ""}
            id="Tracks">My Favorite Tracks</li>
          <li className={(this.state.likeTab === "Playlists") ? "active" : ""}
            id="Playlists">My Playlists</li>
        </ul>

        <div className="likes-wrapper">
          <SearchItems
            searchResults={this.state.like}
            itemType={this.state.likeTab} />
        </div>
      </div>
    );
  }
});


module.exports = Likes;
