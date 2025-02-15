import React, {ReactNode, useEffect, useState} from 'react';
import {toPersianDate} from '@/utils/dateUtils';
import axios from 'axios';

type ToPersianDate = (date: string | Date | undefined) => string;

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
  saleZeraee,
  doreKesht,
  idShDo,
}) => {
  console.log('selectedNetworkId: ', selectedNetworkId);
  const [khatRaneshList, setKhatRaneshList] = useState<KhatRanesh[]>([]);
  const [data, setData] = useState<
    Record<string, {date: string; day: string}[]>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [message, setMessage] = useState<string | null>(null);

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
  console.log('selectedNetworkId: ', selectedNetworkId);
  useEffect(() => {
    if (!selectedNetworkId) return;

    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `/api/getRecords?networkId=${selectedNetworkId}`,
        );

        if (response.data.error) {
          setMessage(response.data.error); // ذخیره پیام خطا در متغیر message
          setRecords([]); // لیست رکوردها را خالی کنید
        } else {
          setRecords(response.data);
          setMessage(null); // خطا را پاک کنید
        }
      } catch (error) {
        console.error('Error fetching records:', error);
        setMessage('خطایی در دریافت اطلاعات رخ داده است.'); // نمایش پیام خطا
      }
    };

    fetchRecords();
  }, [selectedNetworkId]);

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
          ) : Array.isArray(records) && records.length > 0 ? (
            <tbody>
              {records.map((record: RecordType, index: number) => (
                <tr key={record.IdTarDor}>
                  <td>{toPersianDate(record.Trikh, 'dddd')}</td>{' '}
                  {/* نمایش روز هفته */}
                  <td>{toPersianDate(record.Trikh, 'YYYY/MM/DD')}</td>{' '}
                  {/* نمایش تاریخ شمسی */}
                </tr>
              ))}
            </tbody>
          ) : (
            <p>داده‌ای برای نمایش وجود ندارد</p>
          )}
        </table>
      )}
    </div>
  );
};

export default BodyRequestPumping;
function setNoRecordsMessage(message: any) {
  throw new Error('Function not implemented.');
}
