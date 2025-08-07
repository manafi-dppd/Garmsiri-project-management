-- AlterTable
ALTER TABLE "menu" ALTER COLUMN "title_tr" SET NOT NULL,
ALTER COLUMN "title_ar" SET NOT NULL;

-- AlterTable
ALTER TABLE "network" ALTER COLUMN "network_tr" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "position" ALTER COLUMN "title_tr" SET NOT NULL,
ALTER COLUMN "title_ar" SET NOT NULL;

-- AlterTable
ADD COLUMN     "seghlipump_ar" VARCHAR(20),
ADD COLUMN     "seghlipump_fa" VARCHAR(20);

-- CreateTable
    "id" SERIAL NOT NULL,
    "fidposition" INTEGER,
    "fidnetwork" INTEGER,

);

-- AddForeignKey

-- AddForeignKey

