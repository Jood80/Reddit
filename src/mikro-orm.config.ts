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
  // clientUrl: "//localhost:8080",
}