// @flow

// ref: https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
// ref: https://thecodebarbarian.com/80-20-guide-to-express-error-handling

const asyncWrapper = (fn: (...args: *) => Promise<*>) => (...args: *) =>
  fn(...args).catch(args[2])
export default asyncWrapper
