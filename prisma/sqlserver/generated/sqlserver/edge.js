
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "6.3.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
  Snapshot: 'Snapshot'
});

exports.Prisma.AbadeMakhzanScalarFieldEnum = {
  IdMakhzan: 'IdMakhzan',
  TooleBala: 'TooleBala',
  ArzeBala: 'ArzeBala',
  TooleKaf: 'TooleKaf',
  ArzeKaf: 'ArzeKaf',
  Omgh: 'Omgh',
  HajmMohasebat: 'HajmMohasebat',
  HadeaghalHajm: 'HadeaghalHajm',
  NameStation: 'NameStation'
};

exports.Prisma.AbgirScalarFieldEnum = {
  IdKontor: 'IdKontor',
  FIdRanesh: 'FIdRanesh',
  Abgir: 'Abgir'
};

exports.Prisma.AtashSooziScalarFieldEnum = {
  IdAtash: 'IdAtash',
  FIdRanesh: 'FIdRanesh',
  FIdTarDor: 'FIdTarDor',
  AtashSoozi: 'AtashSoozi'
};

exports.Prisma.BahrebardairProgramScalarFieldEnum = {
  IdProgram: 'IdProgram',
  FIdRanesh: 'FIdRanesh',
  FIdTarDor: 'FIdTarDor',
  Tedad: 'Tedad',
  Shorooe: 'Shorooe',
  Paian: 'Paian'
};

exports.Prisma.BahrebardariKeshtDoreScalarFieldEnum = {
  IdBahDor: 'IdBahDor',
  FIdSal: 'FIdSal',
  FIdDore: 'FIdDore',
  FIdRanesh: 'FIdRanesh',
  FIdNoeM: 'FIdNoeM',
  Area: 'Area'
};

exports.Prisma.BahrebardariTaghvimScalarFieldEnum = {
  IdTag: 'IdTag',
  FIdTarDor: 'FIdTarDor',
  FIdRanesh: 'FIdRanesh',
  Taghvim: 'Taghvim'
};

exports.Prisma.BareshMotaleatScalarFieldEnum = {
  IdBarMot: 'IdBarMot',
  FIdNet: 'FIdNet',
  FIdMah: 'FIdMah',
  BareshMotaleat: 'BareshMotaleat'
};

exports.Prisma.DarajePipeScalarFieldEnum = {
  IdDPipe: 'IdDPipe',
  DarajePipe: 'DarajePipe'
};

exports.Prisma.DarjeStationScalarFieldEnum = {
  IdDStation: 'IdDStation',
  DarajeStation: 'DarajeStation'
};

exports.Prisma.DoreKeshtScalarFieldEnum = {
  IdDore: 'IdDore',
  Dore: 'Dore'
};

exports.Prisma.EshtebahAvamelScalarFieldEnum = {
  IdEsht: 'IdEsht',
  FIdRanesh: 'FIdRanesh',
  FIdTarDor: 'FIdTarDor',
  Eshtebah: 'Eshtebah'
};

exports.Prisma.FlowBehboodScalarFieldEnum = {
  IdBehbood: 'IdBehbood',
  FIdRanesh: 'FIdRanesh',
  FIdTarDor: 'FIdTarDor',
  Flow: 'Flow'
};

exports.Prisma.FlowmeterScalarFieldEnum = {
  IdFIT: 'IdFIT',
  FIdRanesh: 'FIdRanesh',
  FIdTrikh: 'FIdTrikh',
  Flowmeter: 'Flowmeter'
};

exports.Prisma.KhatRaneshScalarFieldEnum = {
  IdRanesh: 'IdRanesh',
  RaneshName: 'RaneshName',
  FIdPumpSta: 'FIdPumpSta',
  FIdDPipe: 'FIdDPipe',
  FIdSePu: 'FIdSePu',
  FIdMeasuring: 'FIdMeasuring'
};

