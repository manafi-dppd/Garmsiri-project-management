/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslations, useLocale } from "next-intl";

interface AccessLevelModalProps {
  position_id: number;
  show: boolean;
  mode: "accessLevel" | "menuManagement";
  onClose: () => void;
  updateAccessLevels?: (
    editedAccessLevels: { menu_id: number; has_access: boolean }[]
  ) => void;
  checkedState?: { menu_id: number; has_access: boolean }[];
}

interface MenuItem {
  id: number;
  title: string;
  title_fa: string;
  title_ar: string;
  title_tr: string;
  parent_id: number | null;
  general: boolean;
  active: boolean;
  disabled?: boolean;
  checked?: boolean;
  children?: MenuItem[];
}

interface AccessLevel {
  menu_id: number;
  has_access: boolean;
}

const AccessLevelModal: React.FC<AccessLevelModalProps> = ({
  position_id,
  show,
  mode,
  onClose,
  updateAccessLevels,
  checkedState,
}) => {
  const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const locale = useLocale();
  const t = useTranslations("AccessLevelModal");
  const isRTL = locale === "fa" || locale === "ar";

  const getLocalizedTitle = useCallback(
    (menu: MenuItem): string => {
      switch (locale) {
        case "en":
          return menu.title;
        case "ar":
          return menu.title_ar;
        case "tr":
          return menu.title_tr;
        case "fa":
        default:
          return menu.title_fa;
      }
    },
    [locale]
  );

  const handleSave = useCallback(async () => {
    setIsSaveDisabled(true);

    const flattenMenuTree = (menus: MenuItem[]): MenuItem[] => {
      return menus.reduce<MenuItem[]>((acc, menu) => {
        acc.push({
          ...menu,
          active: menu.checked ?? false,
        });
        if (menu.children) {
          acc.push(...flattenMenuTree(menu.children));
        }
        return acc;
      }, []);
    };

    const updatedMenus = flattenMenuTree(menuTree);

    if (mode === "accessLevel") {
      const editedAccessLevels = updatedMenus.map((menu) => ({
        menu_id: menu.id,
        has_access: menu.active,
      }));

      updateAccessLevels?.([
        { menu_id: position_id, has_access: true },
        ...editedAccessLevels,
      ]);
    } else if (mode === "menuManagement") {
      try {
        await axios.put("/api/menus/update", { menu: updatedMenus });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        console.error("Failed to update menus:", error);
      }
    }
  }, [menuTree, mode, position_id, updateAccessLevels]);

  const buildMenuHierarchy = useCallback((menuData: MenuItem[]): MenuItem[] => {
    const menuMap = new Map<number | null, MenuItem[]>();

    [...menuData]
      .sort((a, b) => a.id - b.id)
      .forEach((menu) => {
        if (!menuMap.has(menu.parent_id)) {
          menuMap.set(menu.parent_id, []);
        }
        menuMap.get(menu.parent_id)?.push({ ...menu, children: [] });
      });

    const buildHierarchy = (parentId: number | null): MenuItem[] =>
      (menuMap.get(parentId) || [])
        .sort((a, b) => a.id - b.id)
        .map((menu) => ({
          ...menu,
          children: buildHierarchy(menu.id),
        }));

    return buildHierarchy(null);
  }, []);

  const updateMenuTreeState = useCallback(
    (menuTree: MenuItem[], accessLevels: AccessLevel[] | null): MenuItem[] => {
      const accessMap = new Map<number, boolean>();
      accessLevels?.forEach(({ menu_id, has_access }) =>
        accessMap.set(menu_id, has_access)
      );

      const applyChecked = (menu: MenuItem): MenuItem => ({
        ...menu,
        checked:
          mode === "menuManagement"
            ? menu.active
            : accessMap.get(menu.id) ?? false,
        children: menu.children?.map(applyChecked),
      });

      return menuTree.map(applyChecked);
    },
    [mode]
  );

  const handleCheckboxChange = useCallback(
    (menu_id: number, checked: boolean, menuList: MenuItem[]): MenuItem[] => {
      const updateChildren = (items: MenuItem[], state: boolean): MenuItem[] =>
        items.map((item) => ({
          ...item,
          checked: state,
          children: item.children ? updateChildren(item.children, state) : [],
        }));

      const updateParents = (items: MenuItem[]): MenuItem[] =>
        items.map((item) => {
          if (item.children?.length) {
            item.children = updateParents(item.children);
            // if (item.title !== "Current Affairs") {
              item.checked = item.children.some((child) => child.checked);
            // }
          }
          return item;
        });

      const updateTree = (items: MenuItem[]): MenuItem[] =>
        items.map((item) => {
          if (item.id === menu_id) {
            return {
              ...item,
              checked: checked,
              children: item.children
                ? updateChildren(item.children, checked)
                : [],
            };
          }
          return {
            ...item,
            children: item.children ? updateTree(item.children) : item.children,
          };
        });

      return updateParents(updateTree(menuList));
    },
    []
  );

  const handleCheckboxToggle = useCallback(
    (menu_id: number, checked: boolean) => {
      setMenuTree((prev) => handleCheckboxChange(menu_id, checked, [...prev]));
      setIsSaveDisabled(false);
    },
    [handleCheckboxChange]
  );

  const renderChildCheckboxes = useCallback(
    (children: MenuItem[], level: number): JSX.Element[] => {
      return [...children]
        .sort((a, b) => a.id - b.id)
        .map((child) => (
          <div
            key={child.id}
            className="flex flex-col space-y-1"
            style={{
              marginRight: isRTL ? level * 16 : 0,
              marginLeft: !isRTL ? level * 16 : 0,
            }}
          >
            <div
              className={`flex items-center ${
                level === 0 ? "text-base" : "text-sm"
              }`}
            >
              <input
                type="checkbox"
                checked={child.checked ?? false}
                onChange={(e) =>
                  handleCheckboxToggle(child.id, e.target.checked)
                }
                className={`${isRTL ? "mr-2" : "mr-2"} ${
                  level === 0 ? "accent-blue-500" : "accent-red-500"
                }`}
              />
              <span
                className={`${level === 0 ? "font-bold" : ""} ${
                  isRTL ? "text-right" : "text-left"
                } flex-1`}
                style={{ whiteSpace: "normal" }}
              >
                {getLocalizedTitle(child)}
              </span>
            </div>
            {child.children && child.children.length > 0 && (
              <div className="flex flex-col space-y-1">
                {renderChildCheckboxes(child.children, level + 1)}
              </div>
            )}
          </div>
        ));
    },
    [getLocalizedTitle, handleCheckboxToggle, isRTL]
  );

  const renderTableHeader = useCallback(
    (menus: MenuItem[]): JSX.Element[] => {
      return [...menus]
        .sort((a, b) => a.id - b.id)
        .map((menu) => (
          <th key={menu.id} className="border border-gray-300">
            <label className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={menu.checked ?? false}
                disabled={menu.disabled}
                onChange={(e) =>
                  handleCheckboxToggle(menu.id, e.target.checked)
                }
                className={`${isRTL ? "mr-2" : "mr-2"} accent-blue-500`}
              />
              <span
                className={isRTL ? "text-right" : "text-left"}
                style={{ whiteSpace: "normal" }}
              >
                {getLocalizedTitle(menu)}
              </span>
            </label>
          </th>
        ));
    },
    [getLocalizedTitle, handleCheckboxToggle, isRTL]
  );

  const renderTableBody = useCallback(
    (menus: MenuItem[]): JSX.Element => {
      const calculateDepth = (menu: MenuItem): number =>
        menu.children?.length
          ? 1 + Math.max(...menu.children.map(calculateDepth))
          : 1;

      const maxDepth = Math.max(...menus.map(calculateDepth));

      return (
        <>
          {Array.from({ length: maxDepth }).map((_, i) => (
            <tr key={i}>
              {menus.map((menu) => (
                <td key={menu.id} className="border border-gray-300 align-top">
                  {i === 0 && renderChildCheckboxes(menu.children || [], 0)}
                </td>
              ))}
            </tr>
          ))}
        </>
      );
    },
    [renderChildCheckboxes]
  );

  useEffect(() => {
    if (!show) return;

    const fetchData = async () => {
      try {
        const [menuResponse, accessLevelResponse] = await Promise.all([
          axios.get<MenuItem[]>("/api/menus"),
          mode === "accessLevel"
            ? axios.get<AccessLevel[]>(
                `/api/access-levels?position_id=${position_id}`
              )
            : Promise.resolve(null),
        ]);
        let menuData = menuResponse.data.filter(
          (menu) => !["Browser Management", "home"].includes(menu.title)
        );

        if (mode === "accessLevel") {
          menuData = menuData.filter((menu) => !menu.general);
        } else if (mode === "menuManagement") {
          menuData = menuData.map((menu) =>
            // menu.title === "Current Affairs"
            //   ? { ...menu, disabled: true }
              menu
          );
        }

        let updatedMenuTree = updateMenuTreeState(
          buildMenuHierarchy(menuData),
          mode === "accessLevel" ? accessLevelResponse?.data ?? null : null
        );

        if (checkedState?.length) {
          const applyCheckedState = (menus: MenuItem[]): MenuItem[] =>
            menus.map((menu) => ({
              ...menu,
              checked:
                checkedState.find((s) => s.menu_id === menu.id)?.has_access ??
                menu.checked,
              children: menu.children ? applyCheckedState(menu.children) : [],
            }));

          updatedMenuTree = applyCheckedState(updatedMenuTree);
        }

        setMenuTree(updatedMenuTree);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [
    show,
    mode,
    position_id,
    checkedState,
    buildMenuHierarchy,
    updateMenuTreeState,
  ]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      {showAlert && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-800 px-6 py-4 rounded shadow-md flex items-center w-96 z-50">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full ml-2">
            ✓
          </div>
          <p>{t("updateSuccess")}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-xl w-4/5 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h5 className="text-lg font-semibold">
            {t(mode === "accessLevel" ? "accessLevelTitle" : "menuManagement")}
          </h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
            aria-label={t("close")}
          >
            ×
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

        <div className="flex justify-end p-4 border-t border-gray-200 gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            {t("close")}
          </button>
          <button
            type="button"
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              isSaveDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessLevelModal;
