const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://admin:gestao2019@ds243607.mlab.com:43607/gestaovendas', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;