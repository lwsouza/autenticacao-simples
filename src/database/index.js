const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://user:password@endereco/table', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