exports.Prisma.KhatRaneshAreaScalarFieldEnum = {
  IdRanesh: 'IdRanesh',
  FIdRanesh: 'FIdRanesh',
  FIdLand: 'FIdLand',
  FIdNet: 'FIdNet',
  Area: 'Area'
};

exports.Prisma.KhatRaneshPumpScalarFieldEnum = {
  IdRanesh: 'IdRanesh',
  FIdRanesh: 'FIdRanesh',
  ModelPump: 'ModelPump',
  FIdPump: 'FIdPump',
  TedadPump: 'TedadPump',
  DebiPomp: 'DebiPomp',
  FesharPump: 'FesharPump',
  Randeman: 'Randeman',
  TavaneNami: 'TavaneNami',
  TavaneJazbi: 'TavaneJazbi',
  Voltazh: 'Voltazh',
  DoreMotor: 'DoreMotor',
  FeshareMakesh: 'FeshareMakesh',
  FeshareRanesh: 'FeshareRanesh',
  SizeMakesh: 'SizeMakesh',
  SizeRanesh: 'SizeRanesh',
  SizeKolektor: 'SizeKolektor',
  SizeShireKolektor: 'SizeShireKolektor'
};

exports.Prisma.KhatRaneshSegliScalarFieldEnum = {
  IdRanesh: 'IdRanesh',
  FIdRanesh: 'FIdRanesh',
  Zarfiat: 'Zarfiat'
};

exports.Prisma.KontorScalarFieldEnum = {
  IdKon: 'IdKon',
  FIdKontor: 'FIdKontor',
  FIdTarDor: 'FIdTarDor',
  Kontor: 'Kontor'
};

exports.Prisma.LandScalarFieldEnum = {
  IdLand: 'IdLand',
  Land: 'Land'
};

exports.Prisma.MahScalarFieldEnum = {
  IdMah: 'IdMah',
  Mah: 'Mah'
};

exports.Prisma.MeasuringToolScalarFieldEnum = {
  IdMeasuring: 'IdMeasuring',
  MeasuringTool: 'MeasuringTool',
  Precision: 'Precision'
};

exports.Prisma.NashtShabakeScalarFieldEnum = {
  IdNasht: 'IdNasht',
  FIdRanesh: 'FIdRanesh',
  FIdTriDor: 'FIdTriDor',
  NashtShabake: 'NashtShabake'
};

exports.Prisma.NetworkScalarFieldEnum = {
  IdNet: 'IdNet',
  Network: 'Network',
  FIdSP: 'FIdSP'
};

exports.Prisma.NoeKeshtScalarFieldEnum = {
  IdNoeK: 'IdNoeK',
  Kesht: 'Kesht'
};

exports.Prisma.NoeMahsoolScalarFieldEnum = {
  IdNoeM: 'IdNoeM',
  Mahsool: 'Mahsool',
  FIdNoeK: 'FIdNoeK'
};

exports.Prisma.NonFITScalarFieldEnum = {
  IdNonFIT: 'IdNonFIT',
  FIdRanesh: 'FIdRanesh',
  FIdTarDor: 'FIdTarDor',
  VOLUM: 'VOLUM'
};

exports.Prisma.PumpStationScalarFieldEnum = {
  IdPumpSta: 'IdPumpSta',
  NameStation: 'NameStation',
  KM: 'KM',
  FIdNet: 'FIdNet',
  FIdDStation: 'FIdDStation',
  FIdMakhzan: 'FIdMakhzan'
};

exports.Prisma.PumpTypeScalarFieldEnum = {
  IdPump: 'IdPump',
  PumpType: 'PumpType'
};

exports.Prisma.RainfallStationScalarFieldEnum = {
  IdRaiSta: 'IdRaiSta',
  FIdWeaSta: 'FIdWeaSta',
  FIdTrikh: 'FIdTrikh',
  FIdRaiTy: 'FIdRaiTy',
  ErtefaeBaresh: 'ErtefaeBaresh'
};

