import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "src/types";

@Resolver()
export class PostResolver {
  // what inside the Query () is graqhql type
  // Query: is for getting data
  @Query(() => [Post])

  // what outside the posts Query returns a ts promise type since ".find" will return a promise
  posts(@Ctx() ctx: MyContext): Promise<Post[]>{
    return ctx.em.find(Post, {});
  }

  @Query(() => Post,{nullable:true} )
  post(
    @Arg('id', () => Int) id: number,
    @Ctx() ctx: MyContext): Promise<Post| null>{
     return ctx.em.findOne(Post, {id});
  }
  // Mutation: is for update, insert, delete data
  @Mutation(() => Post)
  async createPost(
    @Arg('title', () => String) title: string,
    @Ctx() ctx: MyContext): Promise<Post>{
      const post = ctx.em.create(Post, {title})
      await ctx.em.persistAndFlush(post)
     return post
  }
}  