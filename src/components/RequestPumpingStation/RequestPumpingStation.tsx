import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import HeaderRequestPumping from "./HeaderForm";
import BodyRequestPumping from "./BodyRequestPumping";
import LoadingSpinner from "./LoadingSpinner";
import { ShabakeDoreKeshtData, NetworkDataResponse } from "./types";
import { getCurrentSalMahDahe } from "./utils/dateUtils";

const RequestPumpingStation = () => {
  const locale = useLocale();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [pumpStationName, setPumpStationName] = useState("");
  const [idPumpStation, setIdPumpStation] = useState<number>(0);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(
    null
  );
  const [saleZeraee, setSaleZeraee] = useState("");
  const [doreKesht, setDoreKesht] = useState("");
  const [idShDo, setIdShDo] = useState<number>(0);
  const [networkTrustee, setNetworkTrustee] = useState<string | null>(null);
  const [currentDahe, setCurrentDahe] = useState<number>(
    locale === "fa" ? getCurrentSalMahDahe().dahe : 1
  );
  const [isSaving, setIsSaving] = useState(false);
  const [shabakeData, setShabakeData] = useState<ShabakeDoreKeshtData | null>(
    null
  );
  const [networkData, setNetworkData] = useState<NetworkDataResponse | null>(
    null
  );
  const [currentSal, setCurrentSal] = useState<number>(
    locale === "fa" ? getCurrentSalMahDahe().sal : new Date().getFullYear()
  );
  const [currentMah, setCurrentMah] = useState<number>(
    locale === "fa" ? getCurrentSalMahDahe().mah : new Date().getMonth() + 1
  );

  const handleShabakeData = useCallback(
    (data: ShabakeDoreKeshtData) => {
      console.log("[RequestPumpingStation] Shabake data received:", data);
      setShabakeData(data);
      if (data.mahList && data.mahList.length > 0) {
        const {
          sal: currentSal,
          mah: currentMah,
          dahe: currentDahe,
        } = locale === "fa"
          ? getCurrentSalMahDahe()
          : {
              sal: new Date().getFullYear(),
              mah: new Date().getMonth() + 1,
              dahe: 1,
            };
        const selectedMahItem =
          data.mahList.find(
            (item) => item.sal === currentSal && item.mah === currentMah
          ) || data.mahList[0];
        setCurrentMah(selectedMahItem.mah);
        setCurrentSal(selectedMahItem.sal);
        setCurrentDahe(currentDahe);
        console.log(
          "[RequestPumpingStation] Selected mahItem:",
          selectedMahItem
        );
      }
      if (data.IdShDo) {
        console.log("[RequestPumpingStation] Setting IdShDo:", data.IdShDo);
        setIdShDo(data.IdShDo);
      }
    },
    [locale]
  );

  const handleNetworkData = useCallback((data: NetworkDataResponse) => {
    console.log("[RequestPumpingStation] Network data received:", data);
    setNetworkData(data);
    if (data.currentSaleZeraee) {
      console.log(
        "[RequestPumpingStation] Setting saleZeraee:",
        data.currentSaleZeraee.name
      );
      setSaleZeraee(data.currentSaleZeraee.name);
    }
    if (data.currentDoreKesht) {
      console.log(
        "[RequestPumpingStation] Setting doreKesht:",
        data.currentDoreKesht.name
      );
      setDoreKesht(data.currentDoreKesht.name);
    }
    if (data.IdShDo) {
      console.log("[RequestPumpingStation] Setting IdShDo:", data.IdShDo);
      setIdShDo(data.IdShDo);
    }
  }, []);

  return (
    <div className="relative">
      {isSaving && <LoadingSpinner />}
      <div className={isSaving ? "pointer-events-none opacity-50" : ""}>
        <HeaderRequestPumping
          setUserName={setUserName}
          setUserRole={setUserRole}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setNetworkName={setNetworkName}
          setPumpStationName={setPumpStationName}
          setSelectedNetworkId={setSelectedNetworkId}
          setIdPumpStation={setIdPumpStation}
          setSaleZeraee={setSaleZeraee}
          setDoreKesht={setDoreKesht}
          setIdShDo={setIdShDo}
          setNetworkTrustee={setNetworkTrustee}
          isSaving={isSaving}
          onShabakeDataChange={handleShabakeData}
          onNetworkDataChange={handleNetworkData}
        />
        <BodyRequestPumping
          userName={userName}
          userRole={userRole}
          firstName={firstName}
          lastName={lastName}
          networkName={networkName}
          pumpStationName={pumpStationName}
          selectedNetworkId={selectedNetworkId}
          saleZeraee={saleZeraee}
          doreKesht={doreKesht}
          idPumpStation={idPumpStation}
          networkTrustee={networkTrustee}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
          shabakeData={shabakeData}
          networkData={networkData}
          setCurrentMah={setCurrentMah}
          setCurrentDahe={setCurrentDahe}
          currentSal={currentSal}
          setCurrentSal={setCurrentSal}
          idShDo={idShDo}
          mah={currentMah}
          dahe={currentDahe}
        />
      </div>
    </div>
  );
};

export default RequestPumpingStation;
