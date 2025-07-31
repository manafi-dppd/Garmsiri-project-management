"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  formatLocalDateTime,
  formatDateTimeForNonPersian,
} from "../../../utils/dateUtils";
import { useTranslations, useLocale } from "next-intl";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  registration_time: string;
  endDate: string | null;
  active: boolean;
  positions: {
    title: string;
    title_fa: string;
    title_ar: string;
    title_tr: string;
  }[];
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations("userInvitationTable");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getLocalizedTitle = (position: {
    title: string;
    title_ar: string;
    title_tr: string;
    title_fa: string;
  }) => {
    switch (locale) {
      case "en":
        return position.title;
      case "ar":
        return position.title_ar;
      case "tr":
        return position.title_tr;
      case "fa":
      default:
        return position.title_fa;
    }
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return t("uncertain");

    return locale === "fa"
      ? formatLocalDateTime(dateString)
      : formatDateTimeForNonPersian(dateString);
  };

  if (loading) {
    return <div className="mt-4 text-center">{t("loading")}...</div>;
  }

  if (users.length === 0) {
    return <div className="mt-4 text-center">{t("noUsers")}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-center text-2xl font-bold">{t("users")}</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">{t("firstName")}</th>
              <th className="border border-gray-300 p-2">{t("lastName")}</th>
              <th className="border border-gray-300 p-2">{t("mobilePhone")}</th>
              <th className="border border-gray-300 p-2">
                {t("registrationTime")}
              </th>
              <th className="border border-gray-300 p-2">
                {t("expirationTime")}
              </th>
              <th className="border border-gray-300 p-2">{t("active")}</th>
              <th className="border border-gray-300 p-2">{t("role")}</th>
              <th className="border border-gray-300 p-2">{t("details")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">
                  {user.first_name}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.last_name}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.mobile}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {formatDateTime(user.registration_time)}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {formatDateTime(user.endDate)}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.active ? t("yes") : t("no")}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.positions.length > 0
                    ? user.positions.map((p) => getLocalizedTitle(p)).join(", ")
                    : t("noRole")}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <Button>{t("view")}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
