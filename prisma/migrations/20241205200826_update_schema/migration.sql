/*
  Warnings:

  - You are about to drop the column `dam_channel_repair` on the `AccessLevel` table. All the data in the column will be lost.
  - Added the required column `dam_channel_repaBooleanir` to the `AccessLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security` to the `AccessLevel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" INTEGER NOT NULL,
    "current_affairs" BOOLEAN NOT NULL,
    "operating_records" BOOLEAN NOT NULL,
    "performance_records" BOOLEAN NOT NULL,
    "study_records" BOOLEAN NOT NULL,
    "water_request" BOOLEAN NOT NULL,
    "irrigation_calendar" BOOLEAN NOT NULL,
    "request_dam" BOOLEAN NOT NULL,
    "request_channel" BOOLEAN NOT NULL,
    "request_pumping" BOOLEAN NOT NULL,
    "service" BOOLEAN NOT NULL,
    "repair" BOOLEAN NOT NULL,
    "facility_service" BOOLEAN NOT NULL,
    "channel_service" BOOLEAN NOT NULL,
    "minor_repairs" BOOLEAN NOT NULL,
    "dam_channel_repaBooleanir" BOOLEAN NOT NULL,
    "security" BOOLEAN NOT NULL,
    "guard_shift_schedule" BOOLEAN NOT NULL,
    "water_level_report" BOOLEAN NOT NULL,
    "report_theft" BOOLEAN NOT NULL,
    "pumping_operator_shift" BOOLEAN NOT NULL,
    "browser_management" BOOLEAN NOT NULL,
    "water_accounting" BOOLEAN NOT NULL,
    "repairs" BOOLEAN NOT NULL,
    "service_maintenance" BOOLEAN NOT NULL,
    CONSTRAINT "AccessLevel_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccessLevel" ("browser_management", "channel_service", "current_affairs", "facility_service", "guard_shift_schedule", "id", "irrigation_calendar", "memberId", "minor_repairs", "operating_records", "performance_records", "pumping_operator_shift", "repair", "repairs", "report_theft", "request_channel", "request_dam", "request_pumping", "service", "service_maintenance", "study_records", "water_accounting", "water_level_report", "water_request") SELECT "browser_management", "channel_service", "current_affairs", "facility_service", "guard_shift_schedule", "id", "irrigation_calendar", "memberId", "minor_repairs", "operating_records", "performance_records", "pumping_operator_shift", "repair", "repairs", "report_theft", "request_channel", "request_dam", "request_pumping", "service", "service_maintenance", "study_records", "water_accounting", "water_level_report", "water_request" FROM "AccessLevel";
DROP TABLE "AccessLevel";
ALTER TABLE "new_AccessLevel" RENAME TO "AccessLevel";
CREATE UNIQUE INDEX "AccessLevel_memberId_key" ON "AccessLevel"("memberId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
