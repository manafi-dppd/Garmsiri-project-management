BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[AbadeMakhzan] (
    [IdMakhzan] TINYINT NOT NULL IDENTITY(1,1),
    [TooleBala] DECIMAL(4,1),
    [ArzeBala] DECIMAL(4,1),
    [TooleKaf] DECIMAL(4,1),
    [ArzeKaf] DECIMAL(4,1),
    [Omgh] DECIMAL(4,1),
    [HajmMohasebat] DECIMAL(6,1) NOT NULL,
    [HadeaghalHajm] INT,
    [NameStation] NVARCHAR(20) NOT NULL,
    CONSTRAINT [PK__AbadeMak__D703228772CB5AB8] PRIMARY KEY CLUSTERED ([IdMakhzan])
);

-- CreateTable
CREATE TABLE [dbo].[Abgir] (
    [IdKontor] TINYINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [Abgir] NVARCHAR(6) NOT NULL,
    CONSTRAINT [PK__Abgir__1712406C3B30940E] PRIMARY KEY CLUSTERED ([IdKontor])
);

-- CreateTable
CREATE TABLE [dbo].[AtashSoozi] (
    [IdAtash] TINYINT,
    [FIdRanesh] TINYINT,
    [FIdTarDor] SMALLINT,
    [AtashSoozi] INT
);

-- CreateTable
CREATE TABLE [dbo].[BahrebardairProgram] (
    [IdProgram] INT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTarDor] SMALLINT NOT NULL,
    [Tedad] TINYINT NOT NULL,
    [Shorooe] TIME,
    [Paian] TIME,
    CONSTRAINT [PK_BahrebardairProgram] PRIMARY KEY CLUSTERED ([IdProgram])
);

-- CreateTable
CREATE TABLE [dbo].[BahrebardariKeshtDore] (
    [IdBahDor] TINYINT NOT NULL,
    [FIdShDo] TINYINT NOT NULL,
    [FIdRanesh] TINYINT NOT NULL,
    [FIdNoeM] TINYINT NOT NULL,
    [Area] DECIMAL(6,2) NOT NULL,
    CONSTRAINT [PK_BahrebardariKeshtDore] PRIMARY KEY CLUSTERED ([IdBahDor])
);

-- CreateTable
CREATE TABLE [dbo].[BahrebardariTaghvim] (
    [IdTag] INT NOT NULL IDENTITY(1,1),
    [FIdTarDor] SMALLINT NOT NULL,
    [FIdRanesh] TINYINT NOT NULL,
    [Taghvim] DECIMAL(9,2) NOT NULL,
    CONSTRAINT [PK_BahrebardariTaghvim] PRIMARY KEY CLUSTERED ([IdTag])
);

-- CreateTable
CREATE TABLE [dbo].[BareshMotaleat] (
    [IdBarMot] SMALLINT NOT NULL IDENTITY(1,1),
    [FIdNet] TINYINT NOT NULL,
    [FIdMah] TINYINT NOT NULL,
    [BareshMotaleat] DECIMAL(4,2) NOT NULL,
    CONSTRAINT [PK__BareshMo__9D6A84A83D616234] PRIMARY KEY CLUSTERED ([IdBarMot])
);

-- CreateTable
CREATE TABLE [dbo].[DarajePipe] (
    [IdDPipe] TINYINT NOT NULL IDENTITY(1,1),
    [DarajePipe] NVARCHAR(10) NOT NULL,
    CONSTRAINT [PK__DarajePi__B646354015EF278C] PRIMARY KEY CLUSTERED ([IdDPipe])
);

-- CreateTable
CREATE TABLE [dbo].[DeliveryPoints] (
    [IdDp] TINYINT NOT NULL IDENTITY(1,1),
    [DeliveryPoint] NVARCHAR(15) NOT NULL,
    CONSTRAINT [PK__Delivery__B77398D22C5C7627] PRIMARY KEY CLUSTERED ([IdDp])
);

-- CreateTable
CREATE TABLE [dbo].[DarjeStation] (
    [IdDStation] TINYINT NOT NULL IDENTITY(1,1),
    [DarajeStation] NVARCHAR(6) NOT NULL,
    CONSTRAINT [PK__DarjeSta__7C7072F4DE436631] PRIMARY KEY CLUSTERED ([IdDStation])
);

