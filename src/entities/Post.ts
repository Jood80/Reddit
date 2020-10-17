import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
//db tabel
@ObjectType()
@Entity()
export class Post {
  //add Field property so it may appear in our graphql query
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(()=> String)
  @Property({ type: "date"})
  createdAt = new Date();

  //Hook:onUpdate
  @Field(()=>String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" })
  title!: string;
}
