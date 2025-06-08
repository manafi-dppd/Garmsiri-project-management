import * as React from "react";
import { KhatRanesh } from "../types";
import { PumpingData, RecordType } from "../types";
import PumpingTable from "../components/PumpingTable";
import PumpingTablePDF from "../components/PumpingTablePDF";
import PumpingActions from "../PumpingActions";
import PaginationForMah, { convertMahToPersian } from "../PaginationForMah"; // اضافه کردن import برای PaginationForMah
import { TaeedProgramData } from "../types";
import AlertModal from "../../AlertModal";
interface PumpingFormProps {
  setSelectedMah: (value: number) => void;
  khatRaneshList: KhatRanesh[];
  pumpData: { [idTarDor: number]: { [idRanesh: number]: PumpingData } };
  setPumpData: (data: {
    [idTarDor: number]: { [idRanesh: number]: PumpingData };
  }) => void;
  selectedPumpCounts: { [key: number]: { [date: string]: number } };
  timeValues: {
    [key: number]: { [key: number]: { from: string; to: string } };
  };
  handlePumpCountChange: (
    recordId: number,
    raneshId: number,
    value: number
  ) => void;
  handleTimeChange: (
    recordId: number,
    raneshId: number,
    field: "from" | "to",
    value: string
  ) => void;
  updateTime: (
    idTarDor: number,
    idRanesh: number,
    field: "from" | "to",
    type: "hour" | "minute",
    increment: number
  ) => void;
  records: RecordType[];
  message: string | null;
  finalVolumes: { [key: number]: number };
  isFormDisabled: boolean;
  validationErrors: { date: string; raneshName: string; message: string }[];
  setValidationErrors: (
    errors: { date: string; raneshName: string; message: string }[]
  ) => void;
  handleSave: () => void;
  handleReset: () => void;
  isFormFilled: boolean;
  selectedMah: number;
  selectedDahe: number;
  setSelectedDahe: (value: number) => void;
  setDahe: (value: number) => void; // اضافه کردن setDahe به props
  allDates: { mah: number; dahe: number }[];
  mahList: { mah: number; sal: number }[];
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
  networkName: string;
  pumpStationName: string;
  saleZeraee: string;
  doreKesht: string;
  selectedZarfiat: { [key: number]: { [key: number]: number } };
  setSelectedZarfiat: React.Dispatch<
    React.SetStateAction<{ [key: number]: { [key: number]: number } }>
  >;
  onMahChange?: (mah: number) => void;
  onDaheChange?: (dahe: number) => void;
  networkTrustee: string | null;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  isFiddaheValid: boolean;
  taedProgramData: TaeedProgramData | null;
  currentFiddahe?: number | null;
  isStationLoaded: boolean;
  setIsStationLoaded: (value: boolean) => void;
  prevPumpStation: number | null;
  setPrevPumpStation: (value: number | null) => void;
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
  dahe, //
  firstName, // دریافت firstName از پراپ‌ها
  lastName, // دریافت lastName از پراپ‌ها
  networkName,
  pumpStationName,
  saleZeraee,
  doreKesht,
  selectedZarfiat,
  setSelectedZarfiat,
  onMahChange,
  networkTrustee,
  isSaving,
  setIsSaving,
  taedProgramData,
  currentFiddahe,
}) => {
  const [isStationLoaded, setIsStationLoaded] = React.useState(false);
  const [prevPumpStation, setPrevPumpStation] = React.useState<number | null>(
    null
  );
  const [alertState, setAlertState] = React.useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    type?: "info" | "warning" | "success" | "error";
    buttons?: {
      text: string;
      variant: "primary" | "secondary" | "danger" | "success";
      onClick: () => void;
    }[];
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  const showAlert = (
    title: string,
    message: React.ReactNode,
    type: "info" | "warning" | "success" | "error" = "info",
    buttons?: {
      text: string;
      variant: "primary" | "secondary" | "danger" | "success";
      onClick: () => void;
    }[]
  ) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
      buttons,
    });
  };
  const isFiddaheValid = taedProgramData?.fiddahe
    ? taedProgramData.fiddahe > (currentFiddahe || 0) - 2
    : false;
  // تغییر هندلرهای انتخاب ماه و دهه
  const handleMahSelection = (item: { mah: number; sal: number }) => {
    setIsDataLoaded(false);
    setSelectedMah(item.mah);
    setSal(item.sal);
    setMah(item.mah);
    setSelectedDahe(
      item.mah === currentMah && item.sal === currentSal ? currentDahe : 1
    );
    onMahChange?.(item.mah);
  };

  const memoizedPumpData = React.useMemo(() => pumpData, [pumpData]);
  const shouldShowPumpingTableEditable = () => {
    const allowedRoles = [
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
    ];

    const hasAllowedRole = userRole.some((role) => allowedRoles.includes(role));
    const isTaedAbMantagheTrue = taedProgramData?.taedabmantaghe === true;
    return hasAllowedRole && !isTaedAbMantagheTrue && isFiddaheValid;
  };
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [prevTaedProgramData, setPrevTaedProgramData] =
    React.useState<TaeedProgramData | null>(null);

  React.useEffect(() => {
    if (idPumpStation > 0 && idPumpStation !== prevPumpStation) {
      setIsStationLoaded(false);
      setPrevPumpStation(idPumpStation);
    }
  }, [idPumpStation, prevPumpStation]);

  // این useEffect برای ردیابی بارگذاری داده‌ها
  React.useEffect(() => {
    if (taedProgramData && taedProgramData !== prevTaedProgramData) {
      setIsDataLoaded(true);
      setPrevTaedProgramData(taedProgramData);
    } else {
      setIsDataLoaded(false);
    }
  }, [taedProgramData, prevTaedProgramData]);

  const checkForToziheslah = React.useCallback(() => {
    if (!isDataLoaded || !taedProgramData) return;

    if (!taedProgramData.toziheslah?.trim()) return;

    const daheText = dahe === 1 ? "اول" : dahe === 2 ? "دوم" : "سوم";
    const mahText = convertMahToPersian(selectedMah);

    showAlert(
      "نیاز به اصلاح", // title
      <div style={{ direction: "rtl", textAlign: "right" }}>
        برنامه دهه {daheText} {mahText} ماه ایستگاه {pumpStationName} بایستی
        اصلاح شود
      </div>, // message
      "warning", // type
      [
        // buttons
        {
          text: "توضیحات",
          variant: "primary",
          onClick: () => {
            showAlert(
              "توضیحات اصلاح",
              <div style={{ direction: "rtl", textAlign: "right" }}>
                {taedProgramData.toziheslah}
              </div>,
              "info"
            );
          },
        },
        {
          text: "بستن",
          variant: "secondary",
          onClick: () => setAlertState({ ...alertState, isOpen: false }),
        },
      ]
    );
  }, [
    isDataLoaded,
    taedProgramData,
    dahe,
    selectedMah,
    pumpStationName,
    alertState,
  ]);

  // این useEffect برای اجرای بررسی پس از بارگذاری داده‌ها
  React.useEffect(() => {
    if (isDataLoaded) {
      checkForToziheslah();
    }
  }, [isDataLoaded, checkForToziheslah]);
  React.useEffect(() => {
    if (isStationLoaded) {
      checkForToziheslah();
    }
  }, [isStationLoaded, checkForToziheslah]);
  return (
    <div className="rounded-lg bg-gray-100 p-1 shadow-md h-[80vh] min-h-[500px] max-h-[90vh] overflow-y-auto">
      {selectedNetworkId !== null && idPumpStation !== 0 && (
        <div className="w-full overflow-x-auto pb-2">
          <div className="flex min-w-max">
            <div className="flex rounded-lg bg-gray-100 p-1 shadow-inner">
              {[...mahList]
                .sort((a, b) => a.sal - b.sal || a.mah - b.mah)
                .map((item, index) => (
                  <button
                    key={`${item.mah}-${item.sal}`}
                    className={`
              relative whitespace-nowrap px-3 py-1.5 text-xs font-medium
              sm:px-3.5 sm:text-sm
              md:px-4 md:py-2
              ${
                selectedMah === item.mah && sal === item.sal
                  ? "z-10 transform rounded-md border border-blue-300 bg-white font-semibold text-blue-600 shadow-lg transition-all duration-200"
                  : "border-l border-r border-t border-b border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
              }
              ${index === 0 ? "rounded-l-md border-l" : ""}
              ${index === mahList.length - 1 ? "rounded-r-md border-r" : ""}
            `}
                    onClick={() => handleMahSelection(item)}
                  >
                    {convertMahToPersian(item.mah)} {item.sal}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
      {selectedMah !== null && sal !== null && (
        <div>
          <PaginationForMah
            selectedMah={selectedMah}
            sal={sal}
            selectedDahe={selectedDahe}
            dahe={dahe}
            setSelectedDahe={setSelectedDahe}
            setDahe={setDahe}
            allDates={allDates}
            onDaheChange={() => setIsDataLoaded(false)}
          />
        </div>
      )}
      <div className="w-full overflow-x-auto">
        {shouldShowPumpingTableEditable() ? (
          <PumpingTable
            khatRaneshList={khatRaneshList}
            records={records}
            pumpData={memoizedPumpData}
            setPumpData={(
              data:
                | { [idTarDor: number]: { [idRanesh: number]: PumpingData } }
                | ((prev: {
                    [idTarDor: number]: { [idRanesh: number]: PumpingData };
                  }) => {
                    [idTarDor: number]: { [idRanesh: number]: PumpingData };
                  })
            ) => {
              if (typeof data === "function") {
                setPumpData(data(pumpData));
              } else {
                setPumpData(data);
              }
            }}
            selectedPumpCounts={selectedPumpCounts}
            timeValues={timeValues}
            handlePumpCountChange={handlePumpCountChange}
            handleTimeChange={handleTimeChange}
            updateTime={updateTime}
            message={message}
            finalVolumes={finalVolumes}
            selectedZarfiat={selectedZarfiat}
            setSelectedZarfiat={setSelectedZarfiat}
          />
        ) : (
          <PumpingTablePDF
            khatRaneshList={khatRaneshList}
            records={records}
            pumpData={memoizedPumpData}
            selectedPumpCounts={selectedPumpCounts}
            timeValues={timeValues}
            selectedZarfiat={selectedZarfiat}
            finalVolumes={finalVolumes}
          />
        )}
      </div>
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
        mah={selectedMah} // پاس دادن ماه
        dahe={dahe} // پاس دادن دهه
        firstName={firstName} // پاس دادن firstName
        lastName={lastName} // پاس دادن lastName
        taedProgramData={taedProgramData}
        selectedZarfiat={selectedZarfiat} // اضافه کردن selectedZarfiat
        setSelectedZarfiat={setSelectedZarfiat}
        userName={""}
        networkName={networkName}
        pumpStationName={pumpStationName}
        selectedNetworkId={null}
        saleZeraee={saleZeraee}
        doreKesht={doreKesht}
        idShDo={0}
        finalVolumes={finalVolumes}
        networkTrustee={networkTrustee}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
        isFiddaheValid={isFiddaheValid}
      />
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={() => setAlertState({ ...alertState, isOpen: false })}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        buttons={alertState.buttons}
      />
    </div>
  );
};

export default PumpingForm;
