/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `browser_management` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `channel_service` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `current_affairs` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `dam_channel_repaBooleanir` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `facility_service` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `guard_shift_schedule` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `irrigation_calendar` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `minor_repairs` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `operating_records` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `performance_records` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `pumping_operator_shift` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `repair` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `repairs` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `report_theft` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `request_channel` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `request_dam` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `request_pumping` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `security` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `service_maintenance` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `study_records` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `water_accounting` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `water_level_report` on the `AccessLevel` table. All the data in the column will be lost.
  - You are about to drop the column `water_request` on the `AccessLevel` table. All the data in the column will be lost.
  - Added the required column `menuId` to the `AccessLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionId` to the `AccessLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_mobile_phone_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "positionId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "hasAccess" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AccessLevel_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccessLevel_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccessLevel" ("id") SELECT "id" FROM "AccessLevel";
DROP TABLE "AccessLevel";
ALTER TABLE "new_AccessLevel" RENAME TO "AccessLevel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
