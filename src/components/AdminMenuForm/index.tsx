import React, {useState, useEffect} from 'react';

type Menu = {
  id: number;
  title: string;
  title_fa: string;
  slug: string;
  parentId: number | null;
  active: boolean;
};

export default function AdminMenuForm() {
  const [mainMenuOptions, setMainMenuOptions] = useState<Menu[]>([]);
  const [subMenuOptions, setSubMenuOptions] = useState<Menu[]>([]);
  const [subSubMenuOptions, setSubSubMenuOptions] = useState<Menu[]>([]);
  const [selectedMainMenu, setSelectedMainMenu] = useState<string>('');
  const [selectedSubMenu, setSelectedSubMenu] = useState<string>('');
  const [selectedSubSubMenu, setSelectedSubSubMenu] = useState<string>('');
  const [activeState, setActiveState] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    fetch('/api/menus')
      .then((res) => res.json())
      .then((data: Menu[]) => {
        const mainMenus = data.filter((menu) => menu.parentId === null);
        setMainMenuOptions(mainMenus);
      })
      .catch((error) => console.error('Failed to fetch menus:', error));
  }, []);

  const handleMainMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedMainMenu(selectedId);
    setSelectedSubMenu('');
    setSelectedSubSubMenu('');
    setIsFormChanged(false);

    if (selectedId) {
      fetch('/api/menus')
        .then((res) => res.json())
        .then((data: Menu[]) => {
          const filteredSubMenus = data.filter(
            (menu) =>
              menu.parentId === Number(selectedId) &&
              menu.slug !== 'browser-management',
          );
          setSubMenuOptions(filteredSubMenus);
          setSubSubMenuOptions([]);

          const updatedActiveState = [...activeState];
          const selectedMenu = mainMenuOptions.find(
            (menu) => menu.id === Number(selectedId),
          );
          // شرط برای غیرفعال کردن چک‌باکس منوی اصلی
          if (selectedMenu?.slug === 'current-affairs') {
            updatedActiveState[0] = true;
          } else {
            updatedActiveState[0] = selectedMenu ? selectedMenu.active : false;
          }
          updatedActiveState[1] = false;
          updatedActiveState[2] = false;
          setActiveState(updatedActiveState);
        })
        .catch((error) => console.error('Failed to fetch submenus:', error));
    } else {
      setSubMenuOptions([]);
      setSubSubMenuOptions([]);
    }
  };

  const handleSubMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedSubMenu(selectedId);
    setSelectedSubSubMenu('');
    setIsFormChanged(false);

    if (selectedId) {
      fetch('/api/menus')
        .then((res) => res.json())
        .then((data: Menu[]) => {
          const filteredSubSubMenus = data.filter(
            (menu) => menu.parentId === Number(selectedId),
          );
          setSubSubMenuOptions(filteredSubSubMenus);

          const selectedMenu = subMenuOptions.find(
            (menu) => menu.id === Number(selectedId),
          );
          const updatedActiveState = [...activeState];
          updatedActiveState[1] = true;
          updatedActiveState[2] = false;
          setActiveState(updatedActiveState);
        })
        .catch((error) => console.error('Failed to fetch subsubmenus:', error));
    } else {
      setSubSubMenuOptions([]);
    }
  };

  const handleSubSubMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedSubSubMenu(selectedId);
    setIsFormChanged(false);

    if (selectedId) {
      const selectedMenu = subSubMenuOptions.find(
        (menu) => menu.id === Number(selectedId),
      );
      const updatedActiveState = [...activeState];
      updatedActiveState[2] = selectedMenu ? selectedMenu.active : false;
      setActiveState(updatedActiveState);
    }
  };

  const handleActiveChange = (index: number) => {
    const updatedStates = [...activeState];
    updatedStates[index] = !updatedStates[index];
    setActiveState(updatedStates);
    setIsFormChanged(true);
  };

  const generateSlug = (parentSlug: string | null, title: string) => {
    const slugTitle = title.toLowerCase().replace(/\s+/g, '-');
    return parentSlug ? `${parentSlug}/${slugTitle}` : slugTitle;
  };

  const handleSubmit = () => {
    const updates = [];

    if (selectedMainMenu) {
      const mainMenu = mainMenuOptions.find(
        (menu) => menu.id === Number(selectedMainMenu),
      );
      if (mainMenu) {
        updates.push({
          slug: generateSlug(null, mainMenu.title),
          active: activeState[0],
        });
      }
    }

    if (selectedSubMenu) {
      const subMenu = subMenuOptions.find(
        (menu) => menu.id === Number(selectedSubMenu),
      );
      if (subMenu) {
        const parentSlug = generateSlug(
          null,
          mainMenuOptions.find((menu) => menu.id === Number(selectedMainMenu))!
            .title,
        );
        updates.push({
          slug: generateSlug(parentSlug, subMenu.title),
          active: activeState[1],
        });
      }
    }

    if (selectedSubSubMenu) {
      const subSubMenu = subSubMenuOptions.find(
        (menu) => menu.id === Number(selectedSubSubMenu),
      );
      if (subSubMenu) {
        const parentSlug = generateSlug(
          generateSlug(
            null,
            mainMenuOptions.find(
              (menu) => menu.id === Number(selectedMainMenu),
            )!.title,
          ),
          subMenuOptions.find((menu) => menu.id === Number(selectedSubMenu))!
            .title,
        );
        updates.push({
          slug: generateSlug(parentSlug, subSubMenu.title),
          active: activeState[2],
        });
      }
    }

    console.log('Updates to send:', updates);

    Promise.all(
      updates.map((menu) =>
        fetch(`/api/menus/${menu.slug}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(menu),
        }).catch((error) => {
          console.error(
            `Error updating menu with slug ${menu.slug}:`,
            error.message,
          );
          alert(`خطا در به‌روزرسانی منو: ${menu.slug}`);
        }),
      ),
    )
      .then(() => {
        setShowAlert(true); // نمایش اعلان
        setTimeout(() => setShowAlert(false), 3000); // پنهان کردن اعلان پس از ۳ ثانیه
        setIsFormChanged(false);
      })
      .catch((error) => {
        console.error('Error in updating menus:', error);
        alert('خطای کلی در به‌روزرسانی منوها رخ داد.');
      });
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center pr-4">
      {/* Alert به صورت front */}
      {showAlert && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-800 px-6 py-4 rounded shadow-md flex items-center w-96 z-50">
          {/* علامت تیک */}
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full ml-2">
            ✓
          </div>
          <p>منوها با موفقیت به‌روزرسانی شدند</p>
        </div>
      )}

      <div className="w-full flex justify-start p-4flex flex-col items-start p-4">
        <button
          onClick={toggleMenuVisibility}
          className="text-xl font-semibold bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition w-48"
        >
          مدیریت منو
        </button>
      </div>

      {isMenuVisible && (
        <div className="w-full max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-lg">
          <table className="table-auto border-collapse border border-gray-300 text-sm text-center w-full shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">منو</th>
                <th className="border border-gray-300 px-4 py-2 w-1/3">
                  عنوان
                </th>
                <th className="border border-gray-300 px-4 py-2 w-1/3">
                  عنوان انگلیسی
                </th>
                <th className="border border-gray-300 px-2 py-2 w-16">فعال</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">منوی اصلی</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={selectedMainMenu}
                    onChange={handleMainMenuChange}
                    className="w-full border border-gray-300 rounded p-1"
                  >
                    <option value="">انتخاب کنید</option>
                    {mainMenuOptions.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.title_fa}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {selectedMainMenu &&
                    mainMenuOptions.find(
                      (menu) => menu.id === Number(selectedMainMenu),
                    )?.title}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="checkbox"
                    checked={activeState[0]}
                    disabled={
                      !selectedMainMenu ||
                      !!(
                        selectedMainMenu &&
                        mainMenuOptions.find(
                          (menu) => menu.id === Number(selectedMainMenu),
                        )?.slug === 'current-affairs'
                      )
                    }
                    onChange={() => handleActiveChange(0)}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">زیرمنو</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={selectedSubMenu}
                    onChange={handleSubMenuChange}
                    disabled={!selectedMainMenu}
                    className="w-full border border-gray-300 rounded p-1"
                  >
                    <option value="">انتخاب کنید</option>
                    {subMenuOptions.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.title_fa}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {selectedSubMenu &&
                    subMenuOptions.find(
                      (menu) => menu.id === Number(selectedSubMenu),
                    )?.title}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="checkbox"
                    checked={activeState[1]}
                    disabled={!selectedSubMenu}
                    onChange={() => handleActiveChange(1)}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">زیرزیرمنو</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={selectedSubSubMenu}
                    onChange={handleSubSubMenuChange}
                    disabled={!selectedSubMenu}
                    className="w-full border border-gray-300 rounded p-1"
                  >
                    <option value="">انتخاب کنید</option>
                    {subSubMenuOptions.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.title_fa}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {selectedSubSubMenu &&
                    subSubMenuOptions.find(
                      (menu) => menu.id === Number(selectedSubSubMenu),
                    )?.title}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="checkbox"
                    checked={activeState[2]}
                    disabled={!selectedSubSubMenu}
                    onChange={() => handleActiveChange(2)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="w-full flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              disabled={!isFormChanged}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition"
            >
              ارسال
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
