import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
//db tabel
@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  //Hook:onUpdate
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  title!: string;
}
