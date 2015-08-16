import React from 'react'

export default class Wrapper extends React.Component {

  componentDidMount () {
    // if authenticated then display player view
  }

  render () {
    return (
      <div>
        <div className="main">
          Hi, Welcome to Cloudbar. Click the button below to login to SoundCloud. Happy Listening!
        </div>
        <div className="sign-in-button"><a>Sign-In</a></div>
      </div>
    );
  }

}
