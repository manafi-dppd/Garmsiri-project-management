'use client';

import React, {useState, useEffect} from 'react';
import NavMenu from '../NavMenu';
import Link from 'next/link';
import router from 'next/router';

interface Menu {
  id: number;
  title: string;
  title_fa: string;
  active: boolean;
  parentId: number | null;
  slug: string;
  parentSlug: string | null;
}

interface UserInfo {
  first_name: string;
  last_name: string;
  positions: string[];
}

export default function Header() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('/api/menus', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
          }
          return;
        }

        const data: Menu[] = await response.json();
        setMenus(data);
      } catch (error) {
        // console.error('Error fetching menus:', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await fetch('/api/get-user-info', {credentials: 'include'});
        console.log('res: ', res);
        if (!res.ok) throw new Error('Failed to fetch user info');
        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        // console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();

    fetchMenus();
  }, []);
  return (
    <>
      <header className="p-4 bg-green-800 text-white text-center">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" passHref>
            <div style={{fontFamily: 'b titr', cursor: 'pointer'}}>
              <h1 className="text-lg border-b">سامانه جامع مدیریت یکپارچه</h1>
              <h4 className="text-2xl">طــرح گرمسـیـری</h4>
            </div>
          </Link>
          <div>
            {userInfo && (
              <div className="text-right text-sm text-white">
                {/* متن بالایی bold و underline */}
                <p className="font-bold underline">
                  {`${userInfo.first_name} ${userInfo.last_name}`}
                </p>
                {/* متن‌های پایین نازک و فاقد underline */}
                {userInfo.positions.map((pos, index) => (
                  <p key={index} className="font-light no-underline">
                    {pos}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <NavMenu menus={menus} />
    </>
  );
}
