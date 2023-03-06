import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import * as resolvers from '../src/resolvers';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';

const app = express();

const prisma = new PrismaClient();
dotenv.config();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // @ts-ignore
  cacheControl: {
    defaultMaxAge: 0,
  },
  context: () => ({ prisma }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 4001 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4001${server.graphqlPath}`,
    ),
  );
}

startServer();
