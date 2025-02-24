// src/components/RequestPumpingStation/utils/pumpingUtils.ts
import {KhatRanesh, PumpingData} from '../types';

export const calculateTotalWaterVolume = (
  records: any[],
  khatRaneshList: KhatRanesh[],
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}},
  selectedPumpCounts: {[key: number]: {[date: string]: number}},
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}},
) => {
  return khatRaneshList.map((ranesh) => {
    const totalWaterVolume = records.reduce((sum, record) => {
      const pumpInfo = pumpData[record.IdTarDor];
      const raneshInfo = pumpInfo?.[ranesh.IdRanesh];

      if (!raneshInfo) return sum;

      const debi =
        ranesh.FIdSePu === 2
          ? Number(raneshInfo?.Zarfiat ?? 0)
          : (selectedPumpCounts[record.IdTarDor]?.[ranesh.IdRanesh] ?? 0) *
            (khatRaneshList.find((khat) => khat.IdRanesh === ranesh.IdRanesh)
              ?.DebiPomp ?? 0);

      const fromValue =
        timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.from || '';
      const toValue = timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.to || '';

      if (fromValue && toValue) {
        const [fromHours, fromMinutes] = fromValue.split(':').map(Number);
        const [toHours, toMinutes] = toValue.split(':').map(Number);

        let durationMinutes =
          toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);
        if (durationMinutes <= 0) durationMinutes += 1440;

        const durationHours = durationMinutes / 60;
        return sum + debi * durationHours * 3.6;
      }
      return sum;
    }, 0);

    return {
      raneshId: ranesh.IdRanesh,
      totalWaterVolume,
    };
  });
};
