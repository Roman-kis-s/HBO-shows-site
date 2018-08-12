const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/hbo-data', {useNewUrlParser: true});

module.exports.User = require('./user');
module.exports.Show = require('./show');
module.exports.Season = require('./season');
module.exports.Episode = require('./episode');



