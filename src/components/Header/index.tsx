'use client';

import React, {useState, useEffect} from 'react';
import NavMenu from '../NavMenu';

interface Menu {
  id: number;
  title: string;
  title_fa: string;
  active: boolean;
  parentId: number | null;
  slug: string;
  parentSlug: string | null;
}

export default function Header() {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('/api/menus');
        const data: Menu[] = await response.json();
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <>
      <header className="p-4 bg-green-800 text-white text-center">
        <div className="container mx-auto flex justify-between items-center">
          <div style={{fontFamily: 'b titr'}}>
            <h1 className="text-lg border-b">سامانه جامع مدیریت یکپارچه</h1>
            <h4 className="text-2xl">طــرح گرمسـیـری</h4>
          </div>
          <div>
            <button className="text-sm font-medium text-white hover:underline">
              ورود/عضویت
            </button>
          </div>
        </div>
      </header>
      <NavMenu menus={menus} />
    </>
  );
}
