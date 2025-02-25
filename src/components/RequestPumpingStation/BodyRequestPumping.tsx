import React, {useState, useEffect} from 'react';
import {toPersianDate, getCurrentSalMahDahe} from '@/utils/dateUtils';
import PumpingTable from './components/PumpingTable';
import PumpingForm from './PumpingForm';
import PumpingActions from './PumpingActions';
import {usePumpingData} from './hooks/usePumpingData';
import {usePumpingTime} from './hooks/usePumpingTime';
import PaginationForMah, {convertMahToPersian} from './PaginationForMah';

import {
  // BodyRequestPumpingProps,
  KhatRanesh,
  PredictedVolume,
  PumpingData,
  RecordType,
} from './types';
interface BodyRequestPumpingProps {
  userName: string;
  userRole: string[]; // تغییر این خط
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
  const {taedAbMantaghe} = usePumpingData(
    selectedNetworkId,
    idPumpStation,
    selectedMah,
    sal,
    mah,
    dahe,
    selectedDahe,
  );

  const {
    khatRaneshList,
    predictedVolumes,
    pumpData,
    loading,
    records,
    message,
    finalVolumes,
    mahList,
  } = usePumpingData(
    selectedNetworkId,
    idPumpStation,
    selectedMah,
    sal,
    mah,
    selectedDahe,
    dahe,
  );

  const {
    timeValues,
    handleTimeChange,
    updateTime,
    selectedPumpCounts,
    handlePumpCountChange,
  } = usePumpingTime();

  const isFormFilled = taedAbMantaghe.some(
    (record) =>
      record.FIdUserErsal !== null ||
      record.FIdUserAbMantaghe !== null ||
      record.FIdUserPeymankar !== null ||
      record.FIdUserAbNiroo !== null,
  );

  useEffect(() => {
    // بررسی آیا ماه و سال انتخاب شده مربوط به گذشته یا جاری است
    const isPastOrCurrentMonth =
      sal < currentSal || (sal === currentSal && mah < currentMah);

    // بررسی آیا دهه انتخاب شده مربوط به گذشته یا جاری است
    const isPastOrCurrentDahe =
      sal === currentSal && mah === currentMah && dahe <= currentDahe;

    // بررسی آیا userRole در لیست نقش‌های مجاز قرار دارد
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

    // بررسی آیا TaedAbMantaghe برابر true است
    const isTaedAbMantagheTrue = taedAbMantaghe.some(
      (record) => record.TaedAbMantaghe === true,
    );
    console.log('isTaedAbMantagheTrue: ', isTaedAbMantagheTrue);
    // اگر ماه و دهه مربوط به گذشته یا جاری باشد، یا userRole مجاز نباشد، یا TaedAbMantaghe برابر true باشد، فرم غیرفعال می‌شود
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
    console.log('تنظیمات ذخیره شد');
  };

  const handleReset = () => {
    console.log('تنظیمات بازنشانی شد');
  };

  return (
    <div className="overflow-x-auto">
      {selectedNetworkId === null ? (
        <h2>شبکه مورد نظر خود را انتخاب کنید</h2>
      ) : idPumpStation === 0 ? (
        <h2>ایستگاه پمپاژ مورد نظر خود را انتخاب کنید</h2>
      ) : (
        <div>
          <PumpingForm
            khatRaneshList={khatRaneshList}
            pumpData={pumpData}
            selectedPumpCounts={selectedPumpCounts}
            timeValues={timeValues}
            handlePumpCountChange={handlePumpCountChange}
            handleTimeChange={handleTimeChange}
            updateTime={updateTime}
            records={records}
            message={message}
            finalVolumes={finalVolumes}
            isFormDisabled={isFormDisabled} // ارسال وضعیت غیرفعال بودن فرم
          />
          <PumpingActions
            onSave={handleSave}
            onReset={handleReset}
            disabled={isFormDisabled}
            isFormDisabled={isFormDisabled}
            isFormFilled={isFormFilled}
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
                      setSal(item.Sal);
                      setMah(item.Mah);
                      setDahe(dahe);
                      setSelectedDahe(
                        item.Mah === currentMah && item.Sal === currentSal
                          ? currentDahe
                          : 1,
                      );
                      // console.log('mah: ', mah);
                    }}
                  >
                    {convertMahToPersian(item.Mah)} {item.Sal}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BodyRequestPumping;
