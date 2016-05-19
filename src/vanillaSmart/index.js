// local
import createStore from '../store'
import List from './list'

const store = createStore()

const mountNode = document.getElementById('app')

document.addEventListener('DOMContentLoaded', () => {
  const app = new List({ el: mountNode, store })
  app.start()
})