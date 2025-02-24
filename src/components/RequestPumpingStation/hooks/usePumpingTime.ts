// src/components/RequestPumpingStation/hooks/usePumpingTime.ts
import {useState} from 'react';

export const usePumpingTime = () => {
  const [timeValues, setTimeValues] = useState<{
    [key: number]: {
      [key: number]: {
        from: string;
        to: string;
      };
    };
  }>({});

  const [selectedPumpCounts, setSelectedPumpCounts] = useState<{
    [key: number]: {[date: string]: number};
  }>({});

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
                from: prev[recordId]?.[raneshId]?.from || '08:00',
                to: prev[recordId]?.[raneshId]?.to ?? '',
              }
            : {from: '', to: ''},
      },
    }));
  };

  return {
    timeValues,
    selectedPumpCounts,
    handleTimeChange,
    updateTime,
    handlePumpCountChange,
  };
};
