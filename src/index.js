const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

// Resolver function
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        description: args.description,
        url: args.url,
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma },
});
server.start(() => console.log(`Server is runnning on http://localhost:4000`));
