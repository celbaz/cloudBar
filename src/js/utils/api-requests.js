var request = require('superagent');
var AuthStore = require('../stores/auth');

var apiRequests = {
  get: function (url) {
    return request
      .get(url);
  },

  post: function (url, params) {
    return request
      .post(url)
      .send(params)
      .set('Accept', 'application/json');
  },

  put: function(url) {
    return request
      .put(url)
      .send({ oauth_token: AuthStore.authStatus()})
      .set('Accept', 'application/json');
  },

  delete: function(url) {
    return request
      .del(url)
      .send({ oauth_token: AuthStore.authStatus()})
      .set('Accept', 'application/json');
  },

  getAuth: function (url) {
    return request
      .get(url)
      .set('Authorization', 'token ' + AuthStore.authStatus());
  },

  putAuth: function (url, params) {
    return request
      .put(url)
      .send(params)
      .set('Authorization', 'token ' + AuthStore.authStatus());
  },

  patchAuth: function (url, params) {
    return request
      .patch(url)
      .send(params)
      .set('Authorization', 'token ' + AuthStore.authStatus());
  }
};

module.exports = apiRequests;
