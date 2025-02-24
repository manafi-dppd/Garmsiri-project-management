// src/components/RequestPumpingStation/components/PumpingTable/usePumpingLogic.ts
import {useState, useEffect} from 'react';
import {KhatRanesh, PredictedVolume, PumpingData} from '../../types';

export const usePumpingLogic = () => {
  const [khatRaneshList, setKhatRaneshList] = useState<KhatRanesh[]>([]);
  const [predictedVolumes, setPredictedVolumes] = useState<PredictedVolume>({});
  const [selectedPumpCounts, setSelectedPumpCounts] = useState<{
    [key: number]: {[date: string]: number};
  }>({});
  const [timeValues, setTimeValues] = useState<{
    [key: number]: {[key: number]: {from: string; to: string}};
  }>({});

  // توابع و منطق مربوط به پمپاژ
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
        [raneshId]:
          value > 0
            ? {
                from: prev[recordId]?.[raneshId]?.from || '08:00', // مقدار قبلی را نگه‌می‌دارد مگر اینکه خالی باشد
                to: prev[recordId]?.[raneshId]?.to ?? '', // مقدار قبلی را نگه‌می‌دارد
              }
            : {from: '', to: ''}, // مقدار `from` و `to` را در صورت مقدار `0` شدن پاک می‌کند
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

  const updateTime = (
    idTarDor: number,
    idRanesh: number,
    field: 'from' | 'to',
    type: 'hour' | 'minute',
    increment: number,
  ) => {
    setTimeValues((prev) => {
      const currentTime = prev[idTarDor]?.[idRanesh]?.[field] || '08:00';
      const [hours, minutes] = currentTime.split(':').map(Number);

      let newHours = hours;
      let newMinutes = minutes;

      if (type === 'hour') {
        newHours = Math.min(Math.max(hours + increment, 0), 23);
      } else {
        newMinutes = Math.round((minutes + increment) / 5) * 5;
        if (newMinutes >= 60) newMinutes = 55;
        if (newMinutes < 0) newMinutes = 0;
      }

      const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes
        .toString()
        .padStart(2, '0')}`;

      return {
        ...prev,
        [idTarDor]: {
          ...prev[idTarDor],
          [idRanesh]: {
            ...prev[idTarDor]?.[idRanesh],
            [field]: formattedTime,
          },
        },
      };
    });
  };

  return {
    khatRaneshList,
    predictedVolumes,
    selectedPumpCounts,
    timeValues,
    handlePumpCountChange,
    handleTimeChange,
    updateTime,
  };
};