-- CreateTable
CREATE TABLE [dbo].[DoreKesht] (
    [IdDore] TINYINT NOT NULL IDENTITY(1,1),
    [Dore] NVARCHAR(8) NOT NULL,
    CONSTRAINT [PK__DoreKesh__0E7A1B57FC0C3425] PRIMARY KEY CLUSTERED ([IdDore])
);

-- CreateTable
CREATE TABLE [dbo].[EshtebahAvamel] (
    [IdEsht] TINYINT NOT NULL,
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTarDor] SMALLINT NOT NULL,
    [Eshtebah] INT NOT NULL,
    CONSTRAINT [PK_EshtebahAvamel] PRIMARY KEY CLUSTERED ([IdEsht])
);

-- CreateTable
CREATE TABLE [dbo].[FlowBehbood] (
    [IdBehbood] SMALLINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTarDor] SMALLINT NOT NULL,
    [Flow] SMALLINT NOT NULL,
    CONSTRAINT [PK_FlowBehbood] PRIMARY KEY CLUSTERED ([IdBehbood])
);

-- CreateTable
CREATE TABLE [dbo].[Flowmeter] (
    [IdFIT] INT NOT NULL,
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTrikh] SMALLINT NOT NULL,
    [Flowmeter] FLOAT(53) NOT NULL,
    CONSTRAINT [PK_Flowmeter] PRIMARY KEY CLUSTERED ([IdFIT])
);

-- CreateTable
CREATE TABLE [dbo].[KhatRanesh] (
    [IdRanesh] TINYINT NOT NULL IDENTITY(1,1),
    [RaneshName] NVARCHAR(15) NOT NULL,
    [FIdPumpSta] TINYINT NOT NULL,
    [FIdDPipe] TINYINT NOT NULL,
    [FIdSePu] TINYINT NOT NULL,
    [FIdMeasuring] TINYINT NOT NULL,
    CONSTRAINT [PK__KhatRane__244AB78FA58F53F8] PRIMARY KEY CLUSTERED ([IdRanesh])
);

-- CreateTable
CREATE TABLE [dbo].[KhatRaneshArea] (
    [IdRanesh] TINYINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [FIdLand] TINYINT NOT NULL,
    [FIdNet] TINYINT NOT NULL,
    [Area] DECIMAL(5,1) NOT NULL,
    CONSTRAINT [PK__KhatRane__244AB78F35AF7C31] PRIMARY KEY CLUSTERED ([IdRanesh])
);

-- CreateTable
CREATE TABLE [dbo].[KhatRaneshPump] (
    [IdRanesh] TINYINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [ModelPump] NVARCHAR(25),
    [FIdPump] TINYINT NOT NULL,
    [TedadPump] TINYINT,
    [DebiPomp] DECIMAL(5,1) NOT NULL,
    [FesharPump] DECIMAL(4,1) NOT NULL,
    [Randeman] TINYINT NOT NULL,
    [TavaneNami] DECIMAL(4,1) NOT NULL,
    [TavaneJazbi] DECIMAL(4,1) NOT NULL,
    [Voltazh] SMALLINT NOT NULL,
    [DoreMotor] SMALLINT NOT NULL,
    [FeshareMakesh] TINYINT NOT NULL,
    [FeshareRanesh] TINYINT NOT NULL,
    [SizeMakesh] SMALLINT NOT NULL,
    [SizeRanesh] SMALLINT NOT NULL,
    [SizeKolektor] SMALLINT NOT NULL,
    [SizeShireKolektor] SMALLINT NOT NULL,
    CONSTRAINT [PK__KhatRane__244AB78FBA91C8C7] PRIMARY KEY CLUSTERED ([IdRanesh])
);

-- CreateTable
CREATE TABLE [dbo].[KhatRaneshSegli] (
    [IdRanesh] TINYINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [Zarfiat] DECIMAL(5,1) NOT NULL,
    CONSTRAINT [PK__KhatRane__244AB78F2E640CC3] PRIMARY KEY CLUSTERED ([IdRanesh])
);

