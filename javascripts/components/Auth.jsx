import React from 'react'

export default class Wrapper extends React.Component {

  componentDidMount () {
    // window.setTimeout(function () {
    //   window.SC.initialize({
    //     client_id: "214389ad8add5d1248a0e8f0c00e0bdc",
    //     redirect_uri: " "
    //   });
    //
    //   window.SC.connect(function(what){
    //     console.log(this);
    //   });
    // }, 3000);
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
