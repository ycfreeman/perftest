// libs
import _ from 'lodash'

// performance tester
export default (() => {

  const numberOfItems = 100
  const numberOfUpdates = 100

  let times = {
    start: 0,
    end: 0,
    pause: 0,
    pauseTotal: 0
  }
  let perfTestFn = () => {}
  let perfTestParams = 0

  const startTimer = () => times.start = performance.now()
  const endTimer = () => times.end = performance.now()
  const pauseTimer = () => times.pause = performance.now()
  const resumeTimer = () => times.pauseTotal += performance.now() - times.pause
  const totalTime = () => times.end - times.start - times.pauseTotal
  const avgTime = () => totalTime() / numberOfUpdates
  const summary = () => `${Math.floor(avgTime())}ms per update`
  const resetTimer = () => _.map(times, (val, key) => times[key] = 0)
  const testIsRunning = () => times.start !== 0

  const start = ({ updateFn, fnParams }) => {
    if (_.isFunction(updateFn)) {
      perfTestFn = updateFn
    }
    perfTestParams = fnParams
    startTimer()
    perfTestFn(perfTestParams)
  }

  const end = (logger) => {
    if (testIsRunning()) {
      const message = summary(endTimer())
      resetTimer()
      if (_.isFunction(logger)) {
        logger(message)
      } else {
        console.log(message)
      }
    }
  }

  const pause = () => pauseTimer()
  const resume = () => {
    resumeTimer()
    perfTestFn(perfTestParams)
  }

  return {
    start,
    end,
    pause,
    resume,
    isRunning: testIsRunning,
    numberOfItems,
    numberOfUpdates
  }
})()
