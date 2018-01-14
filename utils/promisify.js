module.exports = (func, ctx) => (...args) =>
  new Promise((resolve, reject) => func.call(ctx, ...args, (err, data) => {
    if (err) reject(err)
    resolve(data)
  }))
