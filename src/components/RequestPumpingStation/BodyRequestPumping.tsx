import * as React from "react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getCurrentSalMahDahe } from "../../utils/dateUtils";
import PumpingForm from "./PumpingForm";
import { usePumpingData } from "./hooks/usePumpingData";
import { usePumpingTime } from "./hooks/usePumpingTime";
import {
  TaeedProgramData,
  NetworkDataResponse,
  ShabakeDoreKeshtData,
  MahItem,
  PumpingData,
  KhatRanesh,
  RecordType,
} from "./types";

interface BodyRequestPumpingProps {
  userName?: string;
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
  mah: number;
  dahe: number;
  networkTrustee: string | null;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  shabakeData: ShabakeDoreKeshtData | null;
  networkData: NetworkDataResponse | null;
  currentSal: number;
  setCurrentSal: (value: number) => void;
  setCurrentMah: (value: number) => void;
  setCurrentDahe: (value: number) => void;
}

const BodyRequestPumping: React.FC<BodyRequestPumpingProps> = ({
  // userName,
  firstName,
  lastName,
  networkName,
  pumpStationName,
  selectedNetworkId,
  idPumpStation,
  saleZeraee,
  doreKesht,
  // idShDo,
  networkTrustee,
  isSaving,
  setIsSaving,
  userRole,
  shabakeData,
  networkData,
  // currentSal,
  setCurrentSal,
  setCurrentMah,
  setCurrentDahe,
}) => {
  const t = useTranslations("BodyRequestPumping");
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
    setPumpData,
    shabakeData,
    networkData
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
    console.log("[BodyRequestPumping] shabakeData:", shabakeData);
    console.log("[BodyRequestPumping] networkData:", networkData);
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
      (record) => record.taedabmantaghe === true
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
    userRole,
    taedAbMantaghe,
    shabakeData,
    networkData,
    currentMah,
    currentDahe,
  ]);

  const handleSave = () => {
    setIsSaving(true);
    // منطق ذخیره‌سازی
  };

  const handleReset = () => {
    // منطق بازنشانی فرم
  };

  // useEffect(() => {
    // if (shabakeData?.mahList && shabakeData.mahList.length > 0) {
    //   const currentDate = new Date();
    //   const currentMahItem =
    //     shabakeData.mahList.find(
    //       (item: MahItem) =>
    //         item.sal === currentDate.getFullYear() &&
    //         item.mah === currentDate.getMonth() + 1
    //     ) || shabakeData.mahList[0];
    // setSal(currentSal);
    // setMah(currentMah);
    // setSelectedMah(currentMah);
    // setCurrentMah(currentMahItem.mah);
    // setCurrentSal(currentMahItem.sal);
    // }
  // }, [shabakeData, setCurrentMah, setCurrentSal]);


  useEffect(() => {
    if (selectedMah === currentMah && sal === currentSal) {
      setSelectedDahe(currentDahe);
      setDahe(currentDahe);
      // setCurrentDahe(currentDahe);
    }
  }, [selectedMah, sal, currentSal, setCurrentDahe, currentMah, currentDahe]);

  useEffect(() => {
    setIsStationLoaded(false);
    setPrevPumpStation(null);
  }, [idPumpStation]);

  useEffect(() => {
    if (idPumpStation > 0) {
      setIsStationLoaded(false);
      setPrevPumpStation(idPumpStation);
    }
  }, [idPumpStation]);

  return (
    <div className="overflow-x-auto">
      {selectedNetworkId === null ? (
        <h2 className="py-4 text-center text-gray-600">
          {t("selectIrrigationNetwork")}
        </h2>
      ) : idPumpStation <= 0 ? (
        <h2 className="py-4 text-center text-gray-600">
          {t("selectPumpStation")}
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
          currentMah={mah}
          currentSal={sal}
          currentDahe={dahe}
          selectedNetworkId={selectedNetworkId}
          idPumpStation={idPumpStation}
          setSelectedMah={setSelectedMah}
          setSal={setSal}
          setMah={setMah}
          userRole={userRole}
          firstName={firstName}
          lastName={lastName}
          taedProgramData={
            taedProgramData as unknown as TaeedProgramData | null
          }
          selectedZarfiat={selectedZarfiat}
          setSelectedZarfiat={setSelectedZarfiat}
          networkName={networkName}
          pumpStationName={pumpStationName}
          currentFiddahe={currentFiddahe}
          networkTrustee={networkTrustee}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
          isFiddaheValid={isFiddaheValid}
          isStationLoaded={isStationLoaded}
          setIsStationLoaded={setIsStationLoaded}
          prevPumpStation={prevPumpStation}
          setPrevPumpStation={setPrevPumpStation}
          shabakeData={shabakeData}
          // networkData={networkData}
          setCurrentMah={setCurrentMah}
          setCurrentDahe={setCurrentDahe}
          setCurrentSal={setCurrentSal}
          dahe={dahe}
          mah={mah}
          saleZeraee={saleZeraee}
          doreKesht={doreKesht}
        />
      )}
    </div>
  );
};

export default BodyRequestPumping;
