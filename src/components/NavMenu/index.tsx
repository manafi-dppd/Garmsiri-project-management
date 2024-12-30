'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

interface Menu {
  id: number;
  title: string;
  title_fa: string;
  active: boolean;
  parentId: number | null;
  slug: string;
  parentSlug: string | null;
}

interface NavMenuProps {
  menus: Menu[];
}

const NavMenu: React.FC<NavMenuProps> = ({menus}) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [openSubSubMenu, setOpenSubSubMenu] = useState<number | null>(null);

  const router = useRouter();

  const buildPath = (menu: Menu): string => {
    let path = `/${menu.slug}`;
    if (menu.parentSlug) {
      path = `/${menu.parentSlug}/${menu.slug}`;
    }
    if (menu.parentId) {
      const parentMenu = menus.find((m) => m.id === menu.parentId);
      if (parentMenu && parentMenu.parentSlug) {
        path = `/${parentMenu.parentSlug}/${menu.parentSlug}/${menu.slug}`;
      }
    }
    return path;
  };

  const handleMenuClick = (menu: Menu, e: React.MouseEvent) => {
    const childMenus = menus.filter((m) => m.parentId === menu.id && m.active);
    if (childMenus.length > 0) {
      e.preventDefault();
      setOpenMenu(menu.id === openMenu ? null : menu.id);
    } else {
      router.push(buildPath(menu));
    }
  };

  const handleSubMenuClick = (submenu: Menu, e: React.MouseEvent) => {
    const subChildMenus = menus.filter((m) => m.parentId === submenu.id && m.active);
    if (subChildMenus.length > 0) {
      e.preventDefault();
      setOpenSubMenu(submenu.id === openSubMenu ? null : submenu.id);
    } else {
      setOpenMenu(null);
      setOpenSubMenu(null);
      setOpenSubSubMenu(null);
      router.push(buildPath(submenu));
    }
  };

  const handleSubSubMenuClick = (subSubMenu: Menu) => {
    setOpenMenu(null);
    setOpenSubMenu(null);
    setOpenSubSubMenu(null);
    router.push(buildPath(subSubMenu));
  };

  const parentMenus = menus.filter((menu) => menu.parentId === null && menu.active);

  return (
    <nav className="bg-gray-700 text-white relative z-10">
      <div className="container flex flex-col items-start">
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <label
          htmlFor="menu-toggle"
          className="md:hidden flex items-center justify-end cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-6 h-6 text-white hover:text-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M1.5 3.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1-.75-.75Z"
            />
          </svg>
        </label>

        <ul
          className="hidden peer-checked:flex peer-checked:flex-col peer-checked:items-start md:flex md:flex-row md:justify-around md:items-center py-2 w-full"
          onMouseLeave={() => {
            setOpenMenu(null);
            setOpenSubMenu(null);
            setOpenSubSubMenu(null);
          }}
        >
          {parentMenus.map((menu) => {
            const childMenus = menus.filter(
              (submenu) => submenu.parentId === menu.id && submenu.active,
            );
            return (
              <li
                key={menu.id}
                className="relative"
                onMouseEnter={() => {
                  if (window.innerWidth >= 768) setOpenMenu(menu.id);
                }}
              >
                <Link
                  href={buildPath(menu)}
                  onClick={(e) => handleMenuClick(menu, e)}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  {menu.title_fa}
                </Link>
                {childMenus.length > 0 && openMenu === menu.id && (
                  <ul className="absolute flex flex-col bg-gray-600 text-sm right-0 mt-2 p-2 rounded shadow-lg z-20 min-w-[200px]">
                    {childMenus.map((submenu) => {
                      const subChildMenus = menus.filter(
                        (subSubMenu) => subSubMenu.parentId === submenu.id && subSubMenu.active,
                      );
                      return (
                        <li
                          key={submenu.id}
                          className="relative hover:bg-gray-500 px-2 py-1 cursor-pointer"
                          onMouseEnter={() => {
                            if (window.innerWidth >= 768) setOpenSubMenu(submenu.id);
                          }}
                        >
                          <Link
                            href={buildPath(submenu)}
                            onClick={(e) => handleSubMenuClick(submenu, e)}
                            className="flex justify-between hover:text-gray-300 cursor-pointer"
                          >
                            <span>{submenu.title_fa}</span>
                            {subChildMenus.length > 0 && (
                              <span className="ml-2 text-sm text-gray-400">{'>'}</span>
                            )}
                          </Link>

                          {subChildMenus.length > 0 && openSubMenu === submenu.id && (
                            <ul className="absolute right-full top-0 bg-gray-600 text-sm mt-0 p-2 rounded shadow-lg min-w-[200px]">
                              {subChildMenus.map((subSubMenu) => (
                                <li
                                  key={subSubMenu.id}
                                  className="hover:bg-gray-500 px-2 py-1 cursor-pointer"
                                >
                                  <Link
                                    href={buildPath(subSubMenu)}
                                    onClick={() => handleSubSubMenuClick(subSubMenu)}
                                    className="hover:text-gray-300 cursor-pointer"
                                  >
                                    {subSubMenu.title_fa}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};


export default NavMenu;
