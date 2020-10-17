import { MikroORM } from "@mikro-orm/core";
import { __production__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from 'express'

const main = async () => {
  //connect to db
  const orm = await MikroORM.init(mikroConfig);

  // run migration at first
  await orm.getMigrator().up();

  const app = express();
  // by using _ instead of req, we are ignoring its variable
  app.get('/',(_, res)=>{
    res.send("hello here")
  })

  app.listen(5000,()=>{
    console.log('server has started on port 5000');
    
  } )

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
