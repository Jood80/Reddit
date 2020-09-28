import { MikroORM } from "@mikro-orm/core";
import { __production__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  console.log(orm.em);
  const post = orm.em.create(Post, { title: "This is my new post" });

  // instert post into db
  await orm.em.persistAndFlush(post);

  await orm.em.nativeInsert(Post, { title: "This is my new post" });
};

main().catch((err) => {
  console.log(err);
});
