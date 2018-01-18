const mongoose = require('mongoose');
const config = require('./config');

const setupMongooseConnections = function() {
  mongoose.Promise = global.Promise;

  // mongoose.set('debug', true);

  mongoose.connect(config.MONGO.MONGO_URL);
  // mongoose.connect("mongodb://dbuser:dbuser@ds245287.mlab.com:45287/samplemlab");

  mongoose.connection.on('connected', function() {
    console.log('Mongoose is now connected to ', config.MONGO.MONGO_URL);
  });

  mongoose.connection.on('error', function(err) {
    console.error('Error in Mongoose connection: ', err);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose is now disconnected..!');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose disconnected on process termination');
      process.exit(0);
    });
  });
}

module.exports = setupMongooseConnections;
