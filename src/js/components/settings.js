var React = require('react');
var Toggle = require('react-toggle');

var ipc = window.require('ipc');

var Actions = require('../actions/actions');
var SettingsStore = require('../stores/settings');

var SettingsPage = React.createClass({
  getInitialState: function () {
    var settings = SettingsStore.getSettings();
    return {
      openAtStartup: settings.openAtStartup,
      settings: settings
    };
  },

  toggleSetting: function (key, event) {
    Actions.setSetting(key, event.target.checked);
  },

  setResultsCount: function (event) {
    var resultsCount = event.target.value;
    Actions.setSetting('resultsCount', String(resultsCount));
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

    var resCount = this.state.settings.resultsCount;
    return (
      <section className="settings-container">
        <article className="settings">
          <ul className="settings-list">
            <li className="group">
              <label>Auto-open on computer start-up</label>
              <input
                className="setting-option toggle-checkbox"
                type="checkbox"
                onChange={this.toggleSetting.bind(this, "auto-open")} />
            </li>

            <li className="group">
              <label>Global keybindings</label>
              <input
                className="setting-option toggle-checkbox"
                type="checkbox"
                onChange={this.toggleSetting.bind(this, "keybindings")} />
            </li>

            <li className="group">
              <label># of search results</label>
              <select
                className="setting-option search-results-count"
                onChange={this.setResultsCount}>
                {[10, 20, 50, 100, 200].map(function (count) {
                  return (
                    <option
                      selected={(resCount == count)}
                      key={"count-" + count}
                      value={count}>
                      {count}
                    </option>
                  );
                })}
              </select>
            </li>
          </ul>
        </article>

        <article className="buttons">
          <button onClick={this.appQuit}>
            Quit Cloudbar
          </button>

          <button onClick={this.logOut}>
            Log out of Cloudbar
          </button>
        </article>
      </section>
    );
  }
});

module.exports = SettingsPage;
