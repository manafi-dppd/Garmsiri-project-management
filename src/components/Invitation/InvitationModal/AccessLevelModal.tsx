import React, {useState, useEffect} from 'react';
import openAccessLevelModal from './index';
import axios from 'axios';

interface MenuItem {
  id: number;
  title: string;
  title_fa: string;
  parentId: number | null;
  general: boolean;
  checked?: boolean;
  children?: MenuItem[];
}

const AccessLevelModal: React.FC<{
  positionId: number;
  show: boolean;
  onClose: () => void;
}> = ({positionId, show, onClose}) => {
  const [menuTree, setMenuTree] = useState<MenuItem[]>([]);

  
  useEffect(() => {
    if (show && menuTree.length === 0) {
      axios
        .get<MenuItem[]>('/api/menus')
        .then((response) => {
          const menuData = response.data.filter(
            (menu) =>
              !menu.general &&
              !['home', 'Browser Management'].includes(menu.title),
          );
          setMenuTree(buildMenuHierarchy(menuData));
        })
        .catch((error) => console.error('Failed to fetch menus:', error));
    }
  }, [show, menuTree.length]);

  const buildMenuHierarchy = (menuData: MenuItem[]): MenuItem[] => {
    const menuMap = new Map<number | null, MenuItem[]>();
    menuData.forEach((menu) => {
      if (!menuMap.has(menu.parentId)) {
        menuMap.set(menu.parentId, []);
      }
      menuMap.get(menu.parentId)?.push({...menu, children: []});
    });

    const buildHierarchy = (parentId: number | null): MenuItem[] =>
      (menuMap.get(parentId) || []).map((menu) => ({
        ...menu,
        children: buildHierarchy(menu.id),
      }));

    return buildHierarchy(null);
  };

  const handleCheckboxChange = (
    menuId: number,
    checked: boolean,
    menuList: MenuItem[],
  ): MenuItem[] => {
    // به‌روزرسانی چک‌باکس‌های فرزند و نوه
    const updateChildren = (items: MenuItem[], state: boolean): MenuItem[] =>
      items.map((item) => ({
        ...item,
        checked: state,
        children: item.children ? updateChildren(item.children, state) : [],
      }));

    // به‌روزرسانی وضعیت والدین
    const updateParents = (items: MenuItem[]): MenuItem[] => {
      const updateParentStatus = (item: MenuItem): MenuItem => {
        if (item.children && item.children.length > 0) {
          item.children = item.children.map(updateParentStatus);
          const allChildrenUnchecked = item.children.every(
            (child) => !child.checked,
          );
          item.checked = !allChildrenUnchecked;
        }
        return item;
      };
      return items.map(updateParentStatus);
    };

    const updateTree = (items: MenuItem[]): MenuItem[] =>
      items.map((item) => {
        if (item.id === menuId) {
          item.checked = checked;
          if (item.children) {
            item.children = updateChildren(item.children, checked);
          }
        } else if (item.children) {
          item.children = updateTree(item.children);
        }
        return item;
      });

    const updatedMenu = updateTree(menuList);
    return updateParents(updatedMenu);
  };

  const handleCheckboxToggle = (menuId: number, checked: boolean) => {
    setMenuTree((prev) => handleCheckboxChange(menuId, checked, [...prev]));
  };

  const renderChildCheckboxes = (
    children: MenuItem[],
    level: number,
  ): JSX.Element[] => {
    return children.map((child) => (
      <div
        key={child.id}
        className={`text-right pr-4 ${level === 0 ? 'text-base' : 'text-sm'}`}
      >
        <label>
          <input
            type="checkbox"
            checked={child.checked || false}
            onChange={(e) => handleCheckboxToggle(child.id, e.target.checked)}
            className={`mr-2 ${
              level === 1 ? 'accent-blue-500' : 'accent-green-500'
            }`} // چک‌باکس فرزند با رنگ آبی و نوه با رنگ سبز
          />
          <span
            className={`${level === 0 ? 'font-bold' : ''}`} // برچسب Bold و Underline برای level === 1
          >
            {child.title_fa}
          </span>
        </label>
        {child.children && renderChildCheckboxes(child.children, level + 1)}
      </div>
    ));
  };

  const renderTableHeader = (menus: MenuItem[]): JSX.Element[] => {
    return menus.map((menu) => (
      <th key={menu.id} className="text-center border border-gray-300">
        <label>
          <input
            type="checkbox"
            checked={menu.checked || false}
            onChange={(e) => handleCheckboxToggle(menu.id, e.target.checked)}
            className="mr-2 accent-red-500" // چک‌باکس پدر با رنگ قرمز
          />
          {menu.title_fa}
        </label>
      </th>
    ));
  };

  const renderTableBody = (menus: MenuItem[]): JSX.Element => {
    const rows: JSX.Element[] = [];
    const maxDepth = Math.max(...menus.map((menu) => calculateDepth(menu)));

    for (let i = 0; i < maxDepth; i++) {
      const row = (
        <tr key={i}>
          {menus.map((menu) => (
            <td key={menu.id} className="border border-gray-300 align-top">
              {i === 0 && renderChildCheckboxes(menu.children || [], 0)}
            </td>
          ))}
        </tr>
      );
      rows.push(row);
    }

    return <>{rows}</>;
  };

  const calculateDepth = (menu: MenuItem): number => {
    if (!menu.children || menu.children.length === 0) return 1;
    return 1 + Math.max(...menu.children.map(calculateDepth));
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-4/5 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h5 className="text-lg font-semibold">سطح دسترسی</h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[70vh]">
          <table className="table-fixed w-full border-collapse border border-gray-300">
            <thead>
              <tr>{renderTableHeader(menuTree)}</tr>
            </thead>
            <tbody>{renderTableBody(menuTree)}</tbody>
          </table>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-200 space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            بستن
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => console.log(menuTree)}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessLevelModal;
