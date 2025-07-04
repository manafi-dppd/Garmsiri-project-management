"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaClock,
  FaCogs,
  FaWrench,
  FaCalculator,
  FaBars,
} from "react-icons/fa";

interface Menu {
  id: number;
  title: string;
  title_fa: string;
  active: boolean;
  parent_id: number | null; // تغییر از parentId به parent_id
  slug: string;
  parentSlug: string | null;
}

interface NavMenuProps {
  menus: Menu[];
}

const NavMenu: React.FC<NavMenuProps> = ({ menus = [] }) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [localMenus, setLocalMenus] = useState<Menu[]>(menus);

  const router = useRouter();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("/api/menus", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login");
          }
          return;
        }
        const data: Menu[] = await response.json();

        setLocalMenus(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, [router]);

  const buildPath = (menu: Menu): string => {
    return `/${menu.slug}`;
  };

  const handleMenuClick = (menu: Menu, e: React.MouseEvent) => {
    const childMenus = localMenus.filter(
      (m) => m.parent_id === menu.id && m.active
    );
    if (childMenus.length > 0) {
      e.preventDefault();
      setOpenMenu(menu.id === openMenu ? null : menu.id);
    } else {
      router.push(buildPath(menu));
    }
  };

  const handleSubMenuClick = (submenu: Menu, e: React.MouseEvent) => {
    const subChildMenus = localMenus.filter(
      (m) => m.parent_id === submenu.id && m.active
    );
    if (subChildMenus.length > 0) {
      e.preventDefault();
      setOpenSubMenu(submenu.id === openSubMenu ? null : submenu.id);
    } else {
      setOpenMenu(null);
      setOpenSubMenu(null);
      router.push(buildPath(submenu));
    }
  };

  const handleSubSubMenuClick = (subSubMenu: Menu) => {
    setOpenMenu(null);
    setOpenSubMenu(null);
    router.push(buildPath(subSubMenu));
  };

  const parentMenus = Array.isArray(localMenus)
    ? localMenus.filter((menu) => menu.parent_id === null && menu.active)
    : [];

  return (
    <nav className="relative z-10 bg-gray-700 text-white">
      <div className="container flex flex-col items-start px-2">
        <input type="checkbox" id="menu-toggle" className="peer hidden" />
        <label
          htmlFor="menu-toggle"
          className="flex cursor-pointer items-center justify-end md:hidden"
        >
          <FaBars className="text-2xl text-white hover:text-gray-300" />
        </label>

        <ul
          className="hidden w-full py-2 peer-checked:flex peer-checked:flex-col peer-checked:items-start md:flex md:flex-row md:items-center md:justify-around"
          onMouseLeave={() => {
            setOpenMenu(null);
            setOpenSubMenu(null);
          }}
        >
          {parentMenus.map((menu) => {
            const childMenus = localMenus.filter(
              (submenu) => submenu.parent_id === menu.id && submenu.active
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
                  className="flex cursor-pointer items-center gap-2 hover:text-gray-300"
                >
                  {menu.title === "home" ? (
                    <FaHome className="text-2xl text-blue-500" />
                  ) : menu.title === "Current Affairs" ? (
                    <>
                      <FaClock className="text-lg text-yellow-500" />
                      {menu.title_fa}
                    </>
                  ) : menu.title === "Operation Records" ? (
                    <>
                      <FaCogs className="text-lg text-green-500" />
                      {menu.title_fa}
                    </>
                  ) : menu.title === "Execution Records" ? (
                    <>
                      <FaWrench className="text-lg text-red-500" />
                      {menu.title_fa}
                    </>
                  ) : menu.title === "Study Records" ? (
                    <>
                      <FaCalculator className="text-lg text-purple-500" />
                      {menu.title_fa}
                    </>
                  ) : (
                    menu.title_fa
                  )}
                </Link>
                {childMenus.length > 0 && openMenu === menu.id && (
                  <ul className="absolute right-0 z-20 mt-2 flex min-w-[200px] flex-col rounded bg-gray-600 p-2 text-sm shadow-lg">
                    {childMenus.map((submenu) => {
                      const subChildMenus = localMenus.filter(
                        (subSubMenu) =>
                          subSubMenu.parent_id === submenu.id &&
                          subSubMenu.active
                      );
                      return (
                        <li
                          key={submenu.id}
                          className="relative cursor-pointer px-2 py-1 hover:bg-gray-500"
                          onMouseEnter={() => {
                            if (window.innerWidth >= 768)
                              setOpenSubMenu(submenu.id);
                          }}
                        >
                          <Link
                            href={buildPath(submenu)}
                            onClick={(e) => handleSubMenuClick(submenu, e)}
                            className="flex cursor-pointer justify-between hover:text-gray-300"
                          >
                            <span>{submenu.title_fa}</span>
                            {subChildMenus.length > 0 && (
                              <span className="ml-2 text-sm text-gray-400">
                                {">"}
                              </span>
                            )}
                          </Link>

                          {subChildMenus.length > 0 &&
                            openSubMenu === submenu.id && (
                              <ul className="absolute right-full top-0 mt-0 min-w-[200px] rounded bg-gray-600 p-2 text-sm shadow-lg">
                                {subChildMenus.map((subSubMenu) => (
                                  <li
                                    key={subSubMenu.id}
                                    className="cursor-pointer px-2 py-1 hover:bg-gray-500"
                                  >
                                    <Link
                                      href={buildPath(subSubMenu)}
                                      onClick={() =>
                                        handleSubSubMenuClick(subSubMenu)
                                      }
                                      className="cursor-pointer hover:text-gray-300"
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