exports.Prisma.RainfallTypeScalarFieldEnum = {
  IdRaiTy: 'IdRaiTy',
  RainfallType: 'RainfallType'
};

exports.Prisma.SaleZeraeeScalarFieldEnum = {
  IdSal: 'IdSal',
  SaleZeraee: 'SaleZeraee'
};

exports.Prisma.SeghliPumpScalarFieldEnum = {
  IdSePu: 'IdSePu',
  SeghliPump: 'SeghliPump'
};

exports.Prisma.SystemPartScalarFieldEnum = {
  IdSP: 'IdSP',
  Part: 'Part',
  KM: 'KM'
};

exports.Prisma.TakhlieMakhzanScalarFieldEnum = {
  IdTakhlie: 'IdTakhlie',
  FIdRanesh: 'FIdRanesh',
  FIdTarDor: 'FIdTarDor',
  Takhlie: 'Takhlie'
};

exports.Prisma.TestScalarFieldEnum = {
  IdTest: 'IdTest',
  FIdRanesh: 'FIdRanesh',
  FIdTarDor: 'FIdTarDor',
  Test: 'Test'
};

exports.Prisma.TrikhDoreKeshtScalarFieldEnum = {
  IdTarDor: 'IdTarDor',
  FIdSal: 'FIdSal',
  FIdDore: 'FIdDore',
  Trikh: 'Trikh',
  TrikhKhorshidi: 'TrikhKhorshidi'
};

