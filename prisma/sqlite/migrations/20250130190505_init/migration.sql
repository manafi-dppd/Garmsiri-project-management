-- CreateTable
CREATE TABLE "Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "general" BOOLEAN NOT NULL,
    "slug" TEXT NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "req_license" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "AccessLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "positionId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "hasAccess" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AccessLevel_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccessLevel_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invitation" (
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

-- CreateTable
CREATE TABLE "PositionOnInvitation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invitationId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,
    CONSTRAINT "PositionOnInvitation_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PositionOnInvitation_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InvitationAccess" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invitationId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "hasAccess" BOOLEAN NOT NULL,
    CONSTRAINT "InvitationAccess_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InvitationAccess_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "PositionOnUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,
    CONSTRAINT "PositionOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PositionOnUser_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserAccess" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "hasAccess" BOOLEAN NOT NULL,
    CONSTRAINT "UserAccess_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserLoginHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "loginTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logoutTime" DATETIME,
    "ipAddress" TEXT,
    "deviceInfo" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL,
    CONSTRAINT "UserLoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_slug_key" ON "Menu"("slug");

-- CreateIndex
CREATE INDEX "Menu_id_idx" ON "Menu"("id");

-- CreateIndex
CREATE INDEX "Menu_parentId_idx" ON "Menu"("parentId");

-- CreateIndex
CREATE INDEX "Menu_slug_idx" ON "Menu"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_mobile_key" ON "Invitation"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_username_key" ON "Invitation"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_userId_key" ON "Invitation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
