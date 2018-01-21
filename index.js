const debug = require('debug')('app:http')
const app = require('./app')

const server = app.listen(process.env.PORT)
server.on('listening', () => debug('listening on ' + server.address().port))
