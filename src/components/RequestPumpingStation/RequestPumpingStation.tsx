import {useState} from 'react';
import HeaderRequestPumping from './HeaderForm';
import BodyRequestPumping from './BodyRequestPumping';

const RequestPumpingStation = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [pumpStationName, setPumpStationName] = useState('');
  const [idPumpStation, setIdPumpStation] = useState<number | null>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(
    null,
  );
  const [saleZeraee, setSaleZeraee] = useState('');
  const [doreKesht, setDoreKesht] = useState('');
  const [idShDo, setIdShDo] = useState<number | null>(null);
  return (
    <div>
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
      />
      <BodyRequestPumping
        userName={userName}
        userRole={userRole}
        firstName={firstName}
        lastName={lastName}
        networkName={networkName}
        pumpStationName={pumpStationName}
        selectedNetworkId={selectedNetworkId}
        idPumpStation={idPumpStation ?? 0}
        saleZeraee={saleZeraee}
        doreKesht={doreKesht}
        idShDo={idShDo ?? 0}
      />
    </div>
  );
};

export default RequestPumpingStation;