-- CreateTable
CREATE TABLE [dbo].[Kontor] (
    [IdKon] SMALLINT NOT NULL IDENTITY(1,1),
    [FIdKontor] TINYINT NOT NULL,
    [FIdTarDor] SMALLINT NOT NULL,
    [Kontor] INT NOT NULL,
    CONSTRAINT [PK_Kontor] PRIMARY KEY CLUSTERED ([IdKon])
);

-- CreateTable
CREATE TABLE [dbo].[Land] (
    [IdLand] TINYINT NOT NULL,
    [Land] NVARCHAR(5) NOT NULL,
    CONSTRAINT [PK__Land__3728C4C7E4364ED3] PRIMARY KEY CLUSTERED ([IdLand])
);

-- CreateTable
CREATE TABLE [dbo].[MeasuringTool] (
    [IdMeasuring] TINYINT NOT NULL IDENTITY(1,1),
    [MeasuringTool] NVARCHAR(20) NOT NULL,
    [Precision] NVARCHAR(10) NOT NULL,
    CONSTRAINT [PK__Measurin__3B3D9C30263B7B2D] PRIMARY KEY CLUSTERED ([IdMeasuring])
);

-- CreateTable
CREATE TABLE [dbo].[NashtShabake] (
    [IdNasht] TINYINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTriDor] SMALLINT NOT NULL,
    [NashtShabake] SMALLINT NOT NULL,
    CONSTRAINT [PK_NashtShabake] PRIMARY KEY CLUSTERED ([IdNasht])
);

-- CreateTable
CREATE TABLE [dbo].[Network] (
    [IdNet] TINYINT NOT NULL IDENTITY(1,1),
    [Network] NVARCHAR(20) NOT NULL,
    [FIdSP] TINYINT NOT NULL,
    CONSTRAINT [PK_Network] PRIMARY KEY CLUSTERED ([IdNet])
);

-- CreateTable
CREATE TABLE [dbo].[NoeKesht] (
    [IdNoeK] TINYINT NOT NULL IDENTITY(1,1),
    [Kesht] NVARCHAR(5) NOT NULL,
    CONSTRAINT [PK__NoeKesht__4B2D41ED5BB8F6F9] PRIMARY KEY CLUSTERED ([IdNoeK])
);

-- CreateTable
CREATE TABLE [dbo].[NoeMahsool] (
    [IdNoeM] TINYINT NOT NULL IDENTITY(1,1),
    [Mahsool] NVARCHAR(30) NOT NULL,
    [FIdNoeK] TINYINT NOT NULL,
    CONSTRAINT [PK__NoeMahso__4B2D419350C8EE28] PRIMARY KEY CLUSTERED ([IdNoeM])
);

-- CreateTable
CREATE TABLE [dbo].[NonFIT] (
    [IdNonFIT] INT NOT NULL,
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTarDor] SMALLINT NOT NULL IDENTITY(1,1),
    [VOLUM] SMALLINT NOT NULL,
    CONSTRAINT [PK_NonFIT] PRIMARY KEY CLUSTERED ([IdNonFIT])
);

-- CreateTable
CREATE TABLE [dbo].[PumpStation] (
    [IdPumpSta] TINYINT NOT NULL IDENTITY(1,1),
    [NameStation] NVARCHAR(20) NOT NULL,
    [KM] INT,
    [FIdNet] TINYINT NOT NULL,
    [FIdDStation] TINYINT NOT NULL,
    [FIdMakhzan] TINYINT,
    [FIdDP] TINYINT NOT NULL,
    CONSTRAINT [PK__PumpStat__C68EBC54BFE8F9CE] PRIMARY KEY CLUSTERED ([IdPumpSta])
);

-- CreateTable
CREATE TABLE [dbo].[PumpType] (
    [IdPump] TINYINT NOT NULL IDENTITY(1,1),
    [PumpType] NVARCHAR(50) NOT NULL,
    CONSTRAINT [PK__PumpType__F9818F5799370596] PRIMARY KEY CLUSTERED ([IdPump])
);

-- CreateTable
CREATE TABLE [dbo].[RainfallStation] (
    [IdRaiSta] SMALLINT NOT NULL IDENTITY(1,1),
    [FIdWeaSta] TINYINT NOT NULL,
    [FIdTrikh] SMALLINT NOT NULL,
    [FIdRaiTy] TINYINT NOT NULL,
    [ErtefaeBaresh] DECIMAL(3,1) NOT NULL,
    CONSTRAINT [PK_RainfallStation] PRIMARY KEY CLUSTERED ([IdRaiSta])
);

