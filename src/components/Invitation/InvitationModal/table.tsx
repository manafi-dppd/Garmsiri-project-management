import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import 'tailwindcss/tailwind.css';
import {toPersianDate} from '@/utils/dateUtils';

interface Invitation {
  id: number;
  firstName: string | null;
  lastName: string;
  mobile: string;
  createdAt: string;
  endDate: string | null;
  isRegistered: boolean;
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
    return <div className="text-center mt-10">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6 text-center">دعوت شدگان</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="px-6 py-3 text-center text-sm font-medium">نام</th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                نام خانوادگی
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                تلفن همراه
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                تاریخ دعوت
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                تاریخ انقضا
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                ثبت‌نام
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                جزئیات
              </th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invitation, index) => (
              <tr
                key={invitation.id}
                className={`${
                  !invitation.isRegistered
                    ? 'bg-red-100'
                    : index % 2 === 0
                      ? 'bg-gray-50'
                      : 'bg-white'
                }`}
              >
                <td className="px-6 py-4 text-center">
                  {invitation.firstName || '-'}
                </td>
                <td className="px-6 py-4 text-center">{invitation.lastName}</td>
                <td className="px-6 py-4 text-center">{invitation.mobile}</td>
                <td className="px-6 py-4 text-center">
                  {toPersianDate(invitation.createdAt)}
                </td>
                <td className="px-6 py-4 text-center">
                  {invitation.endDate ? toPersianDate(invitation.endDate) : '-'}
                </td>
                <td className="px-6 py-4 text-center">
                  {invitation.isRegistered ? 'بله' : 'خیر'}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
