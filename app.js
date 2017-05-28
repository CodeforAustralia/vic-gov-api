var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Load the YAML files into Javascript Objects
var yaml = require('js-yaml')
var fs = require('fs')
var path = require('path')

var orgs = yaml.safeLoad(fs.readFileSync(path.resolve('resources/orgs.yaml'), 'utf8'));

console.log(orgs)

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    org: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  org: () => {
    return orgs
  },
};

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
