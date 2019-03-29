import streams from '../apis/streams'
import history from '../history'
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types'

const signIn = userId => ({
  type: SIGN_IN,
  payload: userId
})

const signOut = () => ({
  type: SIGN_OUT
})

// thunk creators
const createStream = formValues => async (dispatch, getState) => {
  try {
    // when posting form, we include the input values as well the logged in userId that made the stream
    const { userId } = getState().auth
    const { data } = await streams.post('/streams', { ...formValues, userId })
    dispatch({ type: CREATE_STREAM, payload: data })
    // do programmatic navigation to get user back to the root route depending on condition by forcible navigation
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

const fetchStreams = () => async dispatch => {
  try {
    const response = await streams.get('/streams')
    dispatch({ type: FETCH_STREAMS, payload: response.data })
  } catch (error) {
    console.error(error)
  }
}

const fetchStream = id => async dispatch => {
  try {
    const { data } = await streams.get(`/streams/${id}`)
    dispatch({ type: FETCH_STREAM, payload: data })
  } catch (error) {
    console.error(error)
  }
}

const editStream = (id, formValues) => async dispatch => {
  try {
    // PATCH request to just updated the form values that are passed in and not wiping out all values inside compared to using PUT
    const { data } = await streams.patch(`/streams/${id}`, formValues)
    dispatch({ type: EDIT_STREAM, payload: data })
    // do programmatic navigation to get user back to the root route depending on condition by forcible navigation
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

const deleteStream = id => async dispatch => {
  try {
    await streams.delete(`/streams/${id}`)
    dispatch({ type: DELETE_STREAM, payload: id })
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

export {
  signIn,
  signOut,
  createStream,
  fetchStreams,
  fetchStream,
  editStream,
  deleteStream
}
