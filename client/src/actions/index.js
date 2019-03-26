import { SIGN_IN, SIGN_OUT } from './types'

const signIn = userId => ({
  type: SIGN_IN,
  payload: userId
})

const signOut = () => ({
  type: SIGN_OUT
})

export { signIn, signOut }
