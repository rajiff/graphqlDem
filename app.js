const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./graphqlSchema');

const mongoConn = require('./mongoConnection')();

let app = express();

// Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

// app.use(compression());

// Setup bodyParsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Avoid frequent (spam) favicon request by sending no content status
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

// Mount the APIs specific to version
app.use('/api/v1', require('./api/v1'));

app.use('/', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: ((process.NODE_ENV !== 'production') ? true : false),
  /*rootValue: {},
  context: {},
  pretty: false,
  formatError: undefined*/
}));

module.exports = app;
