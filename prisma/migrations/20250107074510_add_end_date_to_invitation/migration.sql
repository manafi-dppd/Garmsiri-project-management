/*
  Warnings:

  - You are about to drop the column `expirationDate` on the `Invitation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invitation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "endDate" DATETIME,
    "gender" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "introdPathLetter" TEXT,
    "letterIssuer" TEXT,
    "letterNumber" TEXT,
    "letterDate" TEXT,
    "letterApprover" TEXT,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Invitation" ("createdAt", "firstName", "gender", "id", "introdPathLetter", "isRegistered", "lastName", "letterApprover", "letterDate", "letterIssuer", "letterNumber", "mobile", "password", "userId", "username") SELECT "createdAt", "firstName", "gender", "id", "introdPathLetter", "isRegistered", "lastName", "letterApprover", "letterDate", "letterIssuer", "letterNumber", "mobile", "password", "userId", "username" FROM "Invitation";
DROP TABLE "Invitation";
ALTER TABLE "new_Invitation" RENAME TO "Invitation";
CREATE UNIQUE INDEX "Invitation_mobile_key" ON "Invitation"("mobile");
CREATE UNIQUE INDEX "Invitation_username_key" ON "Invitation"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
