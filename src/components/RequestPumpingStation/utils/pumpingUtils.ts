import { KhatRanesh, PumpingData, RecordType } from "../types";

export const calculateTotalWaterVolume = (
  records: RecordType[],
  khatRaneshList: KhatRanesh[],
  pumpData: { [idTarDor: number]: { [idRanesh: number]: PumpingData } },
  selectedPumpCounts: { [key: number]: { [date: string]: number } },
  timeValues: { [key: number]: { [key: number]: { from: string; to: string } } }
) => {
  return khatRaneshList.map((ranesh) => {
    const totalWaterVolume = records.reduce((sum, record) => {
      const pumpInfo = pumpData[record.idtardor]; // تغییر از IdTarDor به idtardor
      const raneshInfo = pumpInfo?.[ranesh.idranesh];

      if (!raneshInfo) return sum;

      const debi =
        ranesh.fidsepu === 2
          ? Number(raneshInfo?.zarfiat ?? 0)
          : (selectedPumpCounts[record.idtardor]?.[ranesh.idranesh] ?? 0) *
            (khatRaneshList.find((khat) => khat.idranesh === ranesh.idranesh)
              ?.debipomp ?? 0);

      const fromValue =
        timeValues[record.idtardor]?.[ranesh.idranesh]?.from || "";
      const toValue = timeValues[record.idtardor]?.[ranesh.idranesh]?.to || "";

      if (fromValue && toValue) {
        const [fromHours, fromMinutes] = fromValue.split(":").map(Number);
        const [toHours, toMinutes] = toValue.split(":").map(Number);

        let durationMinutes =
          toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);
        if (durationMinutes <= 0) durationMinutes += 1440;

        const durationHours = durationMinutes / 60;
        return sum + debi * durationHours * 3.6;
      }
      return sum;
    }, 0);

    return {
      raneshId: ranesh.idranesh,
      totalWaterVolume,
    };
  });
};
