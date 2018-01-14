const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const debug = require('debug')('app:db')

mongoose.Promise = Promise

mongoose.plugin(beautifyUnique)

mongoose.set('debug', process.env.MONGOOSE_DEBUG)

debug('Connecting')

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(() => debug('Connnected'))
  .catch(err => console.error(err.message))

module.exports = mongoose
