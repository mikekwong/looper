import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends Component {
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
          // call the get Auth Instance to load up the methods we can use
          this.auth = window.gapi.auth2.getAuthInstance()
          // set the state based on the current status of the user
          this.setState({ isSignedIn: this.auth.isSignedIn.get() })
          // keep listening on if signed in status changed by passing in method
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn()
    } else {
      this.props.signOut()
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton () {
    if (this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
          Sign In With Google
        </button>
      )
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

export default connect(
  null,
  { signIn, signOut }
)(GoogleAuth)
