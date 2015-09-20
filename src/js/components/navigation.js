var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var ipc = window.require('ipc');

var Actions = require('../actions/actions');
var AuthStore = require('../stores/auth');

var Navigation = React.createClass({
  mixins: [
    Router.State,
    Reflux.connect(AuthStore, 'authStatus')
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      authStatus: AuthStore.authStatus(),
      loading: false
    };
  },

  goToSettings: function () {
    this.context.router.transitionTo('settings');
  },

  logOut: function () {
    Actions.logout();
    this.context.router.transitionTo('login');
    ipc.sendChannel('update-icon', 'IconPlain');
  },

  goBack: function () {
    this.context.router.transitionTo('profile');
  },

  appQuit: function () {
    ipc.sendChannel('app-quit');
  },

  render: function () {
    var refreshIcon, logoutIcon, backIcon, settingsIcon, quitIcon;
    var loadingClass = this.state.loading ? 'fa fa-refresh fa-spin' : 'fa fa-refresh';

    if (this.state.authStatus) {
      refreshIcon = (
        <i className={loadingClass} />
      );
      logoutIcon = (
        <i className='fa fa-sign-out' onClick={this.logOut} />
      );
      settingsIcon = (
        <i className='fa fa-cog' onClick={this.goToSettings} />
      );
    } else {
      quitIcon = (
        <i className='fa fa-power-off' onClick={this.appQuit} />
      );
    }
    if (this.getPath() === '/settings') {
      backIcon = (
        <i className='fa fa-chevron-left' onClick={this.goBack} />
      );
      settingsIcon = (
        <i className='fa fa-cog' onClick={this.goBack} />
      );
    }

    return (
      <div className='header'>
        <div className='row navigation'>
          <div className='left-section'>
            {backIcon}
            {refreshIcon}
          </div>
          <div className='right-section'>
            {settingsIcon}
            {logoutIcon}
            {quitIcon}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navigation;
