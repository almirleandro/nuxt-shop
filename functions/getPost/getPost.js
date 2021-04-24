const { ApolloServer, gql } = require("apollo-server-lambda");

const postAPI = require("./postAPI.js");
// example from: https://medium.com/yld-engineering-blog/easier-graphql-wrappers-for-your-rest-apis-1410b0b5446d

const typeDefs = gql`
  """
  Example Description for Name Type

  It's multiline and you can use **markdown**! [more docs](https://www.apollographql.com/docs/apollo-server/essentials/schema#documentation)!
  """
  type Post {
    title: String
    id: ID
    author: String
    content: String
  }
  type Query {
    """
    Example Description for getUser

    It's multiline and you can use **markdown**!
    """
    post(id: String): Post
  }
`;
const resolvers = {
  Query: {
    post: async (_, { id }, { dataSources }) => dataSources.postAPI.getUser(id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    postAPI: new postAPI()
  })
});

const handler = server.createHandler();

module.exports = { handler };