-- CreateTable
CREATE TABLE [dbo].[RainfallType] (
    [IdRaiTy] TINYINT NOT NULL IDENTITY(1,1),
    [RainfallType] NVARCHAR(5) NOT NULL,
    CONSTRAINT [PK__Rainfall__B0B044464029DAEB] PRIMARY KEY CLUSTERED ([IdRaiTy])
);

-- CreateTable
CREATE TABLE [dbo].[SaleZeraee] (
    [IdSal] TINYINT NOT NULL IDENTITY(1,1),
    [SaleZeraee] NVARCHAR(10) NOT NULL,
    CONSTRAINT [PK__SaleZera__2B04014FF1E1BBA2] PRIMARY KEY CLUSTERED ([IdSal])
);

-- CreateTable
CREATE TABLE [dbo].[SeghliPump] (
    [IdSePu] TINYINT NOT NULL IDENTITY(1,1),
    [SeghliPump] NVARCHAR(10) NOT NULL,
    CONSTRAINT [PK__SeghliPu__A779282A374AF811] PRIMARY KEY CLUSTERED ([IdSePu])
);

-- CreateTable
CREATE TABLE [dbo].[SystemPart] (
    [IdSP] TINYINT NOT NULL IDENTITY(1,1),
    [Part] NVARCHAR(20) NOT NULL,
    [KM] INT NOT NULL,
    CONSTRAINT [PK_SystemPart] PRIMARY KEY CLUSTERED ([IdSP])
);

-- CreateTable
CREATE TABLE [dbo].[TakhlieMakhzan] (
    [IdTakhlie] TINYINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTarDor] SMALLINT NOT NULL,
    [Takhlie] INT NOT NULL,
    CONSTRAINT [PK_TakhlieMakhzan] PRIMARY KEY CLUSTERED ([IdTakhlie])
);

-- CreateTable
CREATE TABLE [dbo].[Test] (
    [IdTest] TINYINT NOT NULL IDENTITY(1,1),
    [FIdRanesh] TINYINT NOT NULL,
    [FIdTarDor] SMALLINT NOT NULL,
    [Test] INT NOT NULL,
    CONSTRAINT [PK_Test] PRIMARY KEY CLUSTERED ([IdTest])
);

-- CreateTable
CREATE TABLE [dbo].[TrikhDoreKesht] (
    [IdTarDor] SMALLINT NOT NULL IDENTITY(1,1),
    [FIdSal] TINYINT NOT NULL,
    [FIdDore] TINYINT NOT NULL,
    [Trikh] DATE NOT NULL,
    [TrikhKhorshidi] NVARCHAR(10) NOT NULL,
    [Dahe] TINYINT NOT NULL,
    [Sal] INT NOT NULL,
    [Mah] TINYINT NOT NULL,
    CONSTRAINT [PK_TrikhDoreKesht] PRIMARY KEY CLUSTERED ([IdTarDor])
);

-- CreateTable
CREATE TABLE [dbo].[WeatherStation] (
    [IdWeaSta] TINYINT NOT NULL IDENTITY(1,1),
    [Station] NVARCHAR(20) NOT NULL,
    CONSTRAINT [PK__WeatherS__7D0C90EC93CB3403] PRIMARY KEY CLUSTERED ([IdWeaSta])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61860F5512] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[MahShamsi] (
    [IdMah] TINYINT NOT NULL,
    [Mah] NVARCHAR(8) NOT NULL,
    CONSTRAINT [PK__Mah__0D13B74816DDE506] PRIMARY KEY CLUSTERED ([IdMah])
);

