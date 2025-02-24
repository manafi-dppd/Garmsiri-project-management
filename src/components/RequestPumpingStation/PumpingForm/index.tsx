import React from 'react';
import {KhatRanesh, PumpingData, RecordType} from '../types';
import PumpingTable from '../components/PumpingTable';

interface PumpingFormProps {
  khatRaneshList: KhatRanesh[];
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
  records: RecordType[];
  message: string | null;
  finalVolumes: {[key: number]: number};
  isFormDisabled: boolean; // اضافه کردن وضعیت غیرفعال بودن فرم
}

const PumpingForm: React.FC<PumpingFormProps> = ({
  khatRaneshList,
  pumpData,
  selectedPumpCounts,
  timeValues,
  handlePumpCountChange,
  handleTimeChange,
  updateTime,
  records,
  message,
  finalVolumes,
  isFormDisabled,
}) => {
  return (
    <div className="max-h-[600px] p-1 bg-gray-100 rounded-lg shadow-md">
      <PumpingTable
        khatRaneshList={khatRaneshList}
        records={records}
        pumpData={pumpData}
        selectedPumpCounts={selectedPumpCounts}
        timeValues={timeValues}
        handlePumpCountChange={handlePumpCountChange}
        handleTimeChange={handleTimeChange}
        updateTime={updateTime}
        message={message}
        finalVolumes={finalVolumes}
        isFormDisabled={isFormDisabled} // ارسال وضعیت غیرفعال بودن فرم به PumpingTable
      />
    </div>
  );
};

export default PumpingForm;
