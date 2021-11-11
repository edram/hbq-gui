/* eslint-disable no-console */
const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

let count = 0

const main = () => {
  return sleep(100).then(() => {
    console.log(count)
    count++
    return main()
  })
}

main()
