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
    @Arg('id') id: number,
    @Ctx() ctx: MyContext): Promise<Post| null>{
     return ctx.em.findOne(Post, {id});
  }
  // Mutation: is for update, insert, delete data
  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Ctx() ctx: MyContext): Promise<Post>{
      const post = ctx.em.create(Post, {title})
      await ctx.em.persistAndFlush(post)
      return post
  }

  @Mutation(() => Post, {nullable:true})
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", ()=>String,{nullable:true}) title: string,
    @Ctx() ctx: MyContext): Promise<Post | null> {
    
      const post = await ctx.em.findOne(Post, {id});
      if(!post){
        return null;
      }
      if(typeof title !== 'undefined'){
        post.title= title;
        await ctx.em.persistAndFlush(post)
      }
     return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() ctx: MyContext): Promise<boolean> {
    try{
      await ctx.em.nativeDelete(Post, {id});
    }
    catch{
      return false
    }    
   return true;
  }
}
//! Note: for the type of queries that's been declared in ts, there is no need to declare their types inside the query too as in line 18,25  