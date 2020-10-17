import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "src/types";

@Resolver()
export class PostResolver {
  //what inside the Query () is graqhql type
  @Query(() => [Post])

  //what outside the posts Query returns a ts promise type since ".find" will return a promise
  posts(@Ctx() ctx: MyContext): Promise<Post[]>{
    return ctx.em.find(Post, {});
  }

  @Query(() => Post,{nullable:true} )
  post(
    @Arg('id', () => Int) id: number,
    @Ctx() ctx: MyContext): Promise<Post| null>{
     return ctx.em.findOne(Post, {id});
  }

}