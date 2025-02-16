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
  name: ReactNode;
  IdTarDor: number;
  Trikh: string;
  Dahe: number;
}
interface PageData {
  dahe: number;
  rows: {date: string; day: string}[];
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
  // networkId,
  saleZeraee,
  doreKesht,
  idShDo,
}) => {
  const [khatRaneshList, setKhatRaneshList] = useState<KhatRanesh[]>([]);
  const [data, setData] = useState<
    Record<string, {date: string; day: string}[]>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
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
  const allDates = [
    {Mah: 1, Dahe: 1},
    {Mah: 1, Dahe: 2},
    {Mah: 1, Dahe: 3},
    {Mah: 2, Dahe: 1},
    // داده‌های مربوط به همه ماه‌ها و دهه‌ها اینجا تعریف شوند
  ];

  useEffect(() => {
    if (idPumpStation === 0) return;
    const fetchKhatRanesh = async () => {
      try {
        const res = await fetch(
          `/api/getKhatRanesh?idPumpStation=${idPumpStation}`,
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data: KhatRanesh[] = await res.json();
        console.log('Fetched data:', data);
        setKhatRaneshList(data);
      } catch (error) {
        console.error('Error fetching KhatRanesh:', error);
      }
    };

    fetchKhatRanesh();
  }, [idPumpStation]);
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
    if (selectedNetworkId === null || selectedMah === null) return;

    const fetchRecords = async () => {
      try {
        const res = await fetch(
          `/api/getRecords?networkId=${selectedNetworkId}&sal=${sal}&mah=${selectedMah}&dahe=${dahe}`,
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setRecords(data);
          setMessage(null);
        } else {
          setMessage(data.message || 'خطایی رخ داده است');
        }
      } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
        setMessage('خطا در دریافت داده‌ها');
      }
    };

    fetchRecords();
  }, [selectedNetworkId, sal, selectedMah, dahe]);

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
                    (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
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
                    (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
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
                    (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
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
                    (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
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
              <p>{message}</p>
            ) : records && Array.isArray(records) && records.length > 0 ? ( // ✅ بررسی مقدار records قبل از .length
              <tbody>
                {records.map((record) => (
                  <tr key={record.IdTarDor}>
                    <td>{toPersianDate(record.Trikh, 'dddd')}</td>{' '}
                    {/* روز هفته */}
                    <td>{toPersianDate(record.Trikh, 'YYYY/MM/DD')}</td>{' '}
                    {/* تاریخ شمسی */}
                  </tr>
                ))}
              </tbody>
            ) : (
              <p>داده‌ای برای نمایش وجود ندارد</p>
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
