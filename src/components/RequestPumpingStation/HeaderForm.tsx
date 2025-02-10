'use client';

import {useState, useEffect} from 'react';
// import {toPersianDate} from '@/utils/dateUtils';

// const convertPersianToEnglish = (str: string) => {
//   return str.replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)));
// };

const HeaderRequestPumping = () => {
  // const [agriculturalYear, setAgriculturalYear] = useState<string>('');
  // const [isNovember, setIsNovember] = useState<boolean>(false);
  // const [currentJalaliYear, setCurrentJalaliYear] = useState<number>(0);
  // const [farmingSeason, setFarmingSeason] = useState<string>(''); // مقدار "دوره کشت"
  const [userPositions, setUserPositions] = useState<string[]>([]);
  const [networks, setNetworks] = useState<{IdNet: number; Network: string}[]>(
    [],
  );
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [saleZeraee, setSaleZeraee] = useState<string | null>(null);
  const [dore, setDore] = useState<string | null>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(
    null,
  );
  const [selectedSaleZeraee, setSelectedSaleZeraee] = useState<string>('');
  const [selectedDore, setSelectedDore] = useState<string>('');
  const [filteredNetworks, setFilteredNetworks] = useState<
    {IdNet: number; Network: string}[]
  >([]);
  const [pumpStations, setPumpStations] = useState<
    {IdPumpSta: number; NameStation: string}[]
  >([]);
  const [selectedPumpStation, setSelectedPumpStation] = useState<string>('');
  // useEffect(() => {
  //   const todayPersian = toPersianDate(new Date()); // تبدیل تاریخ به شمسی
  //   const englishDate = convertPersianToEnglish(todayPersian); // تبدیل اعداد فارسی به انگلیسی
  //   console.log('todayPersian:', todayPersian);
  //   console.log('englishDate:', englishDate);

  //   const parts = englishDate.split('/'); // تقسیم رشته به روز، ماه و سال
  //   if (parts.length !== 3) return;

  //   const year = parseInt(parts[0]);
  //   const month = parseInt(parts[1]);

  //   console.log('year:', year);
  //   console.log('month:', month);

  //   if (isNaN(year) || isNaN(month)) {
  //     console.error('⛔ خطا: مقدار سال یا ماه معتبر نیست.');
  //     return;
  //   }

  //   setCurrentJalaliYear(year);

  //   let calculatedYear = '';
  //   let season = '';

  //   // تعیین مقدار سال زراعی و دوره کشت
  //   if (month >= 4 && month <= 7) {
  //     calculatedYear = `${year - 1}-${year}`;
  //     season = 'تابستانه';
  //   } else if (month >= 9 && month <= 12) {
  //     calculatedYear = `${year}-${year + 1}`;
  //     season = 'پاییزه';
  //   } else if (month >= 1 && month <= 3) {
  //     calculatedYear = `${year - 1}-${year}`;
  //     season = 'پاییزه';
  //   }

  //   if (month === 8) {
  //     setIsNovember(true);
  //     calculatedYear = `${year - 1}-${year}`; // مقدار پیش‌فرض در آبان
  //     season = 'تابستانه'; // مقدار پیش‌فرض در آبان
  //   } else {
  //     setIsNovember(false);
  //   }

  //   setAgriculturalYear(calculatedYear);
  //   setFarmingSeason(season);
  // }, []);

  // // تابع تغییر مقدار سال زراعی در آبان‌ماه
  // const handleAgriculturalYearChange = (value: string) => {
  //   setAgriculturalYear(value);

  //   // تنظیم مقدار "دوره کشت" در آبان‌ماه
  //   if (isNovember) {
  //     if (value === `${currentJalaliYear - 1}-${currentJalaliYear}`) {
  //       setFarmingSeason('تابستانه');
  //     } else {
  //       setFarmingSeason('پاییزه');
  //     }
  //   }
  // };

  useEffect(() => {
    fetch('/api/user-position')
      .then((res) => res.json())
      .then((data) => setUserPositions(data.positions))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('/api/irrigation-networks')
      .then((res) => res.json())
      .then((data) => setNetworks(data.networks))
      .catch(console.error);
  }, []);

  useEffect(() => {
    let allowedNetworks: string[] = [];
    let defaultNetwork: string | null = null;

    // ✅ نقش‌های مدیریتی که به همه شبکه‌ها دسترسی دارند
    if (
      userPositions.some((pos) =>
        [
          'Website Admin',
          'Operation Manager',
          'Electricity and Pumping Supervisor',
          'Network Operator',
          'Network Guard',
          'Regional Water Representative',
        ].includes(pos),
      )
    ) {
      allowedNetworks = networks.map((n) => n.Network);
    }

    // ✅ نقش‌های مربوط به ست‌های پمپاژ
    if (
      userPositions.some((pos) =>
        [
          'Supervisor of the First Pumping Set',
          'Operator of the First Pumping Set',
        ].includes(pos),
      )
    ) {
      allowedNetworks.push(...['ازگله', 'جگیران', 'ذهاب شمالی', 'ذهاب جنوبی']);
    }

    if (
      userPositions.some((pos) =>
        [
          'Supervisor of the Second Pumping Set',
          'Operator of the Second Pumping Set',
        ].includes(pos),
      )
    ) {
      allowedNetworks.push(
        ...['حومه قراویز', 'بشیوه', 'قلعه شاهین', 'جگرلوی جنوبی'],
      );
    }

    // ✅ نقش‌های مربوط به نمایندگان بهره‌برداران
    const specialPositionsMap: Record<string, string> = {
      'Ezgele Water Users Representative': 'ازگله',
      'Jegiran Water Users Representative': 'جگیران',
      'Northern Zahab Water Users Representative': 'ذهاب شمالی',
      'Southern Zahab Water Users Representative': 'ذهاب جنوبی',
      'Hoomeh Qaraviz Water Users Representative': 'حومه قراویز',
      'Beshiveh Water Users Representative': 'بشیوه',
      'Ghaleh Shahin Water Users Representative': 'قلعه شاهین',
      'Water Users Representative South Jagarlu': 'جگرلوی جنوبی',
    };

    // ✅ اضافه کردن تمام شبکه‌های مربوط به نقش‌های نمایندگان
    userPositions.forEach((pos) => {
      if (specialPositionsMap[pos]) {
        allowedNetworks.push(specialPositionsMap[pos]);
      }
    });

    // ✅ حذف مقادیر تکراری
    allowedNetworks = [...new Set(allowedNetworks)];

    // ✅ تعیین `defaultNetwork` اگر کاربر فقط یک پوزیشن نمایندگی دارد
    const userSpecialNetworks = userPositions
      .map((pos) => specialPositionsMap[pos])
      .filter(Boolean);

    if (userSpecialNetworks.length === 1) {
      defaultNetwork = userSpecialNetworks[0];
    }

    // ✅ تنظیم شبکه‌های فیلتر شده و پیش‌فرض
    setFilteredNetworks(
      networks
        .filter((n) => allowedNetworks.includes(n.Network))
        .sort((a, b) => a.IdNet - b.IdNet), // مرتب‌سازی بر اساس `IdNet`
    );

    setSelectedNetwork(defaultNetwork);
  }, [userPositions, networks]);
  useEffect(() => {
    if (
      filteredNetworks.length === 1 &&
      selectedNetworkId !== filteredNetworks[0].IdNet
    ) {
      setSelectedNetworkId(filteredNetworks[0].IdNet);
    }
  }, [filteredNetworks, selectedNetworkId]);

  // تغییر `selectedNetwork` و استخراج `IdNet`
  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const networkName = event.target.value;
    setSelectedNetwork(networkName);

    // پیدا کردن `IdNet` متناظر با `Network`
    const network = networks.find((n) => n.Network === networkName);
    if (network) {
      setSelectedNetworkId(network.IdNet);
    } else {
      setSelectedNetworkId(null);
    }
  };

  // واکشی ایستگاه‌های پمپاژ با `FIdDP = 2`
  useEffect(() => {
    if (selectedNetworkId !== null) {
      fetch(`/api/pump-stations?networkId=${selectedNetworkId}&FIdDP=2`)
        .then((res) => res.json())
        .then((data) => setPumpStations(data.pumpStations))
        .catch(console.error);
    }
  }, [selectedNetworkId]);
  useEffect(() => {
    if (selectedNetworkId !== null) {
      fetch(`/api/network-data?networkId=${selectedNetworkId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            console.log('SaleZeraee:', data.SaleZeraee);
            console.log('Dore:', data.Dore);
            setSaleZeraee(data.SaleZeraee || []);
            setDore(data.Dore || []);
          }
        })
        .catch((error) => console.error('خطا در دریافت اطلاعات:', error));
    }
  }, [selectedNetworkId]);

  return (
    <div className="container justify-center flex flex-wrap items-center gap-4 p-2 bg-blue-100 rounded-lg shadow-md">
      {/* شبکه آبیاری */}
      <div className="flex items-center gap-2">
        <label className="font-semibold" htmlFor="network">
          شبکه آبیاری
        </label>
        {filteredNetworks.length === 1 ? (
          <input
            type="text"
            value={filteredNetworks[0].Network}
            readOnly
            className="border p-2 rounded-lg bg-gray-200"
          />
        ) : (
          <select
            id="network"
            className="border p-2 rounded-lg"
            value={selectedNetwork || ''}
            onChange={handleNetworkChange}
          >
            <option value="" disabled hidden>
              انتخاب کنید
            </option>
            {filteredNetworks
              .sort((a, b) => a.IdNet - b.IdNet)
              .map((network) => (
                <option key={network.IdNet} value={network.Network}>
                  {network.Network}
                </option>
              ))}
          </select>
        )}
      </div>

      {/* ایستگاه پمپاژ */}
      <div className="flex items-center gap-2">
        <label className="font-semibold" htmlFor="pumpStation">
          ایستگاه پمپاژ
        </label>
        {pumpStations.length === 1 ? (
          <input
            type="text"
            id="pumpStation"
            className="border p-2 rounded-lg bg-gray-200"
            value={pumpStations[0].NameStation}
            readOnly
          />
        ) : (
          <select
            id="pumpStation"
            className="border p-2 rounded-lg"
            value={selectedPumpStation}
            onChange={(e) => setSelectedPumpStation(e.target.value)}
          >
            <option value="" disabled hidden>
              انتخاب کنید
            </option>
            {pumpStations.map((station) => (
              <option key={station.IdPumpSta} value={station.NameStation}>
                {station.NameStation}
              </option>
            ))}
          </select>
        )}
      </div>
      {/* سال زراعی */}
      <div className="flex items-center gap-2">
        <label className="font-semibold" htmlFor="saleZeraee">
          سال زراعی
        </label>
        {Array.isArray(saleZeraee) && saleZeraee.length === 1 ? (
          <input
            type="text"
            id="saleZeraee"
            className="border p-2 rounded-lg bg-gray-200"
            value={saleZeraee[0]}
            readOnly
          />
        ) : (
          <select
            id="saleZeraee"
            className="border p-2 rounded-lg"
            value={selectedSaleZeraee}
            onChange={(e) => setSelectedSaleZeraee(e.target.value)}
          >
            <option value="" disabled hidden>
              انتخاب کنید
            </option>
            {Array.isArray(saleZeraee) &&
              saleZeraee.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
          </select>
        )}
      </div>

      {/* دوره کشت */}
      <div className="flex items-center gap-2">
        <label className="font-semibold" htmlFor="dore">
          دوره کشت
        </label>
        {Array.isArray(dore) && dore.length === 1 ? (
          <input
            type="text"
            id="dore"
            className="border p-2 rounded-lg bg-gray-200"
            value={dore[0]}
            readOnly
          />
        ) : (
          <select
            id="dore"
            className="border p-2 rounded-lg"
            value={selectedDore}
            onChange={(e) => setSelectedDore(e.target.value)}
          >
            <option value="" disabled hidden>
              انتخاب کنید
            </option>
            {Array.isArray(dore) &&
              dore.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default HeaderRequestPumping;
