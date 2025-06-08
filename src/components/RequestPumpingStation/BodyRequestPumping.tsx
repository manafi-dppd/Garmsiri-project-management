import * as React from "react";
import { useState, useEffect } from "react";
import { getCurrentSalMahDahe } from "../../utils/dateUtils";
import PumpingForm from "./PumpingForm";
import { usePumpingData } from "./hooks/usePumpingData";
import { usePumpingTime } from "./hooks/usePumpingTime";
import type { TaeedProgramData } from "./types";
import { PumpingData } from "./types";

interface BodyRequestPumpingProps {
  userName: string;
  firstName: string;
  lastName: string;
  networkName: string;
  pumpStationName: string;
  selectedNetworkId: number | null;
  idPumpStation: number;
  saleZeraee: string;
  doreKesht: string;
  networkTrustee: string | null;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  userRole: string[];
  idShDo: number;
  mah: number;
  dahe: number;
}

const BodyRequestPumping: React.FC<BodyRequestPumpingProps> = ({
  firstName,
  lastName,
  networkName,
  pumpStationName,
  selectedNetworkId,
  idPumpStation,
  saleZeraee,
  doreKesht,
  networkTrustee,
  isSaving,
  setIsSaving,
  userRole,
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
  const [pumpData, setPumpData] = useState<{
    [idTarDor: number]: { [idRanesh: number]: PumpingData };
  }>({});
  const [selectedZarfiat, setSelectedZarfiat] = useState<{
    [key: number]: { [key: number]: number };
  }>({});
  const [isFormFilled] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    { date: string; raneshName: string; message: string }[]
  >([]);
  const [allDates] = useState<{ mah: number; dahe: number }[]>([]);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isStationLoaded, setIsStationLoaded] = useState(false);
  const [prevPumpStation, setPrevPumpStation] = useState<number | null>(null);
  const {
    khatRaneshList,
    records,
    message,
    finalVolumes,
    mahList,
    taedAbMantaghe,
    taedProgramData,
    currentFiddahe,
  } = usePumpingData(
    selectedNetworkId,
    idPumpStation,
    selectedMah,
    sal,
    mah,
    dahe,
    selectedDahe,
    pumpData,
    setPumpData
  );

  type ExtendedTaeedProgramData = TaeedProgramData & {
    fiddahe?: number;
  };

  const isFiddaheValid =
    ((taedProgramData as unknown as ExtendedTaeedProgramData)?.fiddahe ?? 0) >
    (currentFiddahe || 0) - 2;

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
        "Website Creator",
        "Website Admin",
        "Ezgele Water Users Representative",
        "Jegiran Water Users Representative",
        "Northern Zahab Water Users Representative",
        "Southern Zahab Water Users Representative",
        "Hoomeh Qaraviz Water Users Representative",
        "Beshiveh Water Users Representative",
        "Ghaleh Shahin Water Users Representative",
        "Water Users Representative South Jagarlu",
      ].includes(role)
    );

    const isTaedAbMantagheTrue = taedAbMantaghe.some(
      (record) => record.TaedAbMantaghe === true
    );

    setIsFormDisabled(
      isPastOrCurrentMonth ||
        isPastOrCurrentDahe ||
        !isUserRoleAllowed ||
        isTaedAbMantagheTrue
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
    setIsSaving(true);
    // منطق ذخیره‌سازی
  };

  const handleReset = () => {
    // منطق بازنشانی فرم
  };

  useEffect(() => {
    // فقط زمانی که ماه جاری را انتخاب می‌کنیم، دهه را به دهه جاری تنظیم کنیم
    if (selectedMah === currentMah && sal === currentSal) {
      setSelectedDahe(currentDahe);
      setDahe(currentDahe);
    }
  }, [selectedMah, sal, currentMah, currentSal, currentDahe, setDahe]);

  useEffect(() => {
    setIsStationLoaded(false);
    setPrevPumpStation(null);
  }, [idPumpStation]);

  useEffect(() => {
  if (idPumpStation > 0) {
    setIsStationLoaded(false);
    setPrevPumpStation(idPumpStation);
  }
}, [idPumpStation, setIsStationLoaded, setPrevPumpStation]);

  return (
    <div className="overflow-x-auto">
      {selectedNetworkId === null ? (
        <h2 className="py-4 text-center text-gray-600">
          لطفاً شبکه آبیاری مورد نظر را انتخاب کنید
        </h2>
      ) : idPumpStation <= 0 ? (
        <h2 className="py-4 text-center text-gray-600">
          لطفاً ایستگاه پمپاژ مورد نظر را انتخاب کنید
        </h2>
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
          taedProgramData={
            taedProgramData as unknown as TaeedProgramData | null
          }
          selectedZarfiat={selectedZarfiat}
          setSelectedZarfiat={setSelectedZarfiat}
          networkName={networkName}
          pumpStationName={pumpStationName}
          saleZeraee={saleZeraee}
          doreKesht={doreKesht}
          currentFiddahe={currentFiddahe}
          networkTrustee={networkTrustee}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
          isFiddaheValid={isFiddaheValid}
          isStationLoaded={isStationLoaded}
          setIsStationLoaded={setIsStationLoaded}
          prevPumpStation={prevPumpStation}
          setPrevPumpStation={setPrevPumpStation}
        />
      )}
    </div>
  );
};

export default BodyRequestPumping;
