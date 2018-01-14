require('dotenv').config()
const mongoose = require('../modules/mongoose')

mongoose.connection.on('connected', () => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.disconnect()
  })
})
