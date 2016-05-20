// libs
import _ from 'lodash'

// local
import random from '../random'
import perfTest from '../perfTest'

// reducers
const ACTION_HANDLERS = {

  ['UPDATE_EVERYTHING']: (state, action) => {
    return Object.assign({}, state, {
      updatesRemaining: state.updatesRemaining - 1,
      data: state.data.map((item, i) => {
        const { int, str } = action.payload[i]

        // BUG
        const isAThing = i === 1 || i % 3 === 0
        const newInt = isAThing && int > 100 && int < 150 ? 'BUGOUTMAN' : int
        // BUG

        return Object.assign({}, item, { int: newInt, str })
      })
    })
  },

  ['UPDATE_NOTHING']: (state, action) => {
    return Object.assign({}, state, {
      updatesRemaining: state.updatesRemaining - 1
    })
  },

  ['INC_ALL_INT']: (state, action) => {
    return Object.assign({}, state, {
      updatesRemaining: state.updatesRemaining - 1,
      data: state.data.map((item, i) => {
        return Object.assign({}, item, { int: item.int + 1 })
      })
    })
  },

  ['INC_NTH_INT']: (state, action) => {
    return Object.assign({}, state, {
      updatesRemaining: state.updatesRemaining - 1,
      data: state.data.map((item, i) => {
        const isNth = i % action.payload === 0
        if (isNth) {
          return Object.assign({}, item, { int: item.int + 1 })
        }
        return item
      })
    })
  }
}

const initialState = {
  data: random.list(perfTest.numberOfItems),
  updatesRemaining: perfTest.numberOfUpdates
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
