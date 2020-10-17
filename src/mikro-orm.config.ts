import { __production__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    //.ts$/ is only for ts, that way it's for js too
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "lireddit",
  type: "postgresql",
  user: "inspiron",
  password: "123",
  debug: !__production__,
} as Parameters<typeof MikroORM.init>[0];

// as const fixed the type import issue in index.ts for mikroConfig variable

// MikroOrm.init "fn" fixed the issue on none AutoComplete inside the exported object here after we added as const at the end.

//Note: Parameters return an Array
