// // array based approach
// const streamReducer = (state = [], action) => {
//   switch (action.type) {
//     case EDIT_STREAM:
//       return state.map(stream => {
//         if (stream.id === action.payload.id) {
//           return action.payload
//         } else {
//           return stream
//         }
//       })
//     default:
//       return state
//   }
// }

// // object based approach
// const streamReducer = (state = {}, action) => {
//   switch (action.type) {
//     case EDIT_STREAM:
//       // const newState = { ...state }
//       // // set id to new stream
//       // newState[action.payload.id] = action.payload
//       // return newState
//       // square brackets = key interpolation syntax
//       // square brackets, look at the payload id, take that making a new key using it inside overall object and then assign it action.payload
//       return { ...state, [action.payload.id]: action.payload }
//     default:
//       return state
//   }
// }

import _ from 'lodash'
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      const arrayToObject = array => {
        return array.reduce((obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
      }
      // spread the returned value of this large object
      // copy of existing state and merging it with the newly made object from mapkeys
      return { ...state, ...arrayToObject(action.payload) }
    // return { ...state, ..._.mapKeys(action.payload, 'id') }
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_STREAM:
      // payload is id itself as reference in thunk creator
      return _.omit(state, action.payload)
    // return { ...state.filter(payload => payload.id !== action.payload) }
    default:
      return state
  }
}
