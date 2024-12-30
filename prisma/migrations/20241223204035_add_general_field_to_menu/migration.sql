-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "general" BOOLEAN NOT NULL,
    "slug" TEXT NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("active", "general", "id", "parentId", "slug", "title", "title_fa") SELECT "active", "general", "id", "parentId", "slug", "title", "title_fa" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu_slug_key" ON "Menu"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
