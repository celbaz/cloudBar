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

  goToLike: function () {
    this.context.router.transitionTo('like');
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
      <ul className='sections nav group'>
        <li onClick={this.goToSearch}>
          <i className='icon-search' />
        </li>

        <li onClick={this.goToProfile}>
          <i className='icon-user' />
        </li>

        <li onClick={this.goToLike}>
          <i className='icon-star' />
        </li>

        <li onClick={this.goToPlayer}>
          <i className='icon-soundcloud' />
        </li>
      </ul>
    );
  }
});

module.exports = Sections;
