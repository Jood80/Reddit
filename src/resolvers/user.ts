import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "src/types";
import * as argon2 from 'argon2'


@InputType()
class UsernamePasswordInput{
  @Field()
  username: string
  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() ctx: MyContext
  ) {
    const hashPassword = await argon2.hash(options.password)
    const user = ctx.em.create(User, {
      username: options.username,
      password: hashPassword
    })
    await ctx.em.persistAndFlush(user)
    return user
  }}