'use client';

import {useEffect, useState} from 'react';
import {format} from 'date-fns'; // برای فرمت‌دهی تاریخ
import {Button} from '@/components/ui/button'; // استفاده از کامپوننت Button در صورت نیاز
import {toPersianDate} from '@/utils/dateUtils';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  registrationTime: string;
  endDate: string | null;
  active: boolean;
  positions: {
    Position: {
      title_fa: string;
    };
  }[];
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6 text-center">کاربران</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">نام</th>
              <th className="border border-gray-300 p-2">نام خانوادگی</th>
              <th className="border border-gray-300 p-2">تلفن همراه</th>
              <th className="border border-gray-300 p-2">زمان ثبت نام</th>
              <th className="border border-gray-300 p-2">زمان انقضا</th>
              <th className="border border-gray-300 p-2">فعال</th>
              <th className="border border-gray-300 p-2">سمت</th>
              <th className="border border-gray-300 p-2">جزئیات</th>
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
                  {toPersianDate(user.registrationTime, 'yyyy/MM/dd')}
                  {' -'}
                  {format(new Date(user.registrationTime), 'HH:mm')}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.endDate
                    ? toPersianDate(user.endDate, 'yyyy/MM/dd')
                    : 'نامشخص'}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.active ? 'بله' : 'خیر'}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.positions.length > 0
                    ? user.positions.map((p) => p.Position.title_fa).join(', ')
                    : 'بدون سمت'}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <Button>مشاهده</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
