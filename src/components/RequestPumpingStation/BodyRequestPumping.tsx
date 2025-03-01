import React, {useState, useEffect} from 'react';
import {toPersianDate, getCurrentSalMahDahe} from '@/utils/dateUtils';
import PumpingTable from './components/PumpingTable';
import PumpingForm from './PumpingForm';
import {usePumpingData} from './hooks/usePumpingData';
import {usePumpingTime} from './hooks/usePumpingTime';
import PaginationForMah, {convertMahToPersian} from './PaginationForMah';

import {KhatRanesh, PredictedVolume, PumpingData, RecordType} from './types';

interface BodyRequestPumpingProps {
  userName: string;
  userRole: string[];
  firstName: string;
  lastName: string;
  networkName: string;
  pumpStationName: string;
  selectedNetworkId: number | null;
  idPumpStation: number;
  saleZeraee: string;
  doreKesht: string;
  idShDo: number;
  mah: number; // اضافه کردن mah به پراپ‌ها
  dahe: number; // اضافه کردن dahe به پراپ‌ها
}

const BodyRequestPumping: React.FC<BodyRequestPumpingProps> = ({
  userName,
  userRole,
  firstName,
  lastName,
  networkName,
  pumpStationName,
  idPumpStation,
  selectedNetworkId,
  saleZeraee,
  doreKesht,
  idShDo,
}) => {
  // console.log('idPumpStation: ', idPumpStation);
  const {
    sal: currentSal,
    mah: currentMah,
    dahe: currentDahe,
  } = getCurrentSalMahDahe();

  const [sal, setSal] = useState<number>(currentSal);
  const [mah, setMah] = useState(currentMah);
  const [dahe, setDahe] = useState(currentDahe);
  const [selectedMah, setSelectedMah] = useState(currentMah);
  const [selectedDahe, setSelectedDahe] = useState(currentDahe);
  const [allDates, setAllDates] = useState<{Mah: number; Dahe: number}[]>([]);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    {date: string; raneshName: string; message: string}[]
  >([]);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [pumpData, setPumpData] = useState<{
    [idTarDor: number]: {[idRanesh: number]: PumpingData};
  }>({});
  const [selectedZarfiat, setSelectedZarfiat] = useState<{
    [key: number]: {[key: number]: number};
  }>({});

  const {
    khatRaneshList,
    predictedVolumes,
    loading,
    records,
    message,
    finalVolumes,
    mahList,
    taedAbMantaghe,
    taedProgramData,
  } = usePumpingData(
    selectedNetworkId,
    idPumpStation,
    selectedMah,
    sal,
    mah,
    dahe,
    selectedDahe,
    pumpData,
    setPumpData,
  );

  const {
    timeValues,
    handleTimeChange,
    updateTime,
    selectedPumpCounts,
    handlePumpCountChange,
  } = usePumpingTime();

  useEffect(() => {
    const isPastOrCurrentMonth =
      sal < currentSal || (sal === currentSal && mah < currentMah);

    const isPastOrCurrentDahe =
      sal === currentSal && mah === currentMah && dahe <= currentDahe;

    const isUserRoleAllowed = userRole.some((role) =>
      [
        'Website Creator',
        'Website Admin',
        'Ezgele Water Users Representative',
        'Jegiran Water Users Representative',
        'Northern Zahab Water Users Representative',
        'Southern Zahab Water Users Representative',
        'Hoomeh Qaraviz Water Users Representative',
        'Beshiveh Water Users Representative',
        'Ghaleh Shahin Water Users Representative',
        'Water Users Representative South Jagarlu',
      ].includes(role),
    );

    const isTaedAbMantagheTrue = taedAbMantaghe.some(
      (record) => record.TaedAbMantaghe === true,
    );

    setIsFormDisabled(
      isPastOrCurrentMonth ||
        isPastOrCurrentDahe ||
        !isUserRoleAllowed ||
        isTaedAbMantagheTrue,
    );
  }, [
    sal,
    mah,
    dahe,
    currentSal,
    currentMah,
    currentDahe,
    userRole,
    taedAbMantaghe,
  ]);

  const handleSave = () => {
    // منطق ذخیره‌سازی
  };

  const handleReset = () => {
    // منطق بازنشانی فرم
  };

  return (
    <div className="overflow-x-auto">
      {selectedNetworkId === null ? (
        <h2>شبکه مورد نظر خود را انتخاب کنید</h2>
      ) : idPumpStation === 0 ? (
        <h2>ایستگاه پمپاژ مورد نظر خود را انتخاب کنید</h2>
      ) : (
        <PumpingForm
          khatRaneshList={khatRaneshList}
          pumpData={pumpData}
          setPumpData={setPumpData}
          selectedPumpCounts={selectedPumpCounts}
          timeValues={timeValues}
          handlePumpCountChange={handlePumpCountChange}
          handleTimeChange={handleTimeChange}
          updateTime={updateTime}
          records={records}
          message={message}
          finalVolumes={finalVolumes}
          isFormDisabled={isFormDisabled}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          handleSave={handleSave}
          handleReset={handleReset}
          isFormFilled={isFormFilled}
          selectedMah={selectedMah}
          sal={sal}
          selectedDahe={selectedDahe}
          setSelectedDahe={setSelectedDahe}
          setDahe={setDahe}
          allDates={allDates}
          mahList={mahList}
          currentMah={currentMah}
          currentSal={currentSal}
          currentDahe={currentDahe}
          selectedNetworkId={selectedNetworkId}
          idPumpStation={idPumpStation}
          setSelectedMah={setSelectedMah}
          setSal={setSal}
          setMah={setMah}
          userRole={userRole}
          mah={mah} // پاس دادن mah به PumpingForm
          dahe={dahe} // پاس دادن dahe به PumpingForm
          firstName={firstName} // پاس دادن firstName به PumpingForm
          lastName={lastName}
          taedProgramData={taedProgramData}
          selectedZarfiat={selectedZarfiat}
          setSelectedZarfiat={setSelectedZarfiat}
        />
      )}
    </div>
  );
};

export default BodyRequestPumping;
