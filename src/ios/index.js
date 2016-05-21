import createStore from '../store'
import List from './list'

const store = createStore();

/**
 * mountNode is platform specific and coupled with list component (standardize it?)
 */
//
// const mountNode = document.getElementById('app')
//
// document.addEventListener('DOMContentLoaded', () => {
//     const app = new List({ el: mountNode, store })
//     app.start()
// })