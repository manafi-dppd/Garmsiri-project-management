import { toPersianDate } from '@/utils/dateUtils';
import {KhatRanesh, RecordType, PumpingData} from '../types';

export interface ValidationError {
  date: string;
  raneshName: string;
  message: string;
}

export const validatePumpingData = (
  records: RecordType[],
  khatRaneshList: KhatRanesh[],
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}},
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}},
): ValidationError[] => {
  const errors: ValidationError[] = [];

  records.forEach((record) => {
    khatRaneshList.forEach((ranesh) => {
      const raneshInfo = pumpData[record.IdTarDor]?.[ranesh.IdRanesh];
      const timeValue = timeValues[record.IdTarDor]?.[ranesh.IdRanesh];

      // بررسی کامل بودن یا خالی بودن تمام فیلدها
      const isAllFieldsEmpty =
        (raneshInfo?.Tedad === null || raneshInfo?.Tedad === undefined) &&
        (raneshInfo?.Zarfiat === null || raneshInfo?.Zarfiat === undefined) &&
        (!timeValue?.from || timeValue.from === '') &&
        (!timeValue?.to || timeValue.to === '');

      const isAllFieldsFilled =
        raneshInfo?.Tedad !== null &&
        raneshInfo?.Tedad !== undefined &&
        raneshInfo?.Zarfiat !== null &&
        raneshInfo?.Zarfiat !== undefined &&
        timeValue?.from &&
        timeValue?.to;

      if (!isAllFieldsEmpty && !isAllFieldsFilled) {
        errors.push({
          date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
          raneshName: ranesh.RaneshName,
          message: 'تمام فیلدهای این رکورد باید یا خالی باشند یا تکمیل شوند.',
        });
      }

      // بررسی تعداد پمپ برای ranesh.FIdSePu === 1
      if (
        ranesh.FIdSePu === 1 &&
        raneshInfo?.Tedad !== null &&
        raneshInfo?.Tedad !== undefined
      ) {
        if (
          raneshInfo.Tedad < 0 ||
          raneshInfo.Tedad > (raneshInfo?.Tedad || 0)
        ) {
          errors.push({
            date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
            raneshName: ranesh.RaneshName,
            message: `تعداد پمپ باید بین ۰ تا ${raneshInfo?.Tedad} باشد.`,
          });
        }
      }

      // بررسی دبی L/S برای ranesh.FIdSePu === 2
      if (
        ranesh.FIdSePu === 2 &&
        raneshInfo?.Zarfiat !== null &&
        raneshInfo?.Zarfiat !== undefined
      ) {
        if (
          raneshInfo.Zarfiat < 0 ||
          raneshInfo.Zarfiat > (raneshInfo?.Zarfiat || 0)
        ) {
          errors.push({
            date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
            raneshName: ranesh.RaneshName,
            message: `دبی L/S باید بین ۰ تا ${raneshInfo?.Zarfiat} باشد.`,
          });
        }
      }

      // بررسی فرمت زمان شروع و پایان
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (timeValue?.from && !timeRegex.test(timeValue.from)) {
        errors.push({
          date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
          raneshName: ranesh.RaneshName,
          message: 'فرمت زمان شروع نامعتبر است (HH:MM).',
        });
      }
      if (timeValue?.to && !timeRegex.test(timeValue.to)) {
        errors.push({
          date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
          raneshName: ranesh.RaneshName,
          message: 'فرمت زمان پایان نامعتبر است (HH:MM).',
        });
      }
    });
  });

  return errors;
};
