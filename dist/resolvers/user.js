'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
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
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UserResolver = void 0;
const type_graphql_1 = require('type-graphql');
const User_1 = require('../entities/User');
const argon2 = __importStar(require('argon2'));
let UsernamePasswordInput = class UsernamePasswordInput {};
__decorate(
  [type_graphql_1.Field(), __metadata('design:type', String)],
  UsernamePasswordInput.prototype,
  'username',
  void 0,
);
__decorate(
  [type_graphql_1.Field(), __metadata('design:type', String)],
  UsernamePasswordInput.prototype,
  'password',
  void 0,
);
UsernamePasswordInput = __decorate([type_graphql_1.InputType()], UsernamePasswordInput);
let UserResolver = class UserResolver {
  register(options, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
      const hashPassword = yield argon2.hash(options.password);
      const user = ctx.em.create(User_1.User, {
        username: options.username,
        password: hashPassword,
      });
      yield ctx.em.persistAndFlush(user);
      return user;
    });
  }
};
__decorate(
  [
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Ctx()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [UsernamePasswordInput, Object]),
    __metadata('design:returntype', Promise),
  ],
  UserResolver.prototype,
  'register',
  null,
);
UserResolver = __decorate([type_graphql_1.Resolver()], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map
