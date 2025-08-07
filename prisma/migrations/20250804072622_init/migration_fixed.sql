-- AlterTable
ALTER TABLE "menu" ALTER COLUMN "title_tr" SET NOT NULL,
ALTER COLUMN "title_ar" SET NOT NULL;

-- AlterTable
ALTER TABLE "network" ALTER COLUMN "network_tr" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "position" ALTER COLUMN "title_tr" SET NOT NULL,
ALTER COLUMN "title_ar" SET NOT NULL;

-- AlterTable
ALTER TABLE "seghlipump" ADD COLUMN     "seghlipump-tr" VARCHAR(20),
ADD COLUMN     "seghlipump_ar" VARCHAR(20),
ADD COLUMN     "seghlipump_fa" VARCHAR(20);

-- CreateTable
CREATE TABLE "position_newtwork" (
    "id" SERIAL NOT NULL,
    "fidposition" INTEGER,
    "fidnetwork" INTEGER,

    CONSTRAINT "position_newtwork_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "position_newtwork" ADD CONSTRAINT "position_newtwork_network_fk" FOREIGN KEY ("fidnetwork") REFERENCES "network"("idnet") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "position_newtwork" ADD CONSTRAINT "position_newtwork_position_fk" FOREIGN KEY ("fidposition") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

