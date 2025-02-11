'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require('type-graphql');
const Post_1 = require('../entities/Post');
let PostResolver = class PostResolver {
  posts(ctx) {
    return ctx.em.find(Post_1.Post, {});
  }
  post(id, ctx) {
    return ctx.em.findOne(Post_1.Post, { id });
  }
  createPost(title, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
      const post = ctx.em.create(Post_1.Post, { title });
      yield ctx.em.persistAndFlush(post);
      return post;
    });
  }
  updatePost(id, title, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
      const post = yield ctx.em.findOne(Post_1.Post, { id });
      if (!post) {
        return null;
      }
      if (typeof title !== 'undefined') {
        post.title = title;
        yield ctx.em.persistAndFlush(post);
      }
      return post;
    });
  }
  deletePost(id, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield ctx.em.nativeDelete(Post_1.Post, { id });
      } catch (_a) {
        return false;
      }
      return true;
    });
  }
};
__decorate(
  [
    type_graphql_1.Query(() => [Post_1.Post]),
    __param(0, type_graphql_1.Ctx()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  PostResolver.prototype,
  'posts',
  null,
);
__decorate(
  [
    type_graphql_1.Query(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, Object]),
    __metadata('design:returntype', Promise),
  ],
  PostResolver.prototype,
  'post',
  null,
);
__decorate(
  [
    type_graphql_1.Mutation(() => Post_1.Post),
    __param(0, type_graphql_1.Arg('title')),
    __param(1, type_graphql_1.Ctx()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', Promise),
  ],
  PostResolver.prototype,
  'createPost',
  null,
);
__decorate(
  [
    type_graphql_1.Mutation(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __param(
      1,
      type_graphql_1.Arg('title', () => String, { nullable: true }),
    ),
    __param(2, type_graphql_1.Ctx()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, String, Object]),
    __metadata('design:returntype', Promise),
  ],
  PostResolver.prototype,
  'updatePost',
  null,
);
__decorate(
  [
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, Object]),
    __metadata('design:returntype', Promise),
  ],
  PostResolver.prototype,
  'deletePost',
  null,
);
PostResolver = __decorate([type_graphql_1.Resolver()], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map
