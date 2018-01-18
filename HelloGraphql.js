const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./graphqlSchema');
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

let app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'Hello from graphql';
        }
      }
    }
  })
});

// Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

// Setup bodyParsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount it at root, as this will be the only end point needed
app.use('/', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true
}));

app.listen(3000);
