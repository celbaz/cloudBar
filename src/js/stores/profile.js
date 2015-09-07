var ipc = window.require('ipc');
var _ = require('underscore');

var Reflux = require('reflux');
var Actions = require('../actions/actions');
var apiRequests = require('../utils/api-requests');
var SettingsStore = require('../stores/settings');

require('../stores/sound-notification');

var ProfileStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._profile = [];
  },

  // updateTrayIcon: function (notifications) {
  //   if (notifications.length > 0) {
  //     ipc.sendChannel('update-icon', 'TrayActive');
  //   } else {
  //     ipc.sendChannel('update-icon', 'TrayIdle');
  //   }
  // },

  onGetProfile: function () {
    var self = this;
    apiRequests
      .get('https://api.soundcloud.com/me?oauth_token=' +
         window.localStorage.getItem('soundcloudtoken'))
      .end(function (err, response) {
        if (response && response.ok) {
          // Success - Do Something.
          Actions.getProfile.completed(response.body);
          // self.updateTrayIcon(response.body);
          // Actions.isNewNotification(response.body);
        } else {
          // Error - Show messages.
          Actions.getProfile.failed(err);
        }
      });
  },

  onGetProfileCompleted: function (profile) {
    this._profile = profile;
    this.trigger(this._profile);
  },

  onGetProfileFailed: function () {
    this._profile = [];
    this.trigger(this._profile);
  }
});

module.exports = ProfileStore;
