import {toPersianDate} from '@/utils/dateUtils';
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
  selectedPumpCounts: {[key: number]: {[date: string]: number}}, // اضافه کردن selectedPumpCounts
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}},
): ValidationError[] => {
  const errors: ValidationError[] = [];

  records.forEach((record) => {
    khatRaneshList.forEach((ranesh) => {
      const raneshInfo = pumpData[record.IdTarDor]?.[ranesh.IdRanesh];
      const timeValue = timeValues[record.IdTarDor]?.[ranesh.IdRanesh];
      const selectedPumpCount =
        selectedPumpCounts[record.IdTarDor]?.[ranesh.IdRanesh] ?? 0; // تعداد پمپ انتخاب شده

      // بررسی کامل بودن یا خالی بودن تمام فیلدها
      const isAllFieldsEmpty =
        ranesh.FIdSePu === 1
          ? (selectedPumpCount === null ||
              selectedPumpCount === undefined ||
              selectedPumpCount === 0) &&
            (!timeValue?.from || timeValue.from === '') &&
            (!timeValue?.to || timeValue.to === '')
          : (raneshInfo?.Zarfiat === null ||
              raneshInfo?.Zarfiat === undefined ||
              raneshInfo?.Zarfiat === 0) &&
            (!timeValue?.from || timeValue.from === '') &&
            (!timeValue?.to || timeValue.to === '');

      const isAllFieldsFilled =
        ranesh.FIdSePu === 1
          ? selectedPumpCount !== null &&
            selectedPumpCount !== undefined &&
            timeValue?.from &&
            timeValue?.to
          : raneshInfo?.Zarfiat !== null &&
            raneshInfo?.Zarfiat !== undefined &&
            timeValue?.from &&
            timeValue?.to;

      if (!isAllFieldsEmpty && !isAllFieldsFilled) {
        errors.push({
          date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
          raneshName: ranesh.RaneshName,
          message: `در تاریخ ${toPersianDate(record.Trikh, 'YYYY/MM/DD')} اطلاعات خط رانش ${ranesh.RaneshName} تکمیل نشده است`,
        });
      }

      // بررسی تعداد پمپ برای ranesh.FIdSePu === 1
      if (
        ranesh.FIdSePu === 1 &&
        selectedPumpCount !== null &&
        selectedPumpCount !== undefined
      ) {
        const maxTedad = ranesh.TedadPump || 0; // حداکثر تعداد پمپ مجاز
        if (selectedPumpCount < 0 || selectedPumpCount > maxTedad) {
          errors.push({
            date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
            raneshName: ranesh.RaneshName,
            message: `تعداد پمپ باید بین ۰ تا ${maxTedad} باشد.`,
          });
        }
      }

      // بررسی دبی L/S برای ranesh.FIdSePu === 2
      if (
        ranesh.FIdSePu === 2 &&
        raneshInfo?.Zarfiat !== null &&
        raneshInfo?.Zarfiat !== undefined
      ) {
        const maxZarfiat = ranesh.Zarfiat || 0; // حداکثر دبی مجاز
        if (raneshInfo.Zarfiat < 0 || raneshInfo.Zarfiat > maxZarfiat) {
          errors.push({
            date: toPersianDate(record.Trikh, 'YYYY/MM/DD'),
            raneshName: ranesh.RaneshName,
            message: `دبی L/S باید بین ۰ تا ${maxZarfiat} باشد.`,
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
