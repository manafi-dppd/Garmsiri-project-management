import { useState } from 'react';
import HeaderRequestPumping from './HeaderForm';
import BodyRequestPumping from './BodyRequestPumping';
import LoadingSpinner from './LoadingSpinner'; // اضافه کردن import کامپوننت جدید

const RequestPumpingStation = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [pumpStationName, setPumpStationName] = useState('');
  const [idPumpStation, setIdPumpStation] = useState<number>(0);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(null);
  const [saleZeraee, setSaleZeraee] = useState('');
  const [doreKesht, setDoreKesht] = useState('');
  const [idShDo, setIdShDo] = useState<number | null>(null);
  const [networkTrustee, setNetworkTrustee] = useState<string | null>(null);

  const [currentMah] = useState(1);
  const [currentDahe] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

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
        />
      </div>
    </div>
  );
};

export default RequestPumpingStation;