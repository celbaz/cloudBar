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
      <div className="main-container settings">
        <div className='settings-row'>
          <div className='toggle-label'>Features to Come</div>
          <ul>
            <li>Auto Open At Computer Startup</li>
            <li>Spotify Integration</li>
            <li>UI Redesign</li>
          </ul>
        </div>
        <div className='quit-app'>
          <button className='' onClick={this.appQuit}>
            <i className="fa fa-power-off" />
            Quit Cloudbar
          </button>
        </div>
        <div className='quit-app'>
          <button className='' onClick={this.logOut}>
            <i className="fa fa-power" />
            Log Out Of Cloudbar
          </button>
        </div>
      </div>
    );
  }
});

module.exports = SettingsPage;
