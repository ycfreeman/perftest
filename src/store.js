// libs
import { applyMiddleware, compose, createStore } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import freeze from 'redux-freeze'

// local
import myReducer from './redux/reducers'

const rootReducer = combineReducers({ myReducer })

export default function configureStore (initialState = {}) {
  const middleware = applyMiddleware(thunk, freeze)
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      middleware,
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store
}
