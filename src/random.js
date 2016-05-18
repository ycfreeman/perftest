import _ from 'lodash'

const int = (min = 1, max = 2000) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const str = (min = 1, max = 7) => {
  const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const alphaLower = alphaUpper.toLowerCase()
  const possible = `${alphaUpper}${alphaLower}`
  let str = '';
  for (let i = min; i <= max; i++) {
    str += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return str
}

const list = (numOfItems = 10) => {
  return _.times(numOfItems, i => {
    return {
      id: i,
      str: str(3, int(3, 14)),
      int: int()
    }
  })
}

export default { int, str, list }