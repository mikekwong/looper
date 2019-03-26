const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

const signIn = () => ({
  type: SIGN_IN
})

const signOut = () => ({
  type: SIGN_OUT
})

export { signIn, signOut }
