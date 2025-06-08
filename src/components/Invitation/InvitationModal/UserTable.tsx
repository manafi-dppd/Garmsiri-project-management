'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button'; // استفاده از کامپوننت Button در صورت نیاز
import { formatLocalDateTime} from '../../../utils/dateUtils';
import * as React from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  registration_time: string;
  endDate: string | null;
  active: boolean;
  positions: {
    title_fa: string; // تغییر از Position.title_fa به title_fa
    // یا اگر ساختار قبلی را حفظ می‌کنید:
    // Position: {
    //   title_fa: string;
    // };
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
    return <div className="mt-4 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-center text-2xl font-bold">کاربران</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
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
                <td className="border border-gray-300 p-2 text-center">{user.first_name}</td>
                <td className="border border-gray-300 p-2 text-center">{user.last_name}</td>
                <td className="border border-gray-300 p-2 text-center">{user.mobile}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {formatLocalDateTime(user.registration_time)}{' '}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.endDate ? formatLocalDateTime(user.endDate) : 'نامشخص'}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.active ? 'بله' : 'خیر'}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {user.positions.length > 0
                    ? user.positions.map((p) => p.title_fa).join(', ')
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
