"use client";

import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import {
  toPersianDate,
  formatDateForNonPersian,
} from "../../../utils/dateUtils";
import { useTranslations, useLocale } from "next-intl";

interface Invitation {
  id: number;
  first_name: string | null;
  last_name: string;
  mobile: string;
  created_at: string;
  end_date: string | null;
  is_registered: boolean;
}

export default function InvitationsTable() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations("userInvitationTable");

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await fetch("/api/invitation", {
          headers: {
            "Accept-Language": locale,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch invitations");
        }
        const data = await response.json();
        setInvitations(data);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [locale]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";

    return locale === "fa"
      ? toPersianDate(dateString, "yyyy/MM/dd")
      : formatDateForNonPersian(dateString);
  };

  if (loading) {
    return <div className="mt-10 text-center">{t("loading")}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-center text-2xl font-bold">{t("invitees")}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="px-6 py-3 text-center text-sm font-medium">
                {t("firstName")}
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                {t("lastName")}
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                {t("mobilePhone")}
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                {t("invitationDate")}
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                {t("expirationTime")}
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                {t("register")}
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                {t("details")}
              </th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invitation) => (
              <tr
                key={invitation.id}
                className={`${
                  !invitation.is_registered
                    ? "bg-red-100"
                    : invitation.id % 2 === 0
                    ? "bg-gray-50"
                    : "bg-white"
                }`}
              >
                <td className="px-6 py-4 text-center">
                  {invitation.first_name || "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  {invitation.last_name}
                </td>
                <td className="px-6 py-4 text-center">{invitation.mobile}</td>
                <td className="px-6 py-4 text-center">
                  {formatDate(invitation.created_at)}
                </td>
                <td className="px-6 py-4 text-center">
                  {formatDate(invitation.end_date)}
                </td>
                <td className="px-6 py-4 text-center">
                  {invitation.is_registered ? t("yes") : t("no")}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    {t("view")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
