// libs
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// local
import createStore from '../store'
import List from '../react/list'

const store = createStore()

const mountNode = document.getElementById('app')

ReactDOM.render(<List store={store}/>, mountNode)