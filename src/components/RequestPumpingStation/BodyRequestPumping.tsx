import React, {ReactNode, useEffect, useState} from 'react';
import {toPersianDate} from '@/utils/dateUtils';
import {getCurrentSalMahDahe} from '@/utils/dateUtils';
import PaginationForMah, {convertMahToPersian} from './PaginationForMah';

type ToPersianDate = (date: string | Date | undefined) => string;
type MahItem = {
  Mah: number; // شماره ماه
  Sal: number; // سال زراعی
};

interface KhatRanesh {
  Zarfiat: ReactNode;
  FIdSePu: number;
  FIdDPipe: number;
  Active: boolean;
  IdRanesh: number;
  RaneshName: string;
  DebiPomp?: number;
  TedadPump?: number;
  FesharPump?: number;
  Randeman?: number;
  TavaneNami?: number;
}

interface BodyRequestPumpingProps {
  userName: string;
  userRole: string;
  firstName: string;
  lastName: string;
  networkName: string;
  pumpStationName: string;
  selectedNetworkId: number | null;
  idPumpStation: number;
  saleZeraee: string;
  doreKesht: string;
  idShDo: number;
}

interface RecordType {
  Zarfit: string;
  name: ReactNode;
  IdTarDor: number;
  Trikh: string;
  Dahe: number;
}
interface PageData {
  dahe: number;
  rows: {date: string; day: string}[];
}
interface PredictedVolume {
  [IdTarDor: number]: {
    [IdRanesh: number]: number;
  };
}
interface PumpingData {
  Tedad: number;
  Zarfiat: number | null;
  Shorooe: string | null;
  Paian: string | null;
}

