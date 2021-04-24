const { ApolloServer, gql } = require("apollo-server-lambda");

const postsAPI = require("./postsAPI.js");
// example from: https://medium.com/yld-engineering-blog/easier-graphql-wrappers-for-your-rest-apis-1410b0b5446d

const typeDefs = gql`
  """
  Example Description for Name Type

  It's multiline and you can use **markdown**! [more docs](https://www.apollographql.com/docs/apollo-server/essentials/schema#documentation)!
  """
  type BlogPost {
    title: String
    postId: ID
  }
  type AllPosts {
    blogPost: BlogPost
  }
  type Query {
    """
    Example Description for getUser

    It's multiline and you can use **markdown**!
    """
    allPosts: [AllPosts]
  }
`;
const resolvers = {
  Query: {
    allPosts: async (_, __, { dataSources }) => dataSources.postsAPI.getUser()
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    postsAPI: new postsAPI()
  })
});

const handler = server.createHandler();

module.exports = { handler };
