import streams from '../apis/streams'
import { SIGN_IN, SIGN_OUT } from './types'

const signIn = userId => ({
  type: SIGN_IN,
  payload: userId
})

const signOut = () => ({
  type: SIGN_OUT
})

// thunk creator
const createStream = formValues => async dispatch => {
  try {
    streams.post('/streams', formValues)
  } catch (error) {
    console.error(error)
  }
}

export { signIn, signOut, createStream }
