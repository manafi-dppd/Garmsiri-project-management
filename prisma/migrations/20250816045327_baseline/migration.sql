-- CreateTable
CREATE TABLE "public"."abademakhzan" (
    "idmakhzan" SMALLSERIAL NOT NULL,
    "toolebala" DECIMAL(4,1),
    "arzebala" DECIMAL(4,1),
    "toolekaf" DECIMAL(4,1),
    "arzekaf" DECIMAL(4,1),
    "omgh" DECIMAL(4,1),
    "hajmmohasebat" DECIMAL(6,1) NOT NULL,
    "hadeaghalhajm" INTEGER,
    "namestation" VARCHAR(40) NOT NULL,

    CONSTRAINT "abademakhzan_pkey" PRIMARY KEY ("idmakhzan")
);

-- CreateTable
CREATE TABLE "public"."abgir" (
    "idkontor" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "abgir" VARCHAR(12) NOT NULL,

    CONSTRAINT "abgir_pkey" PRIMARY KEY ("idkontor")
);

-- CreateTable
CREATE TABLE "public"."atashsoozi" (
    "idatash" SMALLINT,
    "fidranesh" SMALLINT,
    "fidtardor" SMALLINT,
    "atashsoozi" INTEGER
);

-- CreateTable
CREATE TABLE "public"."bahrebardairprogram" (
    "idprogram" SERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidtardor" SMALLINT NOT NULL,
    "tedad" SMALLINT NOT NULL,
    "shorooe" TIME(6),
    "paian" TIME(6),

    CONSTRAINT "bahrebardairprogram_pkey" PRIMARY KEY ("idprogram")
);

-- CreateTable
CREATE TABLE "public"."bahrebardairprogramseghli" (
    "idprosrgl" SERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidtardor" SMALLINT NOT NULL,
    "zarfiat" DECIMAL(5,1),
    "shorooe" TIME(6),
    "paian" TIME(6),

    CONSTRAINT "bahrebardairprogramseghli_pkey" PRIMARY KEY ("idprosrgl")
);

-- CreateTable
CREATE TABLE "public"."trikhdorekesht" (
    "idtardor" SMALLSERIAL NOT NULL,
    "fidsal" SMALLINT NOT NULL,
    "fiddore" SMALLINT NOT NULL,
    "trikh" DATE NOT NULL,
    "trikhkhorshidi" VARCHAR(20) NOT NULL,
    "dahe" SMALLINT NOT NULL,
    "sal" INTEGER NOT NULL,
    "mah" SMALLINT NOT NULL,
    "fiddahe" INTEGER NOT NULL,
    "fiddec" INTEGER,

    CONSTRAINT "trikhdorekesht_pkey" PRIMARY KEY ("idtardor")
);

-- CreateTable
CREATE TABLE "public"."bahrebardarikeshtdore" (
    "idbahdor" SMALLSERIAL NOT NULL,
    "fidshdo" SMALLINT NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidnoem" SMALLINT NOT NULL,
    "area" DECIMAL(6,2) NOT NULL,

    CONSTRAINT "bahrebardarikeshtdore_pkey" PRIMARY KEY ("idbahdor")
);

-- CreateTable
CREATE TABLE "public"."bahrebardaritaghvim" (
    "idtag" SERIAL NOT NULL,
    "fidtardor" SMALLINT NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "taghvim" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "bahrebardaritaghvim_pkey" PRIMARY KEY ("idtag")
);

-- CreateTable
CREATE TABLE "public"."bareshmotaleat" (
    "idbarmot" SMALLSERIAL NOT NULL,
    "fidnet" SMALLINT NOT NULL,
    "fidmah" SMALLINT NOT NULL,
    "bareshmotaleat" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "bareshmotaleat_pkey" PRIMARY KEY ("idbarmot")
);

-- CreateTable
CREATE TABLE "public"."darajepipe" (
    "iddpipe" SMALLSERIAL NOT NULL,
    "darajepipe" VARCHAR(40) NOT NULL,

    CONSTRAINT "darajepipe_pkey" PRIMARY KEY ("iddpipe")
);

-- CreateTable
CREATE TABLE "public"."darjestation" (
    "iddstation" SMALLSERIAL NOT NULL,
    "darajestation" VARCHAR(12) NOT NULL,

    CONSTRAINT "darjestation_pkey" PRIMARY KEY ("iddstation")
);

