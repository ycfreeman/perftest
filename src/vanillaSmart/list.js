// libs
import _ from 'lodash'
import raf from 'raf'

// local
import perfTest from '../perfTest'
import * as actions from '../redux/actions'

// views
import Item, { itemUpdate } from './item'

export default class List {

  constructor(options) {
    this.el = options.el
    this.store = options.store
    this.storeKey = 'myReducer'
    this.store.subscribe(this.render.bind(this))
  }

  start() {
    this.initialRender()
    setTimeout(() => {
      perfTest.start(actions, this.store.dispatch)
    }, perfTest.startDelay)
  }

  initialRender() {
    this.getState()
    const listItems = Item(this.currentItems)
    this.el.innerHTML = `<ul>${listItems}</ul>`
  }

  render() {
    // NOTE: we are not considering a 
    // change in the number of items
    this.getState()
    itemUpdate(this.currentItems, this.prevItems)
    this.didUpdate()
  }

  didUpdate() {
    const { updatesRemaining } = this.getState()
    const noMoreTests = updatesRemaining === 0
    if (noMoreTests || !perfTest.isRunning()) {
      perfTest.end()
    } else {
      // pause while waiting for next frame, then resume
      perfTest.pause()
      raf(() => perfTest.resume())
    }
  }

  getState() {
    const storeState = this.store.getState()
    const data = storeState[this.storeKey]
    if (!_.isEmpty(this.currentItems)) {
      this.prevItems = _.cloneDeep(this.currentItems)
    }
    this.currentItems = data.data

    return data
  }
}
