var Reflux = require('reflux');
var Actions = require('../actions/actions');
var apiRequests = require('../utils/api-requests');

var AuthStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._soundcloudtoken = window.localStorage.getItem('soundcloudtoken') || false;
    // Breaks conventions: TODO: fix stores and actions
    this._client_id = '214389ad8add5d1248a0e8f0c00e0bdc';
    this._client_secret = 'ff02b6e4f0013681665aba35ebeb57e5';
    this._redirect_uri =  'http://localhost/callback';
  },

  onLogin: function (token, refreshToken) {
    this._soundcloudtoken = token;
    window.localStorage.setItem('soundcloudtoken', token);
    if(refreshToken) window.localStorage.setItem('refreshToken', refreshToken);
    this.trigger(token);
  },

  onLogout: function () {
    window.localStorage.clear();
    this._soundcloudtoken = false;
    this.trigger(this.authStatus());
  },

  refreshToken: function () {
    var self = this;
    apiRequests
      .post('https://api.soundcloud.com/oauth2/token', {
        client_id: this._client_id,
        client_secret: this._client_secret,
        redirect_uri: this._redirect_uri,
        grant_type: 'refresh_token',
        refresh_token:  window.localStorage.getItem('refreshToken')
      })
      .end(function (err, response) {
        if (response && response.ok) {
          self.onLogin(response.body.access_token, response.body.refresh_token);
        }
      });

  },


  authStatus: function () {
    return this._soundcloudtoken;
  }
});

module.exports = AuthStore;