-- CreateTable
CREATE TABLE "public"."deliverypoints" (
    "iddp" SMALLSERIAL NOT NULL,
    "deliverypoint" VARCHAR(30) NOT NULL,

    CONSTRAINT "deliverypoints_pkey" PRIMARY KEY ("iddp")
);

-- CreateTable
CREATE TABLE "public"."dorekesht" (
    "iddore" SMALLSERIAL NOT NULL,
    "dore" VARCHAR(16) NOT NULL,
    "dore_fa" VARCHAR(16),
    "dore_ar" VARCHAR(16),
    "dore_tr" VARCHAR(16),

    CONSTRAINT "dorekesht_pkey" PRIMARY KEY ("iddore")
);

-- CreateTable
CREATE TABLE "public"."eshtebahavamel" (
    "idesht" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidtardor" SMALLINT NOT NULL,
    "eshtebah" INTEGER NOT NULL,

    CONSTRAINT "eshtebahavamel_pkey" PRIMARY KEY ("idesht")
);

-- CreateTable
CREATE TABLE "public"."flowbehbood" (
    "idbehbood" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidtardor" SMALLINT NOT NULL,
    "flow" SMALLINT NOT NULL,

    CONSTRAINT "flowbehbood_pkey" PRIMARY KEY ("idbehbood")
);

-- CreateTable
CREATE TABLE "public"."flowmeter" (
    "idfit" SERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidtrikh" SMALLINT NOT NULL,
    "flowmeter" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "flowmeter_pkey" PRIMARY KEY ("idfit")
);

-- CreateTable
CREATE TABLE "public"."khatranesh" (
    "idranesh" SMALLSERIAL NOT NULL,
    "raneshname" VARCHAR(30) NOT NULL,
    "fidpumpsta" SMALLINT NOT NULL,
    "fiddpipe" SMALLINT NOT NULL,
    "fidsepu" SMALLINT NOT NULL,
    "fidmeasuring" SMALLINT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "khatranesh_pkey" PRIMARY KEY ("idranesh")
);

-- CreateTable
CREATE TABLE "public"."khatranesharea" (
    "idranesh" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidland" SMALLINT NOT NULL,
    "fidnet" SMALLINT NOT NULL,
    "area" DECIMAL(5,1) NOT NULL,

    CONSTRAINT "khatranesharea_pkey" PRIMARY KEY ("idranesh")
);

-- CreateTable
CREATE TABLE "public"."khatraneshpump" (
    "idranesh" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "modelpump" VARCHAR(25),
    "fidpump" SMALLINT NOT NULL,
    "tedadpump" SMALLINT,
    "debipomp" DECIMAL(5,1) NOT NULL,
    "fesharpump" DECIMAL(4,1) NOT NULL,
    "randeman" SMALLINT NOT NULL,
    "tavanenami" DECIMAL(4,1) NOT NULL,
    "tavanejazbi" DECIMAL(4,1) NOT NULL,
    "voltazh" SMALLINT NOT NULL,
    "doremotor" SMALLINT NOT NULL,
    "fesharemakesh" SMALLINT NOT NULL,
    "feshareranesh" SMALLINT NOT NULL,
    "sizemakesh" SMALLINT NOT NULL,
    "sizeranesh" SMALLINT NOT NULL,
    "sizekolektor" SMALLINT NOT NULL,
    "sizeshirekolektor" SMALLINT NOT NULL,

    CONSTRAINT "khatraneshpump_pkey" PRIMARY KEY ("idranesh")
);

-- CreateTable
CREATE TABLE "public"."khatraneshsegli" (
    "idranesh" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "zarfiat" DECIMAL(5,1) NOT NULL,

    CONSTRAINT "khatraneshsegli_pkey" PRIMARY KEY ("idranesh")
);

-- CreateTable
CREATE TABLE "public"."kontor" (
    "idkon" SERIAL NOT NULL,
    "fidkontor" INTEGER NOT NULL,
    "fidtardor" INTEGER NOT NULL,
    "kontor" INTEGER NOT NULL,

    CONSTRAINT "kontor_pkey" PRIMARY KEY ("idkon")
);

-- CreateTable
CREATE TABLE "public"."land" (
    "idland" SERIAL NOT NULL,
    "land" VARCHAR(10) NOT NULL,

    CONSTRAINT "land_pkey" PRIMARY KEY ("idland")
);

