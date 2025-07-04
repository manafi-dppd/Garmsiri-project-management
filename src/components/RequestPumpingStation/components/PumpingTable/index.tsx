import * as React from 'react';
import {toPersianDate} from '../../../../utils/dateUtils';
import {KhatRanesh, RecordType, PumpingData} from '../../types';

export interface PumpingTableProps {
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}};
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
  selectedZarfiat: {[key: number]: {[key: number]: number}};
  setSelectedZarfiat: React.Dispatch<
    React.SetStateAction<{[key: number]: {[key: number]: number}}>
  >;
  setPumpData: (data: {
    [idTarDor: number]: {[idRanesh: number]: PumpingData};
  }) => void;
}

const PumpingTable: React.FC<PumpingTableProps> = ({
  khatRaneshList,
  records,
  pumpData,
  selectedPumpCounts,
  timeValues,
  handlePumpCountChange,
  handleTimeChange,
  updateTime,
  message,
  finalVolumes,
  selectedZarfiat,
  setSelectedZarfiat,
}) => {
  const handleZarfiatChange = (
    IdTarDor: number,
    IdRanesh: number,
    newValue: string,
  ) => {
    const numericValue = Number(newValue);

    if (!isNaN(numericValue)) {
      setSelectedZarfiat((prev) => {
        const updatedData = {
          ...prev,
          [IdTarDor]: {
            ...prev[IdTarDor],
            [IdRanesh]: numericValue,
          },
        };
        return updatedData;
      });
    }
  };
  // تنظیم عرض ستون‌ها
  const columnWidths = {
    pumpCount: '40px',
    debi: '50px',
    start: '80px',
    end: '80px',
    duration: '50px',
  };

  // محاسبه عرض ستون‌ها بر اساس تعداد ستون‌ها
  const calculateColumnWidth = (
    columnType: keyof typeof columnWidths,
    ranesh?: KhatRanesh,
  ) => {
    const baseWidth = columnWidths[columnType];
    const columnCount = khatRaneshList.filter(
      (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1,
    ).length;

    let calculatedWidth = baseWidth;
    if (columnCount > 2) {
      calculatedWidth = `calc(${baseWidth} / ${columnCount})`;
    }

    if (columnType === 'debi' && ranesh?.fidsepu === 2) {
      calculatedWidth = `calc(${calculatedWidth} * 3)`;
    }

    return calculatedWidth;
  };
  return (
    <table
      id="pumping-table"
      className="w-full border-collapse border border-orange-500"
      // style={{
      //   transformOrigin: "top right",
      //   width: "max-content",
      // }}
    >
      <thead className="bg-blue-100">
        <tr>
          <th
            className="border border-l-4 border-gray-300 border-l-green-400 px-4 font-bold"
            colSpan={2}
          >
            خط رانش
          </th>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1,
            )
            .map((ranesh) => (
              <th
                key={ranesh.idranesh}
                className="border border-l-4 border-gray-300 border-l-green-400 px-4 font-bold"
                colSpan={ranesh.fidsepu === 1 ? 5 : 4}
              >
                {ranesh.raneshname}
              </th>
            ))}
        </tr>

        <tr>
          <th
            className="border border-l-4 border-gray-300 border-l-green-400 px-4 font-bold"
            colSpan={2}
          >
            دبی پمپ
          </th>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1,
            )
            .map((ranesh) => (
              <th
                key={ranesh.idranesh}
                className="border border-l-4 border-gray-300 border-l-green-400 px-4"
                colSpan={ranesh.fidsepu === 1 ? 5 : 4}
                dir="ltr"
              >
                {ranesh.fidsepu === 1
                  ? `${ranesh.debipomp} L/S`
                  : `${ranesh.zarfiat} L/S`}
              </th>
            ))}
        </tr>

        <tr>
          <th
            className="py-0.3 border border-gray-300 px-1 font-bold"
            style={{width: '64px', minWidth: '64px', whiteSpace: 'nowrap'}}
          >
            روز
          </th>
          <th
            className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-1 font-bold"
            style={{width: '73px', minWidth: '73px', whiteSpace: 'nowrap'}}
          >
            تاریخ
          </th>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1,
            )
            .map((ranesh) => (
              <React.Fragment key={ranesh.idranesh}>
                {ranesh.fidsepu === 1 && (
                  <th
                    className="py-0.3 border border-r-4 border-gray-300 border-r-green-400 px-1"
                    style={{
                      width: calculateColumnWidth('pumpCount'),
                      minWidth: calculateColumnWidth('pumpCount'),
                      whiteSpace: 'nowrap',
                    }}
                  >
                    تعداد
                  </th>
                )}
                <th
                  className="py-0.3 border border-gray-300 px-0.5 font-bold"
                  style={{
                    width: calculateColumnWidth('debi', ranesh), // اضافه کردن ranesh به عنوان پارامتر
                    minWidth: calculateColumnWidth('debi', ranesh),
                    whiteSpace: 'nowrap',
                  }}
                >
                  دبی پمپ
                </th>
                <th
                  className="py-0.3 border border-gray-300 px-6 font-bold"
                  style={{
                    width: calculateColumnWidth('pumpCount'),
                    minWidth: calculateColumnWidth('pumpCount'),
                    whiteSpace: 'nowrap',
                  }}
                >
                  شروع
                </th>
                <th
                  className="py-0.3 border border-gray-300 px-6 font-bold"
                  style={{
                    width: calculateColumnWidth('pumpCount'),
                    minWidth: calculateColumnWidth('pumpCount'),
                    whiteSpace: 'nowrap',
                  }}
                >
                  پایان
                </th>
                <th
                  className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-1"
                  style={{
                    width: calculateColumnWidth('duration'),
                    minWidth: calculateColumnWidth('duration'),
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
        <tbody className="divide-y divide-gray-200 text-sm">
          {records.map((record, index) => {
            const pumpInfo = pumpData[record.idtardor];
            const rowColor = index % 2 === 0 ? 'bg-green-100' : 'bg-white';

            return (
              <tr
                key={record.idtardor}
                className={`${rowColor} whitespace-nowrap hover:bg-green-200`}
              >
                <td className="py-0.3 border border-gray-300 px-1">
                  {toPersianDate(record.trikh, 'dddd')}
                </td>
                <td className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-1 font-bold">
                  {toPersianDate(record.trikh, 'YYYY/MM/DD')}
                </td>
                {khatRaneshList
                  .filter(
                    (ranesh) =>
                      ranesh.active !== false && ranesh.fiddpipe === 1,
                  )
                  .map((ranesh) => {
                    const raneshInfo = pumpInfo?.[ranesh.idranesh];
                    return (
                      <React.Fragment key={ranesh.idranesh}>
                        {ranesh.fidsepu === 1 && (
                          <td className="py-0.3 border border-gray-300 px-1">
                            <select
                              value={
                                selectedPumpCounts[record.idtardor]?.[
                                  ranesh.idranesh
                                ] ??
                                pumpData[record.idtardor]?.[ranesh.idranesh]
                                  ?.tedad ??
                                0
                              }
                              onChange={(e) =>
                                handlePumpCountChange(
                                  record.idtardor,
                                  ranesh.idranesh,
                                  Number(e.target.value),
                                )
                              }
                              className="rounded border px-1 py-0.5 text-xs"
                            >
                              {Array.from(
                                {length: (ranesh.tedadpump || 0) + 1},
                                (_, i) => (
                                  <option key={i} value={i}>
                                    {i}
                                  </option>
                                ),
                              )}
                            </select>
                          </td>
                        )}
                        <td className="py-0.3 border border-gray-300 px-1">
                          {ranesh.fidsepu === 2 ? (
                            <input
                              type="number"
                              value={
                                selectedZarfiat[record.idtardor]?.[
                                  ranesh.idranesh
                                ] != null
                                  ? selectedZarfiat[record.idtardor][
                                      ranesh.idranesh
                                    ].toString()
                                  : raneshInfo?.zarfiat != null
                                    ? raneshInfo.zarfiat.toString()
                                    : ''
                              }
                              onChange={(e) => {
                                const maxZarfiat = Number(
                                  khatRaneshList.find(
                                    (khat) => khat.idranesh === ranesh.idranesh,
                                  )?.zarfiat ?? Infinity,
                                );

                                const newValue = e.target.value;

                                if (
                                  !isNaN(Number(newValue)) &&
                                  Number(newValue) <= maxZarfiat
                                ) {
                                  handleZarfiatChange(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    newValue,
                                  );
                                }
                              }}
                              min="0"
                              max={String(
                                khatRaneshList.find(
                                  (khat) => khat.idranesh === ranesh.idranesh,
                                )?.zarfiat ?? '',
                              )}
                              placeholder={`max${String(
                                khatRaneshList.find(
                                  (khat) => khat.idranesh === ranesh.idranesh,
                                )?.zarfiat ?? '',
                              )}`}
                              className="h-7 w-full cursor-pointer border border-green-400 bg-white/90 px-1 py-0.5 text-center text-xs text-gray-700 shadow-sm transition-all duration-300 hover:bg-green-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                              style={{
                                width: calculateColumnWidth('debi', ranesh), // اضافه کردن ranesh به عنوان پارامتر
                              }}
                            />
                          ) : (
                            (() => {
                              const selectedTedad =
                                selectedPumpCounts[record.idtardor]?.[
                                  ranesh.idranesh
                                ] ??
                                raneshInfo?.tedad ??
                                0;

                              const debiPomp =
                                khatRaneshList.find(
                                  (khat) => khat.idranesh === ranesh.idranesh,
                                )?.debipomp ?? 0;

                              return (selectedTedad * debiPomp).toFixed(1);
                            })()
                          )}
                        </td>

                        <td className="py-0.3 relative border border-gray-300 px-1">
                          <div className="relative w-full">
                            <input
                              type="text"
                              value={
                                timeValues[record.idtardor]?.[ranesh.idranesh]
                                  ?.from ??
                                (raneshInfo?.shorooe
                                  ? new Date(raneshInfo.shorooe)
                                      .toISOString()
                                      .slice(11, 16)
                                  : '')
                              }
                              onChange={(e) => {
                                let newValue = e.target.value.replace(
                                  /[^0-9:]/g,
                                  '',
                                );
                                if (newValue.length > 5) return;

                                const parts = newValue.split(':');
                                if (parts.length > 2) return;

                                if (parts[0]?.length > 2)
                                  newValue =
                                    newValue.slice(0, 2) +
                                    ':' +
                                    newValue.slice(2, 4);

                                handleTimeChange(
                                  record.idtardor,
                                  ranesh.idranesh,
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
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'from',
                                    '',
                                  );
                                  return;
                                }

                                hours = Math.min(Math.max(hours, 0), 23);
                                minutes = Math.min(Math.max(minutes, 0), 59);

                                const formattedValue = `${hours.toString().padStart(2, '0')}:${minutes
                                  .toString()
                                  .padStart(2, '0')}`;

                                handleTimeChange(
                                  record.idtardor,
                                  ranesh.idranesh,
                                  'from',
                                  formattedValue,
                                );
                              }}
                              placeholder="HH:MM"
                              className="h-7 w-full cursor-pointer rounded-lg border border-green-400 bg-white/90 px-1 py-0.5 text-center text-xs text-gray-700 shadow-sm transition-all duration-300 hover:bg-green-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />

                            <div className="gap-0.2 absolute left-0.5 top-1/2 flex -translate-y-1/2 transform flex-col">
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'from',
                                    'hour',
                                    1,
                                  )
                                }
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'from',
                                    'hour',
                                    -1,
                                  )
                                }
                              >
                                ▼
                              </button>
                            </div>

                            <div className="gap-0.2 absolute right-1 top-1/2 flex -translate-y-1/2 transform flex-col">
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'from',
                                    'minute',
                                    5,
                                  )
                                }
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'from',
                                    'minute',
                                    -5,
                                  )
                                }
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                        </td>

                        <td className="py-0.3 relative border border-gray-300 px-1">
                          <div className="relative w-full">
                            <input
                              type="text"
                              step="300"
                              value={
                                timeValues[record.idtardor]?.[ranesh.idranesh]
                                  ?.to ??
                                (raneshInfo?.paian
                                  ? new Date(raneshInfo.paian)
                                      .toISOString()
                                      .slice(11, 16)
                                  : '')
                              }
                              onChange={(e) => {
                                let newValue = e.target.value.replace(
                                  /[^0-9:]/g,
                                  '',
                                );
                                if (newValue.length > 5) return;

                                const parts = newValue.split(':');
                                if (parts.length > 2) return;

                                if (parts[0]?.length > 2)
                                  newValue =
                                    newValue.slice(0, 2) +
                                    ':' +
                                    newValue.slice(2, 4);

                                handleTimeChange(
                                  record.idtardor,
                                  ranesh.idranesh,
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
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'to',
                                    '',
                                  );
                                  return;
                                }

                                hours = Math.min(Math.max(hours, 0), 23);
                                minutes = Math.min(Math.max(minutes, 0), 59);

                                const formattedValue = `${hours.toString().padStart(2, '0')}:${minutes
                                  .toString()
                                  .padStart(2, '0')}`;

                                handleTimeChange(
                                  record.idtardor,
                                  ranesh.idranesh,
                                  'to',
                                  formattedValue,
                                );
                              }}
                              placeholder="HH:MM"
                              className="h-7 w-full cursor-pointer rounded-lg border border-green-400 bg-white/90 px-1 py-0.5 text-center text-xs text-gray-700 shadow-sm transition-all duration-300 hover:bg-green-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />

                            <div className="gap-0.2 absolute left-0.5 top-1/2 flex -translate-y-1/2 transform flex-col">
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'to',
                                    'hour',
                                    1,
                                  )
                                }
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'to',
                                    'hour',
                                    -1,
                                  )
                                }
                              >
                                ▼
                              </button>
                            </div>

                            <div className="absolute right-1 top-1/2 flex -translate-y-1/2 transform flex-col">
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'to',
                                    'minute',
                                    5,
                                  )
                                }
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className="p-0 text-xs text-gray-400 hover:text-black"
                                onClick={() =>
                                  updateTime(
                                    record.idtardor,
                                    ranesh.idranesh,
                                    'to',
                                    'minute',
                                    -5,
                                  )
                                }
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                        </td>

                        <td className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-1">
                          {(() => {
                            const fromValue =
                              timeValues[record.idtardor]?.[ranesh.idranesh]
                                ?.from ??
                              (raneshInfo?.shorooe
                                ? new Date(raneshInfo.shorooe)
                                    .toISOString()
                                    .slice(11, 16)
                                : '');

                            const toValue =
                              timeValues[record.idtardor]?.[ranesh.idranesh]
                                ?.to ??
                              (raneshInfo?.paian
                                ? new Date(raneshInfo.paian)
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
              className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-4 text-xs font-bold"
              colSpan={2}
            >
              حجم درخواستی
            </td>
            {khatRaneshList
              .filter(
                (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1,
              )
              .map((ranesh) => {
                const totalWaterVolume = records.reduce((sum, record) => {
                  const pumpInfo = pumpData[record.idtardor];
                  const raneshInfo = pumpInfo?.[ranesh.idranesh];

                  if (!raneshInfo) return sum;

                  const debi =
                    ranesh.fidsepu === 2
                      ? Number(
                          selectedZarfiat[record.idtardor]?.[ranesh.idranesh] ?? // استفاده از selectedZarfiat
                            raneshInfo?.zarfiat ??
                            0,
                        )
                      : (selectedPumpCounts[record.idtardor]?.[
                          ranesh.idranesh
                        ] ??
                          raneshInfo.tedad ??
                          0) *
                        (khatRaneshList.find(
                          (khat) => khat.idranesh === ranesh.idranesh,
                        )?.debipomp ?? 0);

                  const fromValue =
                    timeValues[record.idtardor]?.[ranesh.idranesh]?.from ??
                    (raneshInfo.shorooe
                      ? new Date(raneshInfo.shorooe).toISOString().slice(11, 16)
                      : '');

                  const toValue =
                    timeValues[record.idtardor]?.[ranesh.idranesh]?.to ??
                    (raneshInfo.paian
                      ? new Date(raneshInfo.paian).toISOString().slice(11, 16)
                      : '');

                  if (fromValue && toValue) {
                    const [fromHours, fromMinutes] = fromValue
                      .split(':')
                      .map(Number);
                    const [toHours, toMinutes] = toValue.split(':').map(Number);

                    let durationMinutes =
                      toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);

                    if (durationMinutes <= 0) durationMinutes += 1440;

                    const durationHours = durationMinutes / 60;

                    return sum + debi * durationHours * 3.6;
                  }
                  return sum;
                }, 0);

                return (
                  <td
                    key={ranesh.idranesh}
                    className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-4 text-center text-xs font-bold"
                    colSpan={ranesh.fidsepu === 1 ? 5 : 4}
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
              className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-4 text-xs font-bold"
              colSpan={2}
            >
              حجم پیش بینی
            </td>
            {khatRaneshList
              .filter(
                (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1,
              )
              .map((ranesh) => (
                <td
                  key={ranesh.idranesh}
                  className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-4 text-center text-xs font-semibold"
                  colSpan={ranesh.fidsepu === 1 ? 5 : 4}
                >
                  {finalVolumes[ranesh.idranesh] !== undefined
                    ? finalVolumes[ranesh.idranesh]
                        .toFixed(1)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '-'}
                </td>
              ))}
          </tr>
          <tr className="bg-gray-200 font-bold">
            <td
              className="py-0.3 border border-l-4 border-gray-300 border-l-green-400 px-4 text-xs font-bold"
              colSpan={2}
            >
              اضافه درخواست
            </td>
            {khatRaneshList
              .filter(
                (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1,
              )
              .map((ranesh) => {
                const totalWaterVolume = records.reduce((sum, record) => {
                  const pumpInfo = pumpData[record.idtardor];
                  const raneshInfo = pumpInfo?.[ranesh.idranesh];

                  if (!raneshInfo) return sum;

                  const debi =
                    ranesh.fidsepu === 2
                      ? Number(raneshInfo?.zarfiat ?? 0)
                      : (selectedPumpCounts[record.idtardor]?.[
                          ranesh.idranesh
                        ] ??
                          raneshInfo.tedad ??
                          0) *
                        (khatRaneshList.find(
                          (khat) => khat.idranesh === ranesh.idranesh,
                        )?.debipomp ?? 0);

                  const fromValue =
                    timeValues[record.idtardor]?.[ranesh.idranesh]?.from ??
                    (raneshInfo.shorooe
                      ? new Date(raneshInfo.shorooe).toISOString().slice(11, 16)
                      : '');

                  const toValue =
                    timeValues[record.idtardor]?.[ranesh.idranesh]?.to ??
                    (raneshInfo.paian
                      ? new Date(raneshInfo.paian).toISOString().slice(11, 16)
                      : '');

                  if (fromValue && toValue) {
                    const [fromHours, fromMinutes] = fromValue
                      .split(':')
                      .map(Number);
                    const [toHours, toMinutes] = toValue.split(':').map(Number);

                    let durationMinutes =
                      toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);

                    if (durationMinutes <= 0) durationMinutes += 1440;

                    const durationHours = durationMinutes / 60;

                    return sum + debi * durationHours * 3.6;
                  }
                  return sum;
                }, 0);

                const predictedVolume = finalVolumes[ranesh.idranesh] ?? 0;
                const extraRequest = totalWaterVolume - predictedVolume;
                const textColor =
                  extraRequest > 0 ? 'text-red-700' : 'text-black';
                const bgColor = extraRequest > 0 ? 'bg-red-100' : '';

                return (
                  <td
                    key={ranesh.idranesh}
                    className={`py-0.3 border border-gray-300 px-4 text-center ${textColor} ${bgColor} border-l-4 border-l-green-400 text-xs`}
                    colSpan={ranesh.fidsepu === 1 ? 5 : 4}
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
              لطفا منتظر بمانید
            </td>
          </tr>
        </tbody>
      )}
    </table>
    // </div>
  );
};

export default PumpingTable;
