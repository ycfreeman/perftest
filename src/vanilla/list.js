// libs
import raf from 'raf'

// local
import crazyLog from '../crazyLog'
import perfTest from '../perfTest'
import * as actions from '../redux/actions'

// views
import Item from './item'

export default class List {

  constructor(options) {
    this.el = options.el
    this.store = options.store
    this.storeKey = 'myReducer'
    this.store.subscribe(this.render.bind(this))
  }

  start() {
    perfTest.start(this.testFn())
    this.render()
  }

  render() {
    const { data } = this.getState()
    const listItems = Item(data)
    this.el.innerHTML = `<ul>${listItems}</ul>`
    this.didUpdate()
  }

  didUpdate() {
    const { updatesRemaining } = this.getState()
    const noMoreTests = updatesRemaining === 0
    if (noMoreTests || !perfTest.isRunning()) {
      perfTest.end(crazyLog)
    } else {
      // pause while waiting for next frame, then resume
      perfTest.pause()
      raf(() => perfTest.resume())
    }
  }

  getState() {
    const storeState = this.store.getState()
    return storeState[this.storeKey]
  }

  testFn() {
    const { updateEverything, updateNothing, incAllInt, incNthInt } = actions
    const { dispatch } = this.store
    return {
      updateFn: () => dispatch(updateEverything()),
      fnParams: 10
    }
  }
}