-- CreateTable
CREATE TABLE [dbo].[ShabakeDoreKesht] (
    [IdShDo] TINYINT NOT NULL,
    [FIdNet] TINYINT NOT NULL,
    [TrikhShorooe] DATE NOT NULL,
    [TrikhPayan] DATE NOT NULL,
    [FIdSal] TINYINT NOT NULL,
    [FIdDore] TINYINT NOT NULL,
    CONSTRAINT [PK_ShabakeDoreKesht] PRIMARY KEY CLUSTERED ([IdShDo])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [NonClusteredIndex-20240112-194637] ON [dbo].[Network]([Network]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [NonClusteredIndex-20240112-171651] ON [dbo].[SystemPart]([Part]);

-- AddForeignKey
ALTER TABLE [dbo].[Abgir] ADD CONSTRAINT [FK_Abgir_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BahrebardairProgram] ADD CONSTRAINT [FK_BahrebardairProgram_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BahrebardairProgram] ADD CONSTRAINT [FK_BahrebardairProgram_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BahrebardariKeshtDore] ADD CONSTRAINT [FK_BahrebardariKeshtDore_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BahrebardariKeshtDore] ADD CONSTRAINT [FK_BahrebardariKeshtDore_NoeMahsool] FOREIGN KEY ([FIdNoeM]) REFERENCES [dbo].[NoeMahsool]([IdNoeM]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BahrebardariKeshtDore] ADD CONSTRAINT [FK_BahrebardariKeshtDore_ShabakeDoreKesht] FOREIGN KEY ([FIdShDo]) REFERENCES [dbo].[ShabakeDoreKesht]([IdShDo]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BahrebardariTaghvim] ADD CONSTRAINT [FK_BahrebardariTaghvim_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BahrebardariTaghvim] ADD CONSTRAINT [FK_BahrebardariTaghvim_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BareshMotaleat] ADD CONSTRAINT [FK_BareshMotaleat_Mah] FOREIGN KEY ([FIdMah]) REFERENCES [dbo].[MahShamsi]([IdMah]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BareshMotaleat] ADD CONSTRAINT [FK_BareshMotaleat_Network] FOREIGN KEY ([FIdNet]) REFERENCES [dbo].[Network]([IdNet]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EshtebahAvamel] ADD CONSTRAINT [FK_EshtebahAvamel_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EshtebahAvamel] ADD CONSTRAINT [FK_EshtebahAvamel_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FlowBehbood] ADD CONSTRAINT [FK_FlowBehbood_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FlowBehbood] ADD CONSTRAINT [FK_FlowBehbood_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Flowmeter] ADD CONSTRAINT [FK_Flowmeter_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Flowmeter] ADD CONSTRAINT [FK_Flowmeter_TrikhDoreKesht] FOREIGN KEY ([FIdTrikh]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRanesh] ADD CONSTRAINT [FK_KhatRanesh_DarajePipe] FOREIGN KEY ([FIdDPipe]) REFERENCES [dbo].[DarajePipe]([IdDPipe]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRanesh] ADD CONSTRAINT [FK_KhatRanesh_MeasuringTool] FOREIGN KEY ([FIdMeasuring]) REFERENCES [dbo].[MeasuringTool]([IdMeasuring]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRanesh] ADD CONSTRAINT [FK_KhatRanesh_PumpStation] FOREIGN KEY ([FIdPumpSta]) REFERENCES [dbo].[PumpStation]([IdPumpSta]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRanesh] ADD CONSTRAINT [FK_KhatRanesh_SeghliPump] FOREIGN KEY ([FIdSePu]) REFERENCES [dbo].[SeghliPump]([IdSePu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRaneshArea] ADD CONSTRAINT [FK_KhatRaneshArea_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRaneshArea] ADD CONSTRAINT [FK_KhatRaneshArea_Land] FOREIGN KEY ([FIdLand]) REFERENCES [dbo].[Land]([IdLand]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRaneshArea] ADD CONSTRAINT [FK_KhatRaneshArea_Network] FOREIGN KEY ([FIdNet]) REFERENCES [dbo].[Network]([IdNet]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRaneshPump] ADD CONSTRAINT [FK_KhatRaneshPump_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRaneshPump] ADD CONSTRAINT [FK_KhatRaneshPump_PumpType] FOREIGN KEY ([FIdPump]) REFERENCES [dbo].[PumpType]([IdPump]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[KhatRaneshSegli] ADD CONSTRAINT [FK_KhatRaneshSegli_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Kontor] ADD CONSTRAINT [FK_Kontor_Abgir] FOREIGN KEY ([FIdKontor]) REFERENCES [dbo].[Abgir]([IdKontor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Kontor] ADD CONSTRAINT [FK_Kontor_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[NashtShabake] ADD CONSTRAINT [FK_NashtShabake_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[NashtShabake] ADD CONSTRAINT [FK_NashtShabake_TrikhDoreKesht] FOREIGN KEY ([FIdTriDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Network] ADD CONSTRAINT [FK_Network_SystemPart] FOREIGN KEY ([FIdSP]) REFERENCES [dbo].[SystemPart]([IdSP]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[NoeMahsool] ADD CONSTRAINT [FK_NoeMahsool_NoeKesht] FOREIGN KEY ([FIdNoeK]) REFERENCES [dbo].[NoeKesht]([IdNoeK]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[NonFIT] ADD CONSTRAINT [FK_NonFIT_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[NonFIT] ADD CONSTRAINT [FK_NonFIT_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PumpStation] ADD CONSTRAINT [FK_PumpStation_AbadeMakhzan] FOREIGN KEY ([FIdMakhzan]) REFERENCES [dbo].[AbadeMakhzan]([IdMakhzan]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PumpStation] ADD CONSTRAINT [FK_PumpStation_DarjeStation] FOREIGN KEY ([FIdDStation]) REFERENCES [dbo].[DarjeStation]([IdDStation]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PumpStation] ADD CONSTRAINT [FK_PumpStation_DeliveryPoints] FOREIGN KEY ([FIdDP]) REFERENCES [dbo].[DeliveryPoints]([IdDp]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PumpStation] ADD CONSTRAINT [FK_PumpStation_Network] FOREIGN KEY ([FIdNet]) REFERENCES [dbo].[Network]([IdNet]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RainfallStation] ADD CONSTRAINT [FK_RainfallStation_RainfallType] FOREIGN KEY ([FIdRaiTy]) REFERENCES [dbo].[RainfallType]([IdRaiTy]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RainfallStation] ADD CONSTRAINT [FK_RainfallStation_TrikhDoreKesht] FOREIGN KEY ([FIdTrikh]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RainfallStation] ADD CONSTRAINT [FK_RainfallStation_WeatherStation] FOREIGN KEY ([FIdWeaSta]) REFERENCES [dbo].[WeatherStation]([IdWeaSta]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TakhlieMakhzan] ADD CONSTRAINT [FK_TakhlieMakhzan_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TakhlieMakhzan] ADD CONSTRAINT [FK_TakhlieMakhzan_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Test] ADD CONSTRAINT [FK_Test_KhatRanesh] FOREIGN KEY ([FIdRanesh]) REFERENCES [dbo].[KhatRanesh]([IdRanesh]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Test] ADD CONSTRAINT [FK_Test_TrikhDoreKesht] FOREIGN KEY ([FIdTarDor]) REFERENCES [dbo].[TrikhDoreKesht]([IdTarDor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TrikhDoreKesht] ADD CONSTRAINT [FK_TrikhDoreKesht_DoreKesht] FOREIGN KEY ([FIdDore]) REFERENCES [dbo].[DoreKesht]([IdDore]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TrikhDoreKesht] ADD CONSTRAINT [FK_TrikhDoreKesht_Mah] FOREIGN KEY ([Mah]) REFERENCES [dbo].[MahShamsi]([IdMah]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TrikhDoreKesht] ADD CONSTRAINT [FK_TrikhDoreKesht_SaleZeraee] FOREIGN KEY ([FIdSal]) REFERENCES [dbo].[SaleZeraee]([IdSal]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ShabakeDoreKesht] ADD CONSTRAINT [FK_ShabakeDoreKesht_DoreKesht] FOREIGN KEY ([FIdDore]) REFERENCES [dbo].[DoreKesht]([IdDore]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ShabakeDoreKesht] ADD CONSTRAINT [FK_ShabakeDoreKesht_Network] FOREIGN KEY ([FIdNet]) REFERENCES [dbo].[Network]([IdNet]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ShabakeDoreKesht] ADD CONSTRAINT [FK_ShabakeDoreKesht_SaleZeraee] FOREIGN KEY ([FIdSal]) REFERENCES [dbo].[SaleZeraee]([IdSal]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
