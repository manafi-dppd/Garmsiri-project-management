import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { toPersianDate } from '../../../utils/dateUtils';
import * as React from "react";

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

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await fetch('/api/invitation');
        const data = await response.json();
        setInvitations(data);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  if (loading) {
    return <div className="mt-10 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-center text-2xl font-bold">دعوت شدگان</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="px-6 py-3 text-center text-sm font-medium">نام</th>
              <th className="px-6 py-3 text-center text-sm font-medium">نام خانوادگی</th>
              <th className="px-6 py-3 text-center text-sm font-medium">تلفن همراه</th>
              <th className="px-6 py-3 text-center text-sm font-medium">تاریخ دعوت</th>
              <th className="px-6 py-3 text-center text-sm font-medium">تاریخ انقضا</th>
              <th className="px-6 py-3 text-center text-sm font-medium">ثبت‌نام</th>
              <th className="px-6 py-3 text-center text-sm font-medium">جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invitation, index) => (
              <tr
                key={invitation.id}
                className={`${
                  !invitation.is_registered
                    ? 'bg-red-100'
                    : index % 2 === 0
                      ? 'bg-gray-50'
                      : 'bg-white'
                }`}
              >
                <td className="px-6 py-4 text-center">{invitation.first_name || '-'}</td>
                <td className="px-6 py-4 text-center">{invitation.last_name}</td>
                <td className="px-6 py-4 text-center">{invitation.mobile}</td>
                <td className="px-6 py-4 text-center">
                  {toPersianDate(invitation.created_at, 'yyyy/MM/dd')}
                </td>
                <td className="px-6 py-4 text-center">
                  {invitation.end_date ? toPersianDate(invitation.end_date, 'yyyy/MM/dd') : '-'}
                </td>
                <td className="px-6 py-4 text-center">
                  {invitation.is_registered ? 'بله' : 'خیر'}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    مشاهده
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
