const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const debug = require('debug')('app:db')

mongoose.Promise = Promise

mongoose.plugin(beautifyUnique)

if (process.env.MONGOOSE_DEBUG === 'true') mongoose.set('debug', true)

debug('connecting')

mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:')) // eslint-disable-line
db.once('open', () => debug('connnected'))

module.exports = mongoose