exports.Prisma.WeatherStationScalarFieldEnum = {
  IdWeaSta: 'IdWeaSta',
  Station: 'Station'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  AbadeMakhzan: 'AbadeMakhzan',
  Abgir: 'Abgir',
  AtashSoozi: 'AtashSoozi',
  BahrebardairProgram: 'BahrebardairProgram',
  BahrebardariKeshtDore: 'BahrebardariKeshtDore',
  BahrebardariTaghvim: 'BahrebardariTaghvim',
  BareshMotaleat: 'BareshMotaleat',
  DarajePipe: 'DarajePipe',
  DarjeStation: 'DarjeStation',
  DoreKesht: 'DoreKesht',
  EshtebahAvamel: 'EshtebahAvamel',
  FlowBehbood: 'FlowBehbood',
  Flowmeter: 'Flowmeter',
  KhatRanesh: 'KhatRanesh',
  KhatRaneshArea: 'KhatRaneshArea',
  KhatRaneshPump: 'KhatRaneshPump',
  KhatRaneshSegli: 'KhatRaneshSegli',
  Kontor: 'Kontor',
  Land: 'Land',
  Mah: 'Mah',
  MeasuringTool: 'MeasuringTool',
  NashtShabake: 'NashtShabake',
  Network: 'Network',
  NoeKesht: 'NoeKesht',
  NoeMahsool: 'NoeMahsool',
  NonFIT: 'NonFIT',
  PumpStation: 'PumpStation',
  PumpType: 'PumpType',
  RainfallStation: 'RainfallStation',
  RainfallType: 'RainfallType',
  SaleZeraee: 'SaleZeraee',
  SeghliPump: 'SeghliPump',
  SystemPart: 'SystemPart',
  TakhlieMakhzan: 'TakhlieMakhzan',
  Test: 'Test',
  TrikhDoreKesht: 'TrikhDoreKesht',
  WeatherStation: 'WeatherStation'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\D\\Software\\project_for_Next\\garmsiri14031104\\garmsiri\\prisma\\sqlserver\\generated\\sqlserver",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "D:\\D\\Software\\project_for_Next\\garmsiri14031104\\garmsiri\\prisma\\sqlserver\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "6.3.0",
  "engineVersion": "11f085a2012c0f4778414c8db2651556ee0ef959",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlserver",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL_SQLSERVER",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"./generated/sqlserver\"\n}\n\ndatasource db {\n  provider = \"sqlserver\"\n  url      = env(\"DATABASE_URL_SQLSERVER\")\n}\n\nmodel AbadeMakhzan {\n  IdMakhzan     Int      @id @default(autoincrement())\n  TooleBala     Decimal? @db.Decimal(4, 1)\n  ArzeBala      Decimal? @db.Decimal(4, 1)\n  TooleKaf      Decimal? @db.Decimal(4, 1)\n  ArzeKaf       Decimal? @db.Decimal(4, 1)\n  Omgh          Decimal? @db.Decimal(4, 1)\n  HajmMohasebat Decimal  @db.Decimal(6, 1)\n  HadeaghalHajm Int?\n  NameStation   String   @db.NVarChar(20)\n}\n\nmodel Abgir {\n  IdKontor  Int    @id @default(autoincrement())\n  FIdRanesh Int\n  Abgir     String @db.NVarChar(6)\n}\n\nmodel AtashSoozi {\n  IdAtash    Int  @id @db.TinyInt // تعیین به‌عنوان کلید اصلی\n  FIdRanesh  Int? @db.TinyInt\n  FIdTarDor  Int? @db.SmallInt\n  AtashSoozi Int?\n}\n\nmodel BahrebardairProgram {\n  IdProgram Int       @id @default(autoincrement())\n  FIdRanesh Int       @db.TinyInt\n  FIdTarDor Int       @db.SmallInt\n  Tedad     Int       @db.TinyInt\n  Shorooe   DateTime? @db.Time\n  Paian     DateTime? @db.Time\n}\n\nmodel BahrebardariKeshtDore {\n  IdBahDor  Int     @id @default(autoincrement())\n  FIdSal    Int     @db.TinyInt\n  FIdDore   Int     @db.TinyInt\n  FIdRanesh Int     @db.TinyInt\n  FIdNoeM   Int     @db.TinyInt\n  Area      Decimal @db.Decimal(5, 1)\n}\n\nmodel BahrebardariTaghvim {\n  IdTag     Int     @id @default(autoincrement())\n  FIdTarDor Int     @db.SmallInt\n  FIdRanesh Int     @db.TinyInt\n  Taghvim   Decimal @db.Decimal(9, 2)\n}\n\nmodel BareshMotaleat {\n  IdBarMot       Int     @id @default(autoincrement())\n  FIdNet         Int     @db.TinyInt\n  FIdMah         Int     @db.TinyInt\n  BareshMotaleat Decimal @db.Decimal(4, 2)\n}\n\nmodel DarajePipe {\n  IdDPipe    Int    @id @default(autoincrement())\n  DarajePipe String @db.NVarChar(10)\n}\n\nmodel DarjeStation {\n  IdDStation    Int    @id @default(autoincrement())\n  DarajeStation String @db.NVarChar(6)\n}\n\nmodel DoreKesht {\n  IdDore Int    @id @default(autoincrement())\n  Dore   String @db.NVarChar(8)\n}\n\nmodel EshtebahAvamel {\n  IdEsht    Int @id\n  FIdRanesh Int @db.TinyInt\n  FIdTarDor Int @db.SmallInt\n  Eshtebah  Int\n}\n\nmodel FlowBehbood {\n  IdBehbood Int @id @default(autoincrement())\n  FIdRanesh Int @db.TinyInt\n  FIdTarDor Int @db.SmallInt\n  Flow      Int @db.SmallInt\n}\n\nmodel Flowmeter {\n  IdFIT     Int   @id\n  FIdRanesh Int\n  FIdTrikh  Int\n  Flowmeter Float\n}\n\nmodel KhatRanesh {\n  IdRanesh     Int    @id @default(autoincrement())\n  RaneshName   String @db.NVarChar(15)\n  FIdPumpSta   Int\n  FIdDPipe     Int\n  FIdSePu      Int\n  FIdMeasuring Int\n}\n\nmodel KhatRaneshArea {\n  IdRanesh  Int     @id @default(autoincrement())\n  FIdRanesh Int\n  FIdLand   Int\n  FIdNet    Int\n  Area      Decimal @db.Decimal(5, 1)\n}\n\nmodel KhatRaneshPump {\n  IdRanesh          Int     @id @default(autoincrement())\n  FIdRanesh         Int\n  ModelPump         String? @db.NVarChar(25)\n  FIdPump           Int\n  TedadPump         Int?\n  DebiPomp          Decimal @db.Decimal(5, 1)\n  FesharPump        Decimal @db.Decimal(4, 1)\n  Randeman          Int\n  TavaneNami        Decimal @db.Decimal(4, 1)\n  TavaneJazbi       Decimal @db.Decimal(4, 1)\n  Voltazh           Int\n  DoreMotor         Int\n  FeshareMakesh     Int\n  FeshareRanesh     Int\n  SizeMakesh        Int\n  SizeRanesh        Int\n  SizeKolektor      Int\n  SizeShireKolektor Int\n}\n\nmodel KhatRaneshSegli {\n  IdRanesh  Int     @id @default(autoincrement())\n  FIdRanesh Int\n  Zarfiat   Decimal @db.Decimal(5, 1)\n}\n\nmodel Kontor {\n  IdKon     Int @id @default(autoincrement())\n  FIdKontor Int\n  FIdTarDor Int\n  Kontor    Int\n}\n\nmodel Land {\n  IdLand Int    @id\n  Land   String @db.NVarChar(5)\n}\n\nmodel Mah {\n  IdMah Int    @id\n  Mah   String @db.NVarChar(8)\n}\n\nmodel MeasuringTool {\n  IdMeasuring   Int    @id @default(autoincrement())\n  MeasuringTool String @db.NVarChar(20)\n  Precision     String @db.NVarChar(10)\n}\n\nmodel NashtShabake {\n  IdNasht      Int @id @default(autoincrement())\n  FIdRanesh    Int\n  FIdTriDor    Int\n  NashtShabake Int\n}\n\nmodel Network {\n  IdNet   Int    @id @default(autoincrement())\n  Network String @db.NVarChar(20)\n  FIdSP   Int\n}\n\nmodel NoeKesht {\n  IdNoeK Int    @id @default(autoincrement())\n  Kesht  String @db.NVarChar(5)\n}\n\nmodel NoeMahsool {\n  IdNoeM  Int    @id @default(autoincrement())\n  Mahsool String @db.NVarChar(30)\n  FIdNoeK Int\n}\n\nmodel NonFIT {\n  IdNonFIT  Int @id\n  FIdRanesh Int\n  FIdTarDor Int @default(autoincrement())\n  VOLUM     Int\n}\n\nmodel PumpStation {\n  IdPumpSta   Int    @id @default(autoincrement())\n  NameStation String @db.NVarChar(20)\n  KM          Int?\n  FIdNet      Int\n  FIdDStation Int\n  FIdMakhzan  Int?\n}\n\nmodel PumpType {\n  IdPump   Int    @id @default(autoincrement())\n  PumpType String @db.NVarChar(50)\n}\n\nmodel RainfallStation {\n  IdRaiSta      Int     @id @default(autoincrement())\n  FIdWeaSta     Int\n  FIdTrikh      Int\n  FIdRaiTy      Int\n  ErtefaeBaresh Decimal @db.Decimal(3, 1)\n}\n\nmodel RainfallType {\n  IdRaiTy      Int    @id @default(autoincrement())\n  RainfallType String @db.NVarChar(5)\n}\n\nmodel SaleZeraee {\n  IdSal      Int    @id @default(autoincrement())\n  SaleZeraee String @db.NVarChar(10)\n}\n\nmodel SeghliPump {\n  IdSePu     Int    @id @default(autoincrement())\n  SeghliPump String @db.NVarChar(10)\n}\n\nmodel SystemPart {\n  IdSP Int    @id @default(autoincrement())\n  Part String @db.NVarChar(20)\n  KM   Int\n}\n\nmodel TakhlieMakhzan {\n  IdTakhlie Int @id @default(autoincrement())\n  FIdRanesh Int\n  FIdTarDor Int\n  Takhlie   Int\n}\n\nmodel Test {\n  IdTest    Int @id @default(autoincrement())\n  FIdRanesh Int\n  FIdTarDor Int\n  Test      Int\n}\n\nmodel TrikhDoreKesht {\n  IdTarDor       Int      @id @default(autoincrement())\n  FIdSal         Int\n  FIdDore        Int\n  Trikh          DateTime @db.Date\n  TrikhKhorshidi String   @db.NVarChar(10)\n}\n\nmodel WeatherStation {\n  IdWeaSta Int    @id @default(autoincrement())\n  Station  String @db.NVarChar(20)\n}\n",
  "inlineSchemaHash": "b2dc5acd13afd5c0ab1f64ac1810388f3adad36640aedc69198bf3ee0868c22c",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"AbadeMakhzan\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdMakhzan\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TooleBala\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ArzeBala\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TooleKaf\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ArzeKaf\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Omgh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"HajmMohasebat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"6\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"HadeaghalHajm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"NameStation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Abgir\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdKontor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Abgir\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AtashSoozi\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdAtash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AtashSoozi\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BahrebardairProgram\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdProgram\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Tedad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Shorooe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Time\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Paian\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Time\",[]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BahrebardariKeshtDore\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdBahDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdSal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdDore\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdNoeM\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Area\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"5\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BahrebardariTaghvim\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdTag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Taghvim\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"9\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BareshMotaleat\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdBarMot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdNet\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdMah\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"BareshMotaleat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DarajePipe\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdDPipe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DarajePipe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DarjeStation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdDStation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DarajeStation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DoreKesht\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdDore\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Dore\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"8\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EshtebahAvamel\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdEsht\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Eshtebah\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FlowBehbood\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdBehbood\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"TinyInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Flow\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Flowmeter\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdFIT\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTrikh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Flowmeter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"KhatRanesh\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RaneshName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"15\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdPumpSta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdDPipe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdSePu\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdMeasuring\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"KhatRaneshArea\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdLand\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdNet\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Area\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"5\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"KhatRaneshPump\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ModelPump\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"25\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdPump\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TedadPump\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DebiPomp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"5\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FesharPump\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Randeman\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TavaneNami\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TavaneJazbi\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"4\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Voltazh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DoreMotor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FeshareMakesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FeshareRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"SizeMakesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"SizeRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"SizeKolektor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"SizeShireKolektor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"KhatRaneshSegli\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Zarfiat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"5\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Kontor\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdKon\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdKontor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Kontor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Land\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdLand\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Land\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"5\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Mah\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdMah\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Mah\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"8\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MeasuringTool\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdMeasuring\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"MeasuringTool\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Precision\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NashtShabake\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdNasht\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTriDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"NashtShabake\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Network\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdNet\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Network\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdSP\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NoeKesht\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdNoeK\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Kesht\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"5\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NoeMahsool\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdNoeM\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Mahsool\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"30\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdNoeK\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NonFIT\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdNonFIT\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"VOLUM\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PumpStation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdPumpSta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"NameStation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"KM\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdNet\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdDStation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdMakhzan\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PumpType\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdPump\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PumpType\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RainfallStation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdRaiSta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdWeaSta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTrikh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRaiTy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ErtefaeBaresh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"3\",\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RainfallType\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdRaiTy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RainfallType\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"5\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SaleZeraee\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdSal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"SaleZeraee\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SeghliPump\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdSePu\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"SeghliPump\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SystemPart\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdSP\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Part\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"KM\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TakhlieMakhzan\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdTakhlie\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Takhlie\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Test\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdTest\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdRanesh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Test\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TrikhDoreKesht\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdTarDor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdSal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FIdDore\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Trikh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TrikhKhorshidi\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"WeatherStation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"IdWeaSta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Station\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"NVarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL_SQLSERVER: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL_SQLSERVER'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL_SQLSERVER || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

