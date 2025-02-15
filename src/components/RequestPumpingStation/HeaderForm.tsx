'use client';

import {useState, useEffect} from 'react';

interface HeaderRequestPumpingProps {
  setUserName: (name: string) => void;
  setUserRole: (role: string) => void;
  setFirstName: (role: string) => void;
  setLastName: (role: string) => void;
  setNetworkName: (name: string) => void;
  setPumpStationName: (name: string) => void;
  setSelectedNetworkId: (id: number | null) => void;
  setIdPumpStation: (Id: number) => void;
  setSaleZeraee: (year: string) => void;
  setDoreKesht: (season: string) => void;
  setIdShDo: (Id: number) => void;
}
const HeaderRequestPumping: React.FC<HeaderRequestPumpingProps> = ({
  setUserName,
  setUserRole,
  setFirstName,
  setLastName,
  setNetworkName,
  setPumpStationName,
  setIdPumpStation,
  setSelectedNetworkId,
  setSaleZeraee,
  setDoreKesht,
  setIdShDo,
}) => {
  const [userPositions, setUserPositions] = useState<string[]>([]);
  const [networks, setNetworks] = useState<{IdNet: number; Network: string}[]>(
    [],
  );
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [localSaleZeraee, setLocalSaleZeraee] = useState<string | null>(null);
  const [localDore, setLocalDore] = useState<string | null>(null);
  const [selectedSaleZeraee, setSelectedSaleZeraee] = useState<string>('');
  const [selectedDore, setSelectedDore] = useState<string>('');
  const [filteredNetworks, setFilteredNetworks] = useState<
    {IdNet: number; Network: string}[]
  >([]);
  const [pumpStations, setPumpStations] = useState<
    {IdPumpSta: number; NameStation: string}[]
  >([]);
  const [selectedNetworkId, setLocalSelectedNetworkId] = useState<number | null>(null);
  const [selectedPumpStation, setSelectedPumpStation] = useState<string>('');

  useEffect(() => {
    fetch('/api/user-position')
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.username);
        setUserPositions(data.positions);
        setUserRole(data.positions);
        setFirstName(data.firstname);
        setLastName(data.lastname);
      })
      .catch(console.error);
  }, [setFirstName, setLastName, setUserName, setUserRole]);

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
      setSelectedNetwork(filteredNetworks[0].Network);
      setNetworkName(filteredNetworks[0].Network);
      setLocalSelectedNetworkId(filteredNetworks[0].IdNet);
      setSelectedNetworkId(filteredNetworks[0].IdNet);
    }
  }, [filteredNetworks, selectedNetworkId, setNetworkName]);

  // تغییر `selectedNetwork` و استخراج `IdNet`
  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const networkName = event.target.value;
    setSelectedNetwork(networkName);
    setNetworkName(networkName);

    const network = networks.find((n) => n.Network === networkName);
    if (network) {
      setLocalSelectedNetworkId(network.IdNet);
      setSelectedNetworkId(network.IdNet);
    } else {
      setLocalSelectedNetworkId(null);
      setSelectedNetworkId(null);
    }
  };

  const handlePumpStationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const stationName = event.target.value;
    setSelectedPumpStation(stationName);
    setPumpStationName(stationName);

    // پیدا کردن IdPumpSta مربوط به ایستگاه انتخاب‌شده
    const selectedStation = pumpStations.find(
      (station) => station.NameStation === stationName,
    );
    if (selectedStation) {
      setIdPumpStation(selectedStation.IdPumpSta);
    }
  };

  // واکشی ایستگاه‌های پمپاژ با `FIdDP = 2`
  useEffect(() => {
    if (selectedNetworkId !== null) {
      fetch(`/api/pump-stations?networkId=${selectedNetworkId}&FIdDP=2`)
        .then((res) => res.json())
        .then((data) => {
          setPumpStations(data.pumpStations);

          if (data.pumpStations.length === 1) {
            setSelectedPumpStation(data.pumpStations[0].NameStation);
            setPumpStationName(data.pumpStations[0].NameStation);
            setIdPumpStation(data.pumpStations[0].IdPumpSta);
          } else {
            // اگر ایستگاه پمپاژ چند گزینه‌ای است، مقدار آن را تهی کنیم
            setSelectedPumpStation('');
            setPumpStationName('');
            setIdPumpStation(0);
          }
        })
        .catch(console.error);
    }
  }, [selectedNetworkId, setIdPumpStation, setPumpStationName]);

  useEffect(() => {
    if (selectedNetworkId !== null) {
      fetch(`/api/network-data?networkId=${selectedNetworkId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            setLocalSaleZeraee(data.SaleZeraee || '');
            setLocalDore(data.Dore || '');
            setSaleZeraee(data.SaleZeraee || ''); // ارسال به کامپوننت والد
            setDoreKesht(data.Dore || ''); // ارسال به کامپوننت والد
            setIdShDo(data.IdShDo || ''); // ارسال به کامپوننت والد
          }
        })
        .catch((error) => console.error('خطا در دریافت اطلاعات:', error));
    }
  }, [selectedNetworkId, setDoreKesht, setIdShDo, setSaleZeraee]);

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
          ایستگاه
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
            onChange={handlePumpStationChange}
            disabled={!selectedNetwork}
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
        {Array.isArray(localSaleZeraee) && localSaleZeraee.length === 1 ? (
          <input
            type="text"
            id="saleZeraee"
            className="border p-2 rounded-lg bg-gray-200"
            value={localSaleZeraee[0]}
            readOnly
          />
        ) : (
          <select
            id="saleZeraee"
            className="border p-2 rounded-lg"
            value={selectedSaleZeraee}
            onChange={(e) => setSelectedSaleZeraee(e.target.value)}
            disabled={!selectedNetwork}
          >
            <option value="" disabled hidden>
              انتخاب کنید
            </option>
            {Array.isArray(localSaleZeraee) &&
              localSaleZeraee.map((year, index) => (
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
        {Array.isArray(localDore) && localDore.length === 1 ? (
          <input
            type="text"
            id="dore"
            className="border p-2 rounded-lg bg-gray-200"
            value={localDore[0]}
            readOnly
          />
        ) : (
          <select
            id="dore"
            className="border p-2 rounded-lg"
            value={selectedDore}
            onChange={(e) => setSelectedDore(e.target.value)}
            disabled={!selectedNetwork}
          >
            <option value="" disabled hidden>
              انتخاب کنید
            </option>
            {Array.isArray(localDore) &&
              localDore.map((d, index) => (
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
