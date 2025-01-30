
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Menu
 * 
 */
export type Menu = $Result.DefaultSelection<Prisma.$MenuPayload>
/**
 * Model Position
 * 
 */
export type Position = $Result.DefaultSelection<Prisma.$PositionPayload>
/**
 * Model AccessLevel
 * 
 */
export type AccessLevel = $Result.DefaultSelection<Prisma.$AccessLevelPayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>
/**
 * Model PositionOnInvitation
 * 
 */
export type PositionOnInvitation = $Result.DefaultSelection<Prisma.$PositionOnInvitationPayload>
/**
 * Model InvitationAccess
 * 
 */
export type InvitationAccess = $Result.DefaultSelection<Prisma.$InvitationAccessPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PositionOnUser
 * 
 */
export type PositionOnUser = $Result.DefaultSelection<Prisma.$PositionOnUserPayload>
/**
 * Model UserAccess
 * 
 */
export type UserAccess = $Result.DefaultSelection<Prisma.$UserAccessPayload>
/**
 * Model UserLoginHistory
 * 
 */
export type UserLoginHistory = $Result.DefaultSelection<Prisma.$UserLoginHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Menus
 * const menus = await prisma.menu.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Menus
   * const menus = await prisma.menu.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.menu`: Exposes CRUD operations for the **Menu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Menus
    * const menus = await prisma.menu.findMany()
    * ```
    */
  get menu(): Prisma.MenuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.position`: Exposes CRUD operations for the **Position** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Positions
    * const positions = await prisma.position.findMany()
    * ```
    */
  get position(): Prisma.PositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessLevel`: Exposes CRUD operations for the **AccessLevel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessLevels
    * const accessLevels = await prisma.accessLevel.findMany()
    * ```
    */
  get accessLevel(): Prisma.AccessLevelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.positionOnInvitation`: Exposes CRUD operations for the **PositionOnInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PositionOnInvitations
    * const positionOnInvitations = await prisma.positionOnInvitation.findMany()
    * ```
    */
  get positionOnInvitation(): Prisma.PositionOnInvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitationAccess`: Exposes CRUD operations for the **InvitationAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvitationAccesses
    * const invitationAccesses = await prisma.invitationAccess.findMany()
    * ```
    */
  get invitationAccess(): Prisma.InvitationAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.positionOnUser`: Exposes CRUD operations for the **PositionOnUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PositionOnUsers
    * const positionOnUsers = await prisma.positionOnUser.findMany()
    * ```
    */
  get positionOnUser(): Prisma.PositionOnUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAccess`: Exposes CRUD operations for the **UserAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAccesses
    * const userAccesses = await prisma.userAccess.findMany()
    * ```
    */
  get userAccess(): Prisma.UserAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userLoginHistory`: Exposes CRUD operations for the **UserLoginHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLoginHistories
    * const userLoginHistories = await prisma.userLoginHistory.findMany()
    * ```
    */
  get userLoginHistory(): Prisma.UserLoginHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.3.0
   * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Menu: 'Menu',
    Position: 'Position',
    AccessLevel: 'AccessLevel',
    Invitation: 'Invitation',
    PositionOnInvitation: 'PositionOnInvitation',
    InvitationAccess: 'InvitationAccess',
    User: 'User',
    PositionOnUser: 'PositionOnUser',
    UserAccess: 'UserAccess',
    UserLoginHistory: 'UserLoginHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "menu" | "position" | "accessLevel" | "invitation" | "positionOnInvitation" | "invitationAccess" | "user" | "positionOnUser" | "userAccess" | "userLoginHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Menu: {
        payload: Prisma.$MenuPayload<ExtArgs>
        fields: Prisma.MenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findFirst: {
            args: Prisma.MenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findMany: {
            args: Prisma.MenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          create: {
            args: Prisma.MenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          createMany: {
            args: Prisma.MenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          delete: {
            args: Prisma.MenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          update: {
            args: Prisma.MenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          deleteMany: {
            args: Prisma.MenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          aggregate: {
            args: Prisma.MenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenu>
          }
          groupBy: {
            args: Prisma.MenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuCountArgs<ExtArgs>
            result: $Utils.Optional<MenuCountAggregateOutputType> | number
          }
        }
      }
      Position: {
        payload: Prisma.$PositionPayload<ExtArgs>
        fields: Prisma.PositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findFirst: {
            args: Prisma.PositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findMany: {
            args: Prisma.PositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          create: {
            args: Prisma.PositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          createMany: {
            args: Prisma.PositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          delete: {
            args: Prisma.PositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          update: {
            args: Prisma.PositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          deleteMany: {
            args: Prisma.PositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          aggregate: {
            args: Prisma.PositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosition>
          }
          groupBy: {
            args: Prisma.PositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionCountArgs<ExtArgs>
            result: $Utils.Optional<PositionCountAggregateOutputType> | number
          }
        }
      }
      AccessLevel: {
        payload: Prisma.$AccessLevelPayload<ExtArgs>
        fields: Prisma.AccessLevelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessLevelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessLevelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>
          }
          findFirst: {
            args: Prisma.AccessLevelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessLevelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>
          }
          findMany: {
            args: Prisma.AccessLevelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>[]
          }
          create: {
            args: Prisma.AccessLevelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>
          }
          createMany: {
            args: Prisma.AccessLevelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessLevelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>[]
          }
          delete: {
            args: Prisma.AccessLevelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>
          }
          update: {
            args: Prisma.AccessLevelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>
          }
          deleteMany: {
            args: Prisma.AccessLevelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessLevelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccessLevelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLevelPayload>
          }
          aggregate: {
            args: Prisma.AccessLevelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessLevel>
          }
          groupBy: {
            args: Prisma.AccessLevelGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessLevelGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessLevelCountArgs<ExtArgs>
            result: $Utils.Optional<AccessLevelCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      PositionOnInvitation: {
        payload: Prisma.$PositionOnInvitationPayload<ExtArgs>
        fields: Prisma.PositionOnInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionOnInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionOnInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>
          }
          findFirst: {
            args: Prisma.PositionOnInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionOnInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>
          }
          findMany: {
            args: Prisma.PositionOnInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>[]
          }
          create: {
            args: Prisma.PositionOnInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>
          }
          createMany: {
            args: Prisma.PositionOnInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionOnInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>[]
          }
          delete: {
            args: Prisma.PositionOnInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>
          }
          update: {
            args: Prisma.PositionOnInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>
          }
          deleteMany: {
            args: Prisma.PositionOnInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionOnInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PositionOnInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnInvitationPayload>
          }
          aggregate: {
            args: Prisma.PositionOnInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePositionOnInvitation>
          }
          groupBy: {
            args: Prisma.PositionOnInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionOnInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionOnInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<PositionOnInvitationCountAggregateOutputType> | number
          }
        }
      }
      InvitationAccess: {
        payload: Prisma.$InvitationAccessPayload<ExtArgs>
        fields: Prisma.InvitationAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>
          }
          findFirst: {
            args: Prisma.InvitationAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>
          }
          findMany: {
            args: Prisma.InvitationAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>[]
          }
          create: {
            args: Prisma.InvitationAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>
          }
          createMany: {
            args: Prisma.InvitationAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>[]
          }
          delete: {
            args: Prisma.InvitationAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>
          }
          update: {
            args: Prisma.InvitationAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>
          }
          deleteMany: {
            args: Prisma.InvitationAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationAccessPayload>
          }
          aggregate: {
            args: Prisma.InvitationAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitationAccess>
          }
          groupBy: {
            args: Prisma.InvitationAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationAccessCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationAccessCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PositionOnUser: {
        payload: Prisma.$PositionOnUserPayload<ExtArgs>
        fields: Prisma.PositionOnUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionOnUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionOnUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>
          }
          findFirst: {
            args: Prisma.PositionOnUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionOnUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>
          }
          findMany: {
            args: Prisma.PositionOnUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>[]
          }
          create: {
            args: Prisma.PositionOnUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>
          }
          createMany: {
            args: Prisma.PositionOnUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionOnUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>[]
          }
          delete: {
            args: Prisma.PositionOnUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>
          }
          update: {
            args: Prisma.PositionOnUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>
          }
          deleteMany: {
            args: Prisma.PositionOnUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionOnUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PositionOnUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionOnUserPayload>
          }
          aggregate: {
            args: Prisma.PositionOnUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePositionOnUser>
          }
          groupBy: {
            args: Prisma.PositionOnUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionOnUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionOnUserCountArgs<ExtArgs>
            result: $Utils.Optional<PositionOnUserCountAggregateOutputType> | number
          }
        }
      }
      UserAccess: {
        payload: Prisma.$UserAccessPayload<ExtArgs>
        fields: Prisma.UserAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>
          }
          findFirst: {
            args: Prisma.UserAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>
          }
          findMany: {
            args: Prisma.UserAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>[]
          }
          create: {
            args: Prisma.UserAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>
          }
          createMany: {
            args: Prisma.UserAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>[]
          }
          delete: {
            args: Prisma.UserAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>
          }
          update: {
            args: Prisma.UserAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>
          }
          deleteMany: {
            args: Prisma.UserAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccessPayload>
          }
          aggregate: {
            args: Prisma.UserAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAccess>
          }
          groupBy: {
            args: Prisma.UserAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAccessCountArgs<ExtArgs>
            result: $Utils.Optional<UserAccessCountAggregateOutputType> | number
          }
        }
      }
      UserLoginHistory: {
        payload: Prisma.$UserLoginHistoryPayload<ExtArgs>
        fields: Prisma.UserLoginHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserLoginHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserLoginHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>
          }
          findFirst: {
            args: Prisma.UserLoginHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserLoginHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>
          }
          findMany: {
            args: Prisma.UserLoginHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>[]
          }
          create: {
            args: Prisma.UserLoginHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>
          }
          createMany: {
            args: Prisma.UserLoginHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserLoginHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>[]
          }
          delete: {
            args: Prisma.UserLoginHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>
          }
          update: {
            args: Prisma.UserLoginHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>
          }
          deleteMany: {
            args: Prisma.UserLoginHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserLoginHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserLoginHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLoginHistoryPayload>
          }
          aggregate: {
            args: Prisma.UserLoginHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserLoginHistory>
          }
          groupBy: {
            args: Prisma.UserLoginHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserLoginHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserLoginHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<UserLoginHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    menu?: MenuOmit
    position?: PositionOmit
    accessLevel?: AccessLevelOmit
    invitation?: InvitationOmit
    positionOnInvitation?: PositionOnInvitationOmit
    invitationAccess?: InvitationAccessOmit
    user?: UserOmit
    positionOnUser?: PositionOnUserOmit
    userAccess?: UserAccessOmit
    userLoginHistory?: UserLoginHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MenuCountOutputType
   */

  export type MenuCountOutputType = {
    AccessLevel: number
    invitationAccess: number
    children: number
    userAccess: number
  }

  export type MenuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    AccessLevel?: boolean | MenuCountOutputTypeCountAccessLevelArgs
    invitationAccess?: boolean | MenuCountOutputTypeCountInvitationAccessArgs
    children?: boolean | MenuCountOutputTypeCountChildrenArgs
    userAccess?: boolean | MenuCountOutputTypeCountUserAccessArgs
  }

  // Custom InputTypes
  /**
   * MenuCountOutputType without action
   */
  export type MenuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCountOutputType
     */
    select?: MenuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MenuCountOutputType without action
   */
  export type MenuCountOutputTypeCountAccessLevelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessLevelWhereInput
  }

  /**
   * MenuCountOutputType without action
   */
  export type MenuCountOutputTypeCountInvitationAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationAccessWhereInput
  }

  /**
   * MenuCountOutputType without action
   */
  export type MenuCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
  }

  /**
   * MenuCountOutputType without action
   */
  export type MenuCountOutputTypeCountUserAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccessWhereInput
  }


  /**
   * Count Type PositionCountOutputType
   */

  export type PositionCountOutputType = {
    accessLevels: number
    invitations: number
    users: number
  }

  export type PositionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLevels?: boolean | PositionCountOutputTypeCountAccessLevelsArgs
    invitations?: boolean | PositionCountOutputTypeCountInvitationsArgs
    users?: boolean | PositionCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionCountOutputType
     */
    select?: PositionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeCountAccessLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessLevelWhereInput
  }

  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionOnInvitationWhereInput
  }

  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionOnUserWhereInput
  }


  /**
   * Count Type InvitationCountOutputType
   */

  export type InvitationCountOutputType = {
    accessLevels: number
    positions: number
  }

  export type InvitationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLevels?: boolean | InvitationCountOutputTypeCountAccessLevelsArgs
    positions?: boolean | InvitationCountOutputTypeCountPositionsArgs
  }

  // Custom InputTypes
  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCountOutputType
     */
    select?: InvitationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeCountAccessLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationAccessWhereInput
  }

  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionOnInvitationWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    positions: number
    accessLevels: number
    loginHistories: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | UserCountOutputTypeCountPositionsArgs
    accessLevels?: boolean | UserCountOutputTypeCountAccessLevelsArgs
    loginHistories?: boolean | UserCountOutputTypeCountLoginHistoriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionOnUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccessLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccessWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLoginHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLoginHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Menu
   */

  export type AggregateMenu = {
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  export type MenuAvgAggregateOutputType = {
    id: number | null
    parentId: number | null
  }

  export type MenuSumAggregateOutputType = {
    id: number | null
    parentId: number | null
  }

  export type MenuMinAggregateOutputType = {
    id: number | null
    title: string | null
    title_fa: string | null
    active: boolean | null
    general: boolean | null
    slug: string | null
    parentId: number | null
  }

  export type MenuMaxAggregateOutputType = {
    id: number | null
    title: string | null
    title_fa: string | null
    active: boolean | null
    general: boolean | null
    slug: string | null
    parentId: number | null
  }

  export type MenuCountAggregateOutputType = {
    id: number
    title: number
    title_fa: number
    active: number
    general: number
    slug: number
    parentId: number
    _all: number
  }


  export type MenuAvgAggregateInputType = {
    id?: true
    parentId?: true
  }

  export type MenuSumAggregateInputType = {
    id?: true
    parentId?: true
  }

  export type MenuMinAggregateInputType = {
    id?: true
    title?: true
    title_fa?: true
    active?: true
    general?: true
    slug?: true
    parentId?: true
  }

  export type MenuMaxAggregateInputType = {
    id?: true
    title?: true
    title_fa?: true
    active?: true
    general?: true
    slug?: true
    parentId?: true
  }

  export type MenuCountAggregateInputType = {
    id?: true
    title?: true
    title_fa?: true
    active?: true
    general?: true
    slug?: true
    parentId?: true
    _all?: true
  }

  export type MenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menu to aggregate.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Menus
    **/
    _count?: true | MenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuMaxAggregateInputType
  }

  export type GetMenuAggregateType<T extends MenuAggregateArgs> = {
        [P in keyof T & keyof AggregateMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenu[P]>
      : GetScalarType<T[P], AggregateMenu[P]>
  }




  export type MenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithAggregationInput | MenuOrderByWithAggregationInput[]
    by: MenuScalarFieldEnum[] | MenuScalarFieldEnum
    having?: MenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuCountAggregateInputType | true
    _avg?: MenuAvgAggregateInputType
    _sum?: MenuSumAggregateInputType
    _min?: MenuMinAggregateInputType
    _max?: MenuMaxAggregateInputType
  }

  export type MenuGroupByOutputType = {
    id: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    parentId: number | null
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  type GetMenuGroupByPayload<T extends MenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuGroupByOutputType[P]>
            : GetScalarType<T[P], MenuGroupByOutputType[P]>
        }
      >
    >


  export type MenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    title_fa?: boolean
    active?: boolean
    general?: boolean
    slug?: boolean
    parentId?: boolean
    AccessLevel?: boolean | Menu$AccessLevelArgs<ExtArgs>
    invitationAccess?: boolean | Menu$invitationAccessArgs<ExtArgs>
    parent?: boolean | Menu$parentArgs<ExtArgs>
    children?: boolean | Menu$childrenArgs<ExtArgs>
    userAccess?: boolean | Menu$userAccessArgs<ExtArgs>
    _count?: boolean | MenuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    title_fa?: boolean
    active?: boolean
    general?: boolean
    slug?: boolean
    parentId?: boolean
    parent?: boolean | Menu$parentArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>


  export type MenuSelectScalar = {
    id?: boolean
    title?: boolean
    title_fa?: boolean
    active?: boolean
    general?: boolean
    slug?: boolean
    parentId?: boolean
  }

  export type MenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "title_fa" | "active" | "general" | "slug" | "parentId", ExtArgs["result"]["menu"]>
  export type MenuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    AccessLevel?: boolean | Menu$AccessLevelArgs<ExtArgs>
    invitationAccess?: boolean | Menu$invitationAccessArgs<ExtArgs>
    parent?: boolean | Menu$parentArgs<ExtArgs>
    children?: boolean | Menu$childrenArgs<ExtArgs>
    userAccess?: boolean | Menu$userAccessArgs<ExtArgs>
    _count?: boolean | MenuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MenuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Menu$parentArgs<ExtArgs>
  }

  export type $MenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Menu"
    objects: {
      AccessLevel: Prisma.$AccessLevelPayload<ExtArgs>[]
      invitationAccess: Prisma.$InvitationAccessPayload<ExtArgs>[]
      parent: Prisma.$MenuPayload<ExtArgs> | null
      children: Prisma.$MenuPayload<ExtArgs>[]
      userAccess: Prisma.$UserAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      title_fa: string
      active: boolean
      general: boolean
      slug: string
      parentId: number | null
    }, ExtArgs["result"]["menu"]>
    composites: {}
  }

  type MenuGetPayload<S extends boolean | null | undefined | MenuDefaultArgs> = $Result.GetResult<Prisma.$MenuPayload, S>

  type MenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuCountAggregateInputType | true
    }

  export interface MenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Menu'], meta: { name: 'Menu' } }
    /**
     * Find zero or one Menu that matches the filter.
     * @param {MenuFindUniqueArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuFindUniqueArgs>(args: SelectSubset<T, MenuFindUniqueArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Menu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuFindUniqueOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Menu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuFindFirstArgs>(args?: SelectSubset<T, MenuFindFirstArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Menu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Menus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Menus
     * const menus = await prisma.menu.findMany()
     * 
     * // Get first 10 Menus
     * const menus = await prisma.menu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuWithIdOnly = await prisma.menu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuFindManyArgs>(args?: SelectSubset<T, MenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Menu.
     * @param {MenuCreateArgs} args - Arguments to create a Menu.
     * @example
     * // Create one Menu
     * const Menu = await prisma.menu.create({
     *   data: {
     *     // ... data to create a Menu
     *   }
     * })
     * 
     */
    create<T extends MenuCreateArgs>(args: SelectSubset<T, MenuCreateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Menus.
     * @param {MenuCreateManyArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuCreateManyArgs>(args?: SelectSubset<T, MenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Menus and returns the data saved in the database.
     * @param {MenuCreateManyAndReturnArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Menus and only return the `id`
     * const menuWithIdOnly = await prisma.menu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Menu.
     * @param {MenuDeleteArgs} args - Arguments to delete one Menu.
     * @example
     * // Delete one Menu
     * const Menu = await prisma.menu.delete({
     *   where: {
     *     // ... filter to delete one Menu
     *   }
     * })
     * 
     */
    delete<T extends MenuDeleteArgs>(args: SelectSubset<T, MenuDeleteArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Menu.
     * @param {MenuUpdateArgs} args - Arguments to update one Menu.
     * @example
     * // Update one Menu
     * const menu = await prisma.menu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuUpdateArgs>(args: SelectSubset<T, MenuUpdateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Menus.
     * @param {MenuDeleteManyArgs} args - Arguments to filter Menus to delete.
     * @example
     * // Delete a few Menus
     * const { count } = await prisma.menu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuDeleteManyArgs>(args?: SelectSubset<T, MenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuUpdateManyArgs>(args: SelectSubset<T, MenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Menu.
     * @param {MenuUpsertArgs} args - Arguments to update or create a Menu.
     * @example
     * // Update or create a Menu
     * const menu = await prisma.menu.upsert({
     *   create: {
     *     // ... data to create a Menu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Menu we want to update
     *   }
     * })
     */
    upsert<T extends MenuUpsertArgs>(args: SelectSubset<T, MenuUpsertArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCountArgs} args - Arguments to filter Menus to count.
     * @example
     * // Count the number of Menus
     * const count = await prisma.menu.count({
     *   where: {
     *     // ... the filter for the Menus we want to count
     *   }
     * })
    **/
    count<T extends MenuCountArgs>(
      args?: Subset<T, MenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuAggregateArgs>(args: Subset<T, MenuAggregateArgs>): Prisma.PrismaPromise<GetMenuAggregateType<T>>

    /**
     * Group by Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuGroupByArgs['orderBy'] }
        : { orderBy?: MenuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Menu model
   */
  readonly fields: MenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Menu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    AccessLevel<T extends Menu$AccessLevelArgs<ExtArgs> = {}>(args?: Subset<T, Menu$AccessLevelArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    invitationAccess<T extends Menu$invitationAccessArgs<ExtArgs> = {}>(args?: Subset<T, Menu$invitationAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    parent<T extends Menu$parentArgs<ExtArgs> = {}>(args?: Subset<T, Menu$parentArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    children<T extends Menu$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Menu$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    userAccess<T extends Menu$userAccessArgs<ExtArgs> = {}>(args?: Subset<T, Menu$userAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Menu model
   */ 
  interface MenuFieldRefs {
    readonly id: FieldRef<"Menu", 'Int'>
    readonly title: FieldRef<"Menu", 'String'>
    readonly title_fa: FieldRef<"Menu", 'String'>
    readonly active: FieldRef<"Menu", 'Boolean'>
    readonly general: FieldRef<"Menu", 'Boolean'>
    readonly slug: FieldRef<"Menu", 'String'>
    readonly parentId: FieldRef<"Menu", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Menu findUnique
   */
  export type MenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findUniqueOrThrow
   */
  export type MenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findFirst
   */
  export type MenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findFirstOrThrow
   */
  export type MenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findMany
   */
  export type MenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menus to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu create
   */
  export type MenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The data needed to create a Menu.
     */
    data: XOR<MenuCreateInput, MenuUncheckedCreateInput>
  }

  /**
   * Menu createMany
   */
  export type MenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
  }

  /**
   * Menu createManyAndReturn
   */
  export type MenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Menu update
   */
  export type MenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The data needed to update a Menu.
     */
    data: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
    /**
     * Choose, which Menu to update.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu updateMany
   */
  export type MenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Menus.
     */
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyInput>
    /**
     * Filter which Menus to update
     */
    where?: MenuWhereInput
  }

  /**
   * Menu upsert
   */
  export type MenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The filter to search for the Menu to update in case it exists.
     */
    where: MenuWhereUniqueInput
    /**
     * In case the Menu found by the `where` argument doesn't exist, create a new Menu with this data.
     */
    create: XOR<MenuCreateInput, MenuUncheckedCreateInput>
    /**
     * In case the Menu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
  }

  /**
   * Menu delete
   */
  export type MenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter which Menu to delete.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu deleteMany
   */
  export type MenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menus to delete
     */
    where?: MenuWhereInput
  }

  /**
   * Menu.AccessLevel
   */
  export type Menu$AccessLevelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    where?: AccessLevelWhereInput
    orderBy?: AccessLevelOrderByWithRelationInput | AccessLevelOrderByWithRelationInput[]
    cursor?: AccessLevelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessLevelScalarFieldEnum | AccessLevelScalarFieldEnum[]
  }

  /**
   * Menu.invitationAccess
   */
  export type Menu$invitationAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    where?: InvitationAccessWhereInput
    orderBy?: InvitationAccessOrderByWithRelationInput | InvitationAccessOrderByWithRelationInput[]
    cursor?: InvitationAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationAccessScalarFieldEnum | InvitationAccessScalarFieldEnum[]
  }

  /**
   * Menu.parent
   */
  export type Menu$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    where?: MenuWhereInput
  }

  /**
   * Menu.children
   */
  export type Menu$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    cursor?: MenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu.userAccess
   */
  export type Menu$userAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    where?: UserAccessWhereInput
    orderBy?: UserAccessOrderByWithRelationInput | UserAccessOrderByWithRelationInput[]
    cursor?: UserAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAccessScalarFieldEnum | UserAccessScalarFieldEnum[]
  }

  /**
   * Menu without action
   */
  export type MenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
  }


  /**
   * Model Position
   */

  export type AggregatePosition = {
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  export type PositionAvgAggregateOutputType = {
    id: number | null
  }

  export type PositionSumAggregateOutputType = {
    id: number | null
  }

  export type PositionMinAggregateOutputType = {
    id: number | null
    title: string | null
    title_fa: string | null
    req_license: boolean | null
  }

  export type PositionMaxAggregateOutputType = {
    id: number | null
    title: string | null
    title_fa: string | null
    req_license: boolean | null
  }

  export type PositionCountAggregateOutputType = {
    id: number
    title: number
    title_fa: number
    req_license: number
    _all: number
  }


  export type PositionAvgAggregateInputType = {
    id?: true
  }

  export type PositionSumAggregateInputType = {
    id?: true
  }

  export type PositionMinAggregateInputType = {
    id?: true
    title?: true
    title_fa?: true
    req_license?: true
  }

  export type PositionMaxAggregateInputType = {
    id?: true
    title?: true
    title_fa?: true
    req_license?: true
  }

  export type PositionCountAggregateInputType = {
    id?: true
    title?: true
    title_fa?: true
    req_license?: true
    _all?: true
  }

  export type PositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Position to aggregate.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Positions
    **/
    _count?: true | PositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionMaxAggregateInputType
  }

  export type GetPositionAggregateType<T extends PositionAggregateArgs> = {
        [P in keyof T & keyof AggregatePosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosition[P]>
      : GetScalarType<T[P], AggregatePosition[P]>
  }




  export type PositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithAggregationInput | PositionOrderByWithAggregationInput[]
    by: PositionScalarFieldEnum[] | PositionScalarFieldEnum
    having?: PositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionCountAggregateInputType | true
    _avg?: PositionAvgAggregateInputType
    _sum?: PositionSumAggregateInputType
    _min?: PositionMinAggregateInputType
    _max?: PositionMaxAggregateInputType
  }

  export type PositionGroupByOutputType = {
    id: number
    title: string
    title_fa: string
    req_license: boolean
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  type GetPositionGroupByPayload<T extends PositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionGroupByOutputType[P]>
            : GetScalarType<T[P], PositionGroupByOutputType[P]>
        }
      >
    >


  export type PositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    title_fa?: boolean
    req_license?: boolean
    accessLevels?: boolean | Position$accessLevelsArgs<ExtArgs>
    invitations?: boolean | Position$invitationsArgs<ExtArgs>
    users?: boolean | Position$usersArgs<ExtArgs>
    _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    title_fa?: boolean
    req_license?: boolean
  }, ExtArgs["result"]["position"]>


  export type PositionSelectScalar = {
    id?: boolean
    title?: boolean
    title_fa?: boolean
    req_license?: boolean
  }

  export type PositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "title_fa" | "req_license", ExtArgs["result"]["position"]>
  export type PositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLevels?: boolean | Position$accessLevelsArgs<ExtArgs>
    invitations?: boolean | Position$invitationsArgs<ExtArgs>
    users?: boolean | Position$usersArgs<ExtArgs>
    _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Position"
    objects: {
      accessLevels: Prisma.$AccessLevelPayload<ExtArgs>[]
      invitations: Prisma.$PositionOnInvitationPayload<ExtArgs>[]
      users: Prisma.$PositionOnUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      title_fa: string
      req_license: boolean
    }, ExtArgs["result"]["position"]>
    composites: {}
  }

  type PositionGetPayload<S extends boolean | null | undefined | PositionDefaultArgs> = $Result.GetResult<Prisma.$PositionPayload, S>

  type PositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionCountAggregateInputType | true
    }

  export interface PositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Position'], meta: { name: 'Position' } }
    /**
     * Find zero or one Position that matches the filter.
     * @param {PositionFindUniqueArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionFindUniqueArgs>(args: SelectSubset<T, PositionFindUniqueArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Position that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionFindUniqueOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Position that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionFindFirstArgs>(args?: SelectSubset<T, PositionFindFirstArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Position that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Positions
     * const positions = await prisma.position.findMany()
     * 
     * // Get first 10 Positions
     * const positions = await prisma.position.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionWithIdOnly = await prisma.position.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionFindManyArgs>(args?: SelectSubset<T, PositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Position.
     * @param {PositionCreateArgs} args - Arguments to create a Position.
     * @example
     * // Create one Position
     * const Position = await prisma.position.create({
     *   data: {
     *     // ... data to create a Position
     *   }
     * })
     * 
     */
    create<T extends PositionCreateArgs>(args: SelectSubset<T, PositionCreateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Positions.
     * @param {PositionCreateManyArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionCreateManyArgs>(args?: SelectSubset<T, PositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Positions and returns the data saved in the database.
     * @param {PositionCreateManyAndReturnArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Position.
     * @param {PositionDeleteArgs} args - Arguments to delete one Position.
     * @example
     * // Delete one Position
     * const Position = await prisma.position.delete({
     *   where: {
     *     // ... filter to delete one Position
     *   }
     * })
     * 
     */
    delete<T extends PositionDeleteArgs>(args: SelectSubset<T, PositionDeleteArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Position.
     * @param {PositionUpdateArgs} args - Arguments to update one Position.
     * @example
     * // Update one Position
     * const position = await prisma.position.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionUpdateArgs>(args: SelectSubset<T, PositionUpdateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Positions.
     * @param {PositionDeleteManyArgs} args - Arguments to filter Positions to delete.
     * @example
     * // Delete a few Positions
     * const { count } = await prisma.position.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionDeleteManyArgs>(args?: SelectSubset<T, PositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionUpdateManyArgs>(args: SelectSubset<T, PositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Position.
     * @param {PositionUpsertArgs} args - Arguments to update or create a Position.
     * @example
     * // Update or create a Position
     * const position = await prisma.position.upsert({
     *   create: {
     *     // ... data to create a Position
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Position we want to update
     *   }
     * })
     */
    upsert<T extends PositionUpsertArgs>(args: SelectSubset<T, PositionUpsertArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionCountArgs} args - Arguments to filter Positions to count.
     * @example
     * // Count the number of Positions
     * const count = await prisma.position.count({
     *   where: {
     *     // ... the filter for the Positions we want to count
     *   }
     * })
    **/
    count<T extends PositionCountArgs>(
      args?: Subset<T, PositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PositionAggregateArgs>(args: Subset<T, PositionAggregateArgs>): Prisma.PrismaPromise<GetPositionAggregateType<T>>

    /**
     * Group by Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionGroupByArgs['orderBy'] }
        : { orderBy?: PositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Position model
   */
  readonly fields: PositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Position.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accessLevels<T extends Position$accessLevelsArgs<ExtArgs> = {}>(args?: Subset<T, Position$accessLevelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    invitations<T extends Position$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Position$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    users<T extends Position$usersArgs<ExtArgs> = {}>(args?: Subset<T, Position$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Position model
   */ 
  interface PositionFieldRefs {
    readonly id: FieldRef<"Position", 'Int'>
    readonly title: FieldRef<"Position", 'String'>
    readonly title_fa: FieldRef<"Position", 'String'>
    readonly req_license: FieldRef<"Position", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Position findUnique
   */
  export type PositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findUniqueOrThrow
   */
  export type PositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findFirst
   */
  export type PositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findFirstOrThrow
   */
  export type PositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findMany
   */
  export type PositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Positions to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position create
   */
  export type PositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to create a Position.
     */
    data: XOR<PositionCreateInput, PositionUncheckedCreateInput>
  }

  /**
   * Position createMany
   */
  export type PositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
  }

  /**
   * Position createManyAndReturn
   */
  export type PositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
  }

  /**
   * Position update
   */
  export type PositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to update a Position.
     */
    data: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
    /**
     * Choose, which Position to update.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position updateMany
   */
  export type PositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
  }

  /**
   * Position upsert
   */
  export type PositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The filter to search for the Position to update in case it exists.
     */
    where: PositionWhereUniqueInput
    /**
     * In case the Position found by the `where` argument doesn't exist, create a new Position with this data.
     */
    create: XOR<PositionCreateInput, PositionUncheckedCreateInput>
    /**
     * In case the Position was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
  }

  /**
   * Position delete
   */
  export type PositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter which Position to delete.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position deleteMany
   */
  export type PositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Positions to delete
     */
    where?: PositionWhereInput
  }

  /**
   * Position.accessLevels
   */
  export type Position$accessLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    where?: AccessLevelWhereInput
    orderBy?: AccessLevelOrderByWithRelationInput | AccessLevelOrderByWithRelationInput[]
    cursor?: AccessLevelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessLevelScalarFieldEnum | AccessLevelScalarFieldEnum[]
  }

  /**
   * Position.invitations
   */
  export type Position$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    where?: PositionOnInvitationWhereInput
    orderBy?: PositionOnInvitationOrderByWithRelationInput | PositionOnInvitationOrderByWithRelationInput[]
    cursor?: PositionOnInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionOnInvitationScalarFieldEnum | PositionOnInvitationScalarFieldEnum[]
  }

  /**
   * Position.users
   */
  export type Position$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    where?: PositionOnUserWhereInput
    orderBy?: PositionOnUserOrderByWithRelationInput | PositionOnUserOrderByWithRelationInput[]
    cursor?: PositionOnUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionOnUserScalarFieldEnum | PositionOnUserScalarFieldEnum[]
  }

  /**
   * Position without action
   */
  export type PositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
  }


  /**
   * Model AccessLevel
   */

  export type AggregateAccessLevel = {
    _count: AccessLevelCountAggregateOutputType | null
    _avg: AccessLevelAvgAggregateOutputType | null
    _sum: AccessLevelSumAggregateOutputType | null
    _min: AccessLevelMinAggregateOutputType | null
    _max: AccessLevelMaxAggregateOutputType | null
  }

  export type AccessLevelAvgAggregateOutputType = {
    id: number | null
    positionId: number | null
    menuId: number | null
  }

  export type AccessLevelSumAggregateOutputType = {
    id: number | null
    positionId: number | null
    menuId: number | null
  }

  export type AccessLevelMinAggregateOutputType = {
    id: number | null
    positionId: number | null
    menuId: number | null
    hasAccess: boolean | null
  }

  export type AccessLevelMaxAggregateOutputType = {
    id: number | null
    positionId: number | null
    menuId: number | null
    hasAccess: boolean | null
  }

  export type AccessLevelCountAggregateOutputType = {
    id: number
    positionId: number
    menuId: number
    hasAccess: number
    _all: number
  }


  export type AccessLevelAvgAggregateInputType = {
    id?: true
    positionId?: true
    menuId?: true
  }

  export type AccessLevelSumAggregateInputType = {
    id?: true
    positionId?: true
    menuId?: true
  }

  export type AccessLevelMinAggregateInputType = {
    id?: true
    positionId?: true
    menuId?: true
    hasAccess?: true
  }

  export type AccessLevelMaxAggregateInputType = {
    id?: true
    positionId?: true
    menuId?: true
    hasAccess?: true
  }

  export type AccessLevelCountAggregateInputType = {
    id?: true
    positionId?: true
    menuId?: true
    hasAccess?: true
    _all?: true
  }

  export type AccessLevelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessLevel to aggregate.
     */
    where?: AccessLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLevels to fetch.
     */
    orderBy?: AccessLevelOrderByWithRelationInput | AccessLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessLevels
    **/
    _count?: true | AccessLevelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccessLevelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccessLevelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessLevelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessLevelMaxAggregateInputType
  }

  export type GetAccessLevelAggregateType<T extends AccessLevelAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessLevel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessLevel[P]>
      : GetScalarType<T[P], AggregateAccessLevel[P]>
  }




  export type AccessLevelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessLevelWhereInput
    orderBy?: AccessLevelOrderByWithAggregationInput | AccessLevelOrderByWithAggregationInput[]
    by: AccessLevelScalarFieldEnum[] | AccessLevelScalarFieldEnum
    having?: AccessLevelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessLevelCountAggregateInputType | true
    _avg?: AccessLevelAvgAggregateInputType
    _sum?: AccessLevelSumAggregateInputType
    _min?: AccessLevelMinAggregateInputType
    _max?: AccessLevelMaxAggregateInputType
  }

  export type AccessLevelGroupByOutputType = {
    id: number
    positionId: number
    menuId: number
    hasAccess: boolean
    _count: AccessLevelCountAggregateOutputType | null
    _avg: AccessLevelAvgAggregateOutputType | null
    _sum: AccessLevelSumAggregateOutputType | null
    _min: AccessLevelMinAggregateOutputType | null
    _max: AccessLevelMaxAggregateOutputType | null
  }

  type GetAccessLevelGroupByPayload<T extends AccessLevelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessLevelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessLevelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessLevelGroupByOutputType[P]>
            : GetScalarType<T[P], AccessLevelGroupByOutputType[P]>
        }
      >
    >


  export type AccessLevelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    menuId?: boolean
    hasAccess?: boolean
    menu?: boolean | MenuDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessLevel"]>

  export type AccessLevelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    menuId?: boolean
    hasAccess?: boolean
    menu?: boolean | MenuDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessLevel"]>


  export type AccessLevelSelectScalar = {
    id?: boolean
    positionId?: boolean
    menuId?: boolean
    hasAccess?: boolean
  }

  export type AccessLevelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "positionId" | "menuId" | "hasAccess", ExtArgs["result"]["accessLevel"]>
  export type AccessLevelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu?: boolean | MenuDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }
  export type AccessLevelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu?: boolean | MenuDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }

  export type $AccessLevelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccessLevel"
    objects: {
      menu: Prisma.$MenuPayload<ExtArgs>
      position: Prisma.$PositionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      positionId: number
      menuId: number
      hasAccess: boolean
    }, ExtArgs["result"]["accessLevel"]>
    composites: {}
  }

  type AccessLevelGetPayload<S extends boolean | null | undefined | AccessLevelDefaultArgs> = $Result.GetResult<Prisma.$AccessLevelPayload, S>

  type AccessLevelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessLevelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessLevelCountAggregateInputType | true
    }

  export interface AccessLevelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccessLevel'], meta: { name: 'AccessLevel' } }
    /**
     * Find zero or one AccessLevel that matches the filter.
     * @param {AccessLevelFindUniqueArgs} args - Arguments to find a AccessLevel
     * @example
     * // Get one AccessLevel
     * const accessLevel = await prisma.accessLevel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessLevelFindUniqueArgs>(args: SelectSubset<T, AccessLevelFindUniqueArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AccessLevel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessLevelFindUniqueOrThrowArgs} args - Arguments to find a AccessLevel
     * @example
     * // Get one AccessLevel
     * const accessLevel = await prisma.accessLevel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessLevelFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessLevelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AccessLevel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLevelFindFirstArgs} args - Arguments to find a AccessLevel
     * @example
     * // Get one AccessLevel
     * const accessLevel = await prisma.accessLevel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessLevelFindFirstArgs>(args?: SelectSubset<T, AccessLevelFindFirstArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AccessLevel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLevelFindFirstOrThrowArgs} args - Arguments to find a AccessLevel
     * @example
     * // Get one AccessLevel
     * const accessLevel = await prisma.accessLevel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessLevelFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessLevelFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AccessLevels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLevelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessLevels
     * const accessLevels = await prisma.accessLevel.findMany()
     * 
     * // Get first 10 AccessLevels
     * const accessLevels = await prisma.accessLevel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessLevelWithIdOnly = await prisma.accessLevel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessLevelFindManyArgs>(args?: SelectSubset<T, AccessLevelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AccessLevel.
     * @param {AccessLevelCreateArgs} args - Arguments to create a AccessLevel.
     * @example
     * // Create one AccessLevel
     * const AccessLevel = await prisma.accessLevel.create({
     *   data: {
     *     // ... data to create a AccessLevel
     *   }
     * })
     * 
     */
    create<T extends AccessLevelCreateArgs>(args: SelectSubset<T, AccessLevelCreateArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AccessLevels.
     * @param {AccessLevelCreateManyArgs} args - Arguments to create many AccessLevels.
     * @example
     * // Create many AccessLevels
     * const accessLevel = await prisma.accessLevel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessLevelCreateManyArgs>(args?: SelectSubset<T, AccessLevelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccessLevels and returns the data saved in the database.
     * @param {AccessLevelCreateManyAndReturnArgs} args - Arguments to create many AccessLevels.
     * @example
     * // Create many AccessLevels
     * const accessLevel = await prisma.accessLevel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccessLevels and only return the `id`
     * const accessLevelWithIdOnly = await prisma.accessLevel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessLevelCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessLevelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AccessLevel.
     * @param {AccessLevelDeleteArgs} args - Arguments to delete one AccessLevel.
     * @example
     * // Delete one AccessLevel
     * const AccessLevel = await prisma.accessLevel.delete({
     *   where: {
     *     // ... filter to delete one AccessLevel
     *   }
     * })
     * 
     */
    delete<T extends AccessLevelDeleteArgs>(args: SelectSubset<T, AccessLevelDeleteArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AccessLevel.
     * @param {AccessLevelUpdateArgs} args - Arguments to update one AccessLevel.
     * @example
     * // Update one AccessLevel
     * const accessLevel = await prisma.accessLevel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessLevelUpdateArgs>(args: SelectSubset<T, AccessLevelUpdateArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AccessLevels.
     * @param {AccessLevelDeleteManyArgs} args - Arguments to filter AccessLevels to delete.
     * @example
     * // Delete a few AccessLevels
     * const { count } = await prisma.accessLevel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessLevelDeleteManyArgs>(args?: SelectSubset<T, AccessLevelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLevelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessLevels
     * const accessLevel = await prisma.accessLevel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessLevelUpdateManyArgs>(args: SelectSubset<T, AccessLevelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AccessLevel.
     * @param {AccessLevelUpsertArgs} args - Arguments to update or create a AccessLevel.
     * @example
     * // Update or create a AccessLevel
     * const accessLevel = await prisma.accessLevel.upsert({
     *   create: {
     *     // ... data to create a AccessLevel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessLevel we want to update
     *   }
     * })
     */
    upsert<T extends AccessLevelUpsertArgs>(args: SelectSubset<T, AccessLevelUpsertArgs<ExtArgs>>): Prisma__AccessLevelClient<$Result.GetResult<Prisma.$AccessLevelPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AccessLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLevelCountArgs} args - Arguments to filter AccessLevels to count.
     * @example
     * // Count the number of AccessLevels
     * const count = await prisma.accessLevel.count({
     *   where: {
     *     // ... the filter for the AccessLevels we want to count
     *   }
     * })
    **/
    count<T extends AccessLevelCountArgs>(
      args?: Subset<T, AccessLevelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessLevelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLevelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessLevelAggregateArgs>(args: Subset<T, AccessLevelAggregateArgs>): Prisma.PrismaPromise<GetAccessLevelAggregateType<T>>

    /**
     * Group by AccessLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLevelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessLevelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessLevelGroupByArgs['orderBy'] }
        : { orderBy?: AccessLevelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessLevelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessLevelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccessLevel model
   */
  readonly fields: AccessLevelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessLevel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessLevelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menu<T extends MenuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenuDefaultArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    position<T extends PositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PositionDefaultArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccessLevel model
   */ 
  interface AccessLevelFieldRefs {
    readonly id: FieldRef<"AccessLevel", 'Int'>
    readonly positionId: FieldRef<"AccessLevel", 'Int'>
    readonly menuId: FieldRef<"AccessLevel", 'Int'>
    readonly hasAccess: FieldRef<"AccessLevel", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AccessLevel findUnique
   */
  export type AccessLevelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * Filter, which AccessLevel to fetch.
     */
    where: AccessLevelWhereUniqueInput
  }

  /**
   * AccessLevel findUniqueOrThrow
   */
  export type AccessLevelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * Filter, which AccessLevel to fetch.
     */
    where: AccessLevelWhereUniqueInput
  }

  /**
   * AccessLevel findFirst
   */
  export type AccessLevelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * Filter, which AccessLevel to fetch.
     */
    where?: AccessLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLevels to fetch.
     */
    orderBy?: AccessLevelOrderByWithRelationInput | AccessLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessLevels.
     */
    cursor?: AccessLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessLevels.
     */
    distinct?: AccessLevelScalarFieldEnum | AccessLevelScalarFieldEnum[]
  }

  /**
   * AccessLevel findFirstOrThrow
   */
  export type AccessLevelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * Filter, which AccessLevel to fetch.
     */
    where?: AccessLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLevels to fetch.
     */
    orderBy?: AccessLevelOrderByWithRelationInput | AccessLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessLevels.
     */
    cursor?: AccessLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessLevels.
     */
    distinct?: AccessLevelScalarFieldEnum | AccessLevelScalarFieldEnum[]
  }

  /**
   * AccessLevel findMany
   */
  export type AccessLevelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * Filter, which AccessLevels to fetch.
     */
    where?: AccessLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLevels to fetch.
     */
    orderBy?: AccessLevelOrderByWithRelationInput | AccessLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessLevels.
     */
    cursor?: AccessLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLevels.
     */
    skip?: number
    distinct?: AccessLevelScalarFieldEnum | AccessLevelScalarFieldEnum[]
  }

  /**
   * AccessLevel create
   */
  export type AccessLevelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * The data needed to create a AccessLevel.
     */
    data: XOR<AccessLevelCreateInput, AccessLevelUncheckedCreateInput>
  }

  /**
   * AccessLevel createMany
   */
  export type AccessLevelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccessLevels.
     */
    data: AccessLevelCreateManyInput | AccessLevelCreateManyInput[]
  }

  /**
   * AccessLevel createManyAndReturn
   */
  export type AccessLevelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * The data used to create many AccessLevels.
     */
    data: AccessLevelCreateManyInput | AccessLevelCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessLevel update
   */
  export type AccessLevelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * The data needed to update a AccessLevel.
     */
    data: XOR<AccessLevelUpdateInput, AccessLevelUncheckedUpdateInput>
    /**
     * Choose, which AccessLevel to update.
     */
    where: AccessLevelWhereUniqueInput
  }

  /**
   * AccessLevel updateMany
   */
  export type AccessLevelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccessLevels.
     */
    data: XOR<AccessLevelUpdateManyMutationInput, AccessLevelUncheckedUpdateManyInput>
    /**
     * Filter which AccessLevels to update
     */
    where?: AccessLevelWhereInput
  }

  /**
   * AccessLevel upsert
   */
  export type AccessLevelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * The filter to search for the AccessLevel to update in case it exists.
     */
    where: AccessLevelWhereUniqueInput
    /**
     * In case the AccessLevel found by the `where` argument doesn't exist, create a new AccessLevel with this data.
     */
    create: XOR<AccessLevelCreateInput, AccessLevelUncheckedCreateInput>
    /**
     * In case the AccessLevel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessLevelUpdateInput, AccessLevelUncheckedUpdateInput>
  }

  /**
   * AccessLevel delete
   */
  export type AccessLevelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
    /**
     * Filter which AccessLevel to delete.
     */
    where: AccessLevelWhereUniqueInput
  }

  /**
   * AccessLevel deleteMany
   */
  export type AccessLevelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessLevels to delete
     */
    where?: AccessLevelWhereInput
  }

  /**
   * AccessLevel without action
   */
  export type AccessLevelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLevel
     */
    select?: AccessLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLevel
     */
    omit?: AccessLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLevelInclude<ExtArgs> | null
  }


  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _avg: InvitationAvgAggregateOutputType | null
    _sum: InvitationSumAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type InvitationSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type InvitationMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    mobile: string | null
    endDate: Date | null
    gender: string | null
    username: string | null
    password: string | null
    createdAt: Date | null
    userId: number | null
    introdPathLetter: string | null
    letterIssuer: string | null
    letterNumber: string | null
    letterDate: string | null
    letterApprover: string | null
    isRegistered: boolean | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    mobile: string | null
    endDate: Date | null
    gender: string | null
    username: string | null
    password: string | null
    createdAt: Date | null
    userId: number | null
    introdPathLetter: string | null
    letterIssuer: string | null
    letterNumber: string | null
    letterDate: string | null
    letterApprover: string | null
    isRegistered: boolean | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    mobile: number
    endDate: number
    gender: number
    username: number
    password: number
    createdAt: number
    userId: number
    introdPathLetter: number
    letterIssuer: number
    letterNumber: number
    letterDate: number
    letterApprover: number
    isRegistered: number
    _all: number
  }


  export type InvitationAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type InvitationSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type InvitationMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobile?: true
    endDate?: true
    gender?: true
    username?: true
    password?: true
    createdAt?: true
    userId?: true
    introdPathLetter?: true
    letterIssuer?: true
    letterNumber?: true
    letterDate?: true
    letterApprover?: true
    isRegistered?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobile?: true
    endDate?: true
    gender?: true
    username?: true
    password?: true
    createdAt?: true
    userId?: true
    introdPathLetter?: true
    letterIssuer?: true
    letterNumber?: true
    letterDate?: true
    letterApprover?: true
    isRegistered?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobile?: true
    endDate?: true
    gender?: true
    username?: true
    password?: true
    createdAt?: true
    userId?: true
    introdPathLetter?: true
    letterIssuer?: true
    letterNumber?: true
    letterDate?: true
    letterApprover?: true
    isRegistered?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _avg?: InvitationAvgAggregateInputType
    _sum?: InvitationSumAggregateInputType
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: number
    firstName: string | null
    lastName: string
    mobile: string
    endDate: Date | null
    gender: string | null
    username: string
    password: string
    createdAt: Date
    userId: number | null
    introdPathLetter: string | null
    letterIssuer: string | null
    letterNumber: string | null
    letterDate: string | null
    letterApprover: string | null
    isRegistered: boolean
    _count: InvitationCountAggregateOutputType | null
    _avg: InvitationAvgAggregateOutputType | null
    _sum: InvitationSumAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobile?: boolean
    endDate?: boolean
    gender?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    userId?: boolean
    introdPathLetter?: boolean
    letterIssuer?: boolean
    letterNumber?: boolean
    letterDate?: boolean
    letterApprover?: boolean
    isRegistered?: boolean
    user?: boolean | Invitation$userArgs<ExtArgs>
    accessLevels?: boolean | Invitation$accessLevelsArgs<ExtArgs>
    positions?: boolean | Invitation$positionsArgs<ExtArgs>
    _count?: boolean | InvitationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobile?: boolean
    endDate?: boolean
    gender?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    userId?: boolean
    introdPathLetter?: boolean
    letterIssuer?: boolean
    letterNumber?: boolean
    letterDate?: boolean
    letterApprover?: boolean
    isRegistered?: boolean
    user?: boolean | Invitation$userArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>


  export type InvitationSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobile?: boolean
    endDate?: boolean
    gender?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    userId?: boolean
    introdPathLetter?: boolean
    letterIssuer?: boolean
    letterNumber?: boolean
    letterDate?: boolean
    letterApprover?: boolean
    isRegistered?: boolean
  }

  export type InvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "mobile" | "endDate" | "gender" | "username" | "password" | "createdAt" | "userId" | "introdPathLetter" | "letterIssuer" | "letterNumber" | "letterDate" | "letterApprover" | "isRegistered", ExtArgs["result"]["invitation"]>
  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Invitation$userArgs<ExtArgs>
    accessLevels?: boolean | Invitation$accessLevelsArgs<ExtArgs>
    positions?: boolean | Invitation$positionsArgs<ExtArgs>
    _count?: boolean | InvitationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Invitation$userArgs<ExtArgs>
  }

  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      accessLevels: Prisma.$InvitationAccessPayload<ExtArgs>[]
      positions: Prisma.$PositionOnInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string | null
      lastName: string
      mobile: string
      endDate: Date | null
      gender: string | null
      username: string
      password: string
      createdAt: Date
      userId: number | null
      introdPathLetter: string | null
      letterIssuer: string | null
      letterNumber: string | null
      letterDate: string | null
      letterApprover: string | null
      isRegistered: boolean
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationFindUniqueArgs>(args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationFindFirstArgs>(args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationFindManyArgs>(args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends InvitationCreateArgs>(args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Invitations.
     * @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCreateManyArgs>(args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {InvitationCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends InvitationDeleteArgs>(args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationUpdateArgs>(args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationDeleteManyArgs>(args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationUpdateManyArgs>(args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends InvitationUpsertArgs>(args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Invitation$userArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    accessLevels<T extends Invitation$accessLevelsArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$accessLevelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    positions<T extends Invitation$positionsArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitation model
   */ 
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'Int'>
    readonly firstName: FieldRef<"Invitation", 'String'>
    readonly lastName: FieldRef<"Invitation", 'String'>
    readonly mobile: FieldRef<"Invitation", 'String'>
    readonly endDate: FieldRef<"Invitation", 'DateTime'>
    readonly gender: FieldRef<"Invitation", 'String'>
    readonly username: FieldRef<"Invitation", 'String'>
    readonly password: FieldRef<"Invitation", 'String'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
    readonly userId: FieldRef<"Invitation", 'Int'>
    readonly introdPathLetter: FieldRef<"Invitation", 'String'>
    readonly letterIssuer: FieldRef<"Invitation", 'String'>
    readonly letterNumber: FieldRef<"Invitation", 'String'>
    readonly letterDate: FieldRef<"Invitation", 'String'>
    readonly letterApprover: FieldRef<"Invitation", 'String'>
    readonly isRegistered: FieldRef<"Invitation", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }

  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
  }

  /**
   * Invitation createManyAndReturn
   */
  export type InvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
  }

  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }

  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
  }

  /**
   * Invitation.user
   */
  export type Invitation$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Invitation.accessLevels
   */
  export type Invitation$accessLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    where?: InvitationAccessWhereInput
    orderBy?: InvitationAccessOrderByWithRelationInput | InvitationAccessOrderByWithRelationInput[]
    cursor?: InvitationAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationAccessScalarFieldEnum | InvitationAccessScalarFieldEnum[]
  }

  /**
   * Invitation.positions
   */
  export type Invitation$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    where?: PositionOnInvitationWhereInput
    orderBy?: PositionOnInvitationOrderByWithRelationInput | PositionOnInvitationOrderByWithRelationInput[]
    cursor?: PositionOnInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionOnInvitationScalarFieldEnum | PositionOnInvitationScalarFieldEnum[]
  }

  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
  }


  /**
   * Model PositionOnInvitation
   */

  export type AggregatePositionOnInvitation = {
    _count: PositionOnInvitationCountAggregateOutputType | null
    _avg: PositionOnInvitationAvgAggregateOutputType | null
    _sum: PositionOnInvitationSumAggregateOutputType | null
    _min: PositionOnInvitationMinAggregateOutputType | null
    _max: PositionOnInvitationMaxAggregateOutputType | null
  }

  export type PositionOnInvitationAvgAggregateOutputType = {
    id: number | null
    invitationId: number | null
    positionId: number | null
  }

  export type PositionOnInvitationSumAggregateOutputType = {
    id: number | null
    invitationId: number | null
    positionId: number | null
  }

  export type PositionOnInvitationMinAggregateOutputType = {
    id: number | null
    invitationId: number | null
    positionId: number | null
  }

  export type PositionOnInvitationMaxAggregateOutputType = {
    id: number | null
    invitationId: number | null
    positionId: number | null
  }

  export type PositionOnInvitationCountAggregateOutputType = {
    id: number
    invitationId: number
    positionId: number
    _all: number
  }


  export type PositionOnInvitationAvgAggregateInputType = {
    id?: true
    invitationId?: true
    positionId?: true
  }

  export type PositionOnInvitationSumAggregateInputType = {
    id?: true
    invitationId?: true
    positionId?: true
  }

  export type PositionOnInvitationMinAggregateInputType = {
    id?: true
    invitationId?: true
    positionId?: true
  }

  export type PositionOnInvitationMaxAggregateInputType = {
    id?: true
    invitationId?: true
    positionId?: true
  }

  export type PositionOnInvitationCountAggregateInputType = {
    id?: true
    invitationId?: true
    positionId?: true
    _all?: true
  }

  export type PositionOnInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PositionOnInvitation to aggregate.
     */
    where?: PositionOnInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnInvitations to fetch.
     */
    orderBy?: PositionOnInvitationOrderByWithRelationInput | PositionOnInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionOnInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PositionOnInvitations
    **/
    _count?: true | PositionOnInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionOnInvitationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionOnInvitationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionOnInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionOnInvitationMaxAggregateInputType
  }

  export type GetPositionOnInvitationAggregateType<T extends PositionOnInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregatePositionOnInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePositionOnInvitation[P]>
      : GetScalarType<T[P], AggregatePositionOnInvitation[P]>
  }




  export type PositionOnInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionOnInvitationWhereInput
    orderBy?: PositionOnInvitationOrderByWithAggregationInput | PositionOnInvitationOrderByWithAggregationInput[]
    by: PositionOnInvitationScalarFieldEnum[] | PositionOnInvitationScalarFieldEnum
    having?: PositionOnInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionOnInvitationCountAggregateInputType | true
    _avg?: PositionOnInvitationAvgAggregateInputType
    _sum?: PositionOnInvitationSumAggregateInputType
    _min?: PositionOnInvitationMinAggregateInputType
    _max?: PositionOnInvitationMaxAggregateInputType
  }

  export type PositionOnInvitationGroupByOutputType = {
    id: number
    invitationId: number
    positionId: number
    _count: PositionOnInvitationCountAggregateOutputType | null
    _avg: PositionOnInvitationAvgAggregateOutputType | null
    _sum: PositionOnInvitationSumAggregateOutputType | null
    _min: PositionOnInvitationMinAggregateOutputType | null
    _max: PositionOnInvitationMaxAggregateOutputType | null
  }

  type GetPositionOnInvitationGroupByPayload<T extends PositionOnInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionOnInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionOnInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionOnInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], PositionOnInvitationGroupByOutputType[P]>
        }
      >
    >


  export type PositionOnInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    positionId?: boolean
    Position?: boolean | PositionDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positionOnInvitation"]>

  export type PositionOnInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    positionId?: boolean
    Position?: boolean | PositionDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positionOnInvitation"]>


  export type PositionOnInvitationSelectScalar = {
    id?: boolean
    invitationId?: boolean
    positionId?: boolean
  }

  export type PositionOnInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitationId" | "positionId", ExtArgs["result"]["positionOnInvitation"]>
  export type PositionOnInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Position?: boolean | PositionDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }
  export type PositionOnInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Position?: boolean | PositionDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }

  export type $PositionOnInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PositionOnInvitation"
    objects: {
      Position: Prisma.$PositionPayload<ExtArgs>
      Invitation: Prisma.$InvitationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invitationId: number
      positionId: number
    }, ExtArgs["result"]["positionOnInvitation"]>
    composites: {}
  }

  type PositionOnInvitationGetPayload<S extends boolean | null | undefined | PositionOnInvitationDefaultArgs> = $Result.GetResult<Prisma.$PositionOnInvitationPayload, S>

  type PositionOnInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionOnInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionOnInvitationCountAggregateInputType | true
    }

  export interface PositionOnInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PositionOnInvitation'], meta: { name: 'PositionOnInvitation' } }
    /**
     * Find zero or one PositionOnInvitation that matches the filter.
     * @param {PositionOnInvitationFindUniqueArgs} args - Arguments to find a PositionOnInvitation
     * @example
     * // Get one PositionOnInvitation
     * const positionOnInvitation = await prisma.positionOnInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionOnInvitationFindUniqueArgs>(args: SelectSubset<T, PositionOnInvitationFindUniqueArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PositionOnInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionOnInvitationFindUniqueOrThrowArgs} args - Arguments to find a PositionOnInvitation
     * @example
     * // Get one PositionOnInvitation
     * const positionOnInvitation = await prisma.positionOnInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionOnInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionOnInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PositionOnInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnInvitationFindFirstArgs} args - Arguments to find a PositionOnInvitation
     * @example
     * // Get one PositionOnInvitation
     * const positionOnInvitation = await prisma.positionOnInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionOnInvitationFindFirstArgs>(args?: SelectSubset<T, PositionOnInvitationFindFirstArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PositionOnInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnInvitationFindFirstOrThrowArgs} args - Arguments to find a PositionOnInvitation
     * @example
     * // Get one PositionOnInvitation
     * const positionOnInvitation = await prisma.positionOnInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionOnInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionOnInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PositionOnInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PositionOnInvitations
     * const positionOnInvitations = await prisma.positionOnInvitation.findMany()
     * 
     * // Get first 10 PositionOnInvitations
     * const positionOnInvitations = await prisma.positionOnInvitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionOnInvitationWithIdOnly = await prisma.positionOnInvitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionOnInvitationFindManyArgs>(args?: SelectSubset<T, PositionOnInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PositionOnInvitation.
     * @param {PositionOnInvitationCreateArgs} args - Arguments to create a PositionOnInvitation.
     * @example
     * // Create one PositionOnInvitation
     * const PositionOnInvitation = await prisma.positionOnInvitation.create({
     *   data: {
     *     // ... data to create a PositionOnInvitation
     *   }
     * })
     * 
     */
    create<T extends PositionOnInvitationCreateArgs>(args: SelectSubset<T, PositionOnInvitationCreateArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PositionOnInvitations.
     * @param {PositionOnInvitationCreateManyArgs} args - Arguments to create many PositionOnInvitations.
     * @example
     * // Create many PositionOnInvitations
     * const positionOnInvitation = await prisma.positionOnInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionOnInvitationCreateManyArgs>(args?: SelectSubset<T, PositionOnInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PositionOnInvitations and returns the data saved in the database.
     * @param {PositionOnInvitationCreateManyAndReturnArgs} args - Arguments to create many PositionOnInvitations.
     * @example
     * // Create many PositionOnInvitations
     * const positionOnInvitation = await prisma.positionOnInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PositionOnInvitations and only return the `id`
     * const positionOnInvitationWithIdOnly = await prisma.positionOnInvitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionOnInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionOnInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PositionOnInvitation.
     * @param {PositionOnInvitationDeleteArgs} args - Arguments to delete one PositionOnInvitation.
     * @example
     * // Delete one PositionOnInvitation
     * const PositionOnInvitation = await prisma.positionOnInvitation.delete({
     *   where: {
     *     // ... filter to delete one PositionOnInvitation
     *   }
     * })
     * 
     */
    delete<T extends PositionOnInvitationDeleteArgs>(args: SelectSubset<T, PositionOnInvitationDeleteArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PositionOnInvitation.
     * @param {PositionOnInvitationUpdateArgs} args - Arguments to update one PositionOnInvitation.
     * @example
     * // Update one PositionOnInvitation
     * const positionOnInvitation = await prisma.positionOnInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionOnInvitationUpdateArgs>(args: SelectSubset<T, PositionOnInvitationUpdateArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PositionOnInvitations.
     * @param {PositionOnInvitationDeleteManyArgs} args - Arguments to filter PositionOnInvitations to delete.
     * @example
     * // Delete a few PositionOnInvitations
     * const { count } = await prisma.positionOnInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionOnInvitationDeleteManyArgs>(args?: SelectSubset<T, PositionOnInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PositionOnInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PositionOnInvitations
     * const positionOnInvitation = await prisma.positionOnInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionOnInvitationUpdateManyArgs>(args: SelectSubset<T, PositionOnInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PositionOnInvitation.
     * @param {PositionOnInvitationUpsertArgs} args - Arguments to update or create a PositionOnInvitation.
     * @example
     * // Update or create a PositionOnInvitation
     * const positionOnInvitation = await prisma.positionOnInvitation.upsert({
     *   create: {
     *     // ... data to create a PositionOnInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PositionOnInvitation we want to update
     *   }
     * })
     */
    upsert<T extends PositionOnInvitationUpsertArgs>(args: SelectSubset<T, PositionOnInvitationUpsertArgs<ExtArgs>>): Prisma__PositionOnInvitationClient<$Result.GetResult<Prisma.$PositionOnInvitationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PositionOnInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnInvitationCountArgs} args - Arguments to filter PositionOnInvitations to count.
     * @example
     * // Count the number of PositionOnInvitations
     * const count = await prisma.positionOnInvitation.count({
     *   where: {
     *     // ... the filter for the PositionOnInvitations we want to count
     *   }
     * })
    **/
    count<T extends PositionOnInvitationCountArgs>(
      args?: Subset<T, PositionOnInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionOnInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PositionOnInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PositionOnInvitationAggregateArgs>(args: Subset<T, PositionOnInvitationAggregateArgs>): Prisma.PrismaPromise<GetPositionOnInvitationAggregateType<T>>

    /**
     * Group by PositionOnInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnInvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PositionOnInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionOnInvitationGroupByArgs['orderBy'] }
        : { orderBy?: PositionOnInvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PositionOnInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionOnInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PositionOnInvitation model
   */
  readonly fields: PositionOnInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PositionOnInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionOnInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Position<T extends PositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PositionDefaultArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    Invitation<T extends InvitationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvitationDefaultArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PositionOnInvitation model
   */ 
  interface PositionOnInvitationFieldRefs {
    readonly id: FieldRef<"PositionOnInvitation", 'Int'>
    readonly invitationId: FieldRef<"PositionOnInvitation", 'Int'>
    readonly positionId: FieldRef<"PositionOnInvitation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PositionOnInvitation findUnique
   */
  export type PositionOnInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnInvitation to fetch.
     */
    where: PositionOnInvitationWhereUniqueInput
  }

  /**
   * PositionOnInvitation findUniqueOrThrow
   */
  export type PositionOnInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnInvitation to fetch.
     */
    where: PositionOnInvitationWhereUniqueInput
  }

  /**
   * PositionOnInvitation findFirst
   */
  export type PositionOnInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnInvitation to fetch.
     */
    where?: PositionOnInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnInvitations to fetch.
     */
    orderBy?: PositionOnInvitationOrderByWithRelationInput | PositionOnInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PositionOnInvitations.
     */
    cursor?: PositionOnInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PositionOnInvitations.
     */
    distinct?: PositionOnInvitationScalarFieldEnum | PositionOnInvitationScalarFieldEnum[]
  }

  /**
   * PositionOnInvitation findFirstOrThrow
   */
  export type PositionOnInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnInvitation to fetch.
     */
    where?: PositionOnInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnInvitations to fetch.
     */
    orderBy?: PositionOnInvitationOrderByWithRelationInput | PositionOnInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PositionOnInvitations.
     */
    cursor?: PositionOnInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PositionOnInvitations.
     */
    distinct?: PositionOnInvitationScalarFieldEnum | PositionOnInvitationScalarFieldEnum[]
  }

  /**
   * PositionOnInvitation findMany
   */
  export type PositionOnInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnInvitations to fetch.
     */
    where?: PositionOnInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnInvitations to fetch.
     */
    orderBy?: PositionOnInvitationOrderByWithRelationInput | PositionOnInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PositionOnInvitations.
     */
    cursor?: PositionOnInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnInvitations.
     */
    skip?: number
    distinct?: PositionOnInvitationScalarFieldEnum | PositionOnInvitationScalarFieldEnum[]
  }

  /**
   * PositionOnInvitation create
   */
  export type PositionOnInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a PositionOnInvitation.
     */
    data: XOR<PositionOnInvitationCreateInput, PositionOnInvitationUncheckedCreateInput>
  }

  /**
   * PositionOnInvitation createMany
   */
  export type PositionOnInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PositionOnInvitations.
     */
    data: PositionOnInvitationCreateManyInput | PositionOnInvitationCreateManyInput[]
  }

  /**
   * PositionOnInvitation createManyAndReturn
   */
  export type PositionOnInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many PositionOnInvitations.
     */
    data: PositionOnInvitationCreateManyInput | PositionOnInvitationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PositionOnInvitation update
   */
  export type PositionOnInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a PositionOnInvitation.
     */
    data: XOR<PositionOnInvitationUpdateInput, PositionOnInvitationUncheckedUpdateInput>
    /**
     * Choose, which PositionOnInvitation to update.
     */
    where: PositionOnInvitationWhereUniqueInput
  }

  /**
   * PositionOnInvitation updateMany
   */
  export type PositionOnInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PositionOnInvitations.
     */
    data: XOR<PositionOnInvitationUpdateManyMutationInput, PositionOnInvitationUncheckedUpdateManyInput>
    /**
     * Filter which PositionOnInvitations to update
     */
    where?: PositionOnInvitationWhereInput
  }

  /**
   * PositionOnInvitation upsert
   */
  export type PositionOnInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the PositionOnInvitation to update in case it exists.
     */
    where: PositionOnInvitationWhereUniqueInput
    /**
     * In case the PositionOnInvitation found by the `where` argument doesn't exist, create a new PositionOnInvitation with this data.
     */
    create: XOR<PositionOnInvitationCreateInput, PositionOnInvitationUncheckedCreateInput>
    /**
     * In case the PositionOnInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionOnInvitationUpdateInput, PositionOnInvitationUncheckedUpdateInput>
  }

  /**
   * PositionOnInvitation delete
   */
  export type PositionOnInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
    /**
     * Filter which PositionOnInvitation to delete.
     */
    where: PositionOnInvitationWhereUniqueInput
  }

  /**
   * PositionOnInvitation deleteMany
   */
  export type PositionOnInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PositionOnInvitations to delete
     */
    where?: PositionOnInvitationWhereInput
  }

  /**
   * PositionOnInvitation without action
   */
  export type PositionOnInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnInvitation
     */
    select?: PositionOnInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnInvitation
     */
    omit?: PositionOnInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnInvitationInclude<ExtArgs> | null
  }


  /**
   * Model InvitationAccess
   */

  export type AggregateInvitationAccess = {
    _count: InvitationAccessCountAggregateOutputType | null
    _avg: InvitationAccessAvgAggregateOutputType | null
    _sum: InvitationAccessSumAggregateOutputType | null
    _min: InvitationAccessMinAggregateOutputType | null
    _max: InvitationAccessMaxAggregateOutputType | null
  }

  export type InvitationAccessAvgAggregateOutputType = {
    id: number | null
    invitationId: number | null
    menuId: number | null
  }

  export type InvitationAccessSumAggregateOutputType = {
    id: number | null
    invitationId: number | null
    menuId: number | null
  }

  export type InvitationAccessMinAggregateOutputType = {
    id: number | null
    invitationId: number | null
    menuId: number | null
    hasAccess: boolean | null
  }

  export type InvitationAccessMaxAggregateOutputType = {
    id: number | null
    invitationId: number | null
    menuId: number | null
    hasAccess: boolean | null
  }

  export type InvitationAccessCountAggregateOutputType = {
    id: number
    invitationId: number
    menuId: number
    hasAccess: number
    _all: number
  }


  export type InvitationAccessAvgAggregateInputType = {
    id?: true
    invitationId?: true
    menuId?: true
  }

  export type InvitationAccessSumAggregateInputType = {
    id?: true
    invitationId?: true
    menuId?: true
  }

  export type InvitationAccessMinAggregateInputType = {
    id?: true
    invitationId?: true
    menuId?: true
    hasAccess?: true
  }

  export type InvitationAccessMaxAggregateInputType = {
    id?: true
    invitationId?: true
    menuId?: true
    hasAccess?: true
  }

  export type InvitationAccessCountAggregateInputType = {
    id?: true
    invitationId?: true
    menuId?: true
    hasAccess?: true
    _all?: true
  }

  export type InvitationAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationAccess to aggregate.
     */
    where?: InvitationAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationAccesses to fetch.
     */
    orderBy?: InvitationAccessOrderByWithRelationInput | InvitationAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvitationAccesses
    **/
    _count?: true | InvitationAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationAccessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationAccessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationAccessMaxAggregateInputType
  }

  export type GetInvitationAccessAggregateType<T extends InvitationAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitationAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitationAccess[P]>
      : GetScalarType<T[P], AggregateInvitationAccess[P]>
  }




  export type InvitationAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationAccessWhereInput
    orderBy?: InvitationAccessOrderByWithAggregationInput | InvitationAccessOrderByWithAggregationInput[]
    by: InvitationAccessScalarFieldEnum[] | InvitationAccessScalarFieldEnum
    having?: InvitationAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationAccessCountAggregateInputType | true
    _avg?: InvitationAccessAvgAggregateInputType
    _sum?: InvitationAccessSumAggregateInputType
    _min?: InvitationAccessMinAggregateInputType
    _max?: InvitationAccessMaxAggregateInputType
  }

  export type InvitationAccessGroupByOutputType = {
    id: number
    invitationId: number
    menuId: number
    hasAccess: boolean
    _count: InvitationAccessCountAggregateOutputType | null
    _avg: InvitationAccessAvgAggregateOutputType | null
    _sum: InvitationAccessSumAggregateOutputType | null
    _min: InvitationAccessMinAggregateOutputType | null
    _max: InvitationAccessMaxAggregateOutputType | null
  }

  type GetInvitationAccessGroupByPayload<T extends InvitationAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationAccessGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationAccessGroupByOutputType[P]>
        }
      >
    >


  export type InvitationAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    menuId?: boolean
    hasAccess?: boolean
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitationAccess"]>

  export type InvitationAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    menuId?: boolean
    hasAccess?: boolean
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitationAccess"]>


  export type InvitationAccessSelectScalar = {
    id?: boolean
    invitationId?: boolean
    menuId?: boolean
    hasAccess?: boolean
  }

  export type InvitationAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitationId" | "menuId" | "hasAccess", ExtArgs["result"]["invitationAccess"]>
  export type InvitationAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }
  export type InvitationAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    Invitation?: boolean | InvitationDefaultArgs<ExtArgs>
  }

  export type $InvitationAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvitationAccess"
    objects: {
      Menu: Prisma.$MenuPayload<ExtArgs>
      Invitation: Prisma.$InvitationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invitationId: number
      menuId: number
      hasAccess: boolean
    }, ExtArgs["result"]["invitationAccess"]>
    composites: {}
  }

  type InvitationAccessGetPayload<S extends boolean | null | undefined | InvitationAccessDefaultArgs> = $Result.GetResult<Prisma.$InvitationAccessPayload, S>

  type InvitationAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationAccessCountAggregateInputType | true
    }

  export interface InvitationAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvitationAccess'], meta: { name: 'InvitationAccess' } }
    /**
     * Find zero or one InvitationAccess that matches the filter.
     * @param {InvitationAccessFindUniqueArgs} args - Arguments to find a InvitationAccess
     * @example
     * // Get one InvitationAccess
     * const invitationAccess = await prisma.invitationAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationAccessFindUniqueArgs>(args: SelectSubset<T, InvitationAccessFindUniqueArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one InvitationAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationAccessFindUniqueOrThrowArgs} args - Arguments to find a InvitationAccess
     * @example
     * // Get one InvitationAccess
     * const invitationAccess = await prisma.invitationAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first InvitationAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAccessFindFirstArgs} args - Arguments to find a InvitationAccess
     * @example
     * // Get one InvitationAccess
     * const invitationAccess = await prisma.invitationAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationAccessFindFirstArgs>(args?: SelectSubset<T, InvitationAccessFindFirstArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first InvitationAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAccessFindFirstOrThrowArgs} args - Arguments to find a InvitationAccess
     * @example
     * // Get one InvitationAccess
     * const invitationAccess = await prisma.invitationAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more InvitationAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvitationAccesses
     * const invitationAccesses = await prisma.invitationAccess.findMany()
     * 
     * // Get first 10 InvitationAccesses
     * const invitationAccesses = await prisma.invitationAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationAccessWithIdOnly = await prisma.invitationAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationAccessFindManyArgs>(args?: SelectSubset<T, InvitationAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a InvitationAccess.
     * @param {InvitationAccessCreateArgs} args - Arguments to create a InvitationAccess.
     * @example
     * // Create one InvitationAccess
     * const InvitationAccess = await prisma.invitationAccess.create({
     *   data: {
     *     // ... data to create a InvitationAccess
     *   }
     * })
     * 
     */
    create<T extends InvitationAccessCreateArgs>(args: SelectSubset<T, InvitationAccessCreateArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many InvitationAccesses.
     * @param {InvitationAccessCreateManyArgs} args - Arguments to create many InvitationAccesses.
     * @example
     * // Create many InvitationAccesses
     * const invitationAccess = await prisma.invitationAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationAccessCreateManyArgs>(args?: SelectSubset<T, InvitationAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvitationAccesses and returns the data saved in the database.
     * @param {InvitationAccessCreateManyAndReturnArgs} args - Arguments to create many InvitationAccesses.
     * @example
     * // Create many InvitationAccesses
     * const invitationAccess = await prisma.invitationAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvitationAccesses and only return the `id`
     * const invitationAccessWithIdOnly = await prisma.invitationAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a InvitationAccess.
     * @param {InvitationAccessDeleteArgs} args - Arguments to delete one InvitationAccess.
     * @example
     * // Delete one InvitationAccess
     * const InvitationAccess = await prisma.invitationAccess.delete({
     *   where: {
     *     // ... filter to delete one InvitationAccess
     *   }
     * })
     * 
     */
    delete<T extends InvitationAccessDeleteArgs>(args: SelectSubset<T, InvitationAccessDeleteArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one InvitationAccess.
     * @param {InvitationAccessUpdateArgs} args - Arguments to update one InvitationAccess.
     * @example
     * // Update one InvitationAccess
     * const invitationAccess = await prisma.invitationAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationAccessUpdateArgs>(args: SelectSubset<T, InvitationAccessUpdateArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more InvitationAccesses.
     * @param {InvitationAccessDeleteManyArgs} args - Arguments to filter InvitationAccesses to delete.
     * @example
     * // Delete a few InvitationAccesses
     * const { count } = await prisma.invitationAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationAccessDeleteManyArgs>(args?: SelectSubset<T, InvitationAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvitationAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvitationAccesses
     * const invitationAccess = await prisma.invitationAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationAccessUpdateManyArgs>(args: SelectSubset<T, InvitationAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvitationAccess.
     * @param {InvitationAccessUpsertArgs} args - Arguments to update or create a InvitationAccess.
     * @example
     * // Update or create a InvitationAccess
     * const invitationAccess = await prisma.invitationAccess.upsert({
     *   create: {
     *     // ... data to create a InvitationAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvitationAccess we want to update
     *   }
     * })
     */
    upsert<T extends InvitationAccessUpsertArgs>(args: SelectSubset<T, InvitationAccessUpsertArgs<ExtArgs>>): Prisma__InvitationAccessClient<$Result.GetResult<Prisma.$InvitationAccessPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of InvitationAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAccessCountArgs} args - Arguments to filter InvitationAccesses to count.
     * @example
     * // Count the number of InvitationAccesses
     * const count = await prisma.invitationAccess.count({
     *   where: {
     *     // ... the filter for the InvitationAccesses we want to count
     *   }
     * })
    **/
    count<T extends InvitationAccessCountArgs>(
      args?: Subset<T, InvitationAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvitationAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAccessAggregateArgs>(args: Subset<T, InvitationAccessAggregateArgs>): Prisma.PrismaPromise<GetInvitationAccessAggregateType<T>>

    /**
     * Group by InvitationAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationAccessGroupByArgs['orderBy'] }
        : { orderBy?: InvitationAccessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvitationAccess model
   */
  readonly fields: InvitationAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvitationAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Menu<T extends MenuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenuDefaultArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    Invitation<T extends InvitationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvitationDefaultArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvitationAccess model
   */ 
  interface InvitationAccessFieldRefs {
    readonly id: FieldRef<"InvitationAccess", 'Int'>
    readonly invitationId: FieldRef<"InvitationAccess", 'Int'>
    readonly menuId: FieldRef<"InvitationAccess", 'Int'>
    readonly hasAccess: FieldRef<"InvitationAccess", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * InvitationAccess findUnique
   */
  export type InvitationAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * Filter, which InvitationAccess to fetch.
     */
    where: InvitationAccessWhereUniqueInput
  }

  /**
   * InvitationAccess findUniqueOrThrow
   */
  export type InvitationAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * Filter, which InvitationAccess to fetch.
     */
    where: InvitationAccessWhereUniqueInput
  }

  /**
   * InvitationAccess findFirst
   */
  export type InvitationAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * Filter, which InvitationAccess to fetch.
     */
    where?: InvitationAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationAccesses to fetch.
     */
    orderBy?: InvitationAccessOrderByWithRelationInput | InvitationAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationAccesses.
     */
    cursor?: InvitationAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationAccesses.
     */
    distinct?: InvitationAccessScalarFieldEnum | InvitationAccessScalarFieldEnum[]
  }

  /**
   * InvitationAccess findFirstOrThrow
   */
  export type InvitationAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * Filter, which InvitationAccess to fetch.
     */
    where?: InvitationAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationAccesses to fetch.
     */
    orderBy?: InvitationAccessOrderByWithRelationInput | InvitationAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationAccesses.
     */
    cursor?: InvitationAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationAccesses.
     */
    distinct?: InvitationAccessScalarFieldEnum | InvitationAccessScalarFieldEnum[]
  }

  /**
   * InvitationAccess findMany
   */
  export type InvitationAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * Filter, which InvitationAccesses to fetch.
     */
    where?: InvitationAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationAccesses to fetch.
     */
    orderBy?: InvitationAccessOrderByWithRelationInput | InvitationAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvitationAccesses.
     */
    cursor?: InvitationAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationAccesses.
     */
    skip?: number
    distinct?: InvitationAccessScalarFieldEnum | InvitationAccessScalarFieldEnum[]
  }

  /**
   * InvitationAccess create
   */
  export type InvitationAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a InvitationAccess.
     */
    data: XOR<InvitationAccessCreateInput, InvitationAccessUncheckedCreateInput>
  }

  /**
   * InvitationAccess createMany
   */
  export type InvitationAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvitationAccesses.
     */
    data: InvitationAccessCreateManyInput | InvitationAccessCreateManyInput[]
  }

  /**
   * InvitationAccess createManyAndReturn
   */
  export type InvitationAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * The data used to create many InvitationAccesses.
     */
    data: InvitationAccessCreateManyInput | InvitationAccessCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvitationAccess update
   */
  export type InvitationAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a InvitationAccess.
     */
    data: XOR<InvitationAccessUpdateInput, InvitationAccessUncheckedUpdateInput>
    /**
     * Choose, which InvitationAccess to update.
     */
    where: InvitationAccessWhereUniqueInput
  }

  /**
   * InvitationAccess updateMany
   */
  export type InvitationAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvitationAccesses.
     */
    data: XOR<InvitationAccessUpdateManyMutationInput, InvitationAccessUncheckedUpdateManyInput>
    /**
     * Filter which InvitationAccesses to update
     */
    where?: InvitationAccessWhereInput
  }

  /**
   * InvitationAccess upsert
   */
  export type InvitationAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the InvitationAccess to update in case it exists.
     */
    where: InvitationAccessWhereUniqueInput
    /**
     * In case the InvitationAccess found by the `where` argument doesn't exist, create a new InvitationAccess with this data.
     */
    create: XOR<InvitationAccessCreateInput, InvitationAccessUncheckedCreateInput>
    /**
     * In case the InvitationAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationAccessUpdateInput, InvitationAccessUncheckedUpdateInput>
  }

  /**
   * InvitationAccess delete
   */
  export type InvitationAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
    /**
     * Filter which InvitationAccess to delete.
     */
    where: InvitationAccessWhereUniqueInput
  }

  /**
   * InvitationAccess deleteMany
   */
  export type InvitationAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationAccesses to delete
     */
    where?: InvitationAccessWhereInput
  }

  /**
   * InvitationAccess without action
   */
  export type InvitationAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationAccess
     */
    select?: InvitationAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationAccess
     */
    omit?: InvitationAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationAccessInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    inviterId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    inviterId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    first_name: string | null
    last_name: string | null
    mobile: string | null
    email: string | null
    gender: string | null
    inviterId: number | null
    invitationTime: Date | null
    registrationTime: Date | null
    endDate: Date | null
    active: boolean | null
    introdPathLetter: string | null
    letterIssuer: string | null
    letterNumber: string | null
    letterDate: string | null
    letterApprover: string | null
    userName: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    first_name: string | null
    last_name: string | null
    mobile: string | null
    email: string | null
    gender: string | null
    inviterId: number | null
    invitationTime: Date | null
    registrationTime: Date | null
    endDate: Date | null
    active: boolean | null
    introdPathLetter: string | null
    letterIssuer: string | null
    letterNumber: string | null
    letterDate: string | null
    letterApprover: string | null
    userName: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    mobile: number
    email: number
    gender: number
    inviterId: number
    invitationTime: number
    registrationTime: number
    endDate: number
    active: number
    introdPathLetter: number
    letterIssuer: number
    letterNumber: number
    letterDate: number
    letterApprover: number
    userName: number
    password: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    inviterId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    inviterId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    mobile?: true
    email?: true
    gender?: true
    inviterId?: true
    invitationTime?: true
    registrationTime?: true
    endDate?: true
    active?: true
    introdPathLetter?: true
    letterIssuer?: true
    letterNumber?: true
    letterDate?: true
    letterApprover?: true
    userName?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    mobile?: true
    email?: true
    gender?: true
    inviterId?: true
    invitationTime?: true
    registrationTime?: true
    endDate?: true
    active?: true
    introdPathLetter?: true
    letterIssuer?: true
    letterNumber?: true
    letterDate?: true
    letterApprover?: true
    userName?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    mobile?: true
    email?: true
    gender?: true
    inviterId?: true
    invitationTime?: true
    registrationTime?: true
    endDate?: true
    active?: true
    introdPathLetter?: true
    letterIssuer?: true
    letterNumber?: true
    letterDate?: true
    letterApprover?: true
    userName?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    first_name: string
    last_name: string
    mobile: string
    email: string | null
    gender: string
    inviterId: number | null
    invitationTime: Date
    registrationTime: Date
    endDate: Date | null
    active: boolean
    introdPathLetter: string | null
    letterIssuer: string | null
    letterNumber: string | null
    letterDate: string | null
    letterApprover: string | null
    userName: string
    password: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    mobile?: boolean
    email?: boolean
    gender?: boolean
    inviterId?: boolean
    invitationTime?: boolean
    registrationTime?: boolean
    endDate?: boolean
    active?: boolean
    introdPathLetter?: boolean
    letterIssuer?: boolean
    letterNumber?: boolean
    letterDate?: boolean
    letterApprover?: boolean
    userName?: boolean
    password?: boolean
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    positions?: boolean | User$positionsArgs<ExtArgs>
    accessLevels?: boolean | User$accessLevelsArgs<ExtArgs>
    loginHistories?: boolean | User$loginHistoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    mobile?: boolean
    email?: boolean
    gender?: boolean
    inviterId?: boolean
    invitationTime?: boolean
    registrationTime?: boolean
    endDate?: boolean
    active?: boolean
    introdPathLetter?: boolean
    letterIssuer?: boolean
    letterNumber?: boolean
    letterDate?: boolean
    letterApprover?: boolean
    userName?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    mobile?: boolean
    email?: boolean
    gender?: boolean
    inviterId?: boolean
    invitationTime?: boolean
    registrationTime?: boolean
    endDate?: boolean
    active?: boolean
    introdPathLetter?: boolean
    letterIssuer?: boolean
    letterNumber?: boolean
    letterDate?: boolean
    letterApprover?: boolean
    userName?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "first_name" | "last_name" | "mobile" | "email" | "gender" | "inviterId" | "invitationTime" | "registrationTime" | "endDate" | "active" | "introdPathLetter" | "letterIssuer" | "letterNumber" | "letterDate" | "letterApprover" | "userName" | "password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    positions?: boolean | User$positionsArgs<ExtArgs>
    accessLevels?: boolean | User$accessLevelsArgs<ExtArgs>
    loginHistories?: boolean | User$loginHistoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      invitations: Prisma.$InvitationPayload<ExtArgs> | null
      positions: Prisma.$PositionOnUserPayload<ExtArgs>[]
      accessLevels: Prisma.$UserAccessPayload<ExtArgs>[]
      loginHistories: Prisma.$UserLoginHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      first_name: string
      last_name: string
      mobile: string
      email: string | null
      gender: string
      inviterId: number | null
      invitationTime: Date
      registrationTime: Date
      endDate: Date | null
      active: boolean
      introdPathLetter: string | null
      letterIssuer: string | null
      letterNumber: string | null
      letterDate: string | null
      letterApprover: string | null
      userName: string
      password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invitations<T extends User$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$invitationsArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    positions<T extends User$positionsArgs<ExtArgs> = {}>(args?: Subset<T, User$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    accessLevels<T extends User$accessLevelsArgs<ExtArgs> = {}>(args?: Subset<T, User$accessLevelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    loginHistories<T extends User$loginHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$loginHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly mobile: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'String'>
    readonly inviterId: FieldRef<"User", 'Int'>
    readonly invitationTime: FieldRef<"User", 'DateTime'>
    readonly registrationTime: FieldRef<"User", 'DateTime'>
    readonly endDate: FieldRef<"User", 'DateTime'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly introdPathLetter: FieldRef<"User", 'String'>
    readonly letterIssuer: FieldRef<"User", 'String'>
    readonly letterNumber: FieldRef<"User", 'String'>
    readonly letterDate: FieldRef<"User", 'String'>
    readonly letterApprover: FieldRef<"User", 'String'>
    readonly userName: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.invitations
   */
  export type User$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
  }

  /**
   * User.positions
   */
  export type User$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    where?: PositionOnUserWhereInput
    orderBy?: PositionOnUserOrderByWithRelationInput | PositionOnUserOrderByWithRelationInput[]
    cursor?: PositionOnUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionOnUserScalarFieldEnum | PositionOnUserScalarFieldEnum[]
  }

  /**
   * User.accessLevels
   */
  export type User$accessLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    where?: UserAccessWhereInput
    orderBy?: UserAccessOrderByWithRelationInput | UserAccessOrderByWithRelationInput[]
    cursor?: UserAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAccessScalarFieldEnum | UserAccessScalarFieldEnum[]
  }

  /**
   * User.loginHistories
   */
  export type User$loginHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    where?: UserLoginHistoryWhereInput
    orderBy?: UserLoginHistoryOrderByWithRelationInput | UserLoginHistoryOrderByWithRelationInput[]
    cursor?: UserLoginHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLoginHistoryScalarFieldEnum | UserLoginHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PositionOnUser
   */

  export type AggregatePositionOnUser = {
    _count: PositionOnUserCountAggregateOutputType | null
    _avg: PositionOnUserAvgAggregateOutputType | null
    _sum: PositionOnUserSumAggregateOutputType | null
    _min: PositionOnUserMinAggregateOutputType | null
    _max: PositionOnUserMaxAggregateOutputType | null
  }

  export type PositionOnUserAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    positionId: number | null
  }

  export type PositionOnUserSumAggregateOutputType = {
    id: number | null
    userId: number | null
    positionId: number | null
  }

  export type PositionOnUserMinAggregateOutputType = {
    id: number | null
    userId: number | null
    positionId: number | null
  }

  export type PositionOnUserMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    positionId: number | null
  }

  export type PositionOnUserCountAggregateOutputType = {
    id: number
    userId: number
    positionId: number
    _all: number
  }


  export type PositionOnUserAvgAggregateInputType = {
    id?: true
    userId?: true
    positionId?: true
  }

  export type PositionOnUserSumAggregateInputType = {
    id?: true
    userId?: true
    positionId?: true
  }

  export type PositionOnUserMinAggregateInputType = {
    id?: true
    userId?: true
    positionId?: true
  }

  export type PositionOnUserMaxAggregateInputType = {
    id?: true
    userId?: true
    positionId?: true
  }

  export type PositionOnUserCountAggregateInputType = {
    id?: true
    userId?: true
    positionId?: true
    _all?: true
  }

  export type PositionOnUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PositionOnUser to aggregate.
     */
    where?: PositionOnUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnUsers to fetch.
     */
    orderBy?: PositionOnUserOrderByWithRelationInput | PositionOnUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionOnUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PositionOnUsers
    **/
    _count?: true | PositionOnUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionOnUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionOnUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionOnUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionOnUserMaxAggregateInputType
  }

  export type GetPositionOnUserAggregateType<T extends PositionOnUserAggregateArgs> = {
        [P in keyof T & keyof AggregatePositionOnUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePositionOnUser[P]>
      : GetScalarType<T[P], AggregatePositionOnUser[P]>
  }




  export type PositionOnUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionOnUserWhereInput
    orderBy?: PositionOnUserOrderByWithAggregationInput | PositionOnUserOrderByWithAggregationInput[]
    by: PositionOnUserScalarFieldEnum[] | PositionOnUserScalarFieldEnum
    having?: PositionOnUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionOnUserCountAggregateInputType | true
    _avg?: PositionOnUserAvgAggregateInputType
    _sum?: PositionOnUserSumAggregateInputType
    _min?: PositionOnUserMinAggregateInputType
    _max?: PositionOnUserMaxAggregateInputType
  }

  export type PositionOnUserGroupByOutputType = {
    id: number
    userId: number
    positionId: number
    _count: PositionOnUserCountAggregateOutputType | null
    _avg: PositionOnUserAvgAggregateOutputType | null
    _sum: PositionOnUserSumAggregateOutputType | null
    _min: PositionOnUserMinAggregateOutputType | null
    _max: PositionOnUserMaxAggregateOutputType | null
  }

  type GetPositionOnUserGroupByPayload<T extends PositionOnUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionOnUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionOnUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionOnUserGroupByOutputType[P]>
            : GetScalarType<T[P], PositionOnUserGroupByOutputType[P]>
        }
      >
    >


  export type PositionOnUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    positionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positionOnUser"]>

  export type PositionOnUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    positionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positionOnUser"]>


  export type PositionOnUserSelectScalar = {
    id?: boolean
    userId?: boolean
    positionId?: boolean
  }

  export type PositionOnUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "positionId", ExtArgs["result"]["positionOnUser"]>
  export type PositionOnUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Position?: boolean | PositionDefaultArgs<ExtArgs>
  }
  export type PositionOnUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Position?: boolean | PositionDefaultArgs<ExtArgs>
  }

  export type $PositionOnUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PositionOnUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      Position: Prisma.$PositionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      positionId: number
    }, ExtArgs["result"]["positionOnUser"]>
    composites: {}
  }

  type PositionOnUserGetPayload<S extends boolean | null | undefined | PositionOnUserDefaultArgs> = $Result.GetResult<Prisma.$PositionOnUserPayload, S>

  type PositionOnUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionOnUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionOnUserCountAggregateInputType | true
    }

  export interface PositionOnUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PositionOnUser'], meta: { name: 'PositionOnUser' } }
    /**
     * Find zero or one PositionOnUser that matches the filter.
     * @param {PositionOnUserFindUniqueArgs} args - Arguments to find a PositionOnUser
     * @example
     * // Get one PositionOnUser
     * const positionOnUser = await prisma.positionOnUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionOnUserFindUniqueArgs>(args: SelectSubset<T, PositionOnUserFindUniqueArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PositionOnUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionOnUserFindUniqueOrThrowArgs} args - Arguments to find a PositionOnUser
     * @example
     * // Get one PositionOnUser
     * const positionOnUser = await prisma.positionOnUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionOnUserFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionOnUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PositionOnUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnUserFindFirstArgs} args - Arguments to find a PositionOnUser
     * @example
     * // Get one PositionOnUser
     * const positionOnUser = await prisma.positionOnUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionOnUserFindFirstArgs>(args?: SelectSubset<T, PositionOnUserFindFirstArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PositionOnUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnUserFindFirstOrThrowArgs} args - Arguments to find a PositionOnUser
     * @example
     * // Get one PositionOnUser
     * const positionOnUser = await prisma.positionOnUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionOnUserFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionOnUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PositionOnUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PositionOnUsers
     * const positionOnUsers = await prisma.positionOnUser.findMany()
     * 
     * // Get first 10 PositionOnUsers
     * const positionOnUsers = await prisma.positionOnUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionOnUserWithIdOnly = await prisma.positionOnUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionOnUserFindManyArgs>(args?: SelectSubset<T, PositionOnUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PositionOnUser.
     * @param {PositionOnUserCreateArgs} args - Arguments to create a PositionOnUser.
     * @example
     * // Create one PositionOnUser
     * const PositionOnUser = await prisma.positionOnUser.create({
     *   data: {
     *     // ... data to create a PositionOnUser
     *   }
     * })
     * 
     */
    create<T extends PositionOnUserCreateArgs>(args: SelectSubset<T, PositionOnUserCreateArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PositionOnUsers.
     * @param {PositionOnUserCreateManyArgs} args - Arguments to create many PositionOnUsers.
     * @example
     * // Create many PositionOnUsers
     * const positionOnUser = await prisma.positionOnUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionOnUserCreateManyArgs>(args?: SelectSubset<T, PositionOnUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PositionOnUsers and returns the data saved in the database.
     * @param {PositionOnUserCreateManyAndReturnArgs} args - Arguments to create many PositionOnUsers.
     * @example
     * // Create many PositionOnUsers
     * const positionOnUser = await prisma.positionOnUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PositionOnUsers and only return the `id`
     * const positionOnUserWithIdOnly = await prisma.positionOnUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionOnUserCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionOnUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PositionOnUser.
     * @param {PositionOnUserDeleteArgs} args - Arguments to delete one PositionOnUser.
     * @example
     * // Delete one PositionOnUser
     * const PositionOnUser = await prisma.positionOnUser.delete({
     *   where: {
     *     // ... filter to delete one PositionOnUser
     *   }
     * })
     * 
     */
    delete<T extends PositionOnUserDeleteArgs>(args: SelectSubset<T, PositionOnUserDeleteArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PositionOnUser.
     * @param {PositionOnUserUpdateArgs} args - Arguments to update one PositionOnUser.
     * @example
     * // Update one PositionOnUser
     * const positionOnUser = await prisma.positionOnUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionOnUserUpdateArgs>(args: SelectSubset<T, PositionOnUserUpdateArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PositionOnUsers.
     * @param {PositionOnUserDeleteManyArgs} args - Arguments to filter PositionOnUsers to delete.
     * @example
     * // Delete a few PositionOnUsers
     * const { count } = await prisma.positionOnUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionOnUserDeleteManyArgs>(args?: SelectSubset<T, PositionOnUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PositionOnUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PositionOnUsers
     * const positionOnUser = await prisma.positionOnUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionOnUserUpdateManyArgs>(args: SelectSubset<T, PositionOnUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PositionOnUser.
     * @param {PositionOnUserUpsertArgs} args - Arguments to update or create a PositionOnUser.
     * @example
     * // Update or create a PositionOnUser
     * const positionOnUser = await prisma.positionOnUser.upsert({
     *   create: {
     *     // ... data to create a PositionOnUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PositionOnUser we want to update
     *   }
     * })
     */
    upsert<T extends PositionOnUserUpsertArgs>(args: SelectSubset<T, PositionOnUserUpsertArgs<ExtArgs>>): Prisma__PositionOnUserClient<$Result.GetResult<Prisma.$PositionOnUserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PositionOnUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnUserCountArgs} args - Arguments to filter PositionOnUsers to count.
     * @example
     * // Count the number of PositionOnUsers
     * const count = await prisma.positionOnUser.count({
     *   where: {
     *     // ... the filter for the PositionOnUsers we want to count
     *   }
     * })
    **/
    count<T extends PositionOnUserCountArgs>(
      args?: Subset<T, PositionOnUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionOnUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PositionOnUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PositionOnUserAggregateArgs>(args: Subset<T, PositionOnUserAggregateArgs>): Prisma.PrismaPromise<GetPositionOnUserAggregateType<T>>

    /**
     * Group by PositionOnUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionOnUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PositionOnUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionOnUserGroupByArgs['orderBy'] }
        : { orderBy?: PositionOnUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PositionOnUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionOnUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PositionOnUser model
   */
  readonly fields: PositionOnUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PositionOnUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionOnUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    Position<T extends PositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PositionDefaultArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PositionOnUser model
   */ 
  interface PositionOnUserFieldRefs {
    readonly id: FieldRef<"PositionOnUser", 'Int'>
    readonly userId: FieldRef<"PositionOnUser", 'Int'>
    readonly positionId: FieldRef<"PositionOnUser", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PositionOnUser findUnique
   */
  export type PositionOnUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnUser to fetch.
     */
    where: PositionOnUserWhereUniqueInput
  }

  /**
   * PositionOnUser findUniqueOrThrow
   */
  export type PositionOnUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnUser to fetch.
     */
    where: PositionOnUserWhereUniqueInput
  }

  /**
   * PositionOnUser findFirst
   */
  export type PositionOnUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnUser to fetch.
     */
    where?: PositionOnUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnUsers to fetch.
     */
    orderBy?: PositionOnUserOrderByWithRelationInput | PositionOnUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PositionOnUsers.
     */
    cursor?: PositionOnUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PositionOnUsers.
     */
    distinct?: PositionOnUserScalarFieldEnum | PositionOnUserScalarFieldEnum[]
  }

  /**
   * PositionOnUser findFirstOrThrow
   */
  export type PositionOnUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnUser to fetch.
     */
    where?: PositionOnUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnUsers to fetch.
     */
    orderBy?: PositionOnUserOrderByWithRelationInput | PositionOnUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PositionOnUsers.
     */
    cursor?: PositionOnUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PositionOnUsers.
     */
    distinct?: PositionOnUserScalarFieldEnum | PositionOnUserScalarFieldEnum[]
  }

  /**
   * PositionOnUser findMany
   */
  export type PositionOnUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * Filter, which PositionOnUsers to fetch.
     */
    where?: PositionOnUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionOnUsers to fetch.
     */
    orderBy?: PositionOnUserOrderByWithRelationInput | PositionOnUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PositionOnUsers.
     */
    cursor?: PositionOnUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionOnUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionOnUsers.
     */
    skip?: number
    distinct?: PositionOnUserScalarFieldEnum | PositionOnUserScalarFieldEnum[]
  }

  /**
   * PositionOnUser create
   */
  export type PositionOnUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * The data needed to create a PositionOnUser.
     */
    data: XOR<PositionOnUserCreateInput, PositionOnUserUncheckedCreateInput>
  }

  /**
   * PositionOnUser createMany
   */
  export type PositionOnUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PositionOnUsers.
     */
    data: PositionOnUserCreateManyInput | PositionOnUserCreateManyInput[]
  }

  /**
   * PositionOnUser createManyAndReturn
   */
  export type PositionOnUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * The data used to create many PositionOnUsers.
     */
    data: PositionOnUserCreateManyInput | PositionOnUserCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PositionOnUser update
   */
  export type PositionOnUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * The data needed to update a PositionOnUser.
     */
    data: XOR<PositionOnUserUpdateInput, PositionOnUserUncheckedUpdateInput>
    /**
     * Choose, which PositionOnUser to update.
     */
    where: PositionOnUserWhereUniqueInput
  }

  /**
   * PositionOnUser updateMany
   */
  export type PositionOnUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PositionOnUsers.
     */
    data: XOR<PositionOnUserUpdateManyMutationInput, PositionOnUserUncheckedUpdateManyInput>
    /**
     * Filter which PositionOnUsers to update
     */
    where?: PositionOnUserWhereInput
  }

  /**
   * PositionOnUser upsert
   */
  export type PositionOnUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * The filter to search for the PositionOnUser to update in case it exists.
     */
    where: PositionOnUserWhereUniqueInput
    /**
     * In case the PositionOnUser found by the `where` argument doesn't exist, create a new PositionOnUser with this data.
     */
    create: XOR<PositionOnUserCreateInput, PositionOnUserUncheckedCreateInput>
    /**
     * In case the PositionOnUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionOnUserUpdateInput, PositionOnUserUncheckedUpdateInput>
  }

  /**
   * PositionOnUser delete
   */
  export type PositionOnUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
    /**
     * Filter which PositionOnUser to delete.
     */
    where: PositionOnUserWhereUniqueInput
  }

  /**
   * PositionOnUser deleteMany
   */
  export type PositionOnUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PositionOnUsers to delete
     */
    where?: PositionOnUserWhereInput
  }

  /**
   * PositionOnUser without action
   */
  export type PositionOnUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionOnUser
     */
    select?: PositionOnUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionOnUser
     */
    omit?: PositionOnUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionOnUserInclude<ExtArgs> | null
  }


  /**
   * Model UserAccess
   */

  export type AggregateUserAccess = {
    _count: UserAccessCountAggregateOutputType | null
    _avg: UserAccessAvgAggregateOutputType | null
    _sum: UserAccessSumAggregateOutputType | null
    _min: UserAccessMinAggregateOutputType | null
    _max: UserAccessMaxAggregateOutputType | null
  }

  export type UserAccessAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    menuId: number | null
  }

  export type UserAccessSumAggregateOutputType = {
    id: number | null
    userId: number | null
    menuId: number | null
  }

  export type UserAccessMinAggregateOutputType = {
    id: number | null
    userId: number | null
    menuId: number | null
    hasAccess: boolean | null
  }

  export type UserAccessMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    menuId: number | null
    hasAccess: boolean | null
  }

  export type UserAccessCountAggregateOutputType = {
    id: number
    userId: number
    menuId: number
    hasAccess: number
    _all: number
  }


  export type UserAccessAvgAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
  }

  export type UserAccessSumAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
  }

  export type UserAccessMinAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
    hasAccess?: true
  }

  export type UserAccessMaxAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
    hasAccess?: true
  }

  export type UserAccessCountAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
    hasAccess?: true
    _all?: true
  }

  export type UserAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccess to aggregate.
     */
    where?: UserAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccesses to fetch.
     */
    orderBy?: UserAccessOrderByWithRelationInput | UserAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAccesses
    **/
    _count?: true | UserAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAccessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAccessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAccessMaxAggregateInputType
  }

  export type GetUserAccessAggregateType<T extends UserAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAccess[P]>
      : GetScalarType<T[P], AggregateUserAccess[P]>
  }




  export type UserAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccessWhereInput
    orderBy?: UserAccessOrderByWithAggregationInput | UserAccessOrderByWithAggregationInput[]
    by: UserAccessScalarFieldEnum[] | UserAccessScalarFieldEnum
    having?: UserAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAccessCountAggregateInputType | true
    _avg?: UserAccessAvgAggregateInputType
    _sum?: UserAccessSumAggregateInputType
    _min?: UserAccessMinAggregateInputType
    _max?: UserAccessMaxAggregateInputType
  }

  export type UserAccessGroupByOutputType = {
    id: number
    userId: number
    menuId: number
    hasAccess: boolean
    _count: UserAccessCountAggregateOutputType | null
    _avg: UserAccessAvgAggregateOutputType | null
    _sum: UserAccessSumAggregateOutputType | null
    _min: UserAccessMinAggregateOutputType | null
    _max: UserAccessMaxAggregateOutputType | null
  }

  type GetUserAccessGroupByPayload<T extends UserAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAccessGroupByOutputType[P]>
            : GetScalarType<T[P], UserAccessGroupByOutputType[P]>
        }
      >
    >


  export type UserAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    menuId?: boolean
    hasAccess?: boolean
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAccess"]>

  export type UserAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    menuId?: boolean
    hasAccess?: boolean
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAccess"]>


  export type UserAccessSelectScalar = {
    id?: boolean
    userId?: boolean
    menuId?: boolean
    hasAccess?: boolean
  }

  export type UserAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "menuId" | "hasAccess", ExtArgs["result"]["userAccess"]>
  export type UserAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Menu?: boolean | MenuDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAccess"
    objects: {
      Menu: Prisma.$MenuPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      menuId: number
      hasAccess: boolean
    }, ExtArgs["result"]["userAccess"]>
    composites: {}
  }

  type UserAccessGetPayload<S extends boolean | null | undefined | UserAccessDefaultArgs> = $Result.GetResult<Prisma.$UserAccessPayload, S>

  type UserAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAccessCountAggregateInputType | true
    }

  export interface UserAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAccess'], meta: { name: 'UserAccess' } }
    /**
     * Find zero or one UserAccess that matches the filter.
     * @param {UserAccessFindUniqueArgs} args - Arguments to find a UserAccess
     * @example
     * // Get one UserAccess
     * const userAccess = await prisma.userAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAccessFindUniqueArgs>(args: SelectSubset<T, UserAccessFindUniqueArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one UserAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAccessFindUniqueOrThrowArgs} args - Arguments to find a UserAccess
     * @example
     * // Get one UserAccess
     * const userAccess = await prisma.userAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first UserAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccessFindFirstArgs} args - Arguments to find a UserAccess
     * @example
     * // Get one UserAccess
     * const userAccess = await prisma.userAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAccessFindFirstArgs>(args?: SelectSubset<T, UserAccessFindFirstArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first UserAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccessFindFirstOrThrowArgs} args - Arguments to find a UserAccess
     * @example
     * // Get one UserAccess
     * const userAccess = await prisma.userAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more UserAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAccesses
     * const userAccesses = await prisma.userAccess.findMany()
     * 
     * // Get first 10 UserAccesses
     * const userAccesses = await prisma.userAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAccessWithIdOnly = await prisma.userAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAccessFindManyArgs>(args?: SelectSubset<T, UserAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a UserAccess.
     * @param {UserAccessCreateArgs} args - Arguments to create a UserAccess.
     * @example
     * // Create one UserAccess
     * const UserAccess = await prisma.userAccess.create({
     *   data: {
     *     // ... data to create a UserAccess
     *   }
     * })
     * 
     */
    create<T extends UserAccessCreateArgs>(args: SelectSubset<T, UserAccessCreateArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many UserAccesses.
     * @param {UserAccessCreateManyArgs} args - Arguments to create many UserAccesses.
     * @example
     * // Create many UserAccesses
     * const userAccess = await prisma.userAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAccessCreateManyArgs>(args?: SelectSubset<T, UserAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAccesses and returns the data saved in the database.
     * @param {UserAccessCreateManyAndReturnArgs} args - Arguments to create many UserAccesses.
     * @example
     * // Create many UserAccesses
     * const userAccess = await prisma.userAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAccesses and only return the `id`
     * const userAccessWithIdOnly = await prisma.userAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a UserAccess.
     * @param {UserAccessDeleteArgs} args - Arguments to delete one UserAccess.
     * @example
     * // Delete one UserAccess
     * const UserAccess = await prisma.userAccess.delete({
     *   where: {
     *     // ... filter to delete one UserAccess
     *   }
     * })
     * 
     */
    delete<T extends UserAccessDeleteArgs>(args: SelectSubset<T, UserAccessDeleteArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one UserAccess.
     * @param {UserAccessUpdateArgs} args - Arguments to update one UserAccess.
     * @example
     * // Update one UserAccess
     * const userAccess = await prisma.userAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAccessUpdateArgs>(args: SelectSubset<T, UserAccessUpdateArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more UserAccesses.
     * @param {UserAccessDeleteManyArgs} args - Arguments to filter UserAccesses to delete.
     * @example
     * // Delete a few UserAccesses
     * const { count } = await prisma.userAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAccessDeleteManyArgs>(args?: SelectSubset<T, UserAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAccesses
     * const userAccess = await prisma.userAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAccessUpdateManyArgs>(args: SelectSubset<T, UserAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAccess.
     * @param {UserAccessUpsertArgs} args - Arguments to update or create a UserAccess.
     * @example
     * // Update or create a UserAccess
     * const userAccess = await prisma.userAccess.upsert({
     *   create: {
     *     // ... data to create a UserAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAccess we want to update
     *   }
     * })
     */
    upsert<T extends UserAccessUpsertArgs>(args: SelectSubset<T, UserAccessUpsertArgs<ExtArgs>>): Prisma__UserAccessClient<$Result.GetResult<Prisma.$UserAccessPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of UserAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccessCountArgs} args - Arguments to filter UserAccesses to count.
     * @example
     * // Count the number of UserAccesses
     * const count = await prisma.userAccess.count({
     *   where: {
     *     // ... the filter for the UserAccesses we want to count
     *   }
     * })
    **/
    count<T extends UserAccessCountArgs>(
      args?: Subset<T, UserAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAccessAggregateArgs>(args: Subset<T, UserAccessAggregateArgs>): Prisma.PrismaPromise<GetUserAccessAggregateType<T>>

    /**
     * Group by UserAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAccessGroupByArgs['orderBy'] }
        : { orderBy?: UserAccessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAccess model
   */
  readonly fields: UserAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Menu<T extends MenuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenuDefaultArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAccess model
   */ 
  interface UserAccessFieldRefs {
    readonly id: FieldRef<"UserAccess", 'Int'>
    readonly userId: FieldRef<"UserAccess", 'Int'>
    readonly menuId: FieldRef<"UserAccess", 'Int'>
    readonly hasAccess: FieldRef<"UserAccess", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserAccess findUnique
   */
  export type UserAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserAccess to fetch.
     */
    where: UserAccessWhereUniqueInput
  }

  /**
   * UserAccess findUniqueOrThrow
   */
  export type UserAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserAccess to fetch.
     */
    where: UserAccessWhereUniqueInput
  }

  /**
   * UserAccess findFirst
   */
  export type UserAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserAccess to fetch.
     */
    where?: UserAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccesses to fetch.
     */
    orderBy?: UserAccessOrderByWithRelationInput | UserAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccesses.
     */
    cursor?: UserAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccesses.
     */
    distinct?: UserAccessScalarFieldEnum | UserAccessScalarFieldEnum[]
  }

  /**
   * UserAccess findFirstOrThrow
   */
  export type UserAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserAccess to fetch.
     */
    where?: UserAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccesses to fetch.
     */
    orderBy?: UserAccessOrderByWithRelationInput | UserAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccesses.
     */
    cursor?: UserAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccesses.
     */
    distinct?: UserAccessScalarFieldEnum | UserAccessScalarFieldEnum[]
  }

  /**
   * UserAccess findMany
   */
  export type UserAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserAccesses to fetch.
     */
    where?: UserAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccesses to fetch.
     */
    orderBy?: UserAccessOrderByWithRelationInput | UserAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAccesses.
     */
    cursor?: UserAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccesses.
     */
    skip?: number
    distinct?: UserAccessScalarFieldEnum | UserAccessScalarFieldEnum[]
  }

  /**
   * UserAccess create
   */
  export type UserAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAccess.
     */
    data: XOR<UserAccessCreateInput, UserAccessUncheckedCreateInput>
  }

  /**
   * UserAccess createMany
   */
  export type UserAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAccesses.
     */
    data: UserAccessCreateManyInput | UserAccessCreateManyInput[]
  }

  /**
   * UserAccess createManyAndReturn
   */
  export type UserAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * The data used to create many UserAccesses.
     */
    data: UserAccessCreateManyInput | UserAccessCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAccess update
   */
  export type UserAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAccess.
     */
    data: XOR<UserAccessUpdateInput, UserAccessUncheckedUpdateInput>
    /**
     * Choose, which UserAccess to update.
     */
    where: UserAccessWhereUniqueInput
  }

  /**
   * UserAccess updateMany
   */
  export type UserAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAccesses.
     */
    data: XOR<UserAccessUpdateManyMutationInput, UserAccessUncheckedUpdateManyInput>
    /**
     * Filter which UserAccesses to update
     */
    where?: UserAccessWhereInput
  }

  /**
   * UserAccess upsert
   */
  export type UserAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAccess to update in case it exists.
     */
    where: UserAccessWhereUniqueInput
    /**
     * In case the UserAccess found by the `where` argument doesn't exist, create a new UserAccess with this data.
     */
    create: XOR<UserAccessCreateInput, UserAccessUncheckedCreateInput>
    /**
     * In case the UserAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAccessUpdateInput, UserAccessUncheckedUpdateInput>
  }

  /**
   * UserAccess delete
   */
  export type UserAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
    /**
     * Filter which UserAccess to delete.
     */
    where: UserAccessWhereUniqueInput
  }

  /**
   * UserAccess deleteMany
   */
  export type UserAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccesses to delete
     */
    where?: UserAccessWhereInput
  }

  /**
   * UserAccess without action
   */
  export type UserAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccess
     */
    select?: UserAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccess
     */
    omit?: UserAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccessInclude<ExtArgs> | null
  }


  /**
   * Model UserLoginHistory
   */

  export type AggregateUserLoginHistory = {
    _count: UserLoginHistoryCountAggregateOutputType | null
    _avg: UserLoginHistoryAvgAggregateOutputType | null
    _sum: UserLoginHistorySumAggregateOutputType | null
    _min: UserLoginHistoryMinAggregateOutputType | null
    _max: UserLoginHistoryMaxAggregateOutputType | null
  }

  export type UserLoginHistoryAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserLoginHistorySumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserLoginHistoryMinAggregateOutputType = {
    id: number | null
    userId: number | null
    loginTime: Date | null
    logoutTime: Date | null
    ipAddress: string | null
    deviceInfo: string | null
    userAgent: string | null
    status: string | null
  }

  export type UserLoginHistoryMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    loginTime: Date | null
    logoutTime: Date | null
    ipAddress: string | null
    deviceInfo: string | null
    userAgent: string | null
    status: string | null
  }

  export type UserLoginHistoryCountAggregateOutputType = {
    id: number
    userId: number
    loginTime: number
    logoutTime: number
    ipAddress: number
    deviceInfo: number
    userAgent: number
    status: number
    _all: number
  }


  export type UserLoginHistoryAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserLoginHistorySumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserLoginHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    loginTime?: true
    logoutTime?: true
    ipAddress?: true
    deviceInfo?: true
    userAgent?: true
    status?: true
  }

  export type UserLoginHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    loginTime?: true
    logoutTime?: true
    ipAddress?: true
    deviceInfo?: true
    userAgent?: true
    status?: true
  }

  export type UserLoginHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    loginTime?: true
    logoutTime?: true
    ipAddress?: true
    deviceInfo?: true
    userAgent?: true
    status?: true
    _all?: true
  }

  export type UserLoginHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLoginHistory to aggregate.
     */
    where?: UserLoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLoginHistories to fetch.
     */
    orderBy?: UserLoginHistoryOrderByWithRelationInput | UserLoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserLoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLoginHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserLoginHistories
    **/
    _count?: true | UserLoginHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserLoginHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserLoginHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserLoginHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserLoginHistoryMaxAggregateInputType
  }

  export type GetUserLoginHistoryAggregateType<T extends UserLoginHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateUserLoginHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserLoginHistory[P]>
      : GetScalarType<T[P], AggregateUserLoginHistory[P]>
  }




  export type UserLoginHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLoginHistoryWhereInput
    orderBy?: UserLoginHistoryOrderByWithAggregationInput | UserLoginHistoryOrderByWithAggregationInput[]
    by: UserLoginHistoryScalarFieldEnum[] | UserLoginHistoryScalarFieldEnum
    having?: UserLoginHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserLoginHistoryCountAggregateInputType | true
    _avg?: UserLoginHistoryAvgAggregateInputType
    _sum?: UserLoginHistorySumAggregateInputType
    _min?: UserLoginHistoryMinAggregateInputType
    _max?: UserLoginHistoryMaxAggregateInputType
  }

  export type UserLoginHistoryGroupByOutputType = {
    id: number
    userId: number
    loginTime: Date
    logoutTime: Date | null
    ipAddress: string | null
    deviceInfo: string | null
    userAgent: string | null
    status: string
    _count: UserLoginHistoryCountAggregateOutputType | null
    _avg: UserLoginHistoryAvgAggregateOutputType | null
    _sum: UserLoginHistorySumAggregateOutputType | null
    _min: UserLoginHistoryMinAggregateOutputType | null
    _max: UserLoginHistoryMaxAggregateOutputType | null
  }

  type GetUserLoginHistoryGroupByPayload<T extends UserLoginHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserLoginHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserLoginHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserLoginHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], UserLoginHistoryGroupByOutputType[P]>
        }
      >
    >


  export type UserLoginHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    loginTime?: boolean
    logoutTime?: boolean
    ipAddress?: boolean
    deviceInfo?: boolean
    userAgent?: boolean
    status?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLoginHistory"]>

  export type UserLoginHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    loginTime?: boolean
    logoutTime?: boolean
    ipAddress?: boolean
    deviceInfo?: boolean
    userAgent?: boolean
    status?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLoginHistory"]>


  export type UserLoginHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    loginTime?: boolean
    logoutTime?: boolean
    ipAddress?: boolean
    deviceInfo?: boolean
    userAgent?: boolean
    status?: boolean
  }

  export type UserLoginHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "loginTime" | "logoutTime" | "ipAddress" | "deviceInfo" | "userAgent" | "status", ExtArgs["result"]["userLoginHistory"]>
  export type UserLoginHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserLoginHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserLoginHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserLoginHistory"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      loginTime: Date
      logoutTime: Date | null
      ipAddress: string | null
      deviceInfo: string | null
      userAgent: string | null
      status: string
    }, ExtArgs["result"]["userLoginHistory"]>
    composites: {}
  }

  type UserLoginHistoryGetPayload<S extends boolean | null | undefined | UserLoginHistoryDefaultArgs> = $Result.GetResult<Prisma.$UserLoginHistoryPayload, S>

  type UserLoginHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserLoginHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserLoginHistoryCountAggregateInputType | true
    }

  export interface UserLoginHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserLoginHistory'], meta: { name: 'UserLoginHistory' } }
    /**
     * Find zero or one UserLoginHistory that matches the filter.
     * @param {UserLoginHistoryFindUniqueArgs} args - Arguments to find a UserLoginHistory
     * @example
     * // Get one UserLoginHistory
     * const userLoginHistory = await prisma.userLoginHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserLoginHistoryFindUniqueArgs>(args: SelectSubset<T, UserLoginHistoryFindUniqueArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one UserLoginHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserLoginHistoryFindUniqueOrThrowArgs} args - Arguments to find a UserLoginHistory
     * @example
     * // Get one UserLoginHistory
     * const userLoginHistory = await prisma.userLoginHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserLoginHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, UserLoginHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first UserLoginHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLoginHistoryFindFirstArgs} args - Arguments to find a UserLoginHistory
     * @example
     * // Get one UserLoginHistory
     * const userLoginHistory = await prisma.userLoginHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserLoginHistoryFindFirstArgs>(args?: SelectSubset<T, UserLoginHistoryFindFirstArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first UserLoginHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLoginHistoryFindFirstOrThrowArgs} args - Arguments to find a UserLoginHistory
     * @example
     * // Get one UserLoginHistory
     * const userLoginHistory = await prisma.userLoginHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserLoginHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, UserLoginHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more UserLoginHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLoginHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserLoginHistories
     * const userLoginHistories = await prisma.userLoginHistory.findMany()
     * 
     * // Get first 10 UserLoginHistories
     * const userLoginHistories = await prisma.userLoginHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userLoginHistoryWithIdOnly = await prisma.userLoginHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserLoginHistoryFindManyArgs>(args?: SelectSubset<T, UserLoginHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a UserLoginHistory.
     * @param {UserLoginHistoryCreateArgs} args - Arguments to create a UserLoginHistory.
     * @example
     * // Create one UserLoginHistory
     * const UserLoginHistory = await prisma.userLoginHistory.create({
     *   data: {
     *     // ... data to create a UserLoginHistory
     *   }
     * })
     * 
     */
    create<T extends UserLoginHistoryCreateArgs>(args: SelectSubset<T, UserLoginHistoryCreateArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many UserLoginHistories.
     * @param {UserLoginHistoryCreateManyArgs} args - Arguments to create many UserLoginHistories.
     * @example
     * // Create many UserLoginHistories
     * const userLoginHistory = await prisma.userLoginHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserLoginHistoryCreateManyArgs>(args?: SelectSubset<T, UserLoginHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserLoginHistories and returns the data saved in the database.
     * @param {UserLoginHistoryCreateManyAndReturnArgs} args - Arguments to create many UserLoginHistories.
     * @example
     * // Create many UserLoginHistories
     * const userLoginHistory = await prisma.userLoginHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserLoginHistories and only return the `id`
     * const userLoginHistoryWithIdOnly = await prisma.userLoginHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserLoginHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, UserLoginHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a UserLoginHistory.
     * @param {UserLoginHistoryDeleteArgs} args - Arguments to delete one UserLoginHistory.
     * @example
     * // Delete one UserLoginHistory
     * const UserLoginHistory = await prisma.userLoginHistory.delete({
     *   where: {
     *     // ... filter to delete one UserLoginHistory
     *   }
     * })
     * 
     */
    delete<T extends UserLoginHistoryDeleteArgs>(args: SelectSubset<T, UserLoginHistoryDeleteArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one UserLoginHistory.
     * @param {UserLoginHistoryUpdateArgs} args - Arguments to update one UserLoginHistory.
     * @example
     * // Update one UserLoginHistory
     * const userLoginHistory = await prisma.userLoginHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserLoginHistoryUpdateArgs>(args: SelectSubset<T, UserLoginHistoryUpdateArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more UserLoginHistories.
     * @param {UserLoginHistoryDeleteManyArgs} args - Arguments to filter UserLoginHistories to delete.
     * @example
     * // Delete a few UserLoginHistories
     * const { count } = await prisma.userLoginHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserLoginHistoryDeleteManyArgs>(args?: SelectSubset<T, UserLoginHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLoginHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLoginHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserLoginHistories
     * const userLoginHistory = await prisma.userLoginHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserLoginHistoryUpdateManyArgs>(args: SelectSubset<T, UserLoginHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserLoginHistory.
     * @param {UserLoginHistoryUpsertArgs} args - Arguments to update or create a UserLoginHistory.
     * @example
     * // Update or create a UserLoginHistory
     * const userLoginHistory = await prisma.userLoginHistory.upsert({
     *   create: {
     *     // ... data to create a UserLoginHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserLoginHistory we want to update
     *   }
     * })
     */
    upsert<T extends UserLoginHistoryUpsertArgs>(args: SelectSubset<T, UserLoginHistoryUpsertArgs<ExtArgs>>): Prisma__UserLoginHistoryClient<$Result.GetResult<Prisma.$UserLoginHistoryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of UserLoginHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLoginHistoryCountArgs} args - Arguments to filter UserLoginHistories to count.
     * @example
     * // Count the number of UserLoginHistories
     * const count = await prisma.userLoginHistory.count({
     *   where: {
     *     // ... the filter for the UserLoginHistories we want to count
     *   }
     * })
    **/
    count<T extends UserLoginHistoryCountArgs>(
      args?: Subset<T, UserLoginHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserLoginHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserLoginHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLoginHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserLoginHistoryAggregateArgs>(args: Subset<T, UserLoginHistoryAggregateArgs>): Prisma.PrismaPromise<GetUserLoginHistoryAggregateType<T>>

    /**
     * Group by UserLoginHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLoginHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserLoginHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserLoginHistoryGroupByArgs['orderBy'] }
        : { orderBy?: UserLoginHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserLoginHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLoginHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserLoginHistory model
   */
  readonly fields: UserLoginHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserLoginHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserLoginHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserLoginHistory model
   */ 
  interface UserLoginHistoryFieldRefs {
    readonly id: FieldRef<"UserLoginHistory", 'Int'>
    readonly userId: FieldRef<"UserLoginHistory", 'Int'>
    readonly loginTime: FieldRef<"UserLoginHistory", 'DateTime'>
    readonly logoutTime: FieldRef<"UserLoginHistory", 'DateTime'>
    readonly ipAddress: FieldRef<"UserLoginHistory", 'String'>
    readonly deviceInfo: FieldRef<"UserLoginHistory", 'String'>
    readonly userAgent: FieldRef<"UserLoginHistory", 'String'>
    readonly status: FieldRef<"UserLoginHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserLoginHistory findUnique
   */
  export type UserLoginHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserLoginHistory to fetch.
     */
    where: UserLoginHistoryWhereUniqueInput
  }

  /**
   * UserLoginHistory findUniqueOrThrow
   */
  export type UserLoginHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserLoginHistory to fetch.
     */
    where: UserLoginHistoryWhereUniqueInput
  }

  /**
   * UserLoginHistory findFirst
   */
  export type UserLoginHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserLoginHistory to fetch.
     */
    where?: UserLoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLoginHistories to fetch.
     */
    orderBy?: UserLoginHistoryOrderByWithRelationInput | UserLoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLoginHistories.
     */
    cursor?: UserLoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLoginHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLoginHistories.
     */
    distinct?: UserLoginHistoryScalarFieldEnum | UserLoginHistoryScalarFieldEnum[]
  }

  /**
   * UserLoginHistory findFirstOrThrow
   */
  export type UserLoginHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserLoginHistory to fetch.
     */
    where?: UserLoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLoginHistories to fetch.
     */
    orderBy?: UserLoginHistoryOrderByWithRelationInput | UserLoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLoginHistories.
     */
    cursor?: UserLoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLoginHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLoginHistories.
     */
    distinct?: UserLoginHistoryScalarFieldEnum | UserLoginHistoryScalarFieldEnum[]
  }

  /**
   * UserLoginHistory findMany
   */
  export type UserLoginHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserLoginHistories to fetch.
     */
    where?: UserLoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLoginHistories to fetch.
     */
    orderBy?: UserLoginHistoryOrderByWithRelationInput | UserLoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserLoginHistories.
     */
    cursor?: UserLoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLoginHistories.
     */
    skip?: number
    distinct?: UserLoginHistoryScalarFieldEnum | UserLoginHistoryScalarFieldEnum[]
  }

  /**
   * UserLoginHistory create
   */
  export type UserLoginHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a UserLoginHistory.
     */
    data: XOR<UserLoginHistoryCreateInput, UserLoginHistoryUncheckedCreateInput>
  }

  /**
   * UserLoginHistory createMany
   */
  export type UserLoginHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserLoginHistories.
     */
    data: UserLoginHistoryCreateManyInput | UserLoginHistoryCreateManyInput[]
  }

  /**
   * UserLoginHistory createManyAndReturn
   */
  export type UserLoginHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many UserLoginHistories.
     */
    data: UserLoginHistoryCreateManyInput | UserLoginHistoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserLoginHistory update
   */
  export type UserLoginHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a UserLoginHistory.
     */
    data: XOR<UserLoginHistoryUpdateInput, UserLoginHistoryUncheckedUpdateInput>
    /**
     * Choose, which UserLoginHistory to update.
     */
    where: UserLoginHistoryWhereUniqueInput
  }

  /**
   * UserLoginHistory updateMany
   */
  export type UserLoginHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserLoginHistories.
     */
    data: XOR<UserLoginHistoryUpdateManyMutationInput, UserLoginHistoryUncheckedUpdateManyInput>
    /**
     * Filter which UserLoginHistories to update
     */
    where?: UserLoginHistoryWhereInput
  }

  /**
   * UserLoginHistory upsert
   */
  export type UserLoginHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the UserLoginHistory to update in case it exists.
     */
    where: UserLoginHistoryWhereUniqueInput
    /**
     * In case the UserLoginHistory found by the `where` argument doesn't exist, create a new UserLoginHistory with this data.
     */
    create: XOR<UserLoginHistoryCreateInput, UserLoginHistoryUncheckedCreateInput>
    /**
     * In case the UserLoginHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserLoginHistoryUpdateInput, UserLoginHistoryUncheckedUpdateInput>
  }

  /**
   * UserLoginHistory delete
   */
  export type UserLoginHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
    /**
     * Filter which UserLoginHistory to delete.
     */
    where: UserLoginHistoryWhereUniqueInput
  }

  /**
   * UserLoginHistory deleteMany
   */
  export type UserLoginHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLoginHistories to delete
     */
    where?: UserLoginHistoryWhereInput
  }

  /**
   * UserLoginHistory without action
   */
  export type UserLoginHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginHistory
     */
    select?: UserLoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLoginHistory
     */
    omit?: UserLoginHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLoginHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MenuScalarFieldEnum: {
    id: 'id',
    title: 'title',
    title_fa: 'title_fa',
    active: 'active',
    general: 'general',
    slug: 'slug',
    parentId: 'parentId'
  };

  export type MenuScalarFieldEnum = (typeof MenuScalarFieldEnum)[keyof typeof MenuScalarFieldEnum]


  export const PositionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    title_fa: 'title_fa',
    req_license: 'req_license'
  };

  export type PositionScalarFieldEnum = (typeof PositionScalarFieldEnum)[keyof typeof PositionScalarFieldEnum]


  export const AccessLevelScalarFieldEnum: {
    id: 'id',
    positionId: 'positionId',
    menuId: 'menuId',
    hasAccess: 'hasAccess'
  };

  export type AccessLevelScalarFieldEnum = (typeof AccessLevelScalarFieldEnum)[keyof typeof AccessLevelScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    mobile: 'mobile',
    endDate: 'endDate',
    gender: 'gender',
    username: 'username',
    password: 'password',
    createdAt: 'createdAt',
    userId: 'userId',
    introdPathLetter: 'introdPathLetter',
    letterIssuer: 'letterIssuer',
    letterNumber: 'letterNumber',
    letterDate: 'letterDate',
    letterApprover: 'letterApprover',
    isRegistered: 'isRegistered'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const PositionOnInvitationScalarFieldEnum: {
    id: 'id',
    invitationId: 'invitationId',
    positionId: 'positionId'
  };

  export type PositionOnInvitationScalarFieldEnum = (typeof PositionOnInvitationScalarFieldEnum)[keyof typeof PositionOnInvitationScalarFieldEnum]


  export const InvitationAccessScalarFieldEnum: {
    id: 'id',
    invitationId: 'invitationId',
    menuId: 'menuId',
    hasAccess: 'hasAccess'
  };

  export type InvitationAccessScalarFieldEnum = (typeof InvitationAccessScalarFieldEnum)[keyof typeof InvitationAccessScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    mobile: 'mobile',
    email: 'email',
    gender: 'gender',
    inviterId: 'inviterId',
    invitationTime: 'invitationTime',
    registrationTime: 'registrationTime',
    endDate: 'endDate',
    active: 'active',
    introdPathLetter: 'introdPathLetter',
    letterIssuer: 'letterIssuer',
    letterNumber: 'letterNumber',
    letterDate: 'letterDate',
    letterApprover: 'letterApprover',
    userName: 'userName',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PositionOnUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    positionId: 'positionId'
  };

  export type PositionOnUserScalarFieldEnum = (typeof PositionOnUserScalarFieldEnum)[keyof typeof PositionOnUserScalarFieldEnum]


  export const UserAccessScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    menuId: 'menuId',
    hasAccess: 'hasAccess'
  };

  export type UserAccessScalarFieldEnum = (typeof UserAccessScalarFieldEnum)[keyof typeof UserAccessScalarFieldEnum]


  export const UserLoginHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    loginTime: 'loginTime',
    logoutTime: 'logoutTime',
    ipAddress: 'ipAddress',
    deviceInfo: 'deviceInfo',
    userAgent: 'userAgent',
    status: 'status'
  };

  export type UserLoginHistoryScalarFieldEnum = (typeof UserLoginHistoryScalarFieldEnum)[keyof typeof UserLoginHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type MenuWhereInput = {
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    id?: IntFilter<"Menu"> | number
    title?: StringFilter<"Menu"> | string
    title_fa?: StringFilter<"Menu"> | string
    active?: BoolFilter<"Menu"> | boolean
    general?: BoolFilter<"Menu"> | boolean
    slug?: StringFilter<"Menu"> | string
    parentId?: IntNullableFilter<"Menu"> | number | null
    AccessLevel?: AccessLevelListRelationFilter
    invitationAccess?: InvitationAccessListRelationFilter
    parent?: XOR<MenuNullableScalarRelationFilter, MenuWhereInput> | null
    children?: MenuListRelationFilter
    userAccess?: UserAccessListRelationFilter
  }

  export type MenuOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    active?: SortOrder
    general?: SortOrder
    slug?: SortOrder
    parentId?: SortOrderInput | SortOrder
    AccessLevel?: AccessLevelOrderByRelationAggregateInput
    invitationAccess?: InvitationAccessOrderByRelationAggregateInput
    parent?: MenuOrderByWithRelationInput
    children?: MenuOrderByRelationAggregateInput
    userAccess?: UserAccessOrderByRelationAggregateInput
  }

  export type MenuWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    title?: StringFilter<"Menu"> | string
    title_fa?: StringFilter<"Menu"> | string
    active?: BoolFilter<"Menu"> | boolean
    general?: BoolFilter<"Menu"> | boolean
    parentId?: IntNullableFilter<"Menu"> | number | null
    AccessLevel?: AccessLevelListRelationFilter
    invitationAccess?: InvitationAccessListRelationFilter
    parent?: XOR<MenuNullableScalarRelationFilter, MenuWhereInput> | null
    children?: MenuListRelationFilter
    userAccess?: UserAccessListRelationFilter
  }, "id" | "slug">

  export type MenuOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    active?: SortOrder
    general?: SortOrder
    slug?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: MenuCountOrderByAggregateInput
    _avg?: MenuAvgOrderByAggregateInput
    _max?: MenuMaxOrderByAggregateInput
    _min?: MenuMinOrderByAggregateInput
    _sum?: MenuSumOrderByAggregateInput
  }

  export type MenuScalarWhereWithAggregatesInput = {
    AND?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    OR?: MenuScalarWhereWithAggregatesInput[]
    NOT?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Menu"> | number
    title?: StringWithAggregatesFilter<"Menu"> | string
    title_fa?: StringWithAggregatesFilter<"Menu"> | string
    active?: BoolWithAggregatesFilter<"Menu"> | boolean
    general?: BoolWithAggregatesFilter<"Menu"> | boolean
    slug?: StringWithAggregatesFilter<"Menu"> | string
    parentId?: IntNullableWithAggregatesFilter<"Menu"> | number | null
  }

  export type PositionWhereInput = {
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    id?: IntFilter<"Position"> | number
    title?: StringFilter<"Position"> | string
    title_fa?: StringFilter<"Position"> | string
    req_license?: BoolFilter<"Position"> | boolean
    accessLevels?: AccessLevelListRelationFilter
    invitations?: PositionOnInvitationListRelationFilter
    users?: PositionOnUserListRelationFilter
  }

  export type PositionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    req_license?: SortOrder
    accessLevels?: AccessLevelOrderByRelationAggregateInput
    invitations?: PositionOnInvitationOrderByRelationAggregateInput
    users?: PositionOnUserOrderByRelationAggregateInput
  }

  export type PositionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    title?: StringFilter<"Position"> | string
    title_fa?: StringFilter<"Position"> | string
    req_license?: BoolFilter<"Position"> | boolean
    accessLevels?: AccessLevelListRelationFilter
    invitations?: PositionOnInvitationListRelationFilter
    users?: PositionOnUserListRelationFilter
  }, "id">

  export type PositionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    req_license?: SortOrder
    _count?: PositionCountOrderByAggregateInput
    _avg?: PositionAvgOrderByAggregateInput
    _max?: PositionMaxOrderByAggregateInput
    _min?: PositionMinOrderByAggregateInput
    _sum?: PositionSumOrderByAggregateInput
  }

  export type PositionScalarWhereWithAggregatesInput = {
    AND?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    OR?: PositionScalarWhereWithAggregatesInput[]
    NOT?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Position"> | number
    title?: StringWithAggregatesFilter<"Position"> | string
    title_fa?: StringWithAggregatesFilter<"Position"> | string
    req_license?: BoolWithAggregatesFilter<"Position"> | boolean
  }

  export type AccessLevelWhereInput = {
    AND?: AccessLevelWhereInput | AccessLevelWhereInput[]
    OR?: AccessLevelWhereInput[]
    NOT?: AccessLevelWhereInput | AccessLevelWhereInput[]
    id?: IntFilter<"AccessLevel"> | number
    positionId?: IntFilter<"AccessLevel"> | number
    menuId?: IntFilter<"AccessLevel"> | number
    hasAccess?: BoolFilter<"AccessLevel"> | boolean
    menu?: XOR<MenuScalarRelationFilter, MenuWhereInput>
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }

  export type AccessLevelOrderByWithRelationInput = {
    id?: SortOrder
    positionId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
    menu?: MenuOrderByWithRelationInput
    position?: PositionOrderByWithRelationInput
  }

  export type AccessLevelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AccessLevelWhereInput | AccessLevelWhereInput[]
    OR?: AccessLevelWhereInput[]
    NOT?: AccessLevelWhereInput | AccessLevelWhereInput[]
    positionId?: IntFilter<"AccessLevel"> | number
    menuId?: IntFilter<"AccessLevel"> | number
    hasAccess?: BoolFilter<"AccessLevel"> | boolean
    menu?: XOR<MenuScalarRelationFilter, MenuWhereInput>
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }, "id">

  export type AccessLevelOrderByWithAggregationInput = {
    id?: SortOrder
    positionId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
    _count?: AccessLevelCountOrderByAggregateInput
    _avg?: AccessLevelAvgOrderByAggregateInput
    _max?: AccessLevelMaxOrderByAggregateInput
    _min?: AccessLevelMinOrderByAggregateInput
    _sum?: AccessLevelSumOrderByAggregateInput
  }

  export type AccessLevelScalarWhereWithAggregatesInput = {
    AND?: AccessLevelScalarWhereWithAggregatesInput | AccessLevelScalarWhereWithAggregatesInput[]
    OR?: AccessLevelScalarWhereWithAggregatesInput[]
    NOT?: AccessLevelScalarWhereWithAggregatesInput | AccessLevelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AccessLevel"> | number
    positionId?: IntWithAggregatesFilter<"AccessLevel"> | number
    menuId?: IntWithAggregatesFilter<"AccessLevel"> | number
    hasAccess?: BoolWithAggregatesFilter<"AccessLevel"> | boolean
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: IntFilter<"Invitation"> | number
    firstName?: StringNullableFilter<"Invitation"> | string | null
    lastName?: StringFilter<"Invitation"> | string
    mobile?: StringFilter<"Invitation"> | string
    endDate?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    gender?: StringNullableFilter<"Invitation"> | string | null
    username?: StringFilter<"Invitation"> | string
    password?: StringFilter<"Invitation"> | string
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    userId?: IntNullableFilter<"Invitation"> | number | null
    introdPathLetter?: StringNullableFilter<"Invitation"> | string | null
    letterIssuer?: StringNullableFilter<"Invitation"> | string | null
    letterNumber?: StringNullableFilter<"Invitation"> | string | null
    letterDate?: StringNullableFilter<"Invitation"> | string | null
    letterApprover?: StringNullableFilter<"Invitation"> | string | null
    isRegistered?: BoolFilter<"Invitation"> | boolean
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    accessLevels?: InvitationAccessListRelationFilter
    positions?: PositionOnInvitationListRelationFilter
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    endDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    introdPathLetter?: SortOrderInput | SortOrder
    letterIssuer?: SortOrderInput | SortOrder
    letterNumber?: SortOrderInput | SortOrder
    letterDate?: SortOrderInput | SortOrder
    letterApprover?: SortOrderInput | SortOrder
    isRegistered?: SortOrder
    user?: UserOrderByWithRelationInput
    accessLevels?: InvitationAccessOrderByRelationAggregateInput
    positions?: PositionOnInvitationOrderByRelationAggregateInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    mobile?: string
    username?: string
    userId?: number
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    firstName?: StringNullableFilter<"Invitation"> | string | null
    lastName?: StringFilter<"Invitation"> | string
    endDate?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    gender?: StringNullableFilter<"Invitation"> | string | null
    password?: StringFilter<"Invitation"> | string
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    introdPathLetter?: StringNullableFilter<"Invitation"> | string | null
    letterIssuer?: StringNullableFilter<"Invitation"> | string | null
    letterNumber?: StringNullableFilter<"Invitation"> | string | null
    letterDate?: StringNullableFilter<"Invitation"> | string | null
    letterApprover?: StringNullableFilter<"Invitation"> | string | null
    isRegistered?: BoolFilter<"Invitation"> | boolean
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    accessLevels?: InvitationAccessListRelationFilter
    positions?: PositionOnInvitationListRelationFilter
  }, "id" | "mobile" | "username" | "userId">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    endDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    introdPathLetter?: SortOrderInput | SortOrder
    letterIssuer?: SortOrderInput | SortOrder
    letterNumber?: SortOrderInput | SortOrder
    letterDate?: SortOrderInput | SortOrder
    letterApprover?: SortOrderInput | SortOrder
    isRegistered?: SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _avg?: InvitationAvgOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
    _sum?: InvitationSumOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Invitation"> | number
    firstName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    lastName?: StringWithAggregatesFilter<"Invitation"> | string
    mobile?: StringWithAggregatesFilter<"Invitation"> | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Invitation"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    username?: StringWithAggregatesFilter<"Invitation"> | string
    password?: StringWithAggregatesFilter<"Invitation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    userId?: IntNullableWithAggregatesFilter<"Invitation"> | number | null
    introdPathLetter?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    letterIssuer?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    letterNumber?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    letterDate?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    letterApprover?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    isRegistered?: BoolWithAggregatesFilter<"Invitation"> | boolean
  }

  export type PositionOnInvitationWhereInput = {
    AND?: PositionOnInvitationWhereInput | PositionOnInvitationWhereInput[]
    OR?: PositionOnInvitationWhereInput[]
    NOT?: PositionOnInvitationWhereInput | PositionOnInvitationWhereInput[]
    id?: IntFilter<"PositionOnInvitation"> | number
    invitationId?: IntFilter<"PositionOnInvitation"> | number
    positionId?: IntFilter<"PositionOnInvitation"> | number
    Position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
    Invitation?: XOR<InvitationScalarRelationFilter, InvitationWhereInput>
  }

  export type PositionOnInvitationOrderByWithRelationInput = {
    id?: SortOrder
    invitationId?: SortOrder
    positionId?: SortOrder
    Position?: PositionOrderByWithRelationInput
    Invitation?: InvitationOrderByWithRelationInput
  }

  export type PositionOnInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PositionOnInvitationWhereInput | PositionOnInvitationWhereInput[]
    OR?: PositionOnInvitationWhereInput[]
    NOT?: PositionOnInvitationWhereInput | PositionOnInvitationWhereInput[]
    invitationId?: IntFilter<"PositionOnInvitation"> | number
    positionId?: IntFilter<"PositionOnInvitation"> | number
    Position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
    Invitation?: XOR<InvitationScalarRelationFilter, InvitationWhereInput>
  }, "id">

  export type PositionOnInvitationOrderByWithAggregationInput = {
    id?: SortOrder
    invitationId?: SortOrder
    positionId?: SortOrder
    _count?: PositionOnInvitationCountOrderByAggregateInput
    _avg?: PositionOnInvitationAvgOrderByAggregateInput
    _max?: PositionOnInvitationMaxOrderByAggregateInput
    _min?: PositionOnInvitationMinOrderByAggregateInput
    _sum?: PositionOnInvitationSumOrderByAggregateInput
  }

  export type PositionOnInvitationScalarWhereWithAggregatesInput = {
    AND?: PositionOnInvitationScalarWhereWithAggregatesInput | PositionOnInvitationScalarWhereWithAggregatesInput[]
    OR?: PositionOnInvitationScalarWhereWithAggregatesInput[]
    NOT?: PositionOnInvitationScalarWhereWithAggregatesInput | PositionOnInvitationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PositionOnInvitation"> | number
    invitationId?: IntWithAggregatesFilter<"PositionOnInvitation"> | number
    positionId?: IntWithAggregatesFilter<"PositionOnInvitation"> | number
  }

  export type InvitationAccessWhereInput = {
    AND?: InvitationAccessWhereInput | InvitationAccessWhereInput[]
    OR?: InvitationAccessWhereInput[]
    NOT?: InvitationAccessWhereInput | InvitationAccessWhereInput[]
    id?: IntFilter<"InvitationAccess"> | number
    invitationId?: IntFilter<"InvitationAccess"> | number
    menuId?: IntFilter<"InvitationAccess"> | number
    hasAccess?: BoolFilter<"InvitationAccess"> | boolean
    Menu?: XOR<MenuScalarRelationFilter, MenuWhereInput>
    Invitation?: XOR<InvitationScalarRelationFilter, InvitationWhereInput>
  }

  export type InvitationAccessOrderByWithRelationInput = {
    id?: SortOrder
    invitationId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
    Menu?: MenuOrderByWithRelationInput
    Invitation?: InvitationOrderByWithRelationInput
  }

  export type InvitationAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvitationAccessWhereInput | InvitationAccessWhereInput[]
    OR?: InvitationAccessWhereInput[]
    NOT?: InvitationAccessWhereInput | InvitationAccessWhereInput[]
    invitationId?: IntFilter<"InvitationAccess"> | number
    menuId?: IntFilter<"InvitationAccess"> | number
    hasAccess?: BoolFilter<"InvitationAccess"> | boolean
    Menu?: XOR<MenuScalarRelationFilter, MenuWhereInput>
    Invitation?: XOR<InvitationScalarRelationFilter, InvitationWhereInput>
  }, "id">

  export type InvitationAccessOrderByWithAggregationInput = {
    id?: SortOrder
    invitationId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
    _count?: InvitationAccessCountOrderByAggregateInput
    _avg?: InvitationAccessAvgOrderByAggregateInput
    _max?: InvitationAccessMaxOrderByAggregateInput
    _min?: InvitationAccessMinOrderByAggregateInput
    _sum?: InvitationAccessSumOrderByAggregateInput
  }

  export type InvitationAccessScalarWhereWithAggregatesInput = {
    AND?: InvitationAccessScalarWhereWithAggregatesInput | InvitationAccessScalarWhereWithAggregatesInput[]
    OR?: InvitationAccessScalarWhereWithAggregatesInput[]
    NOT?: InvitationAccessScalarWhereWithAggregatesInput | InvitationAccessScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvitationAccess"> | number
    invitationId?: IntWithAggregatesFilter<"InvitationAccess"> | number
    menuId?: IntWithAggregatesFilter<"InvitationAccess"> | number
    hasAccess?: BoolWithAggregatesFilter<"InvitationAccess"> | boolean
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    mobile?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    gender?: StringFilter<"User"> | string
    inviterId?: IntNullableFilter<"User"> | number | null
    invitationTime?: DateTimeFilter<"User"> | Date | string
    registrationTime?: DateTimeFilter<"User"> | Date | string
    endDate?: DateTimeNullableFilter<"User"> | Date | string | null
    active?: BoolFilter<"User"> | boolean
    introdPathLetter?: StringNullableFilter<"User"> | string | null
    letterIssuer?: StringNullableFilter<"User"> | string | null
    letterNumber?: StringNullableFilter<"User"> | string | null
    letterDate?: StringNullableFilter<"User"> | string | null
    letterApprover?: StringNullableFilter<"User"> | string | null
    userName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    invitations?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
    positions?: PositionOnUserListRelationFilter
    accessLevels?: UserAccessListRelationFilter
    loginHistories?: UserLoginHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    mobile?: SortOrder
    email?: SortOrderInput | SortOrder
    gender?: SortOrder
    inviterId?: SortOrderInput | SortOrder
    invitationTime?: SortOrder
    registrationTime?: SortOrder
    endDate?: SortOrderInput | SortOrder
    active?: SortOrder
    introdPathLetter?: SortOrderInput | SortOrder
    letterIssuer?: SortOrderInput | SortOrder
    letterNumber?: SortOrderInput | SortOrder
    letterDate?: SortOrderInput | SortOrder
    letterApprover?: SortOrderInput | SortOrder
    userName?: SortOrder
    password?: SortOrder
    invitations?: InvitationOrderByWithRelationInput
    positions?: PositionOnUserOrderByRelationAggregateInput
    accessLevels?: UserAccessOrderByRelationAggregateInput
    loginHistories?: UserLoginHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    mobile?: string
    email?: string
    userName?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    gender?: StringFilter<"User"> | string
    inviterId?: IntNullableFilter<"User"> | number | null
    invitationTime?: DateTimeFilter<"User"> | Date | string
    registrationTime?: DateTimeFilter<"User"> | Date | string
    endDate?: DateTimeNullableFilter<"User"> | Date | string | null
    active?: BoolFilter<"User"> | boolean
    introdPathLetter?: StringNullableFilter<"User"> | string | null
    letterIssuer?: StringNullableFilter<"User"> | string | null
    letterNumber?: StringNullableFilter<"User"> | string | null
    letterDate?: StringNullableFilter<"User"> | string | null
    letterApprover?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    invitations?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
    positions?: PositionOnUserListRelationFilter
    accessLevels?: UserAccessListRelationFilter
    loginHistories?: UserLoginHistoryListRelationFilter
  }, "id" | "mobile" | "email" | "userName">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    mobile?: SortOrder
    email?: SortOrderInput | SortOrder
    gender?: SortOrder
    inviterId?: SortOrderInput | SortOrder
    invitationTime?: SortOrder
    registrationTime?: SortOrder
    endDate?: SortOrderInput | SortOrder
    active?: SortOrder
    introdPathLetter?: SortOrderInput | SortOrder
    letterIssuer?: SortOrderInput | SortOrder
    letterNumber?: SortOrderInput | SortOrder
    letterDate?: SortOrderInput | SortOrder
    letterApprover?: SortOrderInput | SortOrder
    userName?: SortOrder
    password?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    first_name?: StringWithAggregatesFilter<"User"> | string
    last_name?: StringWithAggregatesFilter<"User"> | string
    mobile?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: StringWithAggregatesFilter<"User"> | string
    inviterId?: IntNullableWithAggregatesFilter<"User"> | number | null
    invitationTime?: DateTimeWithAggregatesFilter<"User"> | Date | string
    registrationTime?: DateTimeWithAggregatesFilter<"User"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    active?: BoolWithAggregatesFilter<"User"> | boolean
    introdPathLetter?: StringNullableWithAggregatesFilter<"User"> | string | null
    letterIssuer?: StringNullableWithAggregatesFilter<"User"> | string | null
    letterNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    letterDate?: StringNullableWithAggregatesFilter<"User"> | string | null
    letterApprover?: StringNullableWithAggregatesFilter<"User"> | string | null
    userName?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
  }

  export type PositionOnUserWhereInput = {
    AND?: PositionOnUserWhereInput | PositionOnUserWhereInput[]
    OR?: PositionOnUserWhereInput[]
    NOT?: PositionOnUserWhereInput | PositionOnUserWhereInput[]
    id?: IntFilter<"PositionOnUser"> | number
    userId?: IntFilter<"PositionOnUser"> | number
    positionId?: IntFilter<"PositionOnUser"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }

  export type PositionOnUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    positionId?: SortOrder
    user?: UserOrderByWithRelationInput
    Position?: PositionOrderByWithRelationInput
  }

  export type PositionOnUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PositionOnUserWhereInput | PositionOnUserWhereInput[]
    OR?: PositionOnUserWhereInput[]
    NOT?: PositionOnUserWhereInput | PositionOnUserWhereInput[]
    userId?: IntFilter<"PositionOnUser"> | number
    positionId?: IntFilter<"PositionOnUser"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }, "id">

  export type PositionOnUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    positionId?: SortOrder
    _count?: PositionOnUserCountOrderByAggregateInput
    _avg?: PositionOnUserAvgOrderByAggregateInput
    _max?: PositionOnUserMaxOrderByAggregateInput
    _min?: PositionOnUserMinOrderByAggregateInput
    _sum?: PositionOnUserSumOrderByAggregateInput
  }

  export type PositionOnUserScalarWhereWithAggregatesInput = {
    AND?: PositionOnUserScalarWhereWithAggregatesInput | PositionOnUserScalarWhereWithAggregatesInput[]
    OR?: PositionOnUserScalarWhereWithAggregatesInput[]
    NOT?: PositionOnUserScalarWhereWithAggregatesInput | PositionOnUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PositionOnUser"> | number
    userId?: IntWithAggregatesFilter<"PositionOnUser"> | number
    positionId?: IntWithAggregatesFilter<"PositionOnUser"> | number
  }

  export type UserAccessWhereInput = {
    AND?: UserAccessWhereInput | UserAccessWhereInput[]
    OR?: UserAccessWhereInput[]
    NOT?: UserAccessWhereInput | UserAccessWhereInput[]
    id?: IntFilter<"UserAccess"> | number
    userId?: IntFilter<"UserAccess"> | number
    menuId?: IntFilter<"UserAccess"> | number
    hasAccess?: BoolFilter<"UserAccess"> | boolean
    Menu?: XOR<MenuScalarRelationFilter, MenuWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserAccessOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
    Menu?: MenuOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserAccessWhereInput | UserAccessWhereInput[]
    OR?: UserAccessWhereInput[]
    NOT?: UserAccessWhereInput | UserAccessWhereInput[]
    userId?: IntFilter<"UserAccess"> | number
    menuId?: IntFilter<"UserAccess"> | number
    hasAccess?: BoolFilter<"UserAccess"> | boolean
    Menu?: XOR<MenuScalarRelationFilter, MenuWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserAccessOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
    _count?: UserAccessCountOrderByAggregateInput
    _avg?: UserAccessAvgOrderByAggregateInput
    _max?: UserAccessMaxOrderByAggregateInput
    _min?: UserAccessMinOrderByAggregateInput
    _sum?: UserAccessSumOrderByAggregateInput
  }

  export type UserAccessScalarWhereWithAggregatesInput = {
    AND?: UserAccessScalarWhereWithAggregatesInput | UserAccessScalarWhereWithAggregatesInput[]
    OR?: UserAccessScalarWhereWithAggregatesInput[]
    NOT?: UserAccessScalarWhereWithAggregatesInput | UserAccessScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserAccess"> | number
    userId?: IntWithAggregatesFilter<"UserAccess"> | number
    menuId?: IntWithAggregatesFilter<"UserAccess"> | number
    hasAccess?: BoolWithAggregatesFilter<"UserAccess"> | boolean
  }

  export type UserLoginHistoryWhereInput = {
    AND?: UserLoginHistoryWhereInput | UserLoginHistoryWhereInput[]
    OR?: UserLoginHistoryWhereInput[]
    NOT?: UserLoginHistoryWhereInput | UserLoginHistoryWhereInput[]
    id?: IntFilter<"UserLoginHistory"> | number
    userId?: IntFilter<"UserLoginHistory"> | number
    loginTime?: DateTimeFilter<"UserLoginHistory"> | Date | string
    logoutTime?: DateTimeNullableFilter<"UserLoginHistory"> | Date | string | null
    ipAddress?: StringNullableFilter<"UserLoginHistory"> | string | null
    deviceInfo?: StringNullableFilter<"UserLoginHistory"> | string | null
    userAgent?: StringNullableFilter<"UserLoginHistory"> | string | null
    status?: StringFilter<"UserLoginHistory"> | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserLoginHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    loginTime?: SortOrder
    logoutTime?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    status?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type UserLoginHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserLoginHistoryWhereInput | UserLoginHistoryWhereInput[]
    OR?: UserLoginHistoryWhereInput[]
    NOT?: UserLoginHistoryWhereInput | UserLoginHistoryWhereInput[]
    userId?: IntFilter<"UserLoginHistory"> | number
    loginTime?: DateTimeFilter<"UserLoginHistory"> | Date | string
    logoutTime?: DateTimeNullableFilter<"UserLoginHistory"> | Date | string | null
    ipAddress?: StringNullableFilter<"UserLoginHistory"> | string | null
    deviceInfo?: StringNullableFilter<"UserLoginHistory"> | string | null
    userAgent?: StringNullableFilter<"UserLoginHistory"> | string | null
    status?: StringFilter<"UserLoginHistory"> | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserLoginHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    loginTime?: SortOrder
    logoutTime?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: UserLoginHistoryCountOrderByAggregateInput
    _avg?: UserLoginHistoryAvgOrderByAggregateInput
    _max?: UserLoginHistoryMaxOrderByAggregateInput
    _min?: UserLoginHistoryMinOrderByAggregateInput
    _sum?: UserLoginHistorySumOrderByAggregateInput
  }

  export type UserLoginHistoryScalarWhereWithAggregatesInput = {
    AND?: UserLoginHistoryScalarWhereWithAggregatesInput | UserLoginHistoryScalarWhereWithAggregatesInput[]
    OR?: UserLoginHistoryScalarWhereWithAggregatesInput[]
    NOT?: UserLoginHistoryScalarWhereWithAggregatesInput | UserLoginHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserLoginHistory"> | number
    userId?: IntWithAggregatesFilter<"UserLoginHistory"> | number
    loginTime?: DateTimeWithAggregatesFilter<"UserLoginHistory"> | Date | string
    logoutTime?: DateTimeNullableWithAggregatesFilter<"UserLoginHistory"> | Date | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"UserLoginHistory"> | string | null
    deviceInfo?: StringNullableWithAggregatesFilter<"UserLoginHistory"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"UserLoginHistory"> | string | null
    status?: StringWithAggregatesFilter<"UserLoginHistory"> | string
  }

  export type MenuCreateInput = {
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    AccessLevel?: AccessLevelCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessCreateNestedManyWithoutMenuInput
    parent?: MenuCreateNestedOneWithoutChildrenInput
    children?: MenuCreateNestedManyWithoutParentInput
    userAccess?: UserAccessCreateNestedManyWithoutMenuInput
  }

  export type MenuUncheckedCreateInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    parentId?: number | null
    AccessLevel?: AccessLevelUncheckedCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessUncheckedCreateNestedManyWithoutMenuInput
    children?: MenuUncheckedCreateNestedManyWithoutParentInput
    userAccess?: UserAccessUncheckedCreateNestedManyWithoutMenuInput
  }

  export type MenuUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    AccessLevel?: AccessLevelUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUpdateManyWithoutMenuNestedInput
    parent?: MenuUpdateOneWithoutChildrenNestedInput
    children?: MenuUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUpdateManyWithoutMenuNestedInput
  }

  export type MenuUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    AccessLevel?: AccessLevelUncheckedUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUncheckedUpdateManyWithoutMenuNestedInput
    children?: MenuUncheckedUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type MenuCreateManyInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    parentId?: number | null
  }

  export type MenuUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type MenuUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PositionCreateInput = {
    title: string
    title_fa: string
    req_license?: boolean
    accessLevels?: AccessLevelCreateNestedManyWithoutPositionInput
    invitations?: PositionOnInvitationCreateNestedManyWithoutPositionInput
    users?: PositionOnUserCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateInput = {
    id?: number
    title: string
    title_fa: string
    req_license?: boolean
    accessLevels?: AccessLevelUncheckedCreateNestedManyWithoutPositionInput
    invitations?: PositionOnInvitationUncheckedCreateNestedManyWithoutPositionInput
    users?: PositionOnUserUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: AccessLevelUpdateManyWithoutPositionNestedInput
    invitations?: PositionOnInvitationUpdateManyWithoutPositionNestedInput
    users?: PositionOnUserUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: AccessLevelUncheckedUpdateManyWithoutPositionNestedInput
    invitations?: PositionOnInvitationUncheckedUpdateManyWithoutPositionNestedInput
    users?: PositionOnUserUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PositionCreateManyInput = {
    id?: number
    title: string
    title_fa: string
    req_license?: boolean
  }

  export type PositionUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PositionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccessLevelCreateInput = {
    hasAccess?: boolean
    menu: MenuCreateNestedOneWithoutAccessLevelInput
    position: PositionCreateNestedOneWithoutAccessLevelsInput
  }

  export type AccessLevelUncheckedCreateInput = {
    id?: number
    positionId: number
    menuId: number
    hasAccess?: boolean
  }

  export type AccessLevelUpdateInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    menu?: MenuUpdateOneRequiredWithoutAccessLevelNestedInput
    position?: PositionUpdateOneRequiredWithoutAccessLevelsNestedInput
  }

  export type AccessLevelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccessLevelCreateManyInput = {
    id?: number
    positionId: number
    menuId: number
    hasAccess?: boolean
  }

  export type AccessLevelUpdateManyMutationInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccessLevelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvitationCreateInput = {
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    user?: UserCreateNestedOneWithoutInvitationsInput
    accessLevels?: InvitationAccessCreateNestedManyWithoutInvitationInput
    positions?: PositionOnInvitationCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: number
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    userId?: number | null
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    accessLevels?: InvitationAccessUncheckedCreateNestedManyWithoutInvitationInput
    positions?: PositionOnInvitationUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUpdateInput = {
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneWithoutInvitationsNestedInput
    accessLevels?: InvitationAccessUpdateManyWithoutInvitationNestedInput
    positions?: PositionOnInvitationUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: InvitationAccessUncheckedUpdateManyWithoutInvitationNestedInput
    positions?: PositionOnInvitationUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationCreateManyInput = {
    id?: number
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    userId?: number | null
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
  }

  export type InvitationUpdateManyMutationInput = {
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PositionOnInvitationCreateInput = {
    Position: PositionCreateNestedOneWithoutInvitationsInput
    Invitation: InvitationCreateNestedOneWithoutPositionsInput
  }

  export type PositionOnInvitationUncheckedCreateInput = {
    id?: number
    invitationId: number
    positionId: number
  }

  export type PositionOnInvitationUpdateInput = {
    Position?: PositionUpdateOneRequiredWithoutInvitationsNestedInput
    Invitation?: InvitationUpdateOneRequiredWithoutPositionsNestedInput
  }

  export type PositionOnInvitationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnInvitationCreateManyInput = {
    id?: number
    invitationId: number
    positionId: number
  }

  export type PositionOnInvitationUpdateManyMutationInput = {

  }

  export type PositionOnInvitationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type InvitationAccessCreateInput = {
    hasAccess: boolean
    Menu: MenuCreateNestedOneWithoutInvitationAccessInput
    Invitation: InvitationCreateNestedOneWithoutAccessLevelsInput
  }

  export type InvitationAccessUncheckedCreateInput = {
    id?: number
    invitationId: number
    menuId: number
    hasAccess: boolean
  }

  export type InvitationAccessUpdateInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    Menu?: MenuUpdateOneRequiredWithoutInvitationAccessNestedInput
    Invitation?: InvitationUpdateOneRequiredWithoutAccessLevelsNestedInput
  }

  export type InvitationAccessUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvitationAccessCreateManyInput = {
    id?: number
    invitationId: number
    menuId: number
    hasAccess: boolean
  }

  export type InvitationAccessUpdateManyMutationInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvitationAccessUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateInput = {
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationCreateNestedOneWithoutUserInput
    positions?: PositionOnUserCreateNestedManyWithoutUserInput
    accessLevels?: UserAccessCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationUncheckedCreateNestedOneWithoutUserInput
    positions?: PositionOnUserUncheckedCreateNestedManyWithoutUserInput
    accessLevels?: UserAccessUncheckedCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUpdateOneWithoutUserNestedInput
    positions?: PositionOnUserUpdateManyWithoutUserNestedInput
    accessLevels?: UserAccessUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUncheckedUpdateOneWithoutUserNestedInput
    positions?: PositionOnUserUncheckedUpdateManyWithoutUserNestedInput
    accessLevels?: UserAccessUncheckedUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
  }

  export type UserUpdateManyMutationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type PositionOnUserCreateInput = {
    user: UserCreateNestedOneWithoutPositionsInput
    Position: PositionCreateNestedOneWithoutUsersInput
  }

  export type PositionOnUserUncheckedCreateInput = {
    id?: number
    userId: number
    positionId: number
  }

  export type PositionOnUserUpdateInput = {
    user?: UserUpdateOneRequiredWithoutPositionsNestedInput
    Position?: PositionUpdateOneRequiredWithoutUsersNestedInput
  }

  export type PositionOnUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnUserCreateManyInput = {
    id?: number
    userId: number
    positionId: number
  }

  export type PositionOnUserUpdateManyMutationInput = {

  }

  export type PositionOnUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type UserAccessCreateInput = {
    hasAccess: boolean
    Menu: MenuCreateNestedOneWithoutUserAccessInput
    user: UserCreateNestedOneWithoutAccessLevelsInput
  }

  export type UserAccessUncheckedCreateInput = {
    id?: number
    userId: number
    menuId: number
    hasAccess: boolean
  }

  export type UserAccessUpdateInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    Menu?: MenuUpdateOneRequiredWithoutUserAccessNestedInput
    user?: UserUpdateOneRequiredWithoutAccessLevelsNestedInput
  }

  export type UserAccessUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAccessCreateManyInput = {
    id?: number
    userId: number
    menuId: number
    hasAccess: boolean
  }

  export type UserAccessUpdateManyMutationInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAccessUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserLoginHistoryCreateInput = {
    loginTime?: Date | string
    logoutTime?: Date | string | null
    ipAddress?: string | null
    deviceInfo?: string | null
    userAgent?: string | null
    status: string
    User: UserCreateNestedOneWithoutLoginHistoriesInput
  }

  export type UserLoginHistoryUncheckedCreateInput = {
    id?: number
    userId: number
    loginTime?: Date | string
    logoutTime?: Date | string | null
    ipAddress?: string | null
    deviceInfo?: string | null
    userAgent?: string | null
    status: string
  }

  export type UserLoginHistoryUpdateInput = {
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutLoginHistoriesNestedInput
  }

  export type UserLoginHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserLoginHistoryCreateManyInput = {
    id?: number
    userId: number
    loginTime?: Date | string
    logoutTime?: Date | string | null
    ipAddress?: string | null
    deviceInfo?: string | null
    userAgent?: string | null
    status: string
  }

  export type UserLoginHistoryUpdateManyMutationInput = {
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserLoginHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AccessLevelListRelationFilter = {
    every?: AccessLevelWhereInput
    some?: AccessLevelWhereInput
    none?: AccessLevelWhereInput
  }

  export type InvitationAccessListRelationFilter = {
    every?: InvitationAccessWhereInput
    some?: InvitationAccessWhereInput
    none?: InvitationAccessWhereInput
  }

  export type MenuNullableScalarRelationFilter = {
    is?: MenuWhereInput | null
    isNot?: MenuWhereInput | null
  }

  export type MenuListRelationFilter = {
    every?: MenuWhereInput
    some?: MenuWhereInput
    none?: MenuWhereInput
  }

  export type UserAccessListRelationFilter = {
    every?: UserAccessWhereInput
    some?: UserAccessWhereInput
    none?: UserAccessWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccessLevelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenuCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    active?: SortOrder
    general?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
  }

  export type MenuAvgOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
  }

  export type MenuMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    active?: SortOrder
    general?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
  }

  export type MenuMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    active?: SortOrder
    general?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
  }

  export type MenuSumOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PositionOnInvitationListRelationFilter = {
    every?: PositionOnInvitationWhereInput
    some?: PositionOnInvitationWhereInput
    none?: PositionOnInvitationWhereInput
  }

  export type PositionOnUserListRelationFilter = {
    every?: PositionOnUserWhereInput
    some?: PositionOnUserWhereInput
    none?: PositionOnUserWhereInput
  }

  export type PositionOnInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PositionOnUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PositionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    req_license?: SortOrder
  }

  export type PositionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PositionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    req_license?: SortOrder
  }

  export type PositionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    title_fa?: SortOrder
    req_license?: SortOrder
  }

  export type PositionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MenuScalarRelationFilter = {
    is?: MenuWhereInput
    isNot?: MenuWhereInput
  }

  export type PositionScalarRelationFilter = {
    is?: PositionWhereInput
    isNot?: PositionWhereInput
  }

  export type AccessLevelCountOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type AccessLevelAvgOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    menuId?: SortOrder
  }

  export type AccessLevelMaxOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type AccessLevelMinOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type AccessLevelSumOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    menuId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    endDate?: SortOrder
    gender?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    introdPathLetter?: SortOrder
    letterIssuer?: SortOrder
    letterNumber?: SortOrder
    letterDate?: SortOrder
    letterApprover?: SortOrder
    isRegistered?: SortOrder
  }

  export type InvitationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    endDate?: SortOrder
    gender?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    introdPathLetter?: SortOrder
    letterIssuer?: SortOrder
    letterNumber?: SortOrder
    letterDate?: SortOrder
    letterApprover?: SortOrder
    isRegistered?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    endDate?: SortOrder
    gender?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    introdPathLetter?: SortOrder
    letterIssuer?: SortOrder
    letterNumber?: SortOrder
    letterDate?: SortOrder
    letterApprover?: SortOrder
    isRegistered?: SortOrder
  }

  export type InvitationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type InvitationScalarRelationFilter = {
    is?: InvitationWhereInput
    isNot?: InvitationWhereInput
  }

  export type PositionOnInvitationCountOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnInvitationAvgOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnInvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnInvitationMinOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnInvitationSumOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    positionId?: SortOrder
  }

  export type InvitationAccessCountOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type InvitationAccessAvgOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    menuId?: SortOrder
  }

  export type InvitationAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type InvitationAccessMinOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type InvitationAccessSumOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    menuId?: SortOrder
  }

  export type InvitationNullableScalarRelationFilter = {
    is?: InvitationWhereInput | null
    isNot?: InvitationWhereInput | null
  }

  export type UserLoginHistoryListRelationFilter = {
    every?: UserLoginHistoryWhereInput
    some?: UserLoginHistoryWhereInput
    none?: UserLoginHistoryWhereInput
  }

  export type UserLoginHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    gender?: SortOrder
    inviterId?: SortOrder
    invitationTime?: SortOrder
    registrationTime?: SortOrder
    endDate?: SortOrder
    active?: SortOrder
    introdPathLetter?: SortOrder
    letterIssuer?: SortOrder
    letterNumber?: SortOrder
    letterDate?: SortOrder
    letterApprover?: SortOrder
    userName?: SortOrder
    password?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    inviterId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    gender?: SortOrder
    inviterId?: SortOrder
    invitationTime?: SortOrder
    registrationTime?: SortOrder
    endDate?: SortOrder
    active?: SortOrder
    introdPathLetter?: SortOrder
    letterIssuer?: SortOrder
    letterNumber?: SortOrder
    letterDate?: SortOrder
    letterApprover?: SortOrder
    userName?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    gender?: SortOrder
    inviterId?: SortOrder
    invitationTime?: SortOrder
    registrationTime?: SortOrder
    endDate?: SortOrder
    active?: SortOrder
    introdPathLetter?: SortOrder
    letterIssuer?: SortOrder
    letterNumber?: SortOrder
    letterDate?: SortOrder
    letterApprover?: SortOrder
    userName?: SortOrder
    password?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    inviterId?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PositionOnUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnUserAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    positionId?: SortOrder
  }

  export type PositionOnUserSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    positionId?: SortOrder
  }

  export type UserAccessCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type UserAccessAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
  }

  export type UserAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type UserAccessMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    hasAccess?: SortOrder
  }

  export type UserAccessSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
  }

  export type UserLoginHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loginTime?: SortOrder
    logoutTime?: SortOrder
    ipAddress?: SortOrder
    deviceInfo?: SortOrder
    userAgent?: SortOrder
    status?: SortOrder
  }

  export type UserLoginHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserLoginHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loginTime?: SortOrder
    logoutTime?: SortOrder
    ipAddress?: SortOrder
    deviceInfo?: SortOrder
    userAgent?: SortOrder
    status?: SortOrder
  }

  export type UserLoginHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loginTime?: SortOrder
    logoutTime?: SortOrder
    ipAddress?: SortOrder
    deviceInfo?: SortOrder
    userAgent?: SortOrder
    status?: SortOrder
  }

  export type UserLoginHistorySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AccessLevelCreateNestedManyWithoutMenuInput = {
    create?: XOR<AccessLevelCreateWithoutMenuInput, AccessLevelUncheckedCreateWithoutMenuInput> | AccessLevelCreateWithoutMenuInput[] | AccessLevelUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutMenuInput | AccessLevelCreateOrConnectWithoutMenuInput[]
    createMany?: AccessLevelCreateManyMenuInputEnvelope
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
  }

  export type InvitationAccessCreateNestedManyWithoutMenuInput = {
    create?: XOR<InvitationAccessCreateWithoutMenuInput, InvitationAccessUncheckedCreateWithoutMenuInput> | InvitationAccessCreateWithoutMenuInput[] | InvitationAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutMenuInput | InvitationAccessCreateOrConnectWithoutMenuInput[]
    createMany?: InvitationAccessCreateManyMenuInputEnvelope
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
  }

  export type MenuCreateNestedOneWithoutChildrenInput = {
    create?: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MenuCreateOrConnectWithoutChildrenInput
    connect?: MenuWhereUniqueInput
  }

  export type MenuCreateNestedManyWithoutParentInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
  }

  export type UserAccessCreateNestedManyWithoutMenuInput = {
    create?: XOR<UserAccessCreateWithoutMenuInput, UserAccessUncheckedCreateWithoutMenuInput> | UserAccessCreateWithoutMenuInput[] | UserAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutMenuInput | UserAccessCreateOrConnectWithoutMenuInput[]
    createMany?: UserAccessCreateManyMenuInputEnvelope
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
  }

  export type AccessLevelUncheckedCreateNestedManyWithoutMenuInput = {
    create?: XOR<AccessLevelCreateWithoutMenuInput, AccessLevelUncheckedCreateWithoutMenuInput> | AccessLevelCreateWithoutMenuInput[] | AccessLevelUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutMenuInput | AccessLevelCreateOrConnectWithoutMenuInput[]
    createMany?: AccessLevelCreateManyMenuInputEnvelope
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
  }

  export type InvitationAccessUncheckedCreateNestedManyWithoutMenuInput = {
    create?: XOR<InvitationAccessCreateWithoutMenuInput, InvitationAccessUncheckedCreateWithoutMenuInput> | InvitationAccessCreateWithoutMenuInput[] | InvitationAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutMenuInput | InvitationAccessCreateOrConnectWithoutMenuInput[]
    createMany?: InvitationAccessCreateManyMenuInputEnvelope
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
  }

  export type MenuUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
  }

  export type UserAccessUncheckedCreateNestedManyWithoutMenuInput = {
    create?: XOR<UserAccessCreateWithoutMenuInput, UserAccessUncheckedCreateWithoutMenuInput> | UserAccessCreateWithoutMenuInput[] | UserAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutMenuInput | UserAccessCreateOrConnectWithoutMenuInput[]
    createMany?: UserAccessCreateManyMenuInputEnvelope
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AccessLevelUpdateManyWithoutMenuNestedInput = {
    create?: XOR<AccessLevelCreateWithoutMenuInput, AccessLevelUncheckedCreateWithoutMenuInput> | AccessLevelCreateWithoutMenuInput[] | AccessLevelUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutMenuInput | AccessLevelCreateOrConnectWithoutMenuInput[]
    upsert?: AccessLevelUpsertWithWhereUniqueWithoutMenuInput | AccessLevelUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: AccessLevelCreateManyMenuInputEnvelope
    set?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    disconnect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    delete?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    update?: AccessLevelUpdateWithWhereUniqueWithoutMenuInput | AccessLevelUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: AccessLevelUpdateManyWithWhereWithoutMenuInput | AccessLevelUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: AccessLevelScalarWhereInput | AccessLevelScalarWhereInput[]
  }

  export type InvitationAccessUpdateManyWithoutMenuNestedInput = {
    create?: XOR<InvitationAccessCreateWithoutMenuInput, InvitationAccessUncheckedCreateWithoutMenuInput> | InvitationAccessCreateWithoutMenuInput[] | InvitationAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutMenuInput | InvitationAccessCreateOrConnectWithoutMenuInput[]
    upsert?: InvitationAccessUpsertWithWhereUniqueWithoutMenuInput | InvitationAccessUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: InvitationAccessCreateManyMenuInputEnvelope
    set?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    disconnect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    delete?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    update?: InvitationAccessUpdateWithWhereUniqueWithoutMenuInput | InvitationAccessUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: InvitationAccessUpdateManyWithWhereWithoutMenuInput | InvitationAccessUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: InvitationAccessScalarWhereInput | InvitationAccessScalarWhereInput[]
  }

  export type MenuUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MenuCreateOrConnectWithoutChildrenInput
    upsert?: MenuUpsertWithoutChildrenInput
    disconnect?: MenuWhereInput | boolean
    delete?: MenuWhereInput | boolean
    connect?: MenuWhereUniqueInput
    update?: XOR<XOR<MenuUpdateToOneWithWhereWithoutChildrenInput, MenuUpdateWithoutChildrenInput>, MenuUncheckedUpdateWithoutChildrenInput>
  }

  export type MenuUpdateManyWithoutParentNestedInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    upsert?: MenuUpsertWithWhereUniqueWithoutParentInput | MenuUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    set?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    disconnect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    delete?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    update?: MenuUpdateWithWhereUniqueWithoutParentInput | MenuUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: MenuUpdateManyWithWhereWithoutParentInput | MenuUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: MenuScalarWhereInput | MenuScalarWhereInput[]
  }

  export type UserAccessUpdateManyWithoutMenuNestedInput = {
    create?: XOR<UserAccessCreateWithoutMenuInput, UserAccessUncheckedCreateWithoutMenuInput> | UserAccessCreateWithoutMenuInput[] | UserAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutMenuInput | UserAccessCreateOrConnectWithoutMenuInput[]
    upsert?: UserAccessUpsertWithWhereUniqueWithoutMenuInput | UserAccessUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: UserAccessCreateManyMenuInputEnvelope
    set?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    disconnect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    delete?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    update?: UserAccessUpdateWithWhereUniqueWithoutMenuInput | UserAccessUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: UserAccessUpdateManyWithWhereWithoutMenuInput | UserAccessUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: UserAccessScalarWhereInput | UserAccessScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AccessLevelUncheckedUpdateManyWithoutMenuNestedInput = {
    create?: XOR<AccessLevelCreateWithoutMenuInput, AccessLevelUncheckedCreateWithoutMenuInput> | AccessLevelCreateWithoutMenuInput[] | AccessLevelUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutMenuInput | AccessLevelCreateOrConnectWithoutMenuInput[]
    upsert?: AccessLevelUpsertWithWhereUniqueWithoutMenuInput | AccessLevelUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: AccessLevelCreateManyMenuInputEnvelope
    set?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    disconnect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    delete?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    update?: AccessLevelUpdateWithWhereUniqueWithoutMenuInput | AccessLevelUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: AccessLevelUpdateManyWithWhereWithoutMenuInput | AccessLevelUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: AccessLevelScalarWhereInput | AccessLevelScalarWhereInput[]
  }

  export type InvitationAccessUncheckedUpdateManyWithoutMenuNestedInput = {
    create?: XOR<InvitationAccessCreateWithoutMenuInput, InvitationAccessUncheckedCreateWithoutMenuInput> | InvitationAccessCreateWithoutMenuInput[] | InvitationAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutMenuInput | InvitationAccessCreateOrConnectWithoutMenuInput[]
    upsert?: InvitationAccessUpsertWithWhereUniqueWithoutMenuInput | InvitationAccessUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: InvitationAccessCreateManyMenuInputEnvelope
    set?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    disconnect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    delete?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    update?: InvitationAccessUpdateWithWhereUniqueWithoutMenuInput | InvitationAccessUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: InvitationAccessUpdateManyWithWhereWithoutMenuInput | InvitationAccessUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: InvitationAccessScalarWhereInput | InvitationAccessScalarWhereInput[]
  }

  export type MenuUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    upsert?: MenuUpsertWithWhereUniqueWithoutParentInput | MenuUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    set?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    disconnect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    delete?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    update?: MenuUpdateWithWhereUniqueWithoutParentInput | MenuUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: MenuUpdateManyWithWhereWithoutParentInput | MenuUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: MenuScalarWhereInput | MenuScalarWhereInput[]
  }

  export type UserAccessUncheckedUpdateManyWithoutMenuNestedInput = {
    create?: XOR<UserAccessCreateWithoutMenuInput, UserAccessUncheckedCreateWithoutMenuInput> | UserAccessCreateWithoutMenuInput[] | UserAccessUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutMenuInput | UserAccessCreateOrConnectWithoutMenuInput[]
    upsert?: UserAccessUpsertWithWhereUniqueWithoutMenuInput | UserAccessUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: UserAccessCreateManyMenuInputEnvelope
    set?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    disconnect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    delete?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    update?: UserAccessUpdateWithWhereUniqueWithoutMenuInput | UserAccessUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: UserAccessUpdateManyWithWhereWithoutMenuInput | UserAccessUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: UserAccessScalarWhereInput | UserAccessScalarWhereInput[]
  }

  export type AccessLevelCreateNestedManyWithoutPositionInput = {
    create?: XOR<AccessLevelCreateWithoutPositionInput, AccessLevelUncheckedCreateWithoutPositionInput> | AccessLevelCreateWithoutPositionInput[] | AccessLevelUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutPositionInput | AccessLevelCreateOrConnectWithoutPositionInput[]
    createMany?: AccessLevelCreateManyPositionInputEnvelope
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
  }

  export type PositionOnInvitationCreateNestedManyWithoutPositionInput = {
    create?: XOR<PositionOnInvitationCreateWithoutPositionInput, PositionOnInvitationUncheckedCreateWithoutPositionInput> | PositionOnInvitationCreateWithoutPositionInput[] | PositionOnInvitationUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutPositionInput | PositionOnInvitationCreateOrConnectWithoutPositionInput[]
    createMany?: PositionOnInvitationCreateManyPositionInputEnvelope
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
  }

  export type PositionOnUserCreateNestedManyWithoutPositionInput = {
    create?: XOR<PositionOnUserCreateWithoutPositionInput, PositionOnUserUncheckedCreateWithoutPositionInput> | PositionOnUserCreateWithoutPositionInput[] | PositionOnUserUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutPositionInput | PositionOnUserCreateOrConnectWithoutPositionInput[]
    createMany?: PositionOnUserCreateManyPositionInputEnvelope
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
  }

  export type AccessLevelUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<AccessLevelCreateWithoutPositionInput, AccessLevelUncheckedCreateWithoutPositionInput> | AccessLevelCreateWithoutPositionInput[] | AccessLevelUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutPositionInput | AccessLevelCreateOrConnectWithoutPositionInput[]
    createMany?: AccessLevelCreateManyPositionInputEnvelope
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
  }

  export type PositionOnInvitationUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<PositionOnInvitationCreateWithoutPositionInput, PositionOnInvitationUncheckedCreateWithoutPositionInput> | PositionOnInvitationCreateWithoutPositionInput[] | PositionOnInvitationUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutPositionInput | PositionOnInvitationCreateOrConnectWithoutPositionInput[]
    createMany?: PositionOnInvitationCreateManyPositionInputEnvelope
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
  }

  export type PositionOnUserUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<PositionOnUserCreateWithoutPositionInput, PositionOnUserUncheckedCreateWithoutPositionInput> | PositionOnUserCreateWithoutPositionInput[] | PositionOnUserUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutPositionInput | PositionOnUserCreateOrConnectWithoutPositionInput[]
    createMany?: PositionOnUserCreateManyPositionInputEnvelope
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
  }

  export type AccessLevelUpdateManyWithoutPositionNestedInput = {
    create?: XOR<AccessLevelCreateWithoutPositionInput, AccessLevelUncheckedCreateWithoutPositionInput> | AccessLevelCreateWithoutPositionInput[] | AccessLevelUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutPositionInput | AccessLevelCreateOrConnectWithoutPositionInput[]
    upsert?: AccessLevelUpsertWithWhereUniqueWithoutPositionInput | AccessLevelUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: AccessLevelCreateManyPositionInputEnvelope
    set?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    disconnect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    delete?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    update?: AccessLevelUpdateWithWhereUniqueWithoutPositionInput | AccessLevelUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: AccessLevelUpdateManyWithWhereWithoutPositionInput | AccessLevelUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: AccessLevelScalarWhereInput | AccessLevelScalarWhereInput[]
  }

  export type PositionOnInvitationUpdateManyWithoutPositionNestedInput = {
    create?: XOR<PositionOnInvitationCreateWithoutPositionInput, PositionOnInvitationUncheckedCreateWithoutPositionInput> | PositionOnInvitationCreateWithoutPositionInput[] | PositionOnInvitationUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutPositionInput | PositionOnInvitationCreateOrConnectWithoutPositionInput[]
    upsert?: PositionOnInvitationUpsertWithWhereUniqueWithoutPositionInput | PositionOnInvitationUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: PositionOnInvitationCreateManyPositionInputEnvelope
    set?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    disconnect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    delete?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    update?: PositionOnInvitationUpdateWithWhereUniqueWithoutPositionInput | PositionOnInvitationUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: PositionOnInvitationUpdateManyWithWhereWithoutPositionInput | PositionOnInvitationUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: PositionOnInvitationScalarWhereInput | PositionOnInvitationScalarWhereInput[]
  }

  export type PositionOnUserUpdateManyWithoutPositionNestedInput = {
    create?: XOR<PositionOnUserCreateWithoutPositionInput, PositionOnUserUncheckedCreateWithoutPositionInput> | PositionOnUserCreateWithoutPositionInput[] | PositionOnUserUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutPositionInput | PositionOnUserCreateOrConnectWithoutPositionInput[]
    upsert?: PositionOnUserUpsertWithWhereUniqueWithoutPositionInput | PositionOnUserUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: PositionOnUserCreateManyPositionInputEnvelope
    set?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    disconnect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    delete?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    update?: PositionOnUserUpdateWithWhereUniqueWithoutPositionInput | PositionOnUserUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: PositionOnUserUpdateManyWithWhereWithoutPositionInput | PositionOnUserUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: PositionOnUserScalarWhereInput | PositionOnUserScalarWhereInput[]
  }

  export type AccessLevelUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<AccessLevelCreateWithoutPositionInput, AccessLevelUncheckedCreateWithoutPositionInput> | AccessLevelCreateWithoutPositionInput[] | AccessLevelUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: AccessLevelCreateOrConnectWithoutPositionInput | AccessLevelCreateOrConnectWithoutPositionInput[]
    upsert?: AccessLevelUpsertWithWhereUniqueWithoutPositionInput | AccessLevelUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: AccessLevelCreateManyPositionInputEnvelope
    set?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    disconnect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    delete?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    connect?: AccessLevelWhereUniqueInput | AccessLevelWhereUniqueInput[]
    update?: AccessLevelUpdateWithWhereUniqueWithoutPositionInput | AccessLevelUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: AccessLevelUpdateManyWithWhereWithoutPositionInput | AccessLevelUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: AccessLevelScalarWhereInput | AccessLevelScalarWhereInput[]
  }

  export type PositionOnInvitationUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<PositionOnInvitationCreateWithoutPositionInput, PositionOnInvitationUncheckedCreateWithoutPositionInput> | PositionOnInvitationCreateWithoutPositionInput[] | PositionOnInvitationUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutPositionInput | PositionOnInvitationCreateOrConnectWithoutPositionInput[]
    upsert?: PositionOnInvitationUpsertWithWhereUniqueWithoutPositionInput | PositionOnInvitationUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: PositionOnInvitationCreateManyPositionInputEnvelope
    set?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    disconnect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    delete?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    update?: PositionOnInvitationUpdateWithWhereUniqueWithoutPositionInput | PositionOnInvitationUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: PositionOnInvitationUpdateManyWithWhereWithoutPositionInput | PositionOnInvitationUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: PositionOnInvitationScalarWhereInput | PositionOnInvitationScalarWhereInput[]
  }

  export type PositionOnUserUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<PositionOnUserCreateWithoutPositionInput, PositionOnUserUncheckedCreateWithoutPositionInput> | PositionOnUserCreateWithoutPositionInput[] | PositionOnUserUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutPositionInput | PositionOnUserCreateOrConnectWithoutPositionInput[]
    upsert?: PositionOnUserUpsertWithWhereUniqueWithoutPositionInput | PositionOnUserUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: PositionOnUserCreateManyPositionInputEnvelope
    set?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    disconnect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    delete?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    update?: PositionOnUserUpdateWithWhereUniqueWithoutPositionInput | PositionOnUserUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: PositionOnUserUpdateManyWithWhereWithoutPositionInput | PositionOnUserUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: PositionOnUserScalarWhereInput | PositionOnUserScalarWhereInput[]
  }

  export type MenuCreateNestedOneWithoutAccessLevelInput = {
    create?: XOR<MenuCreateWithoutAccessLevelInput, MenuUncheckedCreateWithoutAccessLevelInput>
    connectOrCreate?: MenuCreateOrConnectWithoutAccessLevelInput
    connect?: MenuWhereUniqueInput
  }

  export type PositionCreateNestedOneWithoutAccessLevelsInput = {
    create?: XOR<PositionCreateWithoutAccessLevelsInput, PositionUncheckedCreateWithoutAccessLevelsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutAccessLevelsInput
    connect?: PositionWhereUniqueInput
  }

  export type MenuUpdateOneRequiredWithoutAccessLevelNestedInput = {
    create?: XOR<MenuCreateWithoutAccessLevelInput, MenuUncheckedCreateWithoutAccessLevelInput>
    connectOrCreate?: MenuCreateOrConnectWithoutAccessLevelInput
    upsert?: MenuUpsertWithoutAccessLevelInput
    connect?: MenuWhereUniqueInput
    update?: XOR<XOR<MenuUpdateToOneWithWhereWithoutAccessLevelInput, MenuUpdateWithoutAccessLevelInput>, MenuUncheckedUpdateWithoutAccessLevelInput>
  }

  export type PositionUpdateOneRequiredWithoutAccessLevelsNestedInput = {
    create?: XOR<PositionCreateWithoutAccessLevelsInput, PositionUncheckedCreateWithoutAccessLevelsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutAccessLevelsInput
    upsert?: PositionUpsertWithoutAccessLevelsInput
    connect?: PositionWhereUniqueInput
    update?: XOR<XOR<PositionUpdateToOneWithWhereWithoutAccessLevelsInput, PositionUpdateWithoutAccessLevelsInput>, PositionUncheckedUpdateWithoutAccessLevelsInput>
  }

  export type UserCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type InvitationAccessCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationAccessCreateWithoutInvitationInput, InvitationAccessUncheckedCreateWithoutInvitationInput> | InvitationAccessCreateWithoutInvitationInput[] | InvitationAccessUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutInvitationInput | InvitationAccessCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationAccessCreateManyInvitationInputEnvelope
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
  }

  export type PositionOnInvitationCreateNestedManyWithoutInvitationInput = {
    create?: XOR<PositionOnInvitationCreateWithoutInvitationInput, PositionOnInvitationUncheckedCreateWithoutInvitationInput> | PositionOnInvitationCreateWithoutInvitationInput[] | PositionOnInvitationUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutInvitationInput | PositionOnInvitationCreateOrConnectWithoutInvitationInput[]
    createMany?: PositionOnInvitationCreateManyInvitationInputEnvelope
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
  }

  export type InvitationAccessUncheckedCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationAccessCreateWithoutInvitationInput, InvitationAccessUncheckedCreateWithoutInvitationInput> | InvitationAccessCreateWithoutInvitationInput[] | InvitationAccessUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutInvitationInput | InvitationAccessCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationAccessCreateManyInvitationInputEnvelope
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
  }

  export type PositionOnInvitationUncheckedCreateNestedManyWithoutInvitationInput = {
    create?: XOR<PositionOnInvitationCreateWithoutInvitationInput, PositionOnInvitationUncheckedCreateWithoutInvitationInput> | PositionOnInvitationCreateWithoutInvitationInput[] | PositionOnInvitationUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutInvitationInput | PositionOnInvitationCreateOrConnectWithoutInvitationInput[]
    createMany?: PositionOnInvitationCreateManyInvitationInputEnvelope
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    upsert?: UserUpsertWithoutInvitationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitationsInput, UserUpdateWithoutInvitationsInput>, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type InvitationAccessUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationAccessCreateWithoutInvitationInput, InvitationAccessUncheckedCreateWithoutInvitationInput> | InvitationAccessCreateWithoutInvitationInput[] | InvitationAccessUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutInvitationInput | InvitationAccessCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationAccessUpsertWithWhereUniqueWithoutInvitationInput | InvitationAccessUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationAccessCreateManyInvitationInputEnvelope
    set?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    disconnect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    delete?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    update?: InvitationAccessUpdateWithWhereUniqueWithoutInvitationInput | InvitationAccessUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationAccessUpdateManyWithWhereWithoutInvitationInput | InvitationAccessUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationAccessScalarWhereInput | InvitationAccessScalarWhereInput[]
  }

  export type PositionOnInvitationUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<PositionOnInvitationCreateWithoutInvitationInput, PositionOnInvitationUncheckedCreateWithoutInvitationInput> | PositionOnInvitationCreateWithoutInvitationInput[] | PositionOnInvitationUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutInvitationInput | PositionOnInvitationCreateOrConnectWithoutInvitationInput[]
    upsert?: PositionOnInvitationUpsertWithWhereUniqueWithoutInvitationInput | PositionOnInvitationUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: PositionOnInvitationCreateManyInvitationInputEnvelope
    set?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    disconnect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    delete?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    update?: PositionOnInvitationUpdateWithWhereUniqueWithoutInvitationInput | PositionOnInvitationUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: PositionOnInvitationUpdateManyWithWhereWithoutInvitationInput | PositionOnInvitationUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: PositionOnInvitationScalarWhereInput | PositionOnInvitationScalarWhereInput[]
  }

  export type InvitationAccessUncheckedUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationAccessCreateWithoutInvitationInput, InvitationAccessUncheckedCreateWithoutInvitationInput> | InvitationAccessCreateWithoutInvitationInput[] | InvitationAccessUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationAccessCreateOrConnectWithoutInvitationInput | InvitationAccessCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationAccessUpsertWithWhereUniqueWithoutInvitationInput | InvitationAccessUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationAccessCreateManyInvitationInputEnvelope
    set?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    disconnect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    delete?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    connect?: InvitationAccessWhereUniqueInput | InvitationAccessWhereUniqueInput[]
    update?: InvitationAccessUpdateWithWhereUniqueWithoutInvitationInput | InvitationAccessUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationAccessUpdateManyWithWhereWithoutInvitationInput | InvitationAccessUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationAccessScalarWhereInput | InvitationAccessScalarWhereInput[]
  }

  export type PositionOnInvitationUncheckedUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<PositionOnInvitationCreateWithoutInvitationInput, PositionOnInvitationUncheckedCreateWithoutInvitationInput> | PositionOnInvitationCreateWithoutInvitationInput[] | PositionOnInvitationUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: PositionOnInvitationCreateOrConnectWithoutInvitationInput | PositionOnInvitationCreateOrConnectWithoutInvitationInput[]
    upsert?: PositionOnInvitationUpsertWithWhereUniqueWithoutInvitationInput | PositionOnInvitationUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: PositionOnInvitationCreateManyInvitationInputEnvelope
    set?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    disconnect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    delete?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    connect?: PositionOnInvitationWhereUniqueInput | PositionOnInvitationWhereUniqueInput[]
    update?: PositionOnInvitationUpdateWithWhereUniqueWithoutInvitationInput | PositionOnInvitationUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: PositionOnInvitationUpdateManyWithWhereWithoutInvitationInput | PositionOnInvitationUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: PositionOnInvitationScalarWhereInput | PositionOnInvitationScalarWhereInput[]
  }

  export type PositionCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<PositionCreateWithoutInvitationsInput, PositionUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutInvitationsInput
    connect?: PositionWhereUniqueInput
  }

  export type InvitationCreateNestedOneWithoutPositionsInput = {
    create?: XOR<InvitationCreateWithoutPositionsInput, InvitationUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutPositionsInput
    connect?: InvitationWhereUniqueInput
  }

  export type PositionUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<PositionCreateWithoutInvitationsInput, PositionUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutInvitationsInput
    upsert?: PositionUpsertWithoutInvitationsInput
    connect?: PositionWhereUniqueInput
    update?: XOR<XOR<PositionUpdateToOneWithWhereWithoutInvitationsInput, PositionUpdateWithoutInvitationsInput>, PositionUncheckedUpdateWithoutInvitationsInput>
  }

  export type InvitationUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<InvitationCreateWithoutPositionsInput, InvitationUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutPositionsInput
    upsert?: InvitationUpsertWithoutPositionsInput
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutPositionsInput, InvitationUpdateWithoutPositionsInput>, InvitationUncheckedUpdateWithoutPositionsInput>
  }

  export type MenuCreateNestedOneWithoutInvitationAccessInput = {
    create?: XOR<MenuCreateWithoutInvitationAccessInput, MenuUncheckedCreateWithoutInvitationAccessInput>
    connectOrCreate?: MenuCreateOrConnectWithoutInvitationAccessInput
    connect?: MenuWhereUniqueInput
  }

  export type InvitationCreateNestedOneWithoutAccessLevelsInput = {
    create?: XOR<InvitationCreateWithoutAccessLevelsInput, InvitationUncheckedCreateWithoutAccessLevelsInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutAccessLevelsInput
    connect?: InvitationWhereUniqueInput
  }

  export type MenuUpdateOneRequiredWithoutInvitationAccessNestedInput = {
    create?: XOR<MenuCreateWithoutInvitationAccessInput, MenuUncheckedCreateWithoutInvitationAccessInput>
    connectOrCreate?: MenuCreateOrConnectWithoutInvitationAccessInput
    upsert?: MenuUpsertWithoutInvitationAccessInput
    connect?: MenuWhereUniqueInput
    update?: XOR<XOR<MenuUpdateToOneWithWhereWithoutInvitationAccessInput, MenuUpdateWithoutInvitationAccessInput>, MenuUncheckedUpdateWithoutInvitationAccessInput>
  }

  export type InvitationUpdateOneRequiredWithoutAccessLevelsNestedInput = {
    create?: XOR<InvitationCreateWithoutAccessLevelsInput, InvitationUncheckedCreateWithoutAccessLevelsInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutAccessLevelsInput
    upsert?: InvitationUpsertWithoutAccessLevelsInput
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutAccessLevelsInput, InvitationUpdateWithoutAccessLevelsInput>, InvitationUncheckedUpdateWithoutAccessLevelsInput>
  }

  export type InvitationCreateNestedOneWithoutUserInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput
    connect?: InvitationWhereUniqueInput
  }

  export type PositionOnUserCreateNestedManyWithoutUserInput = {
    create?: XOR<PositionOnUserCreateWithoutUserInput, PositionOnUserUncheckedCreateWithoutUserInput> | PositionOnUserCreateWithoutUserInput[] | PositionOnUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutUserInput | PositionOnUserCreateOrConnectWithoutUserInput[]
    createMany?: PositionOnUserCreateManyUserInputEnvelope
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
  }

  export type UserAccessCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAccessCreateWithoutUserInput, UserAccessUncheckedCreateWithoutUserInput> | UserAccessCreateWithoutUserInput[] | UserAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutUserInput | UserAccessCreateOrConnectWithoutUserInput[]
    createMany?: UserAccessCreateManyUserInputEnvelope
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
  }

  export type UserLoginHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLoginHistoryCreateWithoutUserInput, UserLoginHistoryUncheckedCreateWithoutUserInput> | UserLoginHistoryCreateWithoutUserInput[] | UserLoginHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLoginHistoryCreateOrConnectWithoutUserInput | UserLoginHistoryCreateOrConnectWithoutUserInput[]
    createMany?: UserLoginHistoryCreateManyUserInputEnvelope
    connect?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput
    connect?: InvitationWhereUniqueInput
  }

  export type PositionOnUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PositionOnUserCreateWithoutUserInput, PositionOnUserUncheckedCreateWithoutUserInput> | PositionOnUserCreateWithoutUserInput[] | PositionOnUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutUserInput | PositionOnUserCreateOrConnectWithoutUserInput[]
    createMany?: PositionOnUserCreateManyUserInputEnvelope
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
  }

  export type UserAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAccessCreateWithoutUserInput, UserAccessUncheckedCreateWithoutUserInput> | UserAccessCreateWithoutUserInput[] | UserAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutUserInput | UserAccessCreateOrConnectWithoutUserInput[]
    createMany?: UserAccessCreateManyUserInputEnvelope
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
  }

  export type UserLoginHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLoginHistoryCreateWithoutUserInput, UserLoginHistoryUncheckedCreateWithoutUserInput> | UserLoginHistoryCreateWithoutUserInput[] | UserLoginHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLoginHistoryCreateOrConnectWithoutUserInput | UserLoginHistoryCreateOrConnectWithoutUserInput[]
    createMany?: UserLoginHistoryCreateManyUserInputEnvelope
    connect?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
  }

  export type InvitationUpdateOneWithoutUserNestedInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput
    upsert?: InvitationUpsertWithoutUserInput
    disconnect?: InvitationWhereInput | boolean
    delete?: InvitationWhereInput | boolean
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutUserInput, InvitationUpdateWithoutUserInput>, InvitationUncheckedUpdateWithoutUserInput>
  }

  export type PositionOnUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<PositionOnUserCreateWithoutUserInput, PositionOnUserUncheckedCreateWithoutUserInput> | PositionOnUserCreateWithoutUserInput[] | PositionOnUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutUserInput | PositionOnUserCreateOrConnectWithoutUserInput[]
    upsert?: PositionOnUserUpsertWithWhereUniqueWithoutUserInput | PositionOnUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PositionOnUserCreateManyUserInputEnvelope
    set?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    disconnect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    delete?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    update?: PositionOnUserUpdateWithWhereUniqueWithoutUserInput | PositionOnUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PositionOnUserUpdateManyWithWhereWithoutUserInput | PositionOnUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PositionOnUserScalarWhereInput | PositionOnUserScalarWhereInput[]
  }

  export type UserAccessUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAccessCreateWithoutUserInput, UserAccessUncheckedCreateWithoutUserInput> | UserAccessCreateWithoutUserInput[] | UserAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutUserInput | UserAccessCreateOrConnectWithoutUserInput[]
    upsert?: UserAccessUpsertWithWhereUniqueWithoutUserInput | UserAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAccessCreateManyUserInputEnvelope
    set?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    disconnect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    delete?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    update?: UserAccessUpdateWithWhereUniqueWithoutUserInput | UserAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAccessUpdateManyWithWhereWithoutUserInput | UserAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAccessScalarWhereInput | UserAccessScalarWhereInput[]
  }

  export type UserLoginHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLoginHistoryCreateWithoutUserInput, UserLoginHistoryUncheckedCreateWithoutUserInput> | UserLoginHistoryCreateWithoutUserInput[] | UserLoginHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLoginHistoryCreateOrConnectWithoutUserInput | UserLoginHistoryCreateOrConnectWithoutUserInput[]
    upsert?: UserLoginHistoryUpsertWithWhereUniqueWithoutUserInput | UserLoginHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLoginHistoryCreateManyUserInputEnvelope
    set?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    disconnect?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    delete?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    connect?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    update?: UserLoginHistoryUpdateWithWhereUniqueWithoutUserInput | UserLoginHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLoginHistoryUpdateManyWithWhereWithoutUserInput | UserLoginHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLoginHistoryScalarWhereInput | UserLoginHistoryScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput
    upsert?: InvitationUpsertWithoutUserInput
    disconnect?: InvitationWhereInput | boolean
    delete?: InvitationWhereInput | boolean
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutUserInput, InvitationUpdateWithoutUserInput>, InvitationUncheckedUpdateWithoutUserInput>
  }

  export type PositionOnUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PositionOnUserCreateWithoutUserInput, PositionOnUserUncheckedCreateWithoutUserInput> | PositionOnUserCreateWithoutUserInput[] | PositionOnUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionOnUserCreateOrConnectWithoutUserInput | PositionOnUserCreateOrConnectWithoutUserInput[]
    upsert?: PositionOnUserUpsertWithWhereUniqueWithoutUserInput | PositionOnUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PositionOnUserCreateManyUserInputEnvelope
    set?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    disconnect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    delete?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    connect?: PositionOnUserWhereUniqueInput | PositionOnUserWhereUniqueInput[]
    update?: PositionOnUserUpdateWithWhereUniqueWithoutUserInput | PositionOnUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PositionOnUserUpdateManyWithWhereWithoutUserInput | PositionOnUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PositionOnUserScalarWhereInput | PositionOnUserScalarWhereInput[]
  }

  export type UserAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAccessCreateWithoutUserInput, UserAccessUncheckedCreateWithoutUserInput> | UserAccessCreateWithoutUserInput[] | UserAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccessCreateOrConnectWithoutUserInput | UserAccessCreateOrConnectWithoutUserInput[]
    upsert?: UserAccessUpsertWithWhereUniqueWithoutUserInput | UserAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAccessCreateManyUserInputEnvelope
    set?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    disconnect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    delete?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    connect?: UserAccessWhereUniqueInput | UserAccessWhereUniqueInput[]
    update?: UserAccessUpdateWithWhereUniqueWithoutUserInput | UserAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAccessUpdateManyWithWhereWithoutUserInput | UserAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAccessScalarWhereInput | UserAccessScalarWhereInput[]
  }

  export type UserLoginHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLoginHistoryCreateWithoutUserInput, UserLoginHistoryUncheckedCreateWithoutUserInput> | UserLoginHistoryCreateWithoutUserInput[] | UserLoginHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLoginHistoryCreateOrConnectWithoutUserInput | UserLoginHistoryCreateOrConnectWithoutUserInput[]
    upsert?: UserLoginHistoryUpsertWithWhereUniqueWithoutUserInput | UserLoginHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLoginHistoryCreateManyUserInputEnvelope
    set?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    disconnect?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    delete?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    connect?: UserLoginHistoryWhereUniqueInput | UserLoginHistoryWhereUniqueInput[]
    update?: UserLoginHistoryUpdateWithWhereUniqueWithoutUserInput | UserLoginHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLoginHistoryUpdateManyWithWhereWithoutUserInput | UserLoginHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLoginHistoryScalarWhereInput | UserLoginHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPositionsInput = {
    create?: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPositionsInput
    connect?: UserWhereUniqueInput
  }

  export type PositionCreateNestedOneWithoutUsersInput = {
    create?: XOR<PositionCreateWithoutUsersInput, PositionUncheckedCreateWithoutUsersInput>
    connectOrCreate?: PositionCreateOrConnectWithoutUsersInput
    connect?: PositionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPositionsInput
    upsert?: UserUpsertWithoutPositionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPositionsInput, UserUpdateWithoutPositionsInput>, UserUncheckedUpdateWithoutPositionsInput>
  }

  export type PositionUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<PositionCreateWithoutUsersInput, PositionUncheckedCreateWithoutUsersInput>
    connectOrCreate?: PositionCreateOrConnectWithoutUsersInput
    upsert?: PositionUpsertWithoutUsersInput
    connect?: PositionWhereUniqueInput
    update?: XOR<XOR<PositionUpdateToOneWithWhereWithoutUsersInput, PositionUpdateWithoutUsersInput>, PositionUncheckedUpdateWithoutUsersInput>
  }

  export type MenuCreateNestedOneWithoutUserAccessInput = {
    create?: XOR<MenuCreateWithoutUserAccessInput, MenuUncheckedCreateWithoutUserAccessInput>
    connectOrCreate?: MenuCreateOrConnectWithoutUserAccessInput
    connect?: MenuWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAccessLevelsInput = {
    create?: XOR<UserCreateWithoutAccessLevelsInput, UserUncheckedCreateWithoutAccessLevelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccessLevelsInput
    connect?: UserWhereUniqueInput
  }

  export type MenuUpdateOneRequiredWithoutUserAccessNestedInput = {
    create?: XOR<MenuCreateWithoutUserAccessInput, MenuUncheckedCreateWithoutUserAccessInput>
    connectOrCreate?: MenuCreateOrConnectWithoutUserAccessInput
    upsert?: MenuUpsertWithoutUserAccessInput
    connect?: MenuWhereUniqueInput
    update?: XOR<XOR<MenuUpdateToOneWithWhereWithoutUserAccessInput, MenuUpdateWithoutUserAccessInput>, MenuUncheckedUpdateWithoutUserAccessInput>
  }

  export type UserUpdateOneRequiredWithoutAccessLevelsNestedInput = {
    create?: XOR<UserCreateWithoutAccessLevelsInput, UserUncheckedCreateWithoutAccessLevelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccessLevelsInput
    upsert?: UserUpsertWithoutAccessLevelsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccessLevelsInput, UserUpdateWithoutAccessLevelsInput>, UserUncheckedUpdateWithoutAccessLevelsInput>
  }

  export type UserCreateNestedOneWithoutLoginHistoriesInput = {
    create?: XOR<UserCreateWithoutLoginHistoriesInput, UserUncheckedCreateWithoutLoginHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoginHistoriesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLoginHistoriesNestedInput = {
    create?: XOR<UserCreateWithoutLoginHistoriesInput, UserUncheckedCreateWithoutLoginHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoginHistoriesInput
    upsert?: UserUpsertWithoutLoginHistoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLoginHistoriesInput, UserUpdateWithoutLoginHistoriesInput>, UserUncheckedUpdateWithoutLoginHistoriesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AccessLevelCreateWithoutMenuInput = {
    hasAccess?: boolean
    position: PositionCreateNestedOneWithoutAccessLevelsInput
  }

  export type AccessLevelUncheckedCreateWithoutMenuInput = {
    id?: number
    positionId: number
    hasAccess?: boolean
  }

  export type AccessLevelCreateOrConnectWithoutMenuInput = {
    where: AccessLevelWhereUniqueInput
    create: XOR<AccessLevelCreateWithoutMenuInput, AccessLevelUncheckedCreateWithoutMenuInput>
  }

  export type AccessLevelCreateManyMenuInputEnvelope = {
    data: AccessLevelCreateManyMenuInput | AccessLevelCreateManyMenuInput[]
  }

  export type InvitationAccessCreateWithoutMenuInput = {
    hasAccess: boolean
    Invitation: InvitationCreateNestedOneWithoutAccessLevelsInput
  }

  export type InvitationAccessUncheckedCreateWithoutMenuInput = {
    id?: number
    invitationId: number
    hasAccess: boolean
  }

  export type InvitationAccessCreateOrConnectWithoutMenuInput = {
    where: InvitationAccessWhereUniqueInput
    create: XOR<InvitationAccessCreateWithoutMenuInput, InvitationAccessUncheckedCreateWithoutMenuInput>
  }

  export type InvitationAccessCreateManyMenuInputEnvelope = {
    data: InvitationAccessCreateManyMenuInput | InvitationAccessCreateManyMenuInput[]
  }

  export type MenuCreateWithoutChildrenInput = {
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    AccessLevel?: AccessLevelCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessCreateNestedManyWithoutMenuInput
    parent?: MenuCreateNestedOneWithoutChildrenInput
    userAccess?: UserAccessCreateNestedManyWithoutMenuInput
  }

  export type MenuUncheckedCreateWithoutChildrenInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    parentId?: number | null
    AccessLevel?: AccessLevelUncheckedCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessUncheckedCreateNestedManyWithoutMenuInput
    userAccess?: UserAccessUncheckedCreateNestedManyWithoutMenuInput
  }

  export type MenuCreateOrConnectWithoutChildrenInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
  }

  export type MenuCreateWithoutParentInput = {
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    AccessLevel?: AccessLevelCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessCreateNestedManyWithoutMenuInput
    children?: MenuCreateNestedManyWithoutParentInput
    userAccess?: UserAccessCreateNestedManyWithoutMenuInput
  }

  export type MenuUncheckedCreateWithoutParentInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    AccessLevel?: AccessLevelUncheckedCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessUncheckedCreateNestedManyWithoutMenuInput
    children?: MenuUncheckedCreateNestedManyWithoutParentInput
    userAccess?: UserAccessUncheckedCreateNestedManyWithoutMenuInput
  }

  export type MenuCreateOrConnectWithoutParentInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput>
  }

  export type MenuCreateManyParentInputEnvelope = {
    data: MenuCreateManyParentInput | MenuCreateManyParentInput[]
  }

  export type UserAccessCreateWithoutMenuInput = {
    hasAccess: boolean
    user: UserCreateNestedOneWithoutAccessLevelsInput
  }

  export type UserAccessUncheckedCreateWithoutMenuInput = {
    id?: number
    userId: number
    hasAccess: boolean
  }

  export type UserAccessCreateOrConnectWithoutMenuInput = {
    where: UserAccessWhereUniqueInput
    create: XOR<UserAccessCreateWithoutMenuInput, UserAccessUncheckedCreateWithoutMenuInput>
  }

  export type UserAccessCreateManyMenuInputEnvelope = {
    data: UserAccessCreateManyMenuInput | UserAccessCreateManyMenuInput[]
  }

  export type AccessLevelUpsertWithWhereUniqueWithoutMenuInput = {
    where: AccessLevelWhereUniqueInput
    update: XOR<AccessLevelUpdateWithoutMenuInput, AccessLevelUncheckedUpdateWithoutMenuInput>
    create: XOR<AccessLevelCreateWithoutMenuInput, AccessLevelUncheckedCreateWithoutMenuInput>
  }

  export type AccessLevelUpdateWithWhereUniqueWithoutMenuInput = {
    where: AccessLevelWhereUniqueInput
    data: XOR<AccessLevelUpdateWithoutMenuInput, AccessLevelUncheckedUpdateWithoutMenuInput>
  }

  export type AccessLevelUpdateManyWithWhereWithoutMenuInput = {
    where: AccessLevelScalarWhereInput
    data: XOR<AccessLevelUpdateManyMutationInput, AccessLevelUncheckedUpdateManyWithoutMenuInput>
  }

  export type AccessLevelScalarWhereInput = {
    AND?: AccessLevelScalarWhereInput | AccessLevelScalarWhereInput[]
    OR?: AccessLevelScalarWhereInput[]
    NOT?: AccessLevelScalarWhereInput | AccessLevelScalarWhereInput[]
    id?: IntFilter<"AccessLevel"> | number
    positionId?: IntFilter<"AccessLevel"> | number
    menuId?: IntFilter<"AccessLevel"> | number
    hasAccess?: BoolFilter<"AccessLevel"> | boolean
  }

  export type InvitationAccessUpsertWithWhereUniqueWithoutMenuInput = {
    where: InvitationAccessWhereUniqueInput
    update: XOR<InvitationAccessUpdateWithoutMenuInput, InvitationAccessUncheckedUpdateWithoutMenuInput>
    create: XOR<InvitationAccessCreateWithoutMenuInput, InvitationAccessUncheckedCreateWithoutMenuInput>
  }

  export type InvitationAccessUpdateWithWhereUniqueWithoutMenuInput = {
    where: InvitationAccessWhereUniqueInput
    data: XOR<InvitationAccessUpdateWithoutMenuInput, InvitationAccessUncheckedUpdateWithoutMenuInput>
  }

  export type InvitationAccessUpdateManyWithWhereWithoutMenuInput = {
    where: InvitationAccessScalarWhereInput
    data: XOR<InvitationAccessUpdateManyMutationInput, InvitationAccessUncheckedUpdateManyWithoutMenuInput>
  }

  export type InvitationAccessScalarWhereInput = {
    AND?: InvitationAccessScalarWhereInput | InvitationAccessScalarWhereInput[]
    OR?: InvitationAccessScalarWhereInput[]
    NOT?: InvitationAccessScalarWhereInput | InvitationAccessScalarWhereInput[]
    id?: IntFilter<"InvitationAccess"> | number
    invitationId?: IntFilter<"InvitationAccess"> | number
    menuId?: IntFilter<"InvitationAccess"> | number
    hasAccess?: BoolFilter<"InvitationAccess"> | boolean
  }

  export type MenuUpsertWithoutChildrenInput = {
    update: XOR<MenuUpdateWithoutChildrenInput, MenuUncheckedUpdateWithoutChildrenInput>
    create: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
    where?: MenuWhereInput
  }

  export type MenuUpdateToOneWithWhereWithoutChildrenInput = {
    where?: MenuWhereInput
    data: XOR<MenuUpdateWithoutChildrenInput, MenuUncheckedUpdateWithoutChildrenInput>
  }

  export type MenuUpdateWithoutChildrenInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    AccessLevel?: AccessLevelUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUpdateManyWithoutMenuNestedInput
    parent?: MenuUpdateOneWithoutChildrenNestedInput
    userAccess?: UserAccessUpdateManyWithoutMenuNestedInput
  }

  export type MenuUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    AccessLevel?: AccessLevelUncheckedUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUncheckedUpdateManyWithoutMenuNestedInput
    userAccess?: UserAccessUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type MenuUpsertWithWhereUniqueWithoutParentInput = {
    where: MenuWhereUniqueInput
    update: XOR<MenuUpdateWithoutParentInput, MenuUncheckedUpdateWithoutParentInput>
    create: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput>
  }

  export type MenuUpdateWithWhereUniqueWithoutParentInput = {
    where: MenuWhereUniqueInput
    data: XOR<MenuUpdateWithoutParentInput, MenuUncheckedUpdateWithoutParentInput>
  }

  export type MenuUpdateManyWithWhereWithoutParentInput = {
    where: MenuScalarWhereInput
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyWithoutParentInput>
  }

  export type MenuScalarWhereInput = {
    AND?: MenuScalarWhereInput | MenuScalarWhereInput[]
    OR?: MenuScalarWhereInput[]
    NOT?: MenuScalarWhereInput | MenuScalarWhereInput[]
    id?: IntFilter<"Menu"> | number
    title?: StringFilter<"Menu"> | string
    title_fa?: StringFilter<"Menu"> | string
    active?: BoolFilter<"Menu"> | boolean
    general?: BoolFilter<"Menu"> | boolean
    slug?: StringFilter<"Menu"> | string
    parentId?: IntNullableFilter<"Menu"> | number | null
  }

  export type UserAccessUpsertWithWhereUniqueWithoutMenuInput = {
    where: UserAccessWhereUniqueInput
    update: XOR<UserAccessUpdateWithoutMenuInput, UserAccessUncheckedUpdateWithoutMenuInput>
    create: XOR<UserAccessCreateWithoutMenuInput, UserAccessUncheckedCreateWithoutMenuInput>
  }

  export type UserAccessUpdateWithWhereUniqueWithoutMenuInput = {
    where: UserAccessWhereUniqueInput
    data: XOR<UserAccessUpdateWithoutMenuInput, UserAccessUncheckedUpdateWithoutMenuInput>
  }

  export type UserAccessUpdateManyWithWhereWithoutMenuInput = {
    where: UserAccessScalarWhereInput
    data: XOR<UserAccessUpdateManyMutationInput, UserAccessUncheckedUpdateManyWithoutMenuInput>
  }

  export type UserAccessScalarWhereInput = {
    AND?: UserAccessScalarWhereInput | UserAccessScalarWhereInput[]
    OR?: UserAccessScalarWhereInput[]
    NOT?: UserAccessScalarWhereInput | UserAccessScalarWhereInput[]
    id?: IntFilter<"UserAccess"> | number
    userId?: IntFilter<"UserAccess"> | number
    menuId?: IntFilter<"UserAccess"> | number
    hasAccess?: BoolFilter<"UserAccess"> | boolean
  }

  export type AccessLevelCreateWithoutPositionInput = {
    hasAccess?: boolean
    menu: MenuCreateNestedOneWithoutAccessLevelInput
  }

  export type AccessLevelUncheckedCreateWithoutPositionInput = {
    id?: number
    menuId: number
    hasAccess?: boolean
  }

  export type AccessLevelCreateOrConnectWithoutPositionInput = {
    where: AccessLevelWhereUniqueInput
    create: XOR<AccessLevelCreateWithoutPositionInput, AccessLevelUncheckedCreateWithoutPositionInput>
  }

  export type AccessLevelCreateManyPositionInputEnvelope = {
    data: AccessLevelCreateManyPositionInput | AccessLevelCreateManyPositionInput[]
  }

  export type PositionOnInvitationCreateWithoutPositionInput = {
    Invitation: InvitationCreateNestedOneWithoutPositionsInput
  }

  export type PositionOnInvitationUncheckedCreateWithoutPositionInput = {
    id?: number
    invitationId: number
  }

  export type PositionOnInvitationCreateOrConnectWithoutPositionInput = {
    where: PositionOnInvitationWhereUniqueInput
    create: XOR<PositionOnInvitationCreateWithoutPositionInput, PositionOnInvitationUncheckedCreateWithoutPositionInput>
  }

  export type PositionOnInvitationCreateManyPositionInputEnvelope = {
    data: PositionOnInvitationCreateManyPositionInput | PositionOnInvitationCreateManyPositionInput[]
  }

  export type PositionOnUserCreateWithoutPositionInput = {
    user: UserCreateNestedOneWithoutPositionsInput
  }

  export type PositionOnUserUncheckedCreateWithoutPositionInput = {
    id?: number
    userId: number
  }

  export type PositionOnUserCreateOrConnectWithoutPositionInput = {
    where: PositionOnUserWhereUniqueInput
    create: XOR<PositionOnUserCreateWithoutPositionInput, PositionOnUserUncheckedCreateWithoutPositionInput>
  }

  export type PositionOnUserCreateManyPositionInputEnvelope = {
    data: PositionOnUserCreateManyPositionInput | PositionOnUserCreateManyPositionInput[]
  }

  export type AccessLevelUpsertWithWhereUniqueWithoutPositionInput = {
    where: AccessLevelWhereUniqueInput
    update: XOR<AccessLevelUpdateWithoutPositionInput, AccessLevelUncheckedUpdateWithoutPositionInput>
    create: XOR<AccessLevelCreateWithoutPositionInput, AccessLevelUncheckedCreateWithoutPositionInput>
  }

  export type AccessLevelUpdateWithWhereUniqueWithoutPositionInput = {
    where: AccessLevelWhereUniqueInput
    data: XOR<AccessLevelUpdateWithoutPositionInput, AccessLevelUncheckedUpdateWithoutPositionInput>
  }

  export type AccessLevelUpdateManyWithWhereWithoutPositionInput = {
    where: AccessLevelScalarWhereInput
    data: XOR<AccessLevelUpdateManyMutationInput, AccessLevelUncheckedUpdateManyWithoutPositionInput>
  }

  export type PositionOnInvitationUpsertWithWhereUniqueWithoutPositionInput = {
    where: PositionOnInvitationWhereUniqueInput
    update: XOR<PositionOnInvitationUpdateWithoutPositionInput, PositionOnInvitationUncheckedUpdateWithoutPositionInput>
    create: XOR<PositionOnInvitationCreateWithoutPositionInput, PositionOnInvitationUncheckedCreateWithoutPositionInput>
  }

  export type PositionOnInvitationUpdateWithWhereUniqueWithoutPositionInput = {
    where: PositionOnInvitationWhereUniqueInput
    data: XOR<PositionOnInvitationUpdateWithoutPositionInput, PositionOnInvitationUncheckedUpdateWithoutPositionInput>
  }

  export type PositionOnInvitationUpdateManyWithWhereWithoutPositionInput = {
    where: PositionOnInvitationScalarWhereInput
    data: XOR<PositionOnInvitationUpdateManyMutationInput, PositionOnInvitationUncheckedUpdateManyWithoutPositionInput>
  }

  export type PositionOnInvitationScalarWhereInput = {
    AND?: PositionOnInvitationScalarWhereInput | PositionOnInvitationScalarWhereInput[]
    OR?: PositionOnInvitationScalarWhereInput[]
    NOT?: PositionOnInvitationScalarWhereInput | PositionOnInvitationScalarWhereInput[]
    id?: IntFilter<"PositionOnInvitation"> | number
    invitationId?: IntFilter<"PositionOnInvitation"> | number
    positionId?: IntFilter<"PositionOnInvitation"> | number
  }

  export type PositionOnUserUpsertWithWhereUniqueWithoutPositionInput = {
    where: PositionOnUserWhereUniqueInput
    update: XOR<PositionOnUserUpdateWithoutPositionInput, PositionOnUserUncheckedUpdateWithoutPositionInput>
    create: XOR<PositionOnUserCreateWithoutPositionInput, PositionOnUserUncheckedCreateWithoutPositionInput>
  }

  export type PositionOnUserUpdateWithWhereUniqueWithoutPositionInput = {
    where: PositionOnUserWhereUniqueInput
    data: XOR<PositionOnUserUpdateWithoutPositionInput, PositionOnUserUncheckedUpdateWithoutPositionInput>
  }

  export type PositionOnUserUpdateManyWithWhereWithoutPositionInput = {
    where: PositionOnUserScalarWhereInput
    data: XOR<PositionOnUserUpdateManyMutationInput, PositionOnUserUncheckedUpdateManyWithoutPositionInput>
  }

  export type PositionOnUserScalarWhereInput = {
    AND?: PositionOnUserScalarWhereInput | PositionOnUserScalarWhereInput[]
    OR?: PositionOnUserScalarWhereInput[]
    NOT?: PositionOnUserScalarWhereInput | PositionOnUserScalarWhereInput[]
    id?: IntFilter<"PositionOnUser"> | number
    userId?: IntFilter<"PositionOnUser"> | number
    positionId?: IntFilter<"PositionOnUser"> | number
  }

  export type MenuCreateWithoutAccessLevelInput = {
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    invitationAccess?: InvitationAccessCreateNestedManyWithoutMenuInput
    parent?: MenuCreateNestedOneWithoutChildrenInput
    children?: MenuCreateNestedManyWithoutParentInput
    userAccess?: UserAccessCreateNestedManyWithoutMenuInput
  }

  export type MenuUncheckedCreateWithoutAccessLevelInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    parentId?: number | null
    invitationAccess?: InvitationAccessUncheckedCreateNestedManyWithoutMenuInput
    children?: MenuUncheckedCreateNestedManyWithoutParentInput
    userAccess?: UserAccessUncheckedCreateNestedManyWithoutMenuInput
  }

  export type MenuCreateOrConnectWithoutAccessLevelInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutAccessLevelInput, MenuUncheckedCreateWithoutAccessLevelInput>
  }

  export type PositionCreateWithoutAccessLevelsInput = {
    title: string
    title_fa: string
    req_license?: boolean
    invitations?: PositionOnInvitationCreateNestedManyWithoutPositionInput
    users?: PositionOnUserCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutAccessLevelsInput = {
    id?: number
    title: string
    title_fa: string
    req_license?: boolean
    invitations?: PositionOnInvitationUncheckedCreateNestedManyWithoutPositionInput
    users?: PositionOnUserUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutAccessLevelsInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutAccessLevelsInput, PositionUncheckedCreateWithoutAccessLevelsInput>
  }

  export type MenuUpsertWithoutAccessLevelInput = {
    update: XOR<MenuUpdateWithoutAccessLevelInput, MenuUncheckedUpdateWithoutAccessLevelInput>
    create: XOR<MenuCreateWithoutAccessLevelInput, MenuUncheckedCreateWithoutAccessLevelInput>
    where?: MenuWhereInput
  }

  export type MenuUpdateToOneWithWhereWithoutAccessLevelInput = {
    where?: MenuWhereInput
    data: XOR<MenuUpdateWithoutAccessLevelInput, MenuUncheckedUpdateWithoutAccessLevelInput>
  }

  export type MenuUpdateWithoutAccessLevelInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    invitationAccess?: InvitationAccessUpdateManyWithoutMenuNestedInput
    parent?: MenuUpdateOneWithoutChildrenNestedInput
    children?: MenuUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUpdateManyWithoutMenuNestedInput
  }

  export type MenuUncheckedUpdateWithoutAccessLevelInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationAccess?: InvitationAccessUncheckedUpdateManyWithoutMenuNestedInput
    children?: MenuUncheckedUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type PositionUpsertWithoutAccessLevelsInput = {
    update: XOR<PositionUpdateWithoutAccessLevelsInput, PositionUncheckedUpdateWithoutAccessLevelsInput>
    create: XOR<PositionCreateWithoutAccessLevelsInput, PositionUncheckedCreateWithoutAccessLevelsInput>
    where?: PositionWhereInput
  }

  export type PositionUpdateToOneWithWhereWithoutAccessLevelsInput = {
    where?: PositionWhereInput
    data: XOR<PositionUpdateWithoutAccessLevelsInput, PositionUncheckedUpdateWithoutAccessLevelsInput>
  }

  export type PositionUpdateWithoutAccessLevelsInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    invitations?: PositionOnInvitationUpdateManyWithoutPositionNestedInput
    users?: PositionOnUserUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutAccessLevelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    invitations?: PositionOnInvitationUncheckedUpdateManyWithoutPositionNestedInput
    users?: PositionOnUserUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type UserCreateWithoutInvitationsInput = {
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    positions?: PositionOnUserCreateNestedManyWithoutUserInput
    accessLevels?: UserAccessCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvitationsInput = {
    id?: number
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    positions?: PositionOnUserUncheckedCreateNestedManyWithoutUserInput
    accessLevels?: UserAccessUncheckedCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
  }

  export type InvitationAccessCreateWithoutInvitationInput = {
    hasAccess: boolean
    Menu: MenuCreateNestedOneWithoutInvitationAccessInput
  }

  export type InvitationAccessUncheckedCreateWithoutInvitationInput = {
    id?: number
    menuId: number
    hasAccess: boolean
  }

  export type InvitationAccessCreateOrConnectWithoutInvitationInput = {
    where: InvitationAccessWhereUniqueInput
    create: XOR<InvitationAccessCreateWithoutInvitationInput, InvitationAccessUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationAccessCreateManyInvitationInputEnvelope = {
    data: InvitationAccessCreateManyInvitationInput | InvitationAccessCreateManyInvitationInput[]
  }

  export type PositionOnInvitationCreateWithoutInvitationInput = {
    Position: PositionCreateNestedOneWithoutInvitationsInput
  }

  export type PositionOnInvitationUncheckedCreateWithoutInvitationInput = {
    id?: number
    positionId: number
  }

  export type PositionOnInvitationCreateOrConnectWithoutInvitationInput = {
    where: PositionOnInvitationWhereUniqueInput
    create: XOR<PositionOnInvitationCreateWithoutInvitationInput, PositionOnInvitationUncheckedCreateWithoutInvitationInput>
  }

  export type PositionOnInvitationCreateManyInvitationInputEnvelope = {
    data: PositionOnInvitationCreateManyInvitationInput | PositionOnInvitationCreateManyInvitationInput[]
  }

  export type UserUpsertWithoutInvitationsInput = {
    update: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateWithoutInvitationsInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    positions?: PositionOnUserUpdateManyWithoutUserNestedInput
    accessLevels?: UserAccessUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    positions?: PositionOnUserUncheckedUpdateManyWithoutUserNestedInput
    accessLevels?: UserAccessUncheckedUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InvitationAccessUpsertWithWhereUniqueWithoutInvitationInput = {
    where: InvitationAccessWhereUniqueInput
    update: XOR<InvitationAccessUpdateWithoutInvitationInput, InvitationAccessUncheckedUpdateWithoutInvitationInput>
    create: XOR<InvitationAccessCreateWithoutInvitationInput, InvitationAccessUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationAccessUpdateWithWhereUniqueWithoutInvitationInput = {
    where: InvitationAccessWhereUniqueInput
    data: XOR<InvitationAccessUpdateWithoutInvitationInput, InvitationAccessUncheckedUpdateWithoutInvitationInput>
  }

  export type InvitationAccessUpdateManyWithWhereWithoutInvitationInput = {
    where: InvitationAccessScalarWhereInput
    data: XOR<InvitationAccessUpdateManyMutationInput, InvitationAccessUncheckedUpdateManyWithoutInvitationInput>
  }

  export type PositionOnInvitationUpsertWithWhereUniqueWithoutInvitationInput = {
    where: PositionOnInvitationWhereUniqueInput
    update: XOR<PositionOnInvitationUpdateWithoutInvitationInput, PositionOnInvitationUncheckedUpdateWithoutInvitationInput>
    create: XOR<PositionOnInvitationCreateWithoutInvitationInput, PositionOnInvitationUncheckedCreateWithoutInvitationInput>
  }

  export type PositionOnInvitationUpdateWithWhereUniqueWithoutInvitationInput = {
    where: PositionOnInvitationWhereUniqueInput
    data: XOR<PositionOnInvitationUpdateWithoutInvitationInput, PositionOnInvitationUncheckedUpdateWithoutInvitationInput>
  }

  export type PositionOnInvitationUpdateManyWithWhereWithoutInvitationInput = {
    where: PositionOnInvitationScalarWhereInput
    data: XOR<PositionOnInvitationUpdateManyMutationInput, PositionOnInvitationUncheckedUpdateManyWithoutInvitationInput>
  }

  export type PositionCreateWithoutInvitationsInput = {
    title: string
    title_fa: string
    req_license?: boolean
    accessLevels?: AccessLevelCreateNestedManyWithoutPositionInput
    users?: PositionOnUserCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutInvitationsInput = {
    id?: number
    title: string
    title_fa: string
    req_license?: boolean
    accessLevels?: AccessLevelUncheckedCreateNestedManyWithoutPositionInput
    users?: PositionOnUserUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutInvitationsInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutInvitationsInput, PositionUncheckedCreateWithoutInvitationsInput>
  }

  export type InvitationCreateWithoutPositionsInput = {
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    user?: UserCreateNestedOneWithoutInvitationsInput
    accessLevels?: InvitationAccessCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutPositionsInput = {
    id?: number
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    userId?: number | null
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    accessLevels?: InvitationAccessUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutPositionsInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutPositionsInput, InvitationUncheckedCreateWithoutPositionsInput>
  }

  export type PositionUpsertWithoutInvitationsInput = {
    update: XOR<PositionUpdateWithoutInvitationsInput, PositionUncheckedUpdateWithoutInvitationsInput>
    create: XOR<PositionCreateWithoutInvitationsInput, PositionUncheckedCreateWithoutInvitationsInput>
    where?: PositionWhereInput
  }

  export type PositionUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: PositionWhereInput
    data: XOR<PositionUpdateWithoutInvitationsInput, PositionUncheckedUpdateWithoutInvitationsInput>
  }

  export type PositionUpdateWithoutInvitationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: AccessLevelUpdateManyWithoutPositionNestedInput
    users?: PositionOnUserUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutInvitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: AccessLevelUncheckedUpdateManyWithoutPositionNestedInput
    users?: PositionOnUserUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type InvitationUpsertWithoutPositionsInput = {
    update: XOR<InvitationUpdateWithoutPositionsInput, InvitationUncheckedUpdateWithoutPositionsInput>
    create: XOR<InvitationCreateWithoutPositionsInput, InvitationUncheckedCreateWithoutPositionsInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutPositionsInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutPositionsInput, InvitationUncheckedUpdateWithoutPositionsInput>
  }

  export type InvitationUpdateWithoutPositionsInput = {
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneWithoutInvitationsNestedInput
    accessLevels?: InvitationAccessUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutPositionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: InvitationAccessUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type MenuCreateWithoutInvitationAccessInput = {
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    AccessLevel?: AccessLevelCreateNestedManyWithoutMenuInput
    parent?: MenuCreateNestedOneWithoutChildrenInput
    children?: MenuCreateNestedManyWithoutParentInput
    userAccess?: UserAccessCreateNestedManyWithoutMenuInput
  }

  export type MenuUncheckedCreateWithoutInvitationAccessInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    parentId?: number | null
    AccessLevel?: AccessLevelUncheckedCreateNestedManyWithoutMenuInput
    children?: MenuUncheckedCreateNestedManyWithoutParentInput
    userAccess?: UserAccessUncheckedCreateNestedManyWithoutMenuInput
  }

  export type MenuCreateOrConnectWithoutInvitationAccessInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutInvitationAccessInput, MenuUncheckedCreateWithoutInvitationAccessInput>
  }

  export type InvitationCreateWithoutAccessLevelsInput = {
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    user?: UserCreateNestedOneWithoutInvitationsInput
    positions?: PositionOnInvitationCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutAccessLevelsInput = {
    id?: number
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    userId?: number | null
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    positions?: PositionOnInvitationUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutAccessLevelsInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutAccessLevelsInput, InvitationUncheckedCreateWithoutAccessLevelsInput>
  }

  export type MenuUpsertWithoutInvitationAccessInput = {
    update: XOR<MenuUpdateWithoutInvitationAccessInput, MenuUncheckedUpdateWithoutInvitationAccessInput>
    create: XOR<MenuCreateWithoutInvitationAccessInput, MenuUncheckedCreateWithoutInvitationAccessInput>
    where?: MenuWhereInput
  }

  export type MenuUpdateToOneWithWhereWithoutInvitationAccessInput = {
    where?: MenuWhereInput
    data: XOR<MenuUpdateWithoutInvitationAccessInput, MenuUncheckedUpdateWithoutInvitationAccessInput>
  }

  export type MenuUpdateWithoutInvitationAccessInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    AccessLevel?: AccessLevelUpdateManyWithoutMenuNestedInput
    parent?: MenuUpdateOneWithoutChildrenNestedInput
    children?: MenuUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUpdateManyWithoutMenuNestedInput
  }

  export type MenuUncheckedUpdateWithoutInvitationAccessInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    AccessLevel?: AccessLevelUncheckedUpdateManyWithoutMenuNestedInput
    children?: MenuUncheckedUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type InvitationUpsertWithoutAccessLevelsInput = {
    update: XOR<InvitationUpdateWithoutAccessLevelsInput, InvitationUncheckedUpdateWithoutAccessLevelsInput>
    create: XOR<InvitationCreateWithoutAccessLevelsInput, InvitationUncheckedCreateWithoutAccessLevelsInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutAccessLevelsInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutAccessLevelsInput, InvitationUncheckedUpdateWithoutAccessLevelsInput>
  }

  export type InvitationUpdateWithoutAccessLevelsInput = {
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneWithoutInvitationsNestedInput
    positions?: PositionOnInvitationUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutAccessLevelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    positions?: PositionOnInvitationUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationCreateWithoutUserInput = {
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    accessLevels?: InvitationAccessCreateNestedManyWithoutInvitationInput
    positions?: PositionOnInvitationCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutUserInput = {
    id?: number
    firstName?: string | null
    lastName: string
    mobile: string
    endDate?: Date | string | null
    gender?: string | null
    username: string
    password: string
    createdAt?: Date | string
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    isRegistered?: boolean
    accessLevels?: InvitationAccessUncheckedCreateNestedManyWithoutInvitationInput
    positions?: PositionOnInvitationUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutUserInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
  }

  export type PositionOnUserCreateWithoutUserInput = {
    Position: PositionCreateNestedOneWithoutUsersInput
  }

  export type PositionOnUserUncheckedCreateWithoutUserInput = {
    id?: number
    positionId: number
  }

  export type PositionOnUserCreateOrConnectWithoutUserInput = {
    where: PositionOnUserWhereUniqueInput
    create: XOR<PositionOnUserCreateWithoutUserInput, PositionOnUserUncheckedCreateWithoutUserInput>
  }

  export type PositionOnUserCreateManyUserInputEnvelope = {
    data: PositionOnUserCreateManyUserInput | PositionOnUserCreateManyUserInput[]
  }

  export type UserAccessCreateWithoutUserInput = {
    hasAccess: boolean
    Menu: MenuCreateNestedOneWithoutUserAccessInput
  }

  export type UserAccessUncheckedCreateWithoutUserInput = {
    id?: number
    menuId: number
    hasAccess: boolean
  }

  export type UserAccessCreateOrConnectWithoutUserInput = {
    where: UserAccessWhereUniqueInput
    create: XOR<UserAccessCreateWithoutUserInput, UserAccessUncheckedCreateWithoutUserInput>
  }

  export type UserAccessCreateManyUserInputEnvelope = {
    data: UserAccessCreateManyUserInput | UserAccessCreateManyUserInput[]
  }

  export type UserLoginHistoryCreateWithoutUserInput = {
    loginTime?: Date | string
    logoutTime?: Date | string | null
    ipAddress?: string | null
    deviceInfo?: string | null
    userAgent?: string | null
    status: string
  }

  export type UserLoginHistoryUncheckedCreateWithoutUserInput = {
    id?: number
    loginTime?: Date | string
    logoutTime?: Date | string | null
    ipAddress?: string | null
    deviceInfo?: string | null
    userAgent?: string | null
    status: string
  }

  export type UserLoginHistoryCreateOrConnectWithoutUserInput = {
    where: UserLoginHistoryWhereUniqueInput
    create: XOR<UserLoginHistoryCreateWithoutUserInput, UserLoginHistoryUncheckedCreateWithoutUserInput>
  }

  export type UserLoginHistoryCreateManyUserInputEnvelope = {
    data: UserLoginHistoryCreateManyUserInput | UserLoginHistoryCreateManyUserInput[]
  }

  export type InvitationUpsertWithoutUserInput = {
    update: XOR<InvitationUpdateWithoutUserInput, InvitationUncheckedUpdateWithoutUserInput>
    create: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutUserInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutUserInput, InvitationUncheckedUpdateWithoutUserInput>
  }

  export type InvitationUpdateWithoutUserInput = {
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: InvitationAccessUpdateManyWithoutInvitationNestedInput
    positions?: PositionOnInvitationUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: InvitationAccessUncheckedUpdateManyWithoutInvitationNestedInput
    positions?: PositionOnInvitationUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type PositionOnUserUpsertWithWhereUniqueWithoutUserInput = {
    where: PositionOnUserWhereUniqueInput
    update: XOR<PositionOnUserUpdateWithoutUserInput, PositionOnUserUncheckedUpdateWithoutUserInput>
    create: XOR<PositionOnUserCreateWithoutUserInput, PositionOnUserUncheckedCreateWithoutUserInput>
  }

  export type PositionOnUserUpdateWithWhereUniqueWithoutUserInput = {
    where: PositionOnUserWhereUniqueInput
    data: XOR<PositionOnUserUpdateWithoutUserInput, PositionOnUserUncheckedUpdateWithoutUserInput>
  }

  export type PositionOnUserUpdateManyWithWhereWithoutUserInput = {
    where: PositionOnUserScalarWhereInput
    data: XOR<PositionOnUserUpdateManyMutationInput, PositionOnUserUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAccessWhereUniqueInput
    update: XOR<UserAccessUpdateWithoutUserInput, UserAccessUncheckedUpdateWithoutUserInput>
    create: XOR<UserAccessCreateWithoutUserInput, UserAccessUncheckedCreateWithoutUserInput>
  }

  export type UserAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAccessWhereUniqueInput
    data: XOR<UserAccessUpdateWithoutUserInput, UserAccessUncheckedUpdateWithoutUserInput>
  }

  export type UserAccessUpdateManyWithWhereWithoutUserInput = {
    where: UserAccessScalarWhereInput
    data: XOR<UserAccessUpdateManyMutationInput, UserAccessUncheckedUpdateManyWithoutUserInput>
  }

  export type UserLoginHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: UserLoginHistoryWhereUniqueInput
    update: XOR<UserLoginHistoryUpdateWithoutUserInput, UserLoginHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<UserLoginHistoryCreateWithoutUserInput, UserLoginHistoryUncheckedCreateWithoutUserInput>
  }

  export type UserLoginHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: UserLoginHistoryWhereUniqueInput
    data: XOR<UserLoginHistoryUpdateWithoutUserInput, UserLoginHistoryUncheckedUpdateWithoutUserInput>
  }

  export type UserLoginHistoryUpdateManyWithWhereWithoutUserInput = {
    where: UserLoginHistoryScalarWhereInput
    data: XOR<UserLoginHistoryUpdateManyMutationInput, UserLoginHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type UserLoginHistoryScalarWhereInput = {
    AND?: UserLoginHistoryScalarWhereInput | UserLoginHistoryScalarWhereInput[]
    OR?: UserLoginHistoryScalarWhereInput[]
    NOT?: UserLoginHistoryScalarWhereInput | UserLoginHistoryScalarWhereInput[]
    id?: IntFilter<"UserLoginHistory"> | number
    userId?: IntFilter<"UserLoginHistory"> | number
    loginTime?: DateTimeFilter<"UserLoginHistory"> | Date | string
    logoutTime?: DateTimeNullableFilter<"UserLoginHistory"> | Date | string | null
    ipAddress?: StringNullableFilter<"UserLoginHistory"> | string | null
    deviceInfo?: StringNullableFilter<"UserLoginHistory"> | string | null
    userAgent?: StringNullableFilter<"UserLoginHistory"> | string | null
    status?: StringFilter<"UserLoginHistory"> | string
  }

  export type UserCreateWithoutPositionsInput = {
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationCreateNestedOneWithoutUserInput
    accessLevels?: UserAccessCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPositionsInput = {
    id?: number
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationUncheckedCreateNestedOneWithoutUserInput
    accessLevels?: UserAccessUncheckedCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPositionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
  }

  export type PositionCreateWithoutUsersInput = {
    title: string
    title_fa: string
    req_license?: boolean
    accessLevels?: AccessLevelCreateNestedManyWithoutPositionInput
    invitations?: PositionOnInvitationCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutUsersInput = {
    id?: number
    title: string
    title_fa: string
    req_license?: boolean
    accessLevels?: AccessLevelUncheckedCreateNestedManyWithoutPositionInput
    invitations?: PositionOnInvitationUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutUsersInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutUsersInput, PositionUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutPositionsInput = {
    update: XOR<UserUpdateWithoutPositionsInput, UserUncheckedUpdateWithoutPositionsInput>
    create: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPositionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPositionsInput, UserUncheckedUpdateWithoutPositionsInput>
  }

  export type UserUpdateWithoutPositionsInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUpdateOneWithoutUserNestedInput
    accessLevels?: UserAccessUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPositionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUncheckedUpdateOneWithoutUserNestedInput
    accessLevels?: UserAccessUncheckedUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PositionUpsertWithoutUsersInput = {
    update: XOR<PositionUpdateWithoutUsersInput, PositionUncheckedUpdateWithoutUsersInput>
    create: XOR<PositionCreateWithoutUsersInput, PositionUncheckedCreateWithoutUsersInput>
    where?: PositionWhereInput
  }

  export type PositionUpdateToOneWithWhereWithoutUsersInput = {
    where?: PositionWhereInput
    data: XOR<PositionUpdateWithoutUsersInput, PositionUncheckedUpdateWithoutUsersInput>
  }

  export type PositionUpdateWithoutUsersInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: AccessLevelUpdateManyWithoutPositionNestedInput
    invitations?: PositionOnInvitationUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    req_license?: BoolFieldUpdateOperationsInput | boolean
    accessLevels?: AccessLevelUncheckedUpdateManyWithoutPositionNestedInput
    invitations?: PositionOnInvitationUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type MenuCreateWithoutUserAccessInput = {
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    AccessLevel?: AccessLevelCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessCreateNestedManyWithoutMenuInput
    parent?: MenuCreateNestedOneWithoutChildrenInput
    children?: MenuCreateNestedManyWithoutParentInput
  }

  export type MenuUncheckedCreateWithoutUserAccessInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
    parentId?: number | null
    AccessLevel?: AccessLevelUncheckedCreateNestedManyWithoutMenuInput
    invitationAccess?: InvitationAccessUncheckedCreateNestedManyWithoutMenuInput
    children?: MenuUncheckedCreateNestedManyWithoutParentInput
  }

  export type MenuCreateOrConnectWithoutUserAccessInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutUserAccessInput, MenuUncheckedCreateWithoutUserAccessInput>
  }

  export type UserCreateWithoutAccessLevelsInput = {
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationCreateNestedOneWithoutUserInput
    positions?: PositionOnUserCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccessLevelsInput = {
    id?: number
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationUncheckedCreateNestedOneWithoutUserInput
    positions?: PositionOnUserUncheckedCreateNestedManyWithoutUserInput
    loginHistories?: UserLoginHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccessLevelsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccessLevelsInput, UserUncheckedCreateWithoutAccessLevelsInput>
  }

  export type MenuUpsertWithoutUserAccessInput = {
    update: XOR<MenuUpdateWithoutUserAccessInput, MenuUncheckedUpdateWithoutUserAccessInput>
    create: XOR<MenuCreateWithoutUserAccessInput, MenuUncheckedCreateWithoutUserAccessInput>
    where?: MenuWhereInput
  }

  export type MenuUpdateToOneWithWhereWithoutUserAccessInput = {
    where?: MenuWhereInput
    data: XOR<MenuUpdateWithoutUserAccessInput, MenuUncheckedUpdateWithoutUserAccessInput>
  }

  export type MenuUpdateWithoutUserAccessInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    AccessLevel?: AccessLevelUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUpdateManyWithoutMenuNestedInput
    parent?: MenuUpdateOneWithoutChildrenNestedInput
    children?: MenuUpdateManyWithoutParentNestedInput
  }

  export type MenuUncheckedUpdateWithoutUserAccessInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    AccessLevel?: AccessLevelUncheckedUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUncheckedUpdateManyWithoutMenuNestedInput
    children?: MenuUncheckedUpdateManyWithoutParentNestedInput
  }

  export type UserUpsertWithoutAccessLevelsInput = {
    update: XOR<UserUpdateWithoutAccessLevelsInput, UserUncheckedUpdateWithoutAccessLevelsInput>
    create: XOR<UserCreateWithoutAccessLevelsInput, UserUncheckedCreateWithoutAccessLevelsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccessLevelsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccessLevelsInput, UserUncheckedUpdateWithoutAccessLevelsInput>
  }

  export type UserUpdateWithoutAccessLevelsInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUpdateOneWithoutUserNestedInput
    positions?: PositionOnUserUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccessLevelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUncheckedUpdateOneWithoutUserNestedInput
    positions?: PositionOnUserUncheckedUpdateManyWithoutUserNestedInput
    loginHistories?: UserLoginHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLoginHistoriesInput = {
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationCreateNestedOneWithoutUserInput
    positions?: PositionOnUserCreateNestedManyWithoutUserInput
    accessLevels?: UserAccessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLoginHistoriesInput = {
    id?: number
    first_name: string
    last_name: string
    mobile: string
    email?: string | null
    gender: string
    inviterId?: number | null
    invitationTime: Date | string
    registrationTime?: Date | string
    endDate?: Date | string | null
    active?: boolean
    introdPathLetter?: string | null
    letterIssuer?: string | null
    letterNumber?: string | null
    letterDate?: string | null
    letterApprover?: string | null
    userName: string
    password: string
    invitations?: InvitationUncheckedCreateNestedOneWithoutUserInput
    positions?: PositionOnUserUncheckedCreateNestedManyWithoutUserInput
    accessLevels?: UserAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLoginHistoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoginHistoriesInput, UserUncheckedCreateWithoutLoginHistoriesInput>
  }

  export type UserUpsertWithoutLoginHistoriesInput = {
    update: XOR<UserUpdateWithoutLoginHistoriesInput, UserUncheckedUpdateWithoutLoginHistoriesInput>
    create: XOR<UserCreateWithoutLoginHistoriesInput, UserUncheckedCreateWithoutLoginHistoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLoginHistoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLoginHistoriesInput, UserUncheckedUpdateWithoutLoginHistoriesInput>
  }

  export type UserUpdateWithoutLoginHistoriesInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUpdateOneWithoutUserNestedInput
    positions?: PositionOnUserUpdateManyWithoutUserNestedInput
    accessLevels?: UserAccessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLoginHistoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    inviterId?: NullableIntFieldUpdateOperationsInput | number | null
    invitationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    introdPathLetter?: NullableStringFieldUpdateOperationsInput | string | null
    letterIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    letterNumber?: NullableStringFieldUpdateOperationsInput | string | null
    letterDate?: NullableStringFieldUpdateOperationsInput | string | null
    letterApprover?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUncheckedUpdateOneWithoutUserNestedInput
    positions?: PositionOnUserUncheckedUpdateManyWithoutUserNestedInput
    accessLevels?: UserAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccessLevelCreateManyMenuInput = {
    id?: number
    positionId: number
    hasAccess?: boolean
  }

  export type InvitationAccessCreateManyMenuInput = {
    id?: number
    invitationId: number
    hasAccess: boolean
  }

  export type MenuCreateManyParentInput = {
    id?: number
    title: string
    title_fa: string
    active: boolean
    general: boolean
    slug: string
  }

  export type UserAccessCreateManyMenuInput = {
    id?: number
    userId: number
    hasAccess: boolean
  }

  export type AccessLevelUpdateWithoutMenuInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    position?: PositionUpdateOneRequiredWithoutAccessLevelsNestedInput
  }

  export type AccessLevelUncheckedUpdateWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccessLevelUncheckedUpdateManyWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvitationAccessUpdateWithoutMenuInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    Invitation?: InvitationUpdateOneRequiredWithoutAccessLevelsNestedInput
  }

  export type InvitationAccessUncheckedUpdateWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvitationAccessUncheckedUpdateManyWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MenuUpdateWithoutParentInput = {
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    AccessLevel?: AccessLevelUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUpdateManyWithoutMenuNestedInput
    children?: MenuUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUpdateManyWithoutMenuNestedInput
  }

  export type MenuUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    AccessLevel?: AccessLevelUncheckedUpdateManyWithoutMenuNestedInput
    invitationAccess?: InvitationAccessUncheckedUpdateManyWithoutMenuNestedInput
    children?: MenuUncheckedUpdateManyWithoutParentNestedInput
    userAccess?: UserAccessUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type MenuUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    title_fa?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    general?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type UserAccessUpdateWithoutMenuInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAccessLevelsNestedInput
  }

  export type UserAccessUncheckedUpdateWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAccessUncheckedUpdateManyWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccessLevelCreateManyPositionInput = {
    id?: number
    menuId: number
    hasAccess?: boolean
  }

  export type PositionOnInvitationCreateManyPositionInput = {
    id?: number
    invitationId: number
  }

  export type PositionOnUserCreateManyPositionInput = {
    id?: number
    userId: number
  }

  export type AccessLevelUpdateWithoutPositionInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    menu?: MenuUpdateOneRequiredWithoutAccessLevelNestedInput
  }

  export type AccessLevelUncheckedUpdateWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccessLevelUncheckedUpdateManyWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PositionOnInvitationUpdateWithoutPositionInput = {
    Invitation?: InvitationUpdateOneRequiredWithoutPositionsNestedInput
  }

  export type PositionOnInvitationUncheckedUpdateWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnInvitationUncheckedUpdateManyWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnUserUpdateWithoutPositionInput = {
    user?: UserUpdateOneRequiredWithoutPositionsNestedInput
  }

  export type PositionOnUserUncheckedUpdateWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnUserUncheckedUpdateManyWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type InvitationAccessCreateManyInvitationInput = {
    id?: number
    menuId: number
    hasAccess: boolean
  }

  export type PositionOnInvitationCreateManyInvitationInput = {
    id?: number
    positionId: number
  }

  export type InvitationAccessUpdateWithoutInvitationInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    Menu?: MenuUpdateOneRequiredWithoutInvitationAccessNestedInput
  }

  export type InvitationAccessUncheckedUpdateWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvitationAccessUncheckedUpdateManyWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PositionOnInvitationUpdateWithoutInvitationInput = {
    Position?: PositionUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type PositionOnInvitationUncheckedUpdateWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnInvitationUncheckedUpdateManyWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnUserCreateManyUserInput = {
    id?: number
    positionId: number
  }

  export type UserAccessCreateManyUserInput = {
    id?: number
    menuId: number
    hasAccess: boolean
  }

  export type UserLoginHistoryCreateManyUserInput = {
    id?: number
    loginTime?: Date | string
    logoutTime?: Date | string | null
    ipAddress?: string | null
    deviceInfo?: string | null
    userAgent?: string | null
    status: string
  }

  export type PositionOnUserUpdateWithoutUserInput = {
    Position?: PositionUpdateOneRequiredWithoutUsersNestedInput
  }

  export type PositionOnUserUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type PositionOnUserUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
  }

  export type UserAccessUpdateWithoutUserInput = {
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
    Menu?: MenuUpdateOneRequiredWithoutUserAccessNestedInput
  }

  export type UserAccessUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAccessUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuId?: IntFieldUpdateOperationsInput | number
    hasAccess?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserLoginHistoryUpdateWithoutUserInput = {
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserLoginHistoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserLoginHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}