-- CreateTable
CREATE TABLE "public"."mahshamsi" (
    "idmah" SERIAL NOT NULL,
    "mah" VARCHAR(16) NOT NULL,

    CONSTRAINT "mahshamsi_pkey" PRIMARY KEY ("idmah")
);

-- CreateTable
CREATE TABLE "public"."measuringtool" (
    "idmeasuring" SERIAL NOT NULL,
    "measuringtool" VARCHAR(40) NOT NULL,
    "precision" VARCHAR(30) NOT NULL,

    CONSTRAINT "measuringtool_pkey" PRIMARY KEY ("idmeasuring")
);

-- CreateTable
CREATE TABLE "public"."nashtshabake" (
    "idnasht" SERIAL NOT NULL,
    "fidranesh" INTEGER NOT NULL,
    "fidtridor" INTEGER NOT NULL,
    "nashtshabake" INTEGER NOT NULL,

    CONSTRAINT "nashtshabake_pkey" PRIMARY KEY ("idnasht")
);

-- CreateTable
CREATE TABLE "public"."network" (
    "idnet" SERIAL NOT NULL,
    "network" VARCHAR(40) NOT NULL,
    "fidsp" INTEGER NOT NULL,
    "trustee" VARCHAR(20) NOT NULL,
    "network_fa" VARCHAR(40),
    "network_ar" VARCHAR(40),
    "network_tr" VARCHAR(40),

    CONSTRAINT "network_pkey" PRIMARY KEY ("idnet")
);

-- CreateTable
CREATE TABLE "public"."noekesht" (
    "idnoek" SERIAL NOT NULL,
    "kesht" VARCHAR(10) NOT NULL,

    CONSTRAINT "noekesht_pkey" PRIMARY KEY ("idnoek")
);

-- CreateTable
CREATE TABLE "public"."noemahsool" (
    "idnoem" SERIAL NOT NULL,
    "mahsool" VARCHAR(60) NOT NULL,
    "fidnoek" INTEGER NOT NULL,

    CONSTRAINT "noemahsool_pkey" PRIMARY KEY ("idnoem")
);

-- CreateTable
CREATE TABLE "public"."nonfit" (
    "idnonfit" INTEGER NOT NULL,
    "fidranesh" INTEGER NOT NULL,
    "fidtardor" SERIAL NOT NULL,
    "volum" INTEGER NOT NULL,

    CONSTRAINT "nonfit_pkey" PRIMARY KEY ("idnonfit")
);

-- CreateTable
CREATE TABLE "public"."pumpstation" (
    "idpumpsta" SERIAL NOT NULL,
    "namestation" VARCHAR(40) NOT NULL,
    "km" INTEGER,
    "fidnet" INTEGER NOT NULL,
    "fiddstation" INTEGER NOT NULL,
    "fidmakhzan" INTEGER,
    "fiddp" INTEGER NOT NULL,
    "ready" BOOLEAN NOT NULL DEFAULT true,
    "namestation_fa" VARCHAR(40),
    "namestation_ar" VARCHAR(40),
    "namestation_tr" VARCHAR(40),

    CONSTRAINT "pumpstation_pkey" PRIMARY KEY ("idpumpsta")
);

-- CreateTable
CREATE TABLE "public"."pumptype" (
    "idpump" SMALLSERIAL NOT NULL,
    "pumptype" VARCHAR(100) NOT NULL,

    CONSTRAINT "pumptype_pkey" PRIMARY KEY ("idpump")
);

-- CreateTable
CREATE TABLE "public"."rainfallstation" (
    "idraista" SMALLSERIAL NOT NULL,
    "fidweasta" SMALLINT NOT NULL,
    "fidtrikh" SMALLINT NOT NULL,
    "fidraity" SMALLINT NOT NULL,
    "ertefaebaresh" DECIMAL(3,1) NOT NULL,

    CONSTRAINT "rainfallstation_pkey" PRIMARY KEY ("idraista")
);

-- CreateTable
CREATE TABLE "public"."rainfalltype" (
    "idraity" SMALLSERIAL NOT NULL,
    "rainfalltype" VARCHAR(10) NOT NULL,

    CONSTRAINT "rainfalltype_pkey" PRIMARY KEY ("idraity")
);

