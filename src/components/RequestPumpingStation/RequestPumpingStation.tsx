import {useState, useCallback} from 'react';
import HeaderRequestPumping from './HeaderForm';
import BodyRequestPumping from './BodyRequestPumping';
import LoadingSpinner from './LoadingSpinner'; // اضافه کردن import کامپوننت جدید
import {ShabakeDoreKeshtData} from './types';

const RequestPumpingStation = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [pumpStationName, setPumpStationName] = useState('');
  const [idPumpStation, setIdPumpStation] = useState<number>(0);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(
    null,
  );
  const [saleZeraee, setSaleZeraee] = useState('');
  const [doreKesht, setDoreKesht] = useState('');
  const [idShDo, setIdShDo] = useState<number | null>(null);
  const [networkTrustee, setNetworkTrustee] = useState<string | null>(null);

  const [currentDahe, setCurrentDahe] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [shabakeData, setShabakeData] = useState<ShabakeDoreKeshtData | null>(
    null,
  );
  const [currentSal, setCurrentSal] = useState<number>(
    new Date().getFullYear(),
  );
  const [currentMah, setCurrentMah] = useState<number>(
    new Date().getMonth() + 1,
  );

  const handleShabakeData = useCallback((data: ShabakeDoreKeshtData) => {
    setShabakeData(data);
    if (data.mahList && data.mahList.length > 0) {
      const currentDate = new Date();
      const currentMahItem = data.mahList.find(
        (item) =>
          item.sal === currentDate.getFullYear() &&
          item.mah === currentDate.getMonth() + 1,
      );
      const selectedMahItem = currentMahItem || data.mahList[0];
      setCurrentMah(selectedMahItem.mah);
      setCurrentSal(selectedMahItem.sal);
    }
  }, []);

  return (
    <div className="relative">
      {isSaving && <LoadingSpinner />} {/* جایگزینی با کامپوننت جدید */}
      <div className={isSaving ? 'pointer-events-none opacity-50' : ''}>
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
          idShDo={idShDo ?? 0}
          mah={currentMah}
          dahe={currentDahe}
          idPumpStation={idPumpStation}
          networkTrustee={networkTrustee}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
          shabakeData={shabakeData}
          setCurrentMah={setCurrentMah}
          setCurrentDahe={setCurrentDahe}
          currentSal={currentSal}
          setCurrentSal={setCurrentSal}
        />
      </div>
    </div>
  );
};

export default RequestPumpingStation;
