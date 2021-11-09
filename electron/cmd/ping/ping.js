/* eslint-disable no-console */
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const main = () => {
  return sleep(1000).then(() => {
    console.log(1);
    return main();
  });
};

main();
