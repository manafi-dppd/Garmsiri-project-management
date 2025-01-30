-- CreateTable
CREATE TABLE "AbadeMakhzan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TooleBala" REAL,
    "ArzeBala" REAL,
    "TooleKaf" REAL,
    "ArzeKaf" REAL,
    "Omgh" REAL,
    "HajmMohasebat" REAL NOT NULL,
    "HadeaghalHajm" INTEGER,
    "NameStation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Abgir" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "Abgir" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AtashSoozi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER,
    "FIdTarDor" INTEGER,
    "AtashSoozi" INTEGER
);

-- CreateTable
CREATE TABLE "BahrebardairProgram" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTarDor" INTEGER NOT NULL,
    "Tedad" INTEGER NOT NULL,
    "Shorooe" DATETIME,
    "Paian" DATETIME
);

-- CreateTable
CREATE TABLE "BahrebardariKeshtDore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdSal" INTEGER NOT NULL,
    "FIdDore" INTEGER NOT NULL,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdNoeM" INTEGER NOT NULL,
    "Area" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "BahrebardariTaghvim" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdTarDor" INTEGER NOT NULL,
    "FIdRanesh" INTEGER NOT NULL,
    "Taghvim" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "BareshMotaleat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdNet" INTEGER NOT NULL,
    "FIdMah" INTEGER NOT NULL,
    "BareshMotaleat" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "DarajePipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DarajePipe" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DarjeStation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DarajeStation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DoreKesht" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Dore" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EshtebahAvamel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTarDor" INTEGER NOT NULL,
    "Eshtebah" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FlowBehbood" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTarDor" INTEGER NOT NULL,
    "Flow" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Flowmeter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTrikh" INTEGER NOT NULL,
    "Flowmeter" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "KhatRanesh" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RaneshName" TEXT NOT NULL,
    "FIdPumpSta" INTEGER NOT NULL,
    "FIdDPipe" INTEGER NOT NULL,
    "FIdSePu" INTEGER NOT NULL,
    "FIdMeasuring" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "KhatRaneshArea" (
    "IdRanesh" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdLand" INTEGER NOT NULL,
    "FIdNet" INTEGER NOT NULL,
    "Area" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "KhatRaneshPump" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "ModelPump" TEXT,
    "FIdPump" INTEGER NOT NULL,
    "TedadPump" INTEGER,
    "DebiPomp" REAL NOT NULL,
    "FesharPump" REAL NOT NULL,
    "Randeman" INTEGER NOT NULL,
    "TavaneNami" REAL NOT NULL,
    "TavaneJazbi" REAL NOT NULL,
    "Voltazh" INTEGER NOT NULL,
    "DoreMotor" INTEGER NOT NULL,
    "FeshareMakesh" INTEGER NOT NULL,
    "FeshareRanesh" INTEGER NOT NULL,
    "SizeMakesh" INTEGER NOT NULL,
    "SizeRanesh" INTEGER NOT NULL,
    "SizeKolektor" INTEGER NOT NULL,
    "SizeShireKolektor" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "KhatRaneshSegli" (
    "IdRanesh" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "Zarfiat" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Kontor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdKontor" INTEGER NOT NULL,
    "FIdTarDor" INTEGER NOT NULL,
    "Kontor" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Land" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Land" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mah" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Mah" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MeasuringTool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MeasuringTool" TEXT NOT NULL,
    "Precision" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NashtShabake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTriDor" INTEGER NOT NULL,
    "NashtShabake" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Network" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Network" TEXT NOT NULL,
    "FIdSP" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "NoeKesht" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Kesht" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NoeMahsool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Kesht" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NonFIT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTarDor" INTEGER NOT NULL,
    "VOLUM" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PumpStation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NameStation" TEXT NOT NULL,
    "KM" INTEGER,
    "FIdNet" INTEGER NOT NULL,
    "FIdDStation" INTEGER NOT NULL,
    "FIdMakhzan" INTEGER
);

-- CreateTable
CREATE TABLE "PumpType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PumpType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RainfallStation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdWeaSta" INTEGER NOT NULL,
    "FIdTrikh" INTEGER NOT NULL,
    "FIdRaiTy" INTEGER NOT NULL,
    "ErtefaeBaresh" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "RainfallType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RainfallType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SaleZeraee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SaleZeraee" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SeghliPump" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SeghliPump" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SystemPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Part" TEXT NOT NULL,
    "KM" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TakhlieMakhzan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTarDor" INTEGER NOT NULL,
    "Takhlie" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdRanesh" INTEGER NOT NULL,
    "FIdTarDor" INTEGER NOT NULL,
    "Test" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TrikhDoreKesht" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FIdSal" INTEGER NOT NULL,
    "FIdDore" INTEGER NOT NULL,
    "Trikh" DATETIME NOT NULL,
    "TrikhKhorshidi" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WeatherStation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Station" TEXT NOT NULL
);
