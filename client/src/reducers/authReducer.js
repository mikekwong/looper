import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from '../actions/types'

// null because we don't know if user is signed in or not on load
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload }
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null }
    default:
      return state
  }
}
