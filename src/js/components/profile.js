var React = require('react');
var Reflux = require('reflux');
var Loading = require('reloading');
var _ = require('underscore');
var remote = window.require('remote');
var shell = remote.require('shell');
var Actions = require('../actions/actions');
var ProfileStore = require('../stores/profile');
var Settings = require('./settings');
var AuthStore = require('./stores/auth');

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
  AuthStore.refreshToken();
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
        <section className="profile-error">
          <h1>Oops, something went wrong!</h1>
          <p>
            {"We couldn't retrieve your profile. Try checking your Internet connection?"}
          </p>
        </section>
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

          <ul className="stats group">
            <li>
              <strong>{info.public_favorites_count}</strong>
              favorites
            </li>

            <li>
              <strong>{info.playlist_count}</strong>
              playlists
            </li>

            <li>
              <strong>{info.followers_count}</strong>
              followers
            </li>

            <li>
              <strong>{info.followings_count}</strong>
              followings
            </li>
          </ul>
        </section>
      );
    }

    return (
      <div className="main-container with-padding profile">
        {profile || errors}
        <Settings />
      </div>
    );
  }
});

module.exports = Profile;
