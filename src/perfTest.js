// libs
import _ from 'lodash'

// local
import { crazyLog, superCrazyLog } from './crazyLog'

// performance tester
export default (() => {

  const numberOfItems = 100
  const numberOfUpdates = 300
  const startDelay = 0

  let times = {
    start: 0,
    end: 0,
    pause: 0,
    pauseTotal: 0
  }
  let perfTestFn = () => {}
  let testParams = 0

  const startTimer = () => times.start = performance.now()
  const endTimer = () => times.end = performance.now()
  const pauseTimer = () => times.pause = performance.now()
  const resumeTimer = () => times.pauseTotal += performance.now() - times.pause
  const totalTime = () => times.end - times.start - times.pauseTotal
  const avgTime = () => totalTime() / numberOfUpdates
  const summary = () => `${Math.floor(avgTime())}ms per update`
  const resetTimer = () => _.map(times, (val, key) => times[key] = 0)
  const testIsRunning = () => times.start !== 0

  const start = (actions, dispatch) => {
    const { updateEverything, updateNothing, incAllInt, incNthInt } = actions
    perfTestFn = () => dispatch(incAllInt())
    testParams = 10
    startTimer()
    perfTestFn(testParams)
  }

  const end = () => {
    if (testIsRunning()) {
      endTimer()
      if (avgTime() < 17) {
        superCrazyLog(summary())
      } else {
        crazyLog(summary())
      }
      resetTimer()
    }
  }

  const pause = () => pauseTimer()
  const resume = () => {
    resumeTimer()
    perfTestFn(testParams)
  }

  return {
    start,
    end,
    pause,
    resume,
    isRunning: testIsRunning,
    numberOfItems,
    numberOfUpdates,
    startDelay
  }
})()
