var React = require('react');
var Reflux = require('reflux');
var Loading = require('reloading');
var _ = require('underscore');
var remote = window.require('remote');
var shell = remote.require('shell');
var Actions = require('../actions/actions');
var ProfileStore = require('../stores/profile');
var Settings = require('./settings');

var Profile = React.createClass({

  mixins: [
    Reflux.connect(ProfileStore, 'profile'),
    Reflux.listenTo(Actions.getProfile.completed, 'completedProfile'),
    Reflux.listenTo(Actions.getProfile.failed, 'failedProfile')
  ],

  getInitialState: function () {
    return {
      loading: true,
      errors: false
    };
  },

  componentWillMount: function () {
    Actions.getProfile();
  },

  completedProfile: function () {
    this.setState({
      loading: false,
      errors: false
    });
  },

  failedProfile: function () {
    this.setState({
      loading: false,
      errors: true
    });
  },

  openUserBrowser: function (e) {
    e.preventDefault();
    shell.openExternal(this.state.profile.permalink_url);
  },

  render: function () {
    var profile, info, errors;
    var profileEmpty = _.isEmpty(this.state.profile);

    if (this.state.errors || profileEmpty) {
      errors = (
        <div className="profile-error">
          <h3>Oops something went wrong.</h3>
          <h4>{"Couldn't get your profile."}</h4>
        </div>
      );
    } else {
      info = this.state.profile;
      profile = (
        <section className="profile-wrapper">
          <figure className="profile-head">
            <img src={info.avatar_url} />
            <figcaption>
              <h1>{info.full_name}</h1>
              <a onClick={this.openUserBrowser}>View My Account</a>
            </figcaption>
          </figure>

          <article className="stats">
            <h2>Statistics</h2>

            <ul>
              <li># of playlists: {info.playlist_count}</li>
              <li># of favorites: {info.public_favorites_count}</li>
              <li># of followers: {info.followers_count}</li>
              <li># of followings: {info.followings_count}</li>
            </ul>
          </article>
        </section>
      );
    }

    return (
      <div className="main-container profile">
        {profile || errors}
        <Settings />
      </div>
    );
  }
});

module.exports = Profile;
