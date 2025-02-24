// src/components/RequestPumpingStation/hooks/usePumpingData.ts
import {useState, useEffect} from 'react';
import {
  KhatRanesh,
  MahItem,
  PredictedVolume,
  PumpingData,
  RecordType,
} from '../types';
import {getCurrentSalMahDahe} from '@/utils/dateUtils';
interface PageData {
  dahe: number;
  rows: {date: string; day: string}[];
}
export const usePumpingData = (
  selectedNetworkId: number | null,
  idPumpStation: number,
  selectedMah: number,
  sal: number,
  selectedDahe: number,
  dahe: number,
) => {
  const {
    sal: currentSal,
    mah: currentMah,
    dahe: currentDahe,
  } = getCurrentSalMahDahe();
  const [khatRaneshList, setKhatRaneshList] = useState<KhatRanesh[]>([]);
  const [predictedVolumes, setPredictedVolumes] = useState<PredictedVolume>({});
  const [pumpData, setPumpData] = useState<{
    [idTarDor: number]: {[idRanesh: number]: PumpingData};
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [finalVolumes, setFinalVolumes] = useState<{[key: number]: number}>({});
  const [mahList, setMahList] = useState<MahItem[]>([]);

  useEffect(() => {
    const fetchMahList = async () => {
      try {
        const res = await fetch(
          `/api/getMahList?networkId=${selectedNetworkId}`,
        );
        const data: MahItem[] = await res.json();

        if (data.length > 0) {
          setMahList(data);
        }
      } catch (error) {
        console.error('Failed to fetch Mah list:', error);
      }
    };

    if (selectedNetworkId) {
      fetchMahList(); // بدون آرگومان
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
  }, [selectedNetworkId, sal, selectedMah, selectedDahe, idPumpStation]);
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

  return {
    khatRaneshList,
    predictedVolumes,
    pumpData,
    loading,
    mahList,
    selectedMah,
    sal,
    dahe,
    records, // اضافه کردن records به خروجی
    message, // اضافه کردن message به خروجی
    finalVolumes, // اضافه کردن finalVolumes به خروجی
  };
};

function setFinalVolumes(summedVolumes: {[key: number]: number}) {
  throw new Error('Function not implemented.');
}
