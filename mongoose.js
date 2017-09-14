const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.Promise = Promise;
mongoose.plugin(beautifyUnique);
mongoose.set('debug', process.env.NODE_ENV === 'development');
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(
    () => null,
    err => console.error(err.message)
  );
