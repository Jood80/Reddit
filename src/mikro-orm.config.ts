import { __production__ } from "./constants";
import { Post } from "./entities/Post";

export default {
  entities: [Post],
  dbName: "lireddit",
  type: "postgresql",
  user: "inspiron",
  password: "123",
  debug: !__production__,
  baseDir: __dirname,
} as const;

// as const fixxed the type import issue in index.ts for mikroConfig variable
