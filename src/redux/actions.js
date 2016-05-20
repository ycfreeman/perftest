// local
import random from '../random'
import perfTest from '../perfTest'

// helpers
const randomStr = () => {
  const minLen = 3
  const maxLen = random.int(3, 14)
  return random.str(minLen, maxLen)
}

// actions
export const updateEverything = () => {
  return {
    type: 'UPDATE_EVERYTHING',
    payload: random.list(perfTest.numberOfItems)
  }
}

export const updateNothing = () => {
  return {
    type: 'UPDATE_NOTHING'
  }
}

export const incAllInt = () => {
  return {
    type: 'INC_ALL_INT'
  }
}

export const incNthInt = (nthVal) => {
  return {
    type: 'INC_NTH_INT',
    payload: nthVal
  }
}
