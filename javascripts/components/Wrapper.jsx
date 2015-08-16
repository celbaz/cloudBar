import React from 'react'
import Auth  from './Auth.jsx'
import Play  from './Play.jsx'

export default class Wrapper extends React.Component {

  componentDidMount () {
    // if authenticated then display player view
  }

  isAuthenticated () {
    return false;
  }

  render () {
    var Mount,
      authenticated = this.isAuthenticated();

    Mount = (authenticated) ? Play : Auth;
    return (<Mount />);
  }

}
