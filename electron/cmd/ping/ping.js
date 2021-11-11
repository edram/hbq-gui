/* eslint-disable no-console */
const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

let count = 0

const main = () => {
  return sleep(1000).then(() => {
    console.log(Math.random() > 0.9 ? `小红书ID： ${count}` : count)
    count++
    return main()
  })
}

main()
