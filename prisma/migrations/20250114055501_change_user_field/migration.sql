/*
  Warnings:

  - You are about to drop the column `expirationDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `User` table. All the data in the column will be lost.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "gender" TEXT NOT NULL,
    "inviterId" INTEGER,
    "invitationTime" DATETIME NOT NULL,
    "registrationTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "introdPathLetter" TEXT,
    "letterIssuer" TEXT,
    "letterNumber" TEXT,
    "letterDate" TEXT,
    "letterApprover" TEXT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("active", "email", "first_name", "gender", "id", "introdPathLetter", "invitationTime", "inviterId", "last_name", "letterApprover", "letterDate", "letterIssuer", "letterNumber", "password", "registrationTime", "userName") SELECT "active", "email", "first_name", "gender", "id", "introdPathLetter", "invitationTime", "inviterId", "last_name", "letterApprover", "letterDate", "letterIssuer", "letterNumber", "password", "registrationTime", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
