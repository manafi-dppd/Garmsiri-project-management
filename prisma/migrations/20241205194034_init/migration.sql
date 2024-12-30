-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mobile_phone" TEXT NOT NULL,
    "email" TEXT,
    "gender" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "inviterId" INTEGER,
    "invitation_time" DATETIME NOT NULL,
    "registration_time" DATETIME NOT NULL,
    "membership_expiration_date" DATETIME,
    "active" BOOLEAN NOT NULL,
    "letter_file" BLOB,
    "letter_issuer" TEXT,
    "letter_number" TEXT,
    "letter_date" TEXT,
    "letter_approver" TEXT,
    "password" TEXT NOT NULL,
    CONSTRAINT "User_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccessLevel" (
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
    "dam_channel_repair" BOOLEAN NOT NULL,
    "guard_shift_schedule" BOOLEAN NOT NULL,
    "water_level_report" BOOLEAN NOT NULL,
    "report_theft" BOOLEAN NOT NULL,
    "pumping_operator_shift" BOOLEAN NOT NULL,
    "water_accounting" BOOLEAN NOT NULL,
    "repairs" BOOLEAN NOT NULL,
    "service_maintenance" BOOLEAN NOT NULL,
    CONSTRAINT "AccessLevel_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_phone_key" ON "User"("mobile_phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccessLevel_memberId_key" ON "AccessLevel"("memberId");
