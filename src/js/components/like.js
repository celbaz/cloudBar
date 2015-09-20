var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var _ = require('underscore');
var LikeStore = require('../stores/like');

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
    this.setState({
      loading: false,
      errors: true
    });
  },

  generateTracks: function (liked_songs) {
    var self = this;
    if (!Array.isArray(liked_songs)) return <h3>NO</h3>;
    return _.map(liked_songs, function (item) {
      return (
        <div key={item.id} className="search-item group">
            <img
              src={ item.avatar_url || item.artwork_url}
              onClick={self.playSong}
              data-stream={item.stream_url} />
            <div>
              <h3 className="song-artist">
                {item.username || item.user.username}
              </h3>
              <p className="song-title">
                {item.title}
              </p>
              <span>
                <p className="song-likes">
                  {item.likes_count}
                </p>
                <p className="song-plays">
                  {item.playback_count}
                </p>
              </span>
            </div>
        </div>
      );
    });
  },

  generatePlaylists: function () {
    var self = this;
    return _.map(this.state.like, function (list) {
      // Playlist Info
      return (
          <div key={list.id} className="playlist-container" onClick={self.renderSongs}>
            <ul>
              <li>track_count: {list.track_count}</li>
              <li>artwork_url: {list.artwork_url}</li>
              <li>created_at: {list.created_at}</li>
              <li>playlist_type: {list.playlist_type}</li>
            </ul>
          </div>
      );
    });
  },

  renderSongs: function () {
    // TODO: Implement
  },

  toggleTab: function (event) {
    var tabText = event.target.textContent;
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
    var content;
    if(this.state.likeTab === "Tracks") {
      content =  this.generateTracks(this.state.like);
    } else {
      content = this.generatePlaylists();
    }
    return (
      <div className="main-container likes">
        <ul onClick={this.toggleTab}>
          <li className={(this.state.likeTab === "Tracks") ? "active" : ""}>Tracks</li>
          <li className={(this.state.likeTab === "Playlists") ? "active" : ""}>Playlists</li>
        </ul>
        <div className={this.state.likeTab}>
          {content}
        </div>
      </div>
    );
  }
});


module.exports = Likes;
