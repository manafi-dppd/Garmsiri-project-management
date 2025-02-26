import React from 'react';
import {KhatRanesh} from 'generated/sqlserver';
import {PumpingData, RecordType} from '../types';
import PumpingTable from '../components/PumpingTable';
import PumpingActions from '../PumpingActions'; // اضافه کردن import برای PumpingActions

interface PumpingFormProps {
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
  validationErrors: {date: string; raneshName: string; message: string}[]; // اضافه کردن validationErrors به props
  setValidationErrors: (
    errors: {date: string; raneshName: string; message: string}[],
  ) => void; // اضافه کردن setValidationErrors به props
  handleSave: () => void; // اضافه کردن handleSave به props
  handleReset: () => void; // اضافه کردن handleReset به props
  isFormFilled: boolean; // اضافه کردن isFormFilled به props
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
  validationErrors, // دریافت validationErrors از props
  setValidationErrors, // دریافت setValidationErrors از props
  handleSave, // دریافت handleSave از props
  handleReset, // دریافت handleReset از props
  isFormFilled, // دریافت isFormFilled از props
}) => {

  return (
    <div className="max-h-[600px] p-1 bg-gray-100 rounded-lg shadow-md">
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
      />
      {validationErrors.length > 0 && (
        <div className="mt-4 text-red-600">
          {validationErrors.map((error, index) => (
            <div key={index}>
              {error.date} - {error.raneshName}: {error.message}
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
      />
      
    </div>
  );
};

export default PumpingForm;