const BodyRequestPumping: React.FC<BodyRequestPumpingProps> = ({
  userName,
  userRole,
  firstName,
  lastName,
  networkName,
  pumpStationName,
  idPumpStation,
  selectedNetworkId,
  saleZeraee,
  doreKesht,
  idShDo,
}) => {
  const [khatRaneshList, setKhatRaneshList] = useState<KhatRanesh[]>([]);
  const [predictedVolumes, setPredictedVolumes] = useState<PredictedVolume>({});
  const [selectedPumpCounts, setSelectedPumpCounts] = useState<{
    [key: number]: {[date: string]: number};
  }>({});
  const [timeValues, setTimeValues] = useState<{
    [key: number]: {[key: number]: {from: string; to: string}};
  }>({});
  const [data, setData] = useState<
    Record<string, {date: string; day: string}[]>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const {
    sal: initialSal,
    mah: initialMah,
    dahe: initialDahe,
  } = getCurrentSalMahDahe();
  const [sal, setSal] = useState(initialSal); // مقدار سال شمسی
  const [mah, setMah] = useState(initialMah); // مقدار ماه شمسی
  const [dahe, setDahe] = useState(initialDahe); // مقدار دهه شمسی
  const [mahList, setMahList] = useState<MahItem[]>([]); // لیست ماه‌ها
  const [selectedMah, setSelectedMah] = useState<number | null>(null); // ماه انتخاب شده
  const [selectedDahe, setSelectedDahe] = useState<number>(1);
  const [finalVolumes, setFinalVolumes] = useState<{[key: number]: number}>({});
  const allDates = [
    {Mah: 1, Dahe: 1},
    {Mah: 1, Dahe: 2},
    {Mah: 1, Dahe: 3},
    {Mah: 2, Dahe: 1},
    // داده‌های مربوط به همه ماه‌ها و دهه‌ها اینجا تعریف شوند
  ];
  const [pumpData, setPumpData] = useState<{
    [idTarDor: number]: {[idRanesh: number]: PumpingData};
  }>({});

  useEffect(() => {
    const fetchMahList = async () => {
      try {
        const res = await fetch(
          `/api/getMahList?networkId=${selectedNetworkId}`,
        );
        const data: MahItem[] = await res.json();

        if (data.length > 0) {
          setMahList(data);
          setSelectedMah(data[0].Mah); // پیش‌فرض انتخاب اولین ماه
          setSal(data[0].Sal); // مقدار سال زراعی
        }
      } catch (error) {
        console.error('Failed to fetch Mah list:', error);
      }
    };

    if (selectedNetworkId) {
      fetchMahList();
    }
  }, [selectedNetworkId]);

  useEffect(() => {
    if (idPumpStation === 0) return;
    const fetchKhatRanesh = async () => {
      try {
        const res = await fetch(
          `/api/getKhatRanesh?idPumpStation=${idPumpStation}`,
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data: KhatRanesh[] = await res.json();
        setKhatRaneshList(data);
      } catch (error) {
        console.error('Error fetching KhatRanesh:', error);
      }
    };

    fetchKhatRanesh();
  }, [idPumpStation]);

  // تابع برای تغییر مقدار انتخابی دراپ‌داون
  const handlePumpCountChange = (
    recordId: number,
    raneshId: number,
    value: number,
  ) => {
    setSelectedPumpCounts((prev) => ({
      ...prev,
      [recordId]: {
        ...prev[recordId],
        [raneshId]: value,
      },
    }));

    setTimeValues((prev) => ({
      ...prev,
      [recordId]: {
        ...prev[recordId],
        [raneshId]: value > 0 ? {from: '08:00', to: ''} : {from: '', to: ''},
      },
    }));
  };

  const handleTimeChange = (
    recordId: number,
    raneshId: number,
    field: 'from' | 'to',
    value: string,
  ) => {
    setTimeValues((prev) => ({
      ...prev,
      [recordId]: {
        ...prev[recordId],
        [raneshId]: {
          ...prev[recordId]?.[raneshId],
          [field]: value,
        },
      },
    }));
  };

  useEffect(() => {
    if (!selectedNetworkId || !selectedMah || idPumpStation === 0) return;

    const fetchRecords = async () => {
      try {
        const res = await fetch(
          `/api/getRecords?networkId=${selectedNetworkId}&sal=${sal}&mah=${selectedMah}&dahe=${dahe}`,
        );
        if (!res.ok) throw new Error('Failed to fetch');

        const data: {
          message: string;
          records: any[];
          predictedVolumes: {
            IdTarDor: number;
            volumes: {FIdRanesh: number; TotalTaghvim: number}[];
          }[];
        } = await res.json();

        if (!Array.isArray(data.records)) {
          setMessage(data.message || 'خطایی رخ داده است');
          return;
        }

        setRecords(data.records);
        setMessage(null);

        // پردازش حجم پیش‌بینی
        const predictedVolumesMap: {[key: number]: {[key: number]: number}} =
          {};

        data.predictedVolumes.forEach(
          ({
            IdTarDor,
            volumes,
          }: {
            IdTarDor: number;
            volumes: {FIdRanesh: number; TotalTaghvim: number}[];
          }) => {
            predictedVolumesMap[IdTarDor] = volumes.reduce(
              (
                acc: {[key: number]: number},
                {
                  FIdRanesh,
                  TotalTaghvim,
                }: {FIdRanesh: number; TotalTaghvim: number},
              ) => {
                acc[FIdRanesh] = (acc[FIdRanesh] || 0) + (TotalTaghvim || 0);
                return acc;
              },
              {},
            );
          },
        );

        setPredictedVolumes(predictedVolumesMap);
      } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
        setMessage('خطا در دریافت داده‌ها');
      }
    };

    fetchRecords();
  }, [selectedNetworkId, sal, selectedMah, dahe, idPumpStation]);
  // console.log('predictedVolumes: ', predictedVolumes);
  useEffect(() => {
    if (!predictedVolumes || !khatRaneshList.length) return;

    const summedVolumes: {[key: number]: number} = {};

    Object.values(predictedVolumes).forEach((tarDor) => {
      Object.entries(tarDor).forEach(([raneshId, volume]) => {
        const parsedRaneshId = Number(raneshId);
        const parsedVolume = parseFloat(volume as string); // تبدیل مقدار به عدد

        if (!isNaN(parsedRaneshId) && !isNaN(parsedVolume)) {
          summedVolumes[parsedRaneshId] =
            (summedVolumes[parsedRaneshId] || 0) + parsedVolume;
        }
      });
    });

    setFinalVolumes(summedVolumes);
  }, [predictedVolumes, khatRaneshList]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newPumpData: typeof pumpData = {};

        for (const idTarDor in predictedVolumes) {
          newPumpData[idTarDor] = {};

          for (const idRanesh in predictedVolumes[idTarDor]) {
            const response = await fetch(
              `/api/request-pumping?idRanesh=${idRanesh}&idTarDor=${idTarDor}`,
            );
            if (!response.ok) throw new Error('Failed to fetch data');

            const data: PumpingData = await response.json();
            newPumpData[idTarDor][idRanesh] = data;
          }
        }

        setPumpData(newPumpData);
      } catch (error) {
        console.error('Error fetching pump data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [predictedVolumes]);
  // console.log('PumpData: ', pumpData);
  const handleZarfiatChange = (
    idTarDor: number,
    idRanesh: number,
    value: string,
  ) => {
    setPumpData((prevData) => {
      const newData = {...prevData};

      if (!newData[idTarDor]) {
        newData[idTarDor] = {};
      }

      if (!newData[idTarDor][idRanesh]) {
        newData[idTarDor][idRanesh] = {
          Zarfiat: 0,
          Tedad: 0, // مقدار پیش‌فرض برای Tedad
          Shorooe: '', // مقدار پیش‌فرض برای Shorooe (باید مطابق با نوع `time(7)` باشد)
          Paian: '', // مقدار پیش‌فرض برای Paian
        };
      }

      newData[idTarDor][idRanesh].Zarfiat = Number(value) || 0; // مقداردهی عددی

      return newData;
    });
  };

  return (
    <div className="overflow-x-auto">
      {selectedNetworkId === null ? (
        <h2 className="text-lg font-semibold mb-4 p-4 border rounded-lg shadow">
          شبکه مورد نظر خود را انتخاب کنید
        </h2>
      ) : idPumpStation === 0 ? (
        <h2 className="text-lg font-semibold mb-4 p-4 border rounded-lg shadow">
          ایستگاه پمپاژ مورد نظر خود را انتخاب کنید
        </h2>
      ) : (
        <>
          <table className="table-auto border-collapse w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                  خط رانش
                </th>
                {khatRaneshList
                  .filter(
                    (ranesh) =>
                      ranesh.Active !== false && ranesh.FIdDPipe === 1,
                  )
                  .map((ranesh) => (
                    <th
                      key={ranesh.IdRanesh}
                      className="border border-gray-300 px-4 py-2"
                      colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                    >
                      {ranesh.RaneshName}
                    </th>
                  ))}
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                  دبی پمپ
                </th>
                {khatRaneshList
                  .filter(
                    (ranesh) =>
                      ranesh.Active !== false && ranesh.FIdDPipe === 1,
                  )
                  .map((ranesh) => (
                    <td
                      key={ranesh.IdRanesh}
                      className="border border-gray-300 px-4 py-2"
                      colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                    >
                      {ranesh.FIdSePu === 1 ? ranesh.DebiPomp : ranesh.Zarfiat}
                    </td>
                  ))}
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  روز
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  تاریخ
                </th>
                {khatRaneshList
                  .filter(
                    (ranesh) =>
                      ranesh.Active !== false && ranesh.FIdDPipe === 1,
                  )
                  .map((ranesh) => (
                    <React.Fragment key={ranesh.IdRanesh}>
                      {ranesh.FIdSePu === 1 && (
                        <th
                          className="border border-gray-300 px-4 py-2"
                          rowSpan={2}
                        >
                          تعداد پمپ
                        </th>
                      )}
                      <th className="border border-gray-300 px-4 py-2">
                        دبی درخواستی
                      </th>
                      <th
                        className="border border-gray-300 px-4 py-2"
                        colSpan={3}
                      >
                        زمان پمپاژ (ساعت)
                      </th>
                    </React.Fragment>
                  ))}
              </tr>
              <tr>
                {khatRaneshList
                  .filter(
                    (ranesh) =>
                      ranesh.Active !== false && ranesh.FIdDPipe === 1,
                  )
                  .map((ranesh) => (
                    <React.Fragment key={ranesh.IdRanesh}>
                      <th className="border border-gray-300 px-4 py-2">L/S</th>
                      <th className="border border-gray-300 px-4 py-2">از</th>
                      <th className="border border-gray-300 px-4 py-2">تا</th>
                      <th className="border border-gray-300 px-4 py-2">مدت</th>
                    </React.Fragment>
                  ))}
              </tr>
            </thead>
            {message ? (
              <caption>{message}</caption>
            ) : records && Array.isArray(records) && records.length > 0 ? ( // ✅ بررسی مقدار records قبل از .length
              <tbody>
                {records.map((record) => {
                  const pumpInfo = pumpData[record.IdTarDor];

                  return (
                    <tr key={record.IdTarDor}>
                      <td>{toPersianDate(record.Trikh, 'dddd')}</td>
                      <td>{toPersianDate(record.Trikh, 'YYYY/MM/DD')}</td>
                      {khatRaneshList
                        .filter(
                          (ranesh) =>
                            ranesh.Active !== false && ranesh.FIdDPipe === 1,
                        )
                        .map((ranesh) => {
                          const raneshInfo = pumpInfo?.[ranesh.IdRanesh];

                          return (
                            <React.Fragment key={ranesh.IdRanesh}>
                              {ranesh.FIdSePu === 1 && (
                                // فیلد مربوط به ستون "تعداد پمپ" که مقدار Tedad بایستی در از بین گزینه های دراپ داون آن انتخاب شود
                                <td className="border border-gray-300 px-4 py-2">
                                  <select
                                    value={
                                      selectedPumpCounts[record.IdTarDor]?.[
                                        ranesh.IdRanesh
                                      ] ||
                                      raneshInfo?.Tedad ||
                                      0
                                    }
                                    onChange={(e) =>
                                      handlePumpCountChange(
                                        record.IdTarDor,
                                        ranesh.IdRanesh,
                                        Number(e.target.value),
                                      )
                                    }
                                    className="border rounded px-2 py-1"
                                  >
                                    {Array.from(
                                      {length: (ranesh.TedadPump || 0) + 1},
                                      (_, i) => (
                                        <option key={i} value={i}>
                                          {i}
                                        </option>
                                      ),
                                    )}
                                  </select>
                                </td>
                              )}
                              {/* فیلد "ظرفیت" که مقدار Zarfit بایستی نمایش داده شود */}
                              <td className="border border-gray-300 px-4 py-2">
                                {ranesh.FIdSePu === 2 ? (
                                  <input
                                    type="number"
                                    value={
                                      raneshInfo?.Zarfiat != null
                                        ? raneshInfo.Zarfiat.toString()
                                        : ''
                                    }
                                    onChange={(e) => {
                                      const maxZarfiat = Number(
                                        khatRaneshList.find(
                                          (khat) =>
                                            khat.IdRanesh === ranesh.IdRanesh,
                                        )?.Zarfiat ?? Infinity,
                                      );

                                      const newValue = e.target.value; // مقدار را به عنوان string دریافت می‌کنیم

                                      if (
                                        !isNaN(Number(newValue)) &&
                                        Number(newValue) <= maxZarfiat
                                      ) {
                                        handleZarfiatChange(
                                          record.IdTarDor,
                                          ranesh.IdRanesh,
                                          newValue,
                                        );
                                      }
                                    }}
                                    min="0"
                                    max={String(
                                      khatRaneshList.find(
                                        (khat) =>
                                          khat.IdRanesh === ranesh.IdRanesh,
                                      )?.Zarfiat ?? '',
                                    )}
                                    placeholder={String(
                                      khatRaneshList.find(
                                        (khat) =>
                                          khat.IdRanesh === ranesh.IdRanesh,
                                      )?.Zarfiat ?? '',
                                    )}
                                    className="border border-blue-500 bg-white/90 rounded-lg h-10 px-3 py-1.5 
      text-gray-700 shadow-sm hover:shadow-md 
      focus:ring-2 focus:ring-blue-400 focus:outline-none
      transition-all duration-300 hover:bg-blue-50 cursor-pointer w-full text-center"
                                  />
                                ) : (
                                  (() => {
                                    // تعداد پمپ انتخاب‌شده
                                    const selectedTedad =
                                      selectedPumpCounts[record.IdTarDor]?.[
                                        ranesh.IdRanesh
                                      ] ??
                                      raneshInfo?.Tedad ??
                                      0;

                                    // دبی پمپ مربوط به این IdRanesh
                                    const debiPomp =
                                      khatRaneshList.find(
                                        (khat) =>
                                          khat.IdRanesh === ranesh.IdRanesh,
                                      )?.DebiPomp ?? 0;

                                    // مقدار نهایی دبی درخواستی
                                    return (selectedTedad * debiPomp).toFixed(
                                      1,
                                    );
                                  })()
                                )}
                              </td>

                              {/* فیلد "از" که مقدار Shorooe در اینجا جاگذاری شود */}
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="time"
                                  step="300"
                                  value={
                                    timeValues[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ]?.from ??
                                    (raneshInfo?.Shorooe
                                      ? new Date(raneshInfo.Shorooe)
                                          .toISOString()
                                          .slice(11, 16)
                                      : '')
                                  }
                                  onChange={(e) =>
                                    handleTimeChange(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'from',
                                      e.target.value,
                                    )
                                  }
                                  disabled={
                                    selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] === 0
                                  }
                                  className="border border-blue-500 bg-white/90 rounded-lg h-10 px-3 py-1.5 
    text-gray-700 shadow-sm hover:shadow-md 
    focus:ring-2 focus:ring-blue-400 focus:outline-none
    transition-all duration-300 hover:bg-blue-50 cursor-pointer"
                                />
                              </td>

                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="time"
                                  step="300"
                                  value={
                                    timeValues[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ]?.to ??
                                    (raneshInfo?.Paian
                                      ? new Date(raneshInfo.Paian)
                                          .toISOString()
                                          .slice(11, 16)
                                      : '')
                                  }
                                  onChange={(e) =>
                                    handleTimeChange(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'to',
                                      e.target.value,
                                    )
                                  }
                                  disabled={
                                    selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] === 0
                                  }
                                  className="border border-blue-500 bg-white/90 rounded-lg h-10 px-3 py-1.5 
    text-gray-700 shadow-sm hover:shadow-md 
    focus:ring-2 focus:ring-blue-400 focus:outline-none
    transition-all duration-300 hover:bg-blue-50 cursor-pointer"
                                />
                              </td>

                              <td className="border border-gray-300 px-4 py-2 text-center">
                                {(() => {
                                  const fromValue =
                                    timeValues[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ]?.from ??
                                    (raneshInfo?.Shorooe
                                      ? new Date(raneshInfo.Shorooe)
                                          .toISOString()
                                          .slice(11, 16)
                                      : '');

                                  const toValue =
                                    timeValues[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ]?.to ??
                                    (raneshInfo?.Paian
                                      ? new Date(raneshInfo.Paian)
                                          .toISOString()
                                          .slice(11, 16)
                                      : '');

                                  if (fromValue && toValue) {
                                    const [fromHours, fromMinutes] = fromValue
                                      .split(':')
                                      .map(Number);
                                    const [toHours, toMinutes] = toValue
                                      .split(':')
                                      .map(Number);

                                    const fromTotalMinutes =
                                      fromHours * 60 + fromMinutes;
                                    const toTotalMinutes =
                                      toHours * 60 + toMinutes;
                                    const durationMinutes =
                                      toTotalMinutes - fromTotalMinutes;

                                    if (durationMinutes >= 0) {
                                      const hours = Math.floor(
                                        durationMinutes / 60,
                                      );
                                      const minutes = durationMinutes % 60;
                                      return `${hours.toString().padStart(2, '0')}:${minutes
                                        .toString()
                                        .padStart(2, '0')}`;
                                    }
                                  }
                                  return '-';
                                })()}
                              </td>
                            </React.Fragment>
                          );
                        })}
                    </tr>
                  );
                })}

                <tr className="bg-yellow-100 font-semibold">
                  <td
                    className="border border-gray-300 px-4 py-2 font-bold"
                    colSpan={2}
                  >
                    حجم پیش بینی
                  </td>
                  {khatRaneshList
                    .filter(
                      (ranesh) =>
                        ranesh.Active !== false && ranesh.FIdDPipe === 1,
                    )
                    .map((ranesh) => (
                      <td
                        key={ranesh.IdRanesh}
                        className="border border-gray-300 px-4 py-2 text-center font-semibold"
                        colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                      >
                        {finalVolumes[ranesh.IdRanesh] !== undefined
                          ? finalVolumes[ranesh.IdRanesh]
                              .toFixed(1)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : '-'}
                      </td>
                    ))}
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={100} className="text-center">
                    داده‌ای برای نمایش وجود ندارد
                  </td>
                </tr>
              </tbody>
            )}
          </table>

          {/* نمایش محتوای ماه انتخاب‌شده */}
          {selectedMah !== null && sal !== null && (
            <div>
              {/* نمایش دهه‌بندی ماه */}
              <PaginationForMah
                selectedMah={selectedMah}
                sal={sal}
                selectedDahe={dahe}
                setSelectedDahe={setDahe}
                setDahe={setDahe} // ← ارسال تابع setDahe برای تغییر مقدار dahe
                allDates={allDates}
              />
            </div>
          )}

          {/* زبانه‌های ماه‌ها - نمایش فقط اگر شبکه و ایستگاه انتخاب شده باشند */}
          {selectedNetworkId !== null && idPumpStation !== 0 && (
            <div className="flex border-b border-gray-300">
              {[...mahList]
                .sort((a, b) => a.Sal - b.Sal || a.Mah - b.Mah) // مرتب‌سازی: اول بر اساس سال، بعد ماه
                .map((item) => (
                  <div
                    key={`${item.Mah}-${item.Sal}`}
                    className={`px-6 py-2 text-lg font-semibold cursor-pointer transition-all duration-300 border
                    border-gray-400 rounded-t-md
                    ${
                      selectedMah === item.Mah
                        ? 'bg-white text-blue-600 shadow-lg scale-105' // برجسته شدن زبانه فعال
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // تغییر رنگ هنگام هاور
                    }`}
                    onClick={() => {
                      setSelectedMah(item.Mah);
                      setSal(item.Sal);
                      setSelectedDahe(1); // مقدار دهه به حالت اولیه (دهه ۱) برگردد
                    }}
                  >
                    {convertMahToPersian(item.Mah)} {item.Sal}
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BodyRequestPumping;
function setNoRecordsMessage(message: any) {
  throw new Error('Function not implemented.');
}