-- CreateTable
CREATE TABLE "public"."salezeraee" (
    "idsal" SMALLSERIAL NOT NULL,
    "salezeraee" VARCHAR(20) NOT NULL,
    "cropyear" VARCHAR(20),

    CONSTRAINT "salezeraee_pkey" PRIMARY KEY ("idsal")
);

-- CreateTable
CREATE TABLE "public"."salmahdahe" (
    "iddahe" SERIAL NOT NULL,
    "sal" SMALLINT NOT NULL,
    "mah" SMALLINT NOT NULL,
    "dahe" SMALLINT NOT NULL,

    CONSTRAINT "salmahdahe_pkey" PRIMARY KEY ("iddahe")
);

-- CreateTable
CREATE TABLE "public"."seghlipump" (
    "idsepu" SMALLSERIAL NOT NULL,
    "seghlipump" VARCHAR(20) NOT NULL,
    "seghlipump_ar" VARCHAR(20),
    "seghlipump_fa" VARCHAR(20),
    "seghlipump_tr" VARCHAR(20),

    CONSTRAINT "seghlipump_pkey" PRIMARY KEY ("idsepu")
);

-- CreateTable
CREATE TABLE "public"."shabakedorekesht" (
    "idshdo" SMALLSERIAL NOT NULL,
    "fidnet" SMALLINT NOT NULL,
    "trikhshorooe" DATE NOT NULL,
    "trikhpayan" DATE NOT NULL,
    "fidsal" SMALLINT NOT NULL,
    "fiddore" SMALLINT NOT NULL,

    CONSTRAINT "shabakedorekesht_pkey" PRIMARY KEY ("idshdo")
);

-- CreateTable
CREATE TABLE "public"."systempart" (
    "idsp" SMALLSERIAL NOT NULL,
    "part" VARCHAR(40) NOT NULL,
    "km" INTEGER NOT NULL,

    CONSTRAINT "systempart_pkey" PRIMARY KEY ("idsp")
);

-- CreateTable
CREATE TABLE "public"."taeedprogram" (
    "idtaeedprogram" SERIAL NOT NULL,
    "fidpumpsta" SMALLINT NOT NULL,
    "fidsal" SMALLINT NOT NULL,
    "fiddore" SMALLINT NOT NULL,
    "sal" SMALLINT NOT NULL,
    "mah" SMALLINT NOT NULL,
    "dahe" SMALLINT NOT NULL,
    "fiduserersal" SMALLINT,
    "firstnersal" VARCHAR(40),
    "lastnersal" VARCHAR(40),
    "tozihersal" TEXT,
    "tarikhersal" TIMESTAMP(6),
    "fiduserabmantaghe" SMALLINT,
    "firstnabmantaghe" VARCHAR(40),
    "lastnabmantaghe" VARCHAR(40),
    "tozihabmantaghe" TEXT,
    "tarikhabmantaghe" TIMESTAMP(6),
    "taedabmantaghe" BOOLEAN,
    "fiduserpeymankar" SMALLINT,
    "firstnpeymankar" VARCHAR(40),
    "lastnpeymankar" VARCHAR(40),
    "tozihpeymankar" TEXT,
    "tarikhpeymankar" TIMESTAMP(6),
    "taedpeymankar" BOOLEAN,
    "fiduserabniroo" SMALLINT,
    "firstnabniroo" VARCHAR(40),
    "lastnabniroo" VARCHAR(40),
    "tozihabniroo" TEXT,
    "tarikhabniroo" TIMESTAMP(6),
    "taedabniroo" BOOLEAN,
    "filenamenahaee" VARCHAR(255),
    "filepathnahaee" VARCHAR(1000),
    "tarikhfilenahee" TIMESTAMP(6),
    "fidusertaeednahaee" SMALLINT,
    "firstntaeednahaee" VARCHAR(40),
    "lastntaeednahaee" VARCHAR(40),
    "tarikhtaeednahaee" TIMESTAMP(6),
    "taeednahaee" BOOLEAN,
    "fiddahe" INTEGER,
    "toziheslah" TEXT,
    "fiddec" INTEGER,

    CONSTRAINT "taeedprogram_pkey" PRIMARY KEY ("idtaeedprogram")
);

