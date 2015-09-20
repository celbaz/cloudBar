var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var ipc = window.require('ipc');

var Actions = require('../actions/actions');
var AuthStore = require('../stores/auth');

var Sections = React.createClass({
  mixins: [
    Router.State,
    Reflux.connect(AuthStore, 'authStatus')
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      authStatus: AuthStore.authStatus()
    };
  },

  goToHome: function () {
    this.context.router.transitionTo('settings');
  },

  goToSearch: function () {
    this.context.router.transitionTo('search');
  },

  goToProfile: function () {
    this.context.router.transitionTo('profile');
  },

  goToPlayer: function () {
    this.context.router.transitionTo('player');
  },

  goBack: function () {
    this.context.router.transitionTo('search');
  },

  appQuit: function () {
    ipc.sendChannel('app-quit');
  },

  render: function () {
    return (
      <ul className='sticky-nav nav group'>
        <li onClick={this.goToHome}>
          <i className='fa fa-tachometer' />
        </li>

        <li onClick={this.goToSearch}>
          <i className='fa fa-search' />
        </li>

        <li onClick={this.goToProfile}>
          <i className='fa fa-inbox' />
        </li>

        <li onClick={this.goToPlayer}>
          <i className='fa fa-soundcloud' />
        </li>
      </ul>
    );
  }
});

module.exports = Sections;
