'use client';

import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';

interface Menu {
  id: number;
  title: string;
  title_fa: string;
  active: boolean;
  parentId: number | null;
  slug: string;
}

function findMenuPath(slugs: string[], menus: Menu[]): string {
  const [menuSlug, submenuSlug, subSubMenuSlug] = slugs;

  const mainMenu = menus.find((menu) => menu.slug === menuSlug);
  if (!mainMenu) return '';

  const submenu = submenuSlug
    ? menus.find(
        (menu) => menu.slug === submenuSlug && menu.parentId === mainMenu.id,
      )
    : null;

  const subSubMenu = subSubMenuSlug
    ? menus.find(
        (menu) => menu.slug === subSubMenuSlug && menu.parentId === submenu?.id,
      )
    : null;

  const path = [mainMenu.title_fa, submenu?.title_fa, subSubMenu?.title_fa]
    .filter(Boolean)
    .join(' / ');

  return path;
}

export default function Layout({children}: {children: React.ReactNode}) {
  const params = useParams();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('/api/menus');
        const data: Menu[] = await response.json();
        setMenus(data);

        const slugs = [
          params.menuSlug,
          params.submenuSlug,
          params.subSubMenuSlug,
        ].filter(Boolean) as string[];

        const currentPath = findMenuPath(slugs, data);
        setPath(currentPath);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, [params]);

  return (
    <div>
      <div className="bg-gray-100 p-4 text-right font-bold">
        {path || 'در حال بارگذاری...'}
      </div>
      {children}
    </div>
  );
}
