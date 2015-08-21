var Reflux = require('reflux');
var Actions = require('../actions/actions');

var AuthStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._soundcloudtoken = window.localStorage.getItem('soundcloudtoken') || false;
  },

  onLogin: function (token) {
    this._soundcloudtoken = token;
    window.localStorage.setItem('soundcloudtoken', token);
    this.trigger(token);
  },

  onLogout: function () {
    window.localStorage.clear();
    this._soundcloudtoken = false;
    this.trigger(this.authStatus());
  },

  authStatus: function () {
    return this._soundcloudtoken;
  }
});

module.exports = AuthStore;
