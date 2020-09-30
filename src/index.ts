import { MikroORM } from "@mikro-orm/core";
import { __production__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  //connect to db
  const orm = await MikroORM.init(mikroConfig);

  // run migration at first
  await orm.getMigrator().up();

  // run sql
  // const post = orm.em.create(Post, { title: "This is my new post" });

  // insert post into db
  // await orm.em.persistAndFlush(post);

  // await orm.em.nativeInsert(Post, { title: "This is my new post" });
  
  //get all posts
  const posts = await orm.em.find(Post, {});
  console.log("_________posts__________", posts);
};

main().catch((err) => {
  console.log(err);
});
