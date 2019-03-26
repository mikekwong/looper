import React, { Component } from 'react'

export default class GoogleAuth extends Component {
  // null because we don't know if user is signed in or not on load
  state = { isSignedIn: null }

  componentDidMount () {
    // initialize the api library with window as prefix since its the global object
    window.gapi.load('client:auth2', () => {
      // callback executes async network request to Google's API to initialize client
      // when we call init, it returns a promise
      window.gapi.client
        .init({
          clientId:
            '936658232995-ql4onfgtbc3q275gd1v8d78v8kot5v3i.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        })
    })
  }

  renderAuthButton () {
    if (this.state.isSignedIn === null) {
      return <div>I don't know if we are signed in</div>
    } else if (this.state.isSignedIn) {
      return <div>I am signed In!</div>
    } else {
      return <div>I am not signed in.</div>
    }
  }

  render () {
    return (
      <div>
        <div>{this.renderAuthButton()}</div>
      </div>
    )
  }
}
