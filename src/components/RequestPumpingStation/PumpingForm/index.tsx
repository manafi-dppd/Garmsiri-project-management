import React from 'react';
import {KhatRanesh} from 'generated/sqlserver';
import {PumpingData, RecordType} from '../types';
import PumpingTable from '../components/PumpingTable';
import PumpingActions from '../PumpingActions';
import PaginationForMah, {convertMahToPersian} from '../PaginationForMah'; // اضافه کردن import برای PaginationForMah
import {TaeedProgramData} from '../types'; // فرض بر این است که اینترفیس در فایل types.ts تعریف شده است
interface PumpingFormProps {
  setSelectedMah: (value: number) => void;
  khatRaneshList: KhatRanesh[];
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}};
  setPumpData: (data: {
    [idTarDor: number]: {[idRanesh: number]: PumpingData};
  }) => void;
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
  records: RecordType[];
  message: string | null;
  finalVolumes: {[key: number]: number};
  isFormDisabled: boolean;
  validationErrors: {date: string; raneshName: string; message: string}[];
  setValidationErrors: (
    errors: {date: string; raneshName: string; message: string}[],
  ) => void;
  handleSave: () => void;
  handleReset: () => void;
  isFormFilled: boolean;
  selectedMah: number;
  selectedDahe: number;
  setSelectedDahe: (value: number) => void;
  setDahe: (value: number) => void; // اضافه کردن setDahe به props
  allDates: {Mah: number; Dahe: number}[];
  mahList: {Mah: number; Sal: number}[];
  currentMah: number;
  currentSal: number;
  currentDahe: number;
  selectedNetworkId: number | null;
  idPumpStation: number;
  setSal: (value: number) => void; // اضافه کردن setSal به props
  setMah: (value: number) => void; // اضافه کردن setMah به props
  userRole: string[];
  sal: number;
  dahe: number; // اضافه کردن dahe به props
  mah: number; // اضافه کردن mah به پراپ‌ها
  firstName: string; // اضافه کردن firstName به پراپ‌ها
  lastName: string;
  taedProgramData: TaeedProgramData | null;
  selectedZarfiat: {[key: number]: {[key: number]: number}};
  setSelectedZarfiat: (data: {[key: number]: {[key: number]: number}}) => void;
}
const PumpingForm: React.FC<PumpingFormProps> = ({
  khatRaneshList,
  pumpData,
  setPumpData,
  selectedPumpCounts,
  timeValues,
  handlePumpCountChange,
  handleTimeChange,
  updateTime,
  records,
  message,
  finalVolumes,
  isFormDisabled,
  validationErrors,
  setValidationErrors,
  handleSave,
  handleReset,
  isFormFilled,
  selectedMah,
  setSelectedMah,
  sal,
  selectedDahe,
  setSelectedDahe,
  setDahe,
  allDates,
  mahList,
  currentMah,
  currentSal,
  currentDahe,
  selectedNetworkId,
  idPumpStation,
  setSal,
  setMah,
  userRole,
  mah, // دریافت mah از پراپ‌ها
  dahe, //
  firstName, // دریافت firstName از پراپ‌ها
  lastName, // دریافت lastName از پراپ‌ها
  taedProgramData,
  selectedZarfiat,
  setSelectedZarfiat,
}) => {
  return (
    <div className="max-h-[800px] p-1 bg-gray-100 rounded-lg shadow-md">
      <PumpingTable
        khatRaneshList={khatRaneshList}
        records={records}
        pumpData={pumpData}
        setPumpData={setPumpData}
        selectedPumpCounts={selectedPumpCounts}
        timeValues={timeValues}
        handlePumpCountChange={handlePumpCountChange}
        handleTimeChange={handleTimeChange}
        updateTime={updateTime}
        message={message}
        finalVolumes={finalVolumes}
        isFormDisabled={isFormDisabled}
        selectedZarfiat={selectedZarfiat}
        setSelectedZarfiat={setSelectedZarfiat}
      />
      {validationErrors.length > 0 && (
        <div className="mt-4 text-red-600">
          {validationErrors.map((error, index) => (
            <div key={index}>
              {/* {error.date} - {error.raneshName}: {error.message} */}
              {error.message}
            </div>
          ))}
        </div>
      )}
      <PumpingActions
        onSave={handleSave}
        onReset={handleReset}
        disabled={isFormDisabled}
        isFormDisabled={isFormDisabled}
        isFormFilled={isFormFilled}
        khatRaneshList={khatRaneshList}
        records={records}
        pumpData={pumpData}
        selectedPumpCounts={selectedPumpCounts}
        timeValues={timeValues}
        setValidationErrors={setValidationErrors}
        userRole={userRole}
        idPumpStation={idPumpStation}
        sal={sal} // پاس دادن سال
        mah={mah} // پاس دادن ماه
        dahe={dahe} // پاس دادن دهه
        firstName={firstName} // پاس دادن firstName
        lastName={lastName} // پاس دادن lastName
        taedProgramData={taedProgramData}
        selectedZarfiat={selectedZarfiat} // اضافه کردن selectedZarfiat
        setSelectedZarfiat={setSelectedZarfiat}
      />
      {selectedMah !== null && sal !== null && (
        <div>
          <PaginationForMah
            selectedMah={selectedMah}
            sal={sal}
            selectedDahe={selectedDahe}
            setSelectedDahe={setSelectedDahe}
            setDahe={setDahe}
            allDates={allDates}
          />
        </div>
      )}

      {selectedNetworkId !== null && idPumpStation !== 0 && (
        <div
          className="flex border-b border-gray-300"
          style={{
            transform: 'scale(0.9)',
            transformOrigin: 'top right',
            width: 'max-content',
          }}
        >
          {[...mahList]
            .sort((a, b) => a.Sal - b.Sal || a.Mah - b.Mah)
            .map((item) => (
              <div
                key={`${item.Mah}-${item.Sal}`}
                className={`px-6 py-2 text-lg font-semibold cursor-pointer transition-all duration-300 border
                    border-gray-400 rounded-t-md
                    ${
                      selectedMah === item.Mah && sal === item.Sal
                        ? 'bg-white text-blue-600 shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                onClick={() => {
                  setSelectedMah(item.Mah);
                  setSal(item.Sal); // استفاده از مقدار props
                  setMah(item.Mah); // استفاده از مقدار props
                  setSelectedDahe(
                    item.Mah === currentMah && item.Sal === currentSal
                      ? currentDahe
                      : 1,
                  );
                }}
              >
                {convertMahToPersian(item.Mah)} {item.Sal}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PumpingForm;
