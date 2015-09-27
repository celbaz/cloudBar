var React = require('react');
var Toggle = require('react-toggle');

var ipc = window.require('ipc');

var Actions = require('../actions/actions');
var SettingsStore = require('../stores/settings');

var SettingsPage = React.createClass({
  getInitialState: function () {
    var settings = SettingsStore.getSettings();
    return {
      openAtStartup: settings.openAtStartup
    };
  },

  toggleSetting: function (key, event) {
    Actions.setSetting(key, event.target.checked);
  },

  // Remove or Fix in the future
  logOut: function () {
    Actions.logout();
    ipc.sendChannel('app-quit');
  },

  appQuit: function () {
    ipc.sendChannel('app-quit');
  },

  render: function () {
    return (
      <section className="settings">
        <article className="features-to-come">
          <h2>Features to Come</h2>

          <ul className="features-list">
            <li>Auto Open At Computer Startup</li>
            <li>Spotify Integration</li>
            <li>UI Redesign</li>
          </ul>
        </article>

        <article className="buttons">
          <button onClick={this.appQuit}>
            Quit Cloudbar
          </button>

          <button onClick={this.logOut}>
            Log Out Of Cloudbar
          </button>
        </article>
      </section>
    );
  }
});

module.exports = SettingsPage;
