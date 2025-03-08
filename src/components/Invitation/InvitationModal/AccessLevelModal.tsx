/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface AccessLevelModalProps {
  positionId: number;
  show: boolean;
  mode: 'accessLevel' | 'menuManagement';
  onClose: () => void;
  onAccessLevelSubmit: (menuTree: MenuItem[]) => void;
  updateAccessLevels?: (
    editedAccessLevels: {menuId: number; hasAccess: boolean}[],
  ) => void;
  checkedState?: {menuId: number; hasAccess: boolean}[];
  initialAccessLevels?: {menuId: number; hasAccess: boolean}[]; // تعریف مقدار اولیه
}
type CheckedState = {menuId: number; hasAccess: boolean};
interface MenuItem {
  disabled: boolean;
  id: number;
  title: string;
  title_fa: string;
  parentId: number;
  general: boolean;
  active?: boolean;
  checked?: boolean;
  children?: MenuItem[];
}

interface AccessLevel {
  menuId: number;
  hasAccess: boolean;
}

interface Menu {
  id: number;
  active: boolean;
}

const AccessLevelModal: React.FC<AccessLevelModalProps> = ({
  positionId,
  show,
  mode,
  onClose,
  onAccessLevelSubmit,
  updateAccessLevels,
  initialAccessLevels,
  checkedState,
}) => {
  const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
  const [editedAccessLevels, setEditedAccessLevels] = useState<
    {menuId: number; hasAccess: boolean}[]
  >(initialAccessLevels || []);
  const [showAlert, setShowAlert] = useState(false); // برای نمایش هشدار
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  // const [isCloseDisabled, setIsCloseDisabled] = useState(false);

  const handleSave = async () => {
    setIsSaveDisabled(true);
    // setIsCloseDisabled(true);

    // تبدیل سلسله‌مراتب منو به لیست مسطح شامل همه گره‌ها
    const flattenMenuTree = (menus: MenuItem[]): Menu[] => {
      const result: Menu[] = [];
      menus.forEach((menu) => {
        result.push({id: menu.id, active: menu.checked || false});
        if (menu.children) {
          result.push(...flattenMenuTree(menu.children));
        }
      });
      return result;
    };

    const updatedMenus = flattenMenuTree(menuTree);

    console.log('Updated menus:', updatedMenus);

    if (
      !Array.isArray(updatedMenus) ||
      updatedMenus.some(
        (m) => typeof m.id !== 'number' || typeof m.active !== 'boolean',
      )
    ) {
      console.error('Invalid menu data:', updatedMenus);
      return;
    }

    if (mode === 'accessLevel') {
      // ذخیره اطلاعات در آرایه
      const editedAccessLevels = updatedMenus.map((menu) => ({
        menuId: menu.id,
        hasAccess: menu.active,
      }));

      // آرایه جدید با اضافه کردن positionId به ابتدای آن
      const updatedAccessLevels = [
        {menuId: positionId, hasAccess: true},
        ...editedAccessLevels,
      ];

      setEditedAccessLevels(updatedAccessLevels); // به‌روزرسانی state برای اطمینان
      // ارسال آرایه به کامپوننت والد
      if (updateAccessLevels) {
        updateAccessLevels(updatedAccessLevels);
      } else {
        console.warn('updateAccessLevels is not defined.');
      }

      console.log('Updated Access Levels:', updatedAccessLevels);

      // فعال‌سازی دکمه‌ها پس از ذخیره
      // setIsSaveDisabled(false);
      // setIsCloseDisabled(false);

      // نمایش هشدار
      // setShowAlert(true);
      // setTimeout(() => {
      //   setShowAlert(false);
      // }, 3000);
    } else if (mode === 'menuManagement') {
      try {
        const response = await axios.put('/api/menus/update', {
          menu: updatedMenus,
        });
        console.log('Menus updated successfully:', response.data);

        // نمایش هشدار
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          // setIsCloseDisabled(false); // فعال کردن دکمه "بستن" پس از بسته شدن هشدار
        }, 3000);
      } catch (error) {
        console.error('Failed to update menus:', error);
        // setIsCloseDisabled(false); // فعال کردن دکمه "بستن" در صورت خطا
      }
    }
  };

  useEffect(() => {
    if (show) {
      const fetchData = async () => {
        try {
          const menuResponse = await axios.get<MenuItem[]>('/api/menus');
          let menuData = menuResponse.data;

          if (mode === 'accessLevel') {
            const accessLevelResponse = await axios.get<AccessLevel[]>(
              `/api/access-levels?positionId=${positionId}`,
            );

            const accessLevels = accessLevelResponse.data;

            menuData = menuData.filter(
              (menu) =>
                !menu.general &&
                !['home', 'Browser Management'].includes(menu.title),
            );

            let updatedMenuTree = updateMenuTreeState(
              buildMenuHierarchy(menuData),
              accessLevels,
            );

            const applyCheckedState = (
              menuTree: MenuItem[],
              state: CheckedState[],
            ): MenuItem[] => {
              return menuTree.map((menu) => {
                const matchingState = state.find((s) => s.menuId === menu.id);
                return {
                  ...menu,
                  checked: matchingState
                    ? matchingState.hasAccess
                    : menu.checked,
                  children: menu.children
                    ? applyCheckedState(menu.children, state)
                    : [],
                };
              });
            };
            // اعمال checkedState به menuTree
            if (checkedState && checkedState.length > 0) {
              const positionItem = checkedState.find(
                (state) => state.menuId === positionId,
              );

              if (positionItem) {
                updatedMenuTree = applyCheckedState(
                  updatedMenuTree,
                  checkedState,
                );
              }
            }
            console.log('checkedState: ', checkedState);
            console.log('updatedMenuTree: ', updatedMenuTree);

            setMenuTree(updatedMenuTree);
          } else if (mode === 'menuManagement') {
            console.log('menuData: ', menuData);
            menuData = menuData.filter(
              (menu) =>
                menu.title !== 'Browser Management' && menu.title !== 'home',
            );
            const updatedMenuTree = updateMenuTreeState(
              buildMenuHierarchy(menuData),
              null,
            ).map((menu) =>
              menu.title === 'Current Affairs'
                ? {...menu, disabled: true}
                : menu,
            );
            setMenuTree(updatedMenuTree);
          }
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };

      fetchData();
    }
  }, [show, mode, positionId]);

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

  const updateMenuTreeState = (
    menuTree: MenuItem[],
    accessLevels: AccessLevel[] | null,
  ): MenuItem[] => {
    const accessMap = new Map<number, boolean>();

    if (accessLevels) {
      accessLevels.forEach(({menuId, hasAccess}) =>
        accessMap.set(menuId, hasAccess),
      );
    }

    const applyChecked = (menu: MenuItem): MenuItem => {
      const isChecked =
        mode === 'menuManagement'
          ? menu.active // حالت "مدیریت منو" بر اساس فیلد active
          : accessMap.get(menu.id) || false; // حالت "سطح دسترسی"
      return {
        ...menu,
        checked: isChecked,
        children: menu.children?.map(applyChecked),
      };
    };

    return menuTree.map(applyChecked);
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
          if (item.title !== 'Current Affairs') {
            const allChildrenUnchecked = item.children.every(
              (child) => !child.checked,
            );
            item.checked = !allChildrenUnchecked;
          }
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
    const updateTree = (items: MenuItem[]): MenuItem[] =>
      items.map((item) => {
        if (item.id === menuId) {
          item.checked = checked;
          if (item.children) {
            item.children = item.children.map((child) => ({
              ...child,
              checked,
            }));
          }
        } else if (item.children) {
          item.children = updateTree(item.children);
        }
        return item;
      });

    setMenuTree((prev) => handleCheckboxChange(menuId, checked, [...prev]));
    setIsSaveDisabled(false); // فعال کردن دکمه "ذخیره" بعد از تغییر وضعیت چک‌باکس‌ها
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
              level === 1 ? 'accent-blue-500' : 'accent-red-500'
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
    console.log('menus: ', menus);
    return menus.map((menu) => (
      <th key={menu.id} className="text-center border border-gray-300">
        <label>
          <input
            type="checkbox"
            checked={menu.checked || false}
            disabled={menu.disabled || false}
            onChange={(e) => handleCheckboxToggle(menu.id, e.target.checked)}
            className="mr-2 accent-blue-500" // چک‌باکس پدر با رنگ قرمز
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
      {showAlert && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-800 px-6 py-4 rounded shadow-md flex items-center w-96 z-50">
          {/* علامت تیک */}
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full ml-2">
            ✓
          </div>
          <p>منوها با موفقیت به‌روزرسانی شدند</p>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-xl w-4/5 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h5 className="text-lg font-semibold">
            {mode === 'accessLevel' ? 'سطح دسترسی' : 'مدیریت صفحات'}
          </h5>
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
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400`}
            onClick={onClose}
            // disabled={isCloseDisabled}
          >
            بستن
          </button>
          <button
            type="button"
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              isSaveDisabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessLevelModal;
function updateAccessLevels(menuTree: MenuItem[]) {
  throw new Error('Function not implemented.');
}

function onAccessLevelSubmit(menuTree: MenuItem[]) {
  throw new Error('Function not implemented.');
}
