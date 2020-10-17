import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __production__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';

const main = async () => {
  //connect to db
  const orm = await MikroORM.init(mikroConfig);

  // run migration at first
  await orm.getMigrator().up();  

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver,PostResolver, UserResolver],
      validate: false
    }), 
    context: () => ({ em: orm.em})
  });

  //create a graphql endpoint on express
  apolloServer.applyMiddleware({app})

  app.listen(5000, () => {
    console.log('server has started on port 5000');
  })
};

main().catch((err) => {
  console.log(err);
});
