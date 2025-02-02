
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.0
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.0",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