-- CreateTable
CREATE TABLE "public"."takhliemakhzan" (
    "idtakhlie" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidtardor" SMALLINT NOT NULL,
    "takhlie" INTEGER NOT NULL,

    CONSTRAINT "takhliemakhzan_pkey" PRIMARY KEY ("idtakhlie")
);

-- CreateTable
CREATE TABLE "public"."test" (
    "idtest" SMALLSERIAL NOT NULL,
    "fidranesh" SMALLINT NOT NULL,
    "fidtardor" SMALLINT NOT NULL,
    "test" INTEGER NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("idtest")
);

-- CreateTable
CREATE TABLE "public"."weatherstation" (
    "idweasta" SMALLSERIAL NOT NULL,
    "station" VARCHAR(40) NOT NULL,

    CONSTRAINT "weatherstation_pkey" PRIMARY KEY ("idweasta")
);

-- CreateTable
CREATE TABLE "public"."menu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "general" BOOLEAN NOT NULL,
    "slug" TEXT NOT NULL,
    "parent_id" INTEGER,
    "title_tr" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."position" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "req_license" BOOLEAN NOT NULL DEFAULT false,
    "dependent" TEXT,
    "title_tr" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."access_level" (
    "id" SERIAL NOT NULL,
    "position_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "has_access" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "access_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "end_date" TIMESTAMP(3),
    "gender" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "introd_path_letter" TEXT,
    "letter_issuer" TEXT,
    "letter_number" TEXT,
    "letter_date" TEXT,
    "letter_approver" TEXT,
    "is_registered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."position_on_invitation" (
    "id" SERIAL NOT NULL,
    "invitation_id" INTEGER NOT NULL,
    "position_id" INTEGER NOT NULL,

    CONSTRAINT "position_on_invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation_access" (
    "id" SERIAL NOT NULL,
    "invitation_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "has_access" BOOLEAN NOT NULL,

    CONSTRAINT "invitation_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "gender" TEXT NOT NULL,
    "inviter_id" INTEGER,
    "invitation_time" TIMESTAMP(3) NOT NULL,
    "registration_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "introd_path_letter" VARCHAR(50),
    "letter_issuer" VARCHAR(50),
    "letter_number" VARCHAR(50),
    "letter_date" VARCHAR(50),
    "letter_approver" VARCHAR(50),
    "user_name" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."position_on_user" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "position_id" INTEGER NOT NULL,

    CONSTRAINT "position_on_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_access" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "has_access" BOOLEAN NOT NULL,

    CONSTRAINT "user_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_login_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "login_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logout_time" TIMESTAMP(3),
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "user_login_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."decade_link" (
    "iddec" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "decade" INTEGER NOT NULL,

    CONSTRAINT "decade_link_pkey" PRIMARY KEY ("iddec")
);

-- CreateTable
CREATE TABLE "public"."position_network" (
    "id" SERIAL NOT NULL,
    "fidposition" INTEGER,
    "fidnetwork" INTEGER,

    CONSTRAINT "position_newtwork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bahrebardairprogram_fidranesh_fidtardor_idx" ON "public"."bahrebardairprogram"("fidranesh", "fidtardor");

-- CreateIndex
CREATE INDEX "bahrebardairprogram_tedad_idx" ON "public"."bahrebardairprogram"("tedad");

-- CreateIndex
CREATE INDEX "bahrebardairprogramseghli_fidranesh_fidtardor_idx" ON "public"."bahrebardairprogramseghli"("fidranesh", "fidtardor");

-- CreateIndex
CREATE INDEX "trikhdorekesht_fiddahe_idx" ON "public"."trikhdorekesht"("fiddahe");

-- CreateIndex
CREATE INDEX "trikhdorekesht_fiddec_idx" ON "public"."trikhdorekesht"("fiddec");

-- CreateIndex
CREATE INDEX "idx_network_network" ON "public"."network"("network");

-- CreateIndex
CREATE UNIQUE INDEX "unique_sal_mah_dahe" ON "public"."salmahdahe"("sal", "mah", "dahe");

-- CreateIndex
CREATE INDEX "idx_systempart_part" ON "public"."systempart"("part");

-- CreateIndex
CREATE UNIQUE INDEX "menu_slug_key" ON "public"."menu"("slug");

-- CreateIndex
CREATE INDEX "menu_parent_id_idx" ON "public"."menu"("parent_id");

-- CreateIndex
CREATE INDEX "menu_slug_idx" ON "public"."menu"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "access_level_positionId_menuId_key" ON "public"."access_level"("position_id", "menu_id");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_mobile_key" ON "public"."invitation"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_username_key" ON "public"."invitation"("username");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_userId_key" ON "public"."invitation"("user_id");

-- CreateIndex
CREATE INDEX "invitation_mobile_idx" ON "public"."invitation"("mobile");

-- CreateIndex
CREATE INDEX "invitation_username_idx" ON "public"."invitation"("username");

-- CreateIndex
CREATE UNIQUE INDEX "position_on_invitation_invitationId_positionId_key" ON "public"."position_on_invitation"("invitation_id", "position_id");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_access_invitationId_menuId_key" ON "public"."invitation_access"("invitation_id", "menu_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_mobile_key" ON "public"."user"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "public"."user"("user_name");

-- CreateIndex
CREATE INDEX "user_mobile_idx" ON "public"."user"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "user_access_user_id_menu_id_key" ON "public"."user_access"("user_id", "menu_id");

-- AddForeignKey
ALTER TABLE "public"."abgir" ADD CONSTRAINT "fk_abgir_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardairprogram" ADD CONSTRAINT "fk_bahrebardairprogram_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardairprogram" ADD CONSTRAINT "fk_bahrebardairprogram_trikhdorekesht" FOREIGN KEY ("fidtardor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardairprogramseghli" ADD CONSTRAINT "fk_bahrebardairprogramseghli_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardairprogramseghli" ADD CONSTRAINT "fk_bahrebardairprogramseghli_trikhdorekesht" FOREIGN KEY ("fidtardor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."trikhdorekesht" ADD CONSTRAINT "fk_fiddahe" FOREIGN KEY ("fiddahe") REFERENCES "public"."salmahdahe"("iddahe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."trikhdorekesht" ADD CONSTRAINT "fk_fiddec" FOREIGN KEY ("fiddec") REFERENCES "public"."decade_link"("iddec") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardarikeshtdore" ADD CONSTRAINT "fk_bahrebardarikeshtdore_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardarikeshtdore" ADD CONSTRAINT "fk_bahrebardarikeshtdore_noemahsool" FOREIGN KEY ("fidnoem") REFERENCES "public"."noemahsool"("idnoem") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardarikeshtdore" ADD CONSTRAINT "fk_bahrebardarikeshtdore_shabakedorekesht" FOREIGN KEY ("fidshdo") REFERENCES "public"."shabakedorekesht"("idshdo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardaritaghvim" ADD CONSTRAINT "fk_bahrebardaritaghvim_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bahrebardaritaghvim" ADD CONSTRAINT "fk_bahrebardaritaghvim_trikhdorekesht" FOREIGN KEY ("fidtardor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bareshmotaleat" ADD CONSTRAINT "fk_bareshmotaleat_mah" FOREIGN KEY ("fidmah") REFERENCES "public"."mahshamsi"("idmah") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bareshmotaleat" ADD CONSTRAINT "fk_bareshmotaleat_network" FOREIGN KEY ("fidnet") REFERENCES "public"."network"("idnet") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."eshtebahavamel" ADD CONSTRAINT "fk_eshtebahavamel_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."eshtebahavamel" ADD CONSTRAINT "fk_eshtebahavamel_trikhdorekesht" FOREIGN KEY ("fidtardor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."flowbehbood" ADD CONSTRAINT "fk_flowbehbood_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."flowbehbood" ADD CONSTRAINT "fk_flowbehbood_trikhdorekesht" FOREIGN KEY ("fidtardor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."flowmeter" ADD CONSTRAINT "fk_flowmeter_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."flowmeter" ADD CONSTRAINT "fk_flowmeter_trikhdorekesht" FOREIGN KEY ("fidtrikh") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatranesh" ADD CONSTRAINT "fk_khatranesh_darajepipe" FOREIGN KEY ("fiddpipe") REFERENCES "public"."darajepipe"("iddpipe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatranesh" ADD CONSTRAINT "fk_khatranesh_measuringtool" FOREIGN KEY ("fidmeasuring") REFERENCES "public"."measuringtool"("idmeasuring") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatranesh" ADD CONSTRAINT "fk_khatranesh_pumpstation" FOREIGN KEY ("fidpumpsta") REFERENCES "public"."pumpstation"("idpumpsta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatranesh" ADD CONSTRAINT "fk_khatranesh_seghlipump" FOREIGN KEY ("fidsepu") REFERENCES "public"."seghlipump"("idsepu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatranesharea" ADD CONSTRAINT "fk_khatranesharea_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatranesharea" ADD CONSTRAINT "fk_khatranesharea_land" FOREIGN KEY ("fidland") REFERENCES "public"."land"("idland") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatranesharea" ADD CONSTRAINT "fk_khatranesharea_network" FOREIGN KEY ("fidnet") REFERENCES "public"."network"("idnet") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatraneshpump" ADD CONSTRAINT "fk_khatraneshpump_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatraneshpump" ADD CONSTRAINT "fk_khatraneshpump_pumptype" FOREIGN KEY ("fidpump") REFERENCES "public"."pumptype"("idpump") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."khatraneshsegli" ADD CONSTRAINT "fk_khatraneshsegli_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."kontor" ADD CONSTRAINT "fk_kontor_abgir" FOREIGN KEY ("fidkontor") REFERENCES "public"."abgir"("idkontor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."kontor" ADD CONSTRAINT "fk_kontor_trikhdorekesht" FOREIGN KEY ("fidtardor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."nashtshabake" ADD CONSTRAINT "fk_nashtshabake_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."nashtshabake" ADD CONSTRAINT "fk_nashtshabake_trikhdorekesht" FOREIGN KEY ("fidtridor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."network" ADD CONSTRAINT "fk_network_systempart" FOREIGN KEY ("fidsp") REFERENCES "public"."systempart"("idsp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."noemahsool" ADD CONSTRAINT "fk_noemahsool_noekesht" FOREIGN KEY ("fidnoek") REFERENCES "public"."noekesht"("idnoek") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."nonfit" ADD CONSTRAINT "fk_nonfit_khatranesh" FOREIGN KEY ("fidranesh") REFERENCES "public"."khatranesh"("idranesh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."nonfit" ADD CONSTRAINT "fk_nonfit_trikhdorekesht" FOREIGN KEY ("fidtardor") REFERENCES "public"."trikhdorekesht"("idtardor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pumpstation" ADD CONSTRAINT "fk_pumpstation_abademakhzan" FOREIGN KEY ("fidmakhzan") REFERENCES "public"."abademakhzan"("idmakhzan") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pumpstation" ADD CONSTRAINT "fk_pumpstation_darjestation" FOREIGN KEY ("fiddstation") REFERENCES "public"."darjestation"("iddstation") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pumpstation" ADD CONSTRAINT "fk_pumpstation_deliverypoints" FOREIGN KEY ("fiddp") REFERENCES "public"."deliverypoints"("iddp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pumpstation" ADD CONSTRAINT "fk_pumpstation_network" FOREIGN KEY ("fidnet") REFERENCES "public"."network"("idnet") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."taeedprogram" ADD CONSTRAINT "fk_fiddahe" FOREIGN KEY ("fiddahe") REFERENCES "public"."salmahdahe"("iddahe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."taeedprogram" ADD CONSTRAINT "fk_fiddec" FOREIGN KEY ("fiddec") REFERENCES "public"."decade_link"("iddec") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."access_level" ADD CONSTRAINT "access_level_menuId_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."access_level" ADD CONSTRAINT "access_level_positionId_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation" ADD CONSTRAINT "invitation_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."position_on_invitation" ADD CONSTRAINT "position_on_invitation_invitationId_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."position_on_invitation" ADD CONSTRAINT "position_on_invitation_positionId_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_access" ADD CONSTRAINT "invitation_access_invitationId_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_access" ADD CONSTRAINT "invitation_access_menuId_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."position_on_user" ADD CONSTRAINT "position_on_user_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."position_on_user" ADD CONSTRAINT "position_on_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_access" ADD CONSTRAINT "user_access_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_access" ADD CONSTRAINT "user_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_login_history" ADD CONSTRAINT "user_login_history_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."position_network" ADD CONSTRAINT "position_network_fidposition_fkey" FOREIGN KEY ("fidposition") REFERENCES "public"."position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."position_network" ADD CONSTRAINT "position_network_network_fk" FOREIGN KEY ("fidnetwork") REFERENCES "public"."network"("idnet") ON DELETE NO ACTION ON UPDATE NO ACTION;
