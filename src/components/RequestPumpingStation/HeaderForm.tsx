"use client";

import { useState, useEffect, memo } from "react";

interface HeaderRequestPumpingProps {
  setUserName: (name: string) => void;
  setUserRole: (roles: string[]) => void;
  setFirstName: (role: string) => void;
  setLastName: (role: string) => void;
  setNetworkName: (name: string) => void;
  setPumpStationName: (name: string) => void;
  setSelectedNetworkId: (id: number | null) => void;
  setIdPumpStation: (Id: number) => void;
  setSaleZeraee: (year: string) => void;
  setDoreKesht: (season: string) => void;
  setIdShDo: (Id: number) => void;
  setNetworkTrustee: (trustee: string | null) => void;
  isSaving?: boolean;
}

interface Network {
  idnet: number;
  network: string;
  trustee: string;
}

const HeaderRequestPumping = ({
  setUserName,
  setUserRole,
  setFirstName,
  setLastName,
  setNetworkName,
  setPumpStationName,
  setIdPumpStation,
  setSelectedNetworkId,
  setSaleZeraee,
  setDoreKesht,
  setIdShDo,
  setNetworkTrustee,
}: HeaderRequestPumpingProps) => {
  const [userPositions, setUserPositions] = useState<string[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [localSaleZeraee, setLocalSaleZeraee] = useState<string | null>(null);
  const [localDore, setLocalDore] = useState<string | null>(null);
  const [selectedSaleZeraee, setSelectedSaleZeraee] = useState<string>("");
  const [selectedDore, setSelectedDore] = useState<string>("");
  const [filteredNetworks, setFilteredNetworks] = useState<Network[]>([]);
  const [pumpStations, setPumpStations] = useState<
    { idpumpsta: number; namestation: string }[]
  >([]);
  const [selectedNetworkId, setLocalSelectedNetworkId] = useState<
    number | null
  >(null);
  const [selectedPumpStation, setSelectedPumpStation] = useState<string>("");
  const [networkTrusteeMap, setNetworkTrusteeMap] = useState<
    Record<number, string>
  >({});

  // Fetch user position data
  useEffect(() => {
    fetch("/api/user-position")
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.username);
        setUserPositions(data.positions);
        setUserRole(data.positions);
        setFirstName(data.firstname);
        setLastName(data.lastname);
      })
      .catch(console.error);
  }, [setFirstName, setLastName, setUserName, setUserRole]);

  // Fetch irrigation networks
  useEffect(() => {
    fetch("/api/irrigation-networks")
      .then((res) => res.json())
      .then((data) => {
        setNetworks(data.networks);
        const trusteeMap = data.networks.reduce(
          (acc: Record<number, string>, network: Network) => {
            acc[network.idnet] = network.trustee;
            return acc;
          },
          {}
        );
        setNetworkTrusteeMap(trusteeMap);
      })
      .catch(console.error);
  }, []);

  // Filter networks based on user positions
  useEffect(() => {
    if (userPositions.length === 0 || networks.length === 0) return;

    let allowedNetworks: string[] = [];
    let defaultNetwork: string | null = null;

    if (
      userPositions.some((pos) =>
        [
          "Website Creator",
          "Website Admin",
          "Operation Manager",
          "Electricity and Pumping Supervisor",
          "Network Operator",
          "Network Guard",
          "Regional Water Representative",
        ].includes(pos)
      )
    ) {
      allowedNetworks = networks.map((n) => n.network);
    }

    if (
      userPositions.some((pos) =>
        [
          "Supervisor of the First Pumping Set",
          "Operator of the First Pumping Set",
        ].includes(pos)
      )
    ) {
      allowedNetworks.push(...["ازگله", "جگیران", "ذهاب شمالی", "ذهاب جنوبی"]);
    }

    if (
      userPositions.some((pos) =>
        [
          "Supervisor of the Second Pumping Set",
          "Operator of the Second Pumping Set",
        ].includes(pos)
      )
    ) {
      allowedNetworks.push(
        ...["حومه قراویز", "بشیوه", "قلعه شاهین", "جگرلوی جنوبی"]
      );
    }

    const specialPositionsMap: Record<string, string> = {
      "Ezgele Water Users Representative": "ازگله",
      "Jegiran Water Users Representative": "جگیران",
      "Northern Zahab Water Users Representative": "ذهاب شمالی",
      "Southern Zahab Water Users Representative": "ذهاب جنوبی",
      "Hoomeh Qaraviz Water Users Representative": "حومه قراویز",
      "Beshiveh Water Users Representative": "بشیوه",
      "Ghaleh Shahin Water Users Representative": "قلعه شاهین",
      "Water Users Representative South Jagarlu": "جگرلوی جنوبی",
    };

    userPositions.forEach((pos) => {
      if (specialPositionsMap[pos]) {
        allowedNetworks.push(specialPositionsMap[pos]);
      }
    });

    allowedNetworks = Array.from(new Set(allowedNetworks));

    const userSpecialNetworks = userPositions
      .map((pos) => specialPositionsMap[pos])
      .filter(Boolean);

    if (userSpecialNetworks.length === 1) {
      defaultNetwork = userSpecialNetworks[0];
    }

    const newFilteredNetworks = networks
      .filter((n) => allowedNetworks.includes(n.network))
      .sort((a, b) => a.idnet - b.idnet);

    setFilteredNetworks(newFilteredNetworks);

    if (defaultNetwork) {
      setSelectedNetwork(defaultNetwork);
      const defaultNetworkObj = newFilteredNetworks.find(
        (n) => n.network === defaultNetwork
      );
      if (defaultNetworkObj) {
        setNetworkName(defaultNetworkObj.network);
        setLocalSelectedNetworkId(defaultNetworkObj.idnet);
        setSelectedNetworkId(defaultNetworkObj.idnet);
        setNetworkTrustee(defaultNetworkObj.trustee);
      }
    }
  }, [
    userPositions,
    networks,
    setNetworkName,
    setSelectedNetworkId,
    setNetworkTrustee,
  ]);

  // Handle single network case
  useEffect(() => {
    if (
      filteredNetworks.length === 1 &&
      selectedNetworkId !== filteredNetworks[0].idnet
    ) {
      const network = filteredNetworks[0];
      setSelectedNetwork(network.network);
      setNetworkName(network.network);
      setLocalSelectedNetworkId(network.idnet);
      setSelectedNetworkId(network.idnet);
      setNetworkTrustee(network.trustee);
    }
  }, [
    filteredNetworks,
    selectedNetworkId,
    setNetworkName,
    setSelectedNetworkId,
    setNetworkTrustee,
  ]);

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const networkName = event.target.value;
    setSelectedNetwork(networkName);
    setNetworkName(networkName);

    const network = networks.find((n) => n.network === networkName);
    if (network) {
      setLocalSelectedNetworkId(network.idnet);
      setSelectedNetworkId(network.idnet);
      setNetworkTrustee(networkTrusteeMap[network.idnet]);
    } else {
      setLocalSelectedNetworkId(null);
      setSelectedNetworkId(null);
      setNetworkTrustee(null);
    }
  };

  const handlePumpStationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const stationName = event.target.value;
    setSelectedPumpStation(stationName);
    setPumpStationName(stationName);

    const selectedStation = pumpStations.find(
      (station) => station.namestation === stationName
    );

    if (selectedStation) {
      setIdPumpStation(selectedStation.idpumpsta);
    } else {
      setIdPumpStation(0);
    }
  };

  // Fetch pump stations
  useEffect(() => {
    if (selectedNetworkId !== null) {
      fetch(`/api/pump-stations?networkId=${selectedNetworkId}&FIdDP=2`)
        .then((res) => res.json())
        .then((data) => {
          setPumpStations(data.pumpStations);

          if (data.pumpStations.length === 1) {
            const station = data.pumpStations[0];
            setSelectedPumpStation(station.namestation);
            setPumpStationName(station.namestation);
            setIdPumpStation(station.idpumpsta);
          } else {
            setSelectedPumpStation("");
            setPumpStationName("");
            setIdPumpStation(0);
          }
        })
        .catch(console.error);
    }
  }, [selectedNetworkId, setIdPumpStation, setPumpStationName]);

  // Fetch network data
  useEffect(() => {
    if (selectedNetworkId !== null) {
      fetch(`/api/network-data?networkId=${selectedNetworkId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            setLocalSaleZeraee(data.SaleZeraee || "");
            setLocalDore(data.Dore || "");
            setSaleZeraee(data.SaleZeraee || "");
            setDoreKesht(data.Dore || "");
            setIdShDo(data.IdShDo || "");
          }
        })
        .catch((error) => console.error("خطا در دریافت اطلاعات:", error));
    }
  }, [selectedNetworkId, setDoreKesht, setIdShDo, setSaleZeraee]);

  return (
    <div
      id="header-form"
      className="container flex flex-wrap items-center justify-center gap-2 rounded-lg bg-blue-100 px-2 shadow-md"
    >
      {/* شبکه آبیاری */}
      <div className="flex items-center gap-1">
        <label className="text-sm font-semibold" htmlFor="network">
          شبکه آبیاری
        </label>
        {filteredNetworks.length === 1 ? (
          <input
            type="text"
            value={filteredNetworks[0].network}
            readOnly
            className="w-32 rounded-lg border bg-gray-200 p-1 text-sm"
          />
        ) : (
          <select
            id="network"
            className="w-32 rounded-lg border p-1 text-sm"
            value={selectedNetwork || ""}
            onChange={handleNetworkChange}
          >
            <option value="" disabled hidden>
              انتخاب کنید
            </option>
            {filteredNetworks.map((network) => (
              <option key={`network-${network.idnet}`} value={network.network}>
                {network.network}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* ایستگاه پمپاژ */}
      {filteredNetworks.length === 1 || selectedNetwork ? (
        <div className="flex items-center gap-1">
          <label className="text-sm font-semibold" htmlFor="pumpStation">
            ایستگاه
          </label>
          {pumpStations.length === 1 ? (
            <input
              type="text"
              id="pumpStation"
              className="w-32 rounded-lg border bg-gray-200 p-1 text-sm"
              value={pumpStations[0].namestation}
              readOnly
            />
          ) : (
            <select
              id="pumpStation"
              className="w-32 rounded-lg border p-1 text-sm"
              value={selectedPumpStation}
              onChange={handlePumpStationChange}
              disabled={!selectedNetwork}
            >
              <option value="" disabled hidden>
                انتخاب کنید
              </option>
              {pumpStations.map((station, index) => (
                <option
                  key={`station-${station.idpumpsta || `fallback-${index}`}`}
                  value={station.namestation}
                >
                  {station.namestation}
                </option>
              ))}
            </select>
          )}
        </div>
      ) : null}

      {/* سال زراعی */}
      {(filteredNetworks.length === 1 || selectedNetwork) &&
      (pumpStations.length === 1 || selectedPumpStation) ? (
        <div className="flex items-center gap-1">
          <label className="text-sm font-semibold" htmlFor="saleZeraee">
            سال زراعی
          </label>
          {Array.isArray(localSaleZeraee) && localSaleZeraee.length === 1 ? (
            <input
              type="text"
              id="saleZeraee"
              className="w-24 rounded-lg border bg-gray-200 p-1 text-sm"
              value={localSaleZeraee[0]}
              readOnly
            />
          ) : (
            <select
              id="saleZeraee"
              className="w-24 rounded-lg border p-1 text-sm"
              value={selectedSaleZeraee}
              onChange={(e) => setSelectedSaleZeraee(e.target.value)}
              disabled={!selectedNetwork}
            >
              <option value="" disabled hidden>
                انتخاب کنید
              </option>
              {Array.isArray(localSaleZeraee) &&
                localSaleZeraee.map((year, index) => (
                  <option key={`year-${index}`} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          )}
        </div>
      ) : null}

      {/* دوره کشت */}
      {(filteredNetworks.length === 1 || selectedNetwork) &&
      (pumpStations.length === 1 || selectedPumpStation) ? (
        <div className="flex items-center gap-1">
          <label className="text-sm font-semibold" htmlFor="dore">
            دوره کشت
          </label>
          {Array.isArray(localDore) && localDore.length === 1 ? (
            <input
              type="text"
              id="dore"
              className="w-24 rounded-lg border bg-gray-200 p-1 text-sm"
              value={localDore[0]}
              readOnly
            />
          ) : (
            <select
              id="dore"
              className="w-24 rounded-lg border p-1 text-sm"
              value={selectedDore}
              onChange={(e) => setSelectedDore(e.target.value)}
              disabled={!selectedNetwork}
            >
              <option value="" disabled hidden>
                انتخاب کنید
              </option>
              {Array.isArray(localDore) &&
                localDore.map((d, index) => (
                  <option key={`dore-${index}`} value={d}>
                    {d}
                  </option>
                ))}
            </select>
          )}
        </div>
      ) : null}
    </div>
  );
};

const HeaderForm = memo(HeaderRequestPumping);

export default HeaderForm;
