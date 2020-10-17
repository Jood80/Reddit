import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __production__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  //connect to db
  const orm = await MikroORM.init(mikroConfig);

  // run migration at first
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }), 
    context: () => ({ em: orm.em})
  });

  //create a graphql endpoint on express
  apolloServer.applyMiddleware({app})

  app.listen(5000, () => {
    console.log('server has started on port 5000');
  })



  // run sql
  // const post = orm.em.create(Post, { title: "This is my new post" });

  // insert post into db
  // await orm.em.persistAndFlush(post);

  //get all posts
  // const posts = await orm.em.find(Post, {});
};

main().catch((err) => {
  console.log(err);
});
