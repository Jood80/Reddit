import { Resolver, Mutation, Arg, Ctx, Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from 'src/types';
import * as argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class ErrorField {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg('options') options: UsernamePasswordInput, @Ctx() ctx: MyContext) {
    console.log('helloo================');

    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'length must be greater than two letters',
          },
        ],
      };
    }
    if (options.password.length <= 8) {
      return {
        errors: [
          {
            field: 'password',
            message: 'length must be greater than two three digits',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = ctx.em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await ctx.em.persistAndFlush(user);
    } catch (err) {
      console.log('message:============= ', err);
      if (err.code === '23505' || err.detail.includes('already exists'))
        return {
          errors: [
            {
              field: 'username',
              message: 'username is already exists',
            },
          ],
        };
    }
    return { user };
  }

  @Mutation(() => User)
  async login(@Arg('options') options: UsernamePasswordInput, @Ctx() ctx: MyContext): Promise<UserResponse> {
    const user = await ctx.em.findOne(User, {
      username: options.username,
    });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "Oops! This username doesn't exist :/",
          },
        ],
      };
    }

    const verifiedPassword = await argon2.verify(user.password, options.password);
    if (!verifiedPassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'invalid login',
          },
        ],
      };
    }

    return {
      user,
    };
  }
}
