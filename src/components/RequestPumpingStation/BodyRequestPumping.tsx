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
  const [isFormFilled, setIsFormFilled] = useState(false); // اضافه کردن state برای isFormFilled

  useEffect(() => {
    if (validationErrors.length === 0) {
      console.log('تمام خطاها رفع شده‌اند، پیام خطا نباید نمایش داده شود.');
    }
  }, [validationErrors]);

  useEffect(() => {
    console.log('بعد از به‌روزرسانی مقدار validationErrors:', validationErrors);
  }, [validationErrors]);

  const [pumpData, setPumpData] = useState<{
    [idTarDor: number]: {[idRanesh: number]: PumpingData};
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
          validationErrors={validationErrors} // ارسال validationErrors به PumpingForm
          setValidationErrors={setValidationErrors} // ارسال setValidationErrors به PumpingForm
          handleSave={handleSave} // ارسال handleSave به PumpingForm
          handleReset={handleReset} // ارسال handleReset به PumpingForm
          isFormFilled={isFormFilled} // ارسال isFormFilled به PumpingForm
        />
      )}

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
                  setSal(item.Sal);
                  setMah(item.Mah);
                  setDahe(dahe);
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

export default BodyRequestPumping;
