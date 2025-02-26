import React from 'react';
import {toPersianDate, getCurrentSalMahDahe} from '@/utils/dateUtils';
import {KhatRanesh, RecordType, PumpingData} from '../../types';
import {usePumpingLogic} from './usePumpingLogic';

interface PumpingTableProps {
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}};
  setPumpData: (data: {
    [idTarDor: number]: {[idRanesh: number]: PumpingData};
  }) => void; // اضافه کردن setPumpData به props
  selectedPumpCounts: {[key: number]: {[date: string]: number}};
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}};
  handlePumpCountChange: (
    recordId: number,
    raneshId: number,
    value: number,
  ) => void;
  handleTimeChange: (
    recordId: number,
    raneshId: number,
    field: 'from' | 'to',
    value: string,
  ) => void;
  updateTime: (
    idTarDor: number,
    idRanesh: number,
    field: 'from' | 'to',
    type: 'hour' | 'minute',
    increment: number,
  ) => void;
  message: string | null;
  finalVolumes: {[key: number]: number};
  isFormDisabled: boolean;
}

const PumpingTable: React.FC<PumpingTableProps> = ({
  khatRaneshList,
  records,
  pumpData,
  setPumpData,
  selectedPumpCounts,
  timeValues,
  handlePumpCountChange,
  handleTimeChange,
  updateTime,
  message,
  finalVolumes,
  isFormDisabled,
}) => {
  // console.log('pumpData: ', pumpData);
  const isFormFilled = records.some((record) =>
    khatRaneshList.some(
      (ranesh) =>
        pumpData[record.IdTarDor]?.[ranesh.IdRanesh]?.Zarfiat !== null ||
        pumpData[record.IdTarDor]?.[ranesh.IdRanesh]?.Tedad !== null,
    ),
  );

  const handleZarfiatChange = (
    IdTarDor: number,
    IdRanesh: number,
    newValue: string,
  ) => {
    const numericValue = Number(newValue);

    if (!isNaN(numericValue)) {
      setPumpData({
        ...pumpData, // مقدار قبلی را نگه می‌دارد
        [IdTarDor]: {
          ...pumpData[IdTarDor],
          [IdRanesh]: {
            ...pumpData[IdTarDor]?.[IdRanesh],
            Zarfiat: numericValue,
          },
        },
      });
    }
  };

  return (
    <div
      className="max-h-[800px] overflow-auto border border-gray-300"
      style={{
        transform: 'scale(0.70)',
        transformOrigin: 'top right',
        width: 'max-content',
      }}
    >
      <table className="w-full border-collapse border border-orange-500">
        <thead className="bg-blue-100 sticky top-0 z-10">
          <tr>
            <th
              className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400"
              colSpan={2}
            >
              خط رانش
            </th>
            {khatRaneshList
              .filter(
                (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
              )
              .map((ranesh) => (
                <th
                  key={ranesh.IdRanesh}
                  className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400"
                  colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                >
                  {ranesh.RaneshName}
                </th>
              ))}
          </tr>

          <tr>
            <th
              className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400"
              colSpan={2}
            >
              دبی پمپ
            </th>
            {khatRaneshList
              .filter(
                (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
              )
              .map((ranesh) => (
                <th
                  key={ranesh.IdRanesh}
                  className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400"
                  colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                  dir="ltr"
                >
                  {ranesh.FIdSePu === 1
                    ? `${ranesh.DebiPomp} L/S`
                    : `${ranesh.Zarfiat} L/S`}
                </th>
              ))}
          </tr>

          <tr>
            <th
              className="border border-gray-300 px-4 py-2 font-bold"
              style={{width: '64px', minWidth: '64px', whiteSpace: 'nowrap'}}
            >
              روز
            </th>
            <th
              className="border border-gray-300 px-4 py-2 font-bold border-l-4 border-l-green-400"
              style={{width: '73px', minWidth: '73px', whiteSpace: 'nowrap'}}
            >
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
                      className="border border-gray-300 px-4 py-2 font-bold border-r-4 border-r-green-400"
                      style={{
                        width: '40px',
                        minWidth: '40px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      تعداد پمپ
                    </th>
                  )}
                  <th
                    className="border border-gray-300 px-4 py-2 font-bold"
                    style={{
                      width: ranesh.FIdSePu === 2 ? '110px' : '55px',
                      minWidth: ranesh.FIdSePu === 2 ? '110px' : '55px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    دبی L/S
                  </th>
                  <th
                    className="border border-gray-300 px-4 py-2 font-bold"
                    style={{
                      width: '135px',
                      minWidth: '135px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    شروع
                  </th>
                  <th
                    className="border border-gray-300 px-4 py-2 font-bold"
                    style={{
                      width: '135px',
                      minWidth: '135px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    پایان
                  </th>
                  <th
                    className="border border-gray-300 px-4 py-2 font-bold border-l-4 border-l-green-400"
                    style={{
                      width: '60px',
                      minWidth: '60px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    مدت
                  </th>
                </React.Fragment>
              ))}
          </tr>
        </thead>

        {message ? (
          <caption>{message}</caption>
        ) : records && Array.isArray(records) && records.length > 0 ? (
          <tbody className="divide-y divide-gray-200">
            {records.map((record, index) => {
              const pumpInfo = pumpData[record.IdTarDor];
              const rowColor = index % 2 === 0 ? 'bg-green-100' : 'bg-white';

              return (
                <tr
                  key={record.IdTarDor}
                  className={`${rowColor} hover:bg-green-200`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {toPersianDate(record.Trikh, 'dddd')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-bold border-l-4 border-l-green-400">
                    {toPersianDate(record.Trikh, 'YYYY/MM/DD')}
                  </td>
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
                                disabled={isFormDisabled} // غیرفعال کردن اگر فرم غیرفعال باشد
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

                                  const newValue = e.target.value;

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
                                    (khat) => khat.IdRanesh === ranesh.IdRanesh,
                                  )?.Zarfiat ?? '',
                                )}
                                placeholder={String(
                                  khatRaneshList.find(
                                    (khat) => khat.IdRanesh === ranesh.IdRanesh,
                                  )?.Zarfiat ?? '',
                                )}
                                className="border border-green-400 bg-white/90 rounded-lg h-10 px-3 py-1.5 
      text-gray-700 shadow-sm hover:shadow-md 
      focus:ring-2 focus:ring-green-400 focus:outline-none
      transition-all duration-300 hover:bg-green-50 cursor-pointer w-full text-center"
                                disabled={isFormDisabled} // غیرفعال کردن اگر فرم غیرفعال باشد
                              />
                            ) : (
                              (() => {
                                const selectedTedad =
                                  selectedPumpCounts[record.IdTarDor]?.[
                                    ranesh.IdRanesh
                                  ] ??
                                  raneshInfo?.Tedad ??
                                  0;

                                const debiPomp =
                                  khatRaneshList.find(
                                    (khat) => khat.IdRanesh === ranesh.IdRanesh,
                                  )?.DebiPomp ?? 0;

                                return (selectedTedad * debiPomp).toFixed(1);
                              })()
                            )}
                          </td>

                          <td className="border border-gray-300 px-4 py-2 relative">
                            <div className="relative w-full">
                              <input
                                type="text"
                                value={
                                  timeValues[record.IdTarDor]?.[ranesh.IdRanesh]
                                    ?.from ??
                                  (raneshInfo?.Shorooe
                                    ? new Date(raneshInfo.Shorooe)
                                        .toISOString()
                                        .slice(11, 16)
                                    : '')
                                }
                                onChange={(e) => {
                                  let newValue = e.target.value.replace(
                                    /[^0-9:]/g,
                                    '',
                                  ); // حذف کاراکترهای غیرمجاز
                                  if (newValue.length > 5) return; // جلوگیری از طول بیشتر از ۵ کاراکتر

                                  // اطمینان از درج فقط یک ":"
                                  const parts = newValue.split(':');
                                  if (parts.length > 2) return;

                                  // اطمینان از اینکه مقدار در قالب HH:MM باشد
                                  if (parts[0]?.length > 2)
                                    newValue =
                                      newValue.slice(0, 2) +
                                      ':' +
                                      newValue.slice(2, 4);

                                  handleTimeChange(
                                    record.IdTarDor,
                                    ranesh.IdRanesh,
                                    'from',
                                    newValue,
                                  );
                                }}
                                onBlur={(e) => {
                                  let [hours, minutes] = e.target.value
                                    .split(':')
                                    .map(Number);

                                  if (isNaN(hours) || isNaN(minutes)) {
                                    handleTimeChange(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'from',
                                      '',
                                    );
                                    return;
                                  }

                                  // تصحیح مقدار نامعتبر
                                  hours = Math.min(Math.max(hours, 0), 23);
                                  minutes = Math.min(Math.max(minutes, 0), 59);

                                  const formattedValue = `${hours.toString().padStart(2, '0')}:${minutes
                                    .toString()
                                    .padStart(2, '0')}`;

                                  handleTimeChange(
                                    record.IdTarDor,
                                    ranesh.IdRanesh,
                                    'from',
                                    formattedValue,
                                  );
                                }}
                                placeholder="HH:MM"
                                disabled={
                                  ((selectedPumpCounts[record.IdTarDor]?.[
                                    ranesh.IdRanesh
                                  ] ||
                                    raneshInfo?.Tedad ||
                                    0) === 0 &&
                                    (raneshInfo?.Zarfiat == null ||
                                      raneshInfo?.Zarfiat <= 0)) ||
                                  isFormDisabled
                                }
                                className="border border-green-400 bg-white/90 rounded-lg h-10 pl-8 pr-8 py-1.5 
             text-gray-700 shadow-sm hover:shadow-md 
             focus:ring-2 focus:ring-green-400 focus:outline-none
             transition-all duration-300 hover:bg-green-50 cursor-pointer w-full text-center relative"
                              />

                              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex flex-col">
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'from',
                                      'hour',
                                      1,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'from',
                                      'hour',
                                      -1,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▼
                                </button>
                              </div>

                              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col">
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'from',
                                      'minute',
                                      5,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'from',
                                      'minute',
                                      -5,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="border border-gray-300 px-4 py-2 relative">
                            <div className="relative w-full">
                              <input
                                type="text"
                                step="300"
                                value={
                                  timeValues[record.IdTarDor]?.[ranesh.IdRanesh]
                                    ?.to ??
                                  (raneshInfo?.Paian
                                    ? new Date(raneshInfo.Paian)
                                        .toISOString()
                                        .slice(11, 16)
                                    : '')
                                }
                                onChange={(e) => {
                                  let newValue = e.target.value.replace(
                                    /[^0-9:]/g,
                                    '',
                                  ); // حذف کاراکترهای غیرمجاز
                                  if (newValue.length > 5) return; // جلوگیری از طول بیشتر از ۵ کاراکتر

                                  // اطمینان از درج فقط یک ":"
                                  const parts = newValue.split(':');
                                  if (parts.length > 2) return;

                                  // اطمینان از اینکه مقدار در قالب HH:MM باشد
                                  if (parts[0]?.length > 2)
                                    newValue =
                                      newValue.slice(0, 2) +
                                      ':' +
                                      newValue.slice(2, 4);

                                  handleTimeChange(
                                    record.IdTarDor,
                                    ranesh.IdRanesh,
                                    'to',
                                    newValue,
                                  );
                                }}
                                onBlur={(e) => {
                                  let [hours, minutes] = e.target.value
                                    .split(':')
                                    .map(Number);

                                  if (isNaN(hours) || isNaN(minutes)) {
                                    handleTimeChange(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'to',
                                      '',
                                    );
                                    return;
                                  }

                                  // تصحیح مقدار نامعتبر
                                  hours = Math.min(Math.max(hours, 0), 23);
                                  minutes = Math.min(Math.max(minutes, 0), 59);

                                  const formattedValue = `${hours.toString().padStart(2, '0')}:${minutes
                                    .toString()
                                    .padStart(2, '0')}`;

                                  handleTimeChange(
                                    record.IdTarDor,
                                    ranesh.IdRanesh,
                                    'to',
                                    formattedValue,
                                  );
                                }}
                                placeholder="HH:MM"
                                disabled={
                                  ((selectedPumpCounts[record.IdTarDor]?.[
                                    ranesh.IdRanesh
                                  ] ||
                                    raneshInfo?.Tedad ||
                                    0) === 0 &&
                                    (raneshInfo?.Zarfiat == null ||
                                      raneshInfo?.Zarfiat <= 0)) ||
                                  isFormDisabled
                                }
                                className="border border-green-400 bg-white/90 rounded-lg h-10 pl-8 pr-8 py-1.5 
             text-gray-700 shadow-sm hover:shadow-md 
             focus:ring-2 focus:ring-green-400 focus:outline-none
             transition-all duration-300 hover:bg-green-50 cursor-pointer w-full text-center relative"
                              />

                              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex flex-col">
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'to',
                                      'hour',
                                      1,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'to',
                                      'hour',
                                      -1,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▼
                                </button>
                              </div>

                              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col">
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'to',
                                      'minute',
                                      5,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  className="text-gray-600 hover:text-black text-xs p-0.5"
                                  onClick={() =>
                                    updateTime(
                                      record.IdTarDor,
                                      ranesh.IdRanesh,
                                      'to',
                                      'minute',
                                      -5,
                                    )
                                  }
                                  disabled={
                                    ((selectedPumpCounts[record.IdTarDor]?.[
                                      ranesh.IdRanesh
                                    ] ||
                                      raneshInfo?.Tedad ||
                                      0) === 0 &&
                                      (raneshInfo?.Zarfiat == null ||
                                        raneshInfo?.Zarfiat <= 0)) ||
                                    isFormDisabled // غیرفعال کردن اگر فرم غیرفعال باشد
                                  }
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="border border-gray-300 px-4 py-2 font-bold border-l-4 border-l-green-400">
                            {(() => {
                              const fromValue =
                                timeValues[record.IdTarDor]?.[ranesh.IdRanesh]
                                  ?.from ??
                                (raneshInfo?.Shorooe
                                  ? new Date(raneshInfo.Shorooe)
                                      .toISOString()
                                      .slice(11, 16)
                                  : '');

                              const toValue =
                                timeValues[record.IdTarDor]?.[ranesh.IdRanesh]
                                  ?.to ??
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
                                const toTotalMinutes = toHours * 60 + toMinutes;

                                let durationMinutes =
                                  toTotalMinutes - fromTotalMinutes;

                                if (durationMinutes <= 0) {
                                  durationMinutes += 1440;
                                }

                                const hours = Math.floor(durationMinutes / 60);
                                const minutes = durationMinutes % 60;
                                return `${hours.toString().padStart(2, '0')}:${minutes
                                  .toString()
                                  .padStart(2, '0')}`;
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
            <tr>
              <td
                className="border border-gray-300 px-4 py-2 font-bold border-l-4 border-l-green-400"
                colSpan={2}
              >
                حجم درخواستی
              </td>
              {khatRaneshList
                .filter(
                  (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
                )
                .map((ranesh) => {
                  const totalWaterVolume = records.reduce((sum, record) => {
                    const pumpInfo = pumpData[record.IdTarDor];
                    const raneshInfo = pumpInfo?.[ranesh.IdRanesh];

                    if (!raneshInfo) return sum;

                    const debi =
                      ranesh.FIdSePu === 2
                        ? Number(raneshInfo?.Zarfiat ?? 0)
                        : (selectedPumpCounts[record.IdTarDor]?.[
                            ranesh.IdRanesh
                          ] ??
                            raneshInfo.Tedad ??
                            0) *
                          (khatRaneshList.find(
                            (khat) => khat.IdRanesh === ranesh.IdRanesh,
                          )?.DebiPomp ?? 0);

                    const fromValue =
                      timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.from ??
                      (raneshInfo.Shorooe
                        ? new Date(raneshInfo.Shorooe)
                            .toISOString()
                            .slice(11, 16)
                        : '');

                    const toValue =
                      timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.to ??
                      (raneshInfo.Paian
                        ? new Date(raneshInfo.Paian).toISOString().slice(11, 16)
                        : '');

                    if (fromValue && toValue) {
                      const [fromHours, fromMinutes] = fromValue
                        .split(':')
                        .map(Number);
                      const [toHours, toMinutes] = toValue
                        .split(':')
                        .map(Number);

                      let durationMinutes =
                        toHours * 60 +
                        toMinutes -
                        (fromHours * 60 + fromMinutes);

                      if (durationMinutes <= 0) durationMinutes += 1440;

                      const durationHours = durationMinutes / 60;

                      return sum + debi * durationHours * 3.6;
                    }
                    return sum;
                  }, 0);

                  return (
                    <td
                      key={ranesh.IdRanesh}
                      className="border border-gray-300 px-4 py-2 text-center font-bold border-l-4 border-l-green-400"
                      colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                    >
                      {totalWaterVolume
                        .toFixed(1)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                  );
                })}
            </tr>

            <tr className="bg-yellow-100 font-semibold">
              <td
                className="border border-gray-300 px-4 py-2 font-bold border-l-4 border-l-green-400"
                colSpan={2}
              >
                حجم پیش بینی
              </td>
              {khatRaneshList
                .filter(
                  (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
                )
                .map((ranesh) => (
                  <td
                    key={ranesh.IdRanesh}
                    className="border border-gray-300 px-4 py-2 text-center font-semibold border-l-4 border-l-green-400"
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
            <tr className="bg-gray-200 font-bold">
              <td
                className="border border-gray-300 px-4 py-2 font-bold border-l-4 border-l-green-400"
                colSpan={2}
              >
                اضافه درخواست
              </td>
              {khatRaneshList
                .filter(
                  (ranesh) => ranesh.Active !== false && ranesh.FIdDPipe === 1,
                )
                .map((ranesh) => {
                  const totalWaterVolume = records.reduce((sum, record) => {
                    const pumpInfo = pumpData[record.IdTarDor];
                    const raneshInfo = pumpInfo?.[ranesh.IdRanesh];
                    if (!raneshInfo) return sum;

                    const debi =
                      ranesh.FIdSePu === 2
                        ? Number(raneshInfo?.Zarfiat ?? 0)
                        : (selectedPumpCounts[record.IdTarDor]?.[
                            ranesh.IdRanesh
                          ] ??
                            raneshInfo.Tedad ??
                            0) *
                          (khatRaneshList.find(
                            (khat) => khat.IdRanesh === ranesh.IdRanesh,
                          )?.DebiPomp ?? 0);

                    const fromValue =
                      timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.from ??
                      (raneshInfo.Shorooe
                        ? new Date(raneshInfo.Shorooe)
                            .toISOString()
                            .slice(11, 16)
                        : '');

                    const toValue =
                      timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.to ??
                      (raneshInfo.Paian
                        ? new Date(raneshInfo.Paian).toISOString().slice(11, 16)
                        : '');

                    if (fromValue && toValue) {
                      const [fromHours, fromMinutes] = fromValue
                        .split(':')
                        .map(Number);
                      const [toHours, toMinutes] = toValue
                        .split(':')
                        .map(Number);

                      let durationMinutes =
                        toHours * 60 +
                        toMinutes -
                        (fromHours * 60 + fromMinutes);

                      if (durationMinutes <= 0) durationMinutes += 1440;

                      const durationHours = durationMinutes / 60;

                      return sum + debi * durationHours * 3.6;
                    }
                    return sum;
                  }, 0);

                  const predictedVolume = finalVolumes[ranesh.IdRanesh] ?? 0;
                  const extraRequest = totalWaterVolume - predictedVolume;
                  const textColor =
                    extraRequest > 0 ? 'text-red-700' : 'text-black';
                  const bgColor = extraRequest > 0 ? 'bg-red-100' : '';

                  return (
                    <td
                      key={ranesh.IdRanesh}
                      className={`border border-gray-300 px-4 py-2 text-center ${textColor} ${bgColor}  border-l-4 border-l-green-400`}
                      colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                    >
                      {extraRequest
                        .toFixed(1)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                  );
                })}
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
    </div>
  );
};

export default PumpingTable;
