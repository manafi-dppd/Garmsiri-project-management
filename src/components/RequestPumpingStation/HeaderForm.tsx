"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { NetworkDataResponse, ShabakeDoreKeshtData } from "./types";


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
  onShabakeDataChange?: (data: ShabakeDoreKeshtData) => void;
  onNetworkDataChange?: (data: NetworkDataResponse) => void;
}

interface Network {
  idnet: number;
  network: string;
  network_fa: string | null;
  network_ar: string | null;
  network_tr: string | null;
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
  isSaving,
  onShabakeDataChange,
  onNetworkDataChange,
}: HeaderRequestPumpingProps) => {
  const t = useTranslations("HeaderRequestPumping");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [userPositions, setUserPositions] = useState<
    { id: number; title: string }[]
  >([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [networkData, setNetworkData] = useState<NetworkDataResponse | null>(
    null
  );
  const [shabakeData, setShabakeData] = useState<ShabakeDoreKeshtData | null>(
    null
  );
  const [selectedSaleZeraee, setSelectedSaleZeraee] = useState<string>("");
  const [selectedDore, setSelectedDore] = useState<string>("");
  const [selectedIdsal, setSelectedIdsal] = useState<number | null>(null);
  const [selectedIddore, setSelectedIddore] = useState<number | null>(null);
  const [filteredNetworks, setFilteredNetworks] = useState<Network[]>([]);
  const [pumpStations, setPumpStations] = useState<
    {
      idpumpsta: number;
      namestation: string;
      namestation_fa: string | null;
      namestation_ar: string | null;
      namestation_tr: string | null;
    }[]
  >([]);
  const [selectedNetworkId, setLocalSelectedNetworkId] = useState<
    number | null
  >(null);
  const [selectedPumpStation, setSelectedPumpStation] = useState<string>("");
  const [networkTrusteeMap, setNetworkTrusteeMap] = useState<
    Record<number, string>
  >({});
  const [calendarFetched, setCalendarFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocalizedNetworkName = useCallback(
    (network: Network): string => {
      switch (locale) {
        case "en":
          return network.network;
        case "fa":
          return network.network_fa || network.network;
        case "ar":
          return network.network_ar || network.network;
        case "tr":
          return network.network_tr || network.network;
        default:
          return network.network_fa || network.network;
      }
    },
    [locale]
  );

  const getLocalizedPumpStationName = useCallback(
    (station: {
      namestation: string;
      namestation_fa: string | null;
      namestation_ar: string | null;
      namestation_tr: string | null;
    }): string => {
      switch (locale) {
        case "en":
          return station.namestation;
        case "fa":
          return station.namestation_fa || station.namestation;
        case "ar":
          return station.namestation_ar || station.namestation;
        case "tr":
          return station.namestation_tr || station.namestation;
        default:
          return station.namestation_fa || station.namestation;
      }
    },
    [locale]
  );

  const getLocalizedDoreKesht = useCallback((dore: string): string => {
    return dore;
  }, []);

  useEffect(() => {
    console.log("[HeaderForm] Fetching user positions...");
    fetch("/api/user-position", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user position");
        return res.json();
      })
      .then((data) => {
        console.log("[HeaderForm] User position data:", data);
        setUserName(data.username);
        setUserPositions(data.positions);
        setUserRole(data.positions.map((pos: { title: string }) => pos.title));
        setFirstName(data.firstname);
        setLastName(data.lastname);
      })
      .catch((error) => {
        console.error("[HeaderForm] Error fetching user position:", error);
        setError(t("fetchError"));
      });
  }, [setFirstName, setLastName, setUserName, setUserRole, t]);

  useEffect(() => {
    console.log("[HeaderForm] Fetching irrigation networks...");
    fetch("/api/irrigation-networks", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch irrigation networks");
        return res.json();
      })
      .then((data) => {
        console.log("[HeaderForm] Irrigation networks:", data);
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
      .catch((error) => {
        console.error(
          "[HeaderForm] Error fetching irrigation networks:",
          error
        );
        setError(t("fetchError"));
      });
  }, [t]);

  useEffect(() => {
    if (userPositions.length === 0 || networks.length === 0) return;

    const fetchAllowedNetworks = async () => {
      console.log("[HeaderForm] Fetching allowed networks...");
      let allowedNetworks: string[] = [];

      for (const position of userPositions) {
        try {
          const response = await fetch(
            `/api/position-networks?positionId=${position.id}`,
            { credentials: "include" }
          );
          if (!response.ok)
            throw new Error("Failed to fetch position networks");
          const data = await response.json();
          console.log(
            "[HeaderForm] Position networks for position",
            position.id,
            ":",
            data
          );
          if (data.networks) {
            allowedNetworks.push(
              ...data.networks.map((n: Network) => n.network)
            );
          }
        } catch (error) {
          console.error(
            `[HeaderForm] Error fetching networks for position ${position.id}:`,
            error
          );
          setError(t("fetchError"));
        }
      }

      allowedNetworks = Array.from(new Set(allowedNetworks));

      const newFilteredNetworks = networks
        .filter((n) => allowedNetworks.includes(n.network))
        .sort((a, b) => a.idnet - b.idnet);

      console.log("[HeaderForm] Filtered networks:", newFilteredNetworks);
      setFilteredNetworks(newFilteredNetworks);

      if (newFilteredNetworks.length === 1) {
        const defaultNetwork = newFilteredNetworks[0];
        setSelectedNetwork(defaultNetwork.network);
        setNetworkName(getLocalizedNetworkName(defaultNetwork));
        setLocalSelectedNetworkId(defaultNetwork.idnet);
        setSelectedNetworkId(defaultNetwork.idnet);
        setNetworkTrustee(defaultNetwork.trustee);
      }
    };

    fetchAllowedNetworks();
  }, [
    userPositions,
    networks,
    setNetworkName,
    setSelectedNetworkId,
    setNetworkTrustee,
    getLocalizedNetworkName,
    t,
  ]);

  useEffect(() => {
    if (
      filteredNetworks.length === 1 &&
      selectedNetworkId !== filteredNetworks[0].idnet
    ) {
      console.log(
        "[HeaderForm] Setting default network for single filtered network"
      );
      const network = filteredNetworks[0];
      setSelectedNetwork(network.network);
      setNetworkName(getLocalizedNetworkName(network));
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
    getLocalizedNetworkName,
  ]);

  useEffect(() => {
    if (selectedNetworkId === null) {
      console.log(
        "[HeaderForm] No selected network, skipping network data fetch"
      );
      return;
    }

    const fetchNetworkData = async () => {
      console.log(
        "[HeaderForm] Fetching network data for networkId:",
        selectedNetworkId
      );
      try {
        const response = await fetch(
          `/api/network-data?networkId=${selectedNetworkId}&locale=${locale}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );
        if (!response.ok) {
          throw new Error(t("fetchError"));
        }
        const data: NetworkDataResponse = await response.json();
        console.log("[HeaderForm] Network data:", data);
        if (data.error) {
          console.error("[HeaderForm] Network data error:", data.error);
          setNetworkData(null);
          setSelectedSaleZeraee("");
          setSelectedIdsal(null);
          setSaleZeraee("");
          setSelectedDore("");
          setSelectedIddore(null);
          setDoreKesht("");
          setIdShDo(0);
          setError(t("fetchError"));
          if (onNetworkDataChange) {
            onNetworkDataChange({
              SaleZeraee: [],
              Dore: [],
              currentSaleZeraee: null,
              currentDoreKesht: null,
              IdShDo: 0,
            });
          }
        } else {
          setNetworkData(data);
          setSelectedSaleZeraee(
            data.currentSaleZeraee?.name || data.SaleZeraee[0]?.name || ""
          );
          setSelectedIdsal(
            data.currentSaleZeraee?.idsal || data.SaleZeraee[0]?.idsal || null
          );
          setSaleZeraee(
            data.currentSaleZeraee?.name || data.SaleZeraee[0]?.name || ""
          );

          setSelectedDore(
            data.currentDoreKesht?.name || data.Dore[0]?.name || ""
          );
          setSelectedIddore(
            data.currentDoreKesht?.iddore || data.Dore[0]?.iddore || null
          );
          setDoreKesht(data.currentDoreKesht?.name || data.Dore[0]?.name || "");

          setIdShDo(data.IdShDo || 0);
          if (onNetworkDataChange) {
            console.log("[HeaderForm] Calling onNetworkDataChange:", data);
            onNetworkDataChange(data);
          }
        }
      } catch (error) {
        console.error("[HeaderForm] Error fetching network data:", error);
        setNetworkData(null);
        setSelectedSaleZeraee("");
        setSelectedIdsal(null);
        setSaleZeraee("");
        setSelectedDore("");
        setSelectedIddore(null);
        setDoreKesht("");
        setIdShDo(0);
        setError(t("fetchError"));
        if (onNetworkDataChange) {
          onNetworkDataChange({
            SaleZeraee: [],
            Dore: [],
            currentSaleZeraee: null,
            currentDoreKesht: null,
            IdShDo: 0,
          });
        }
      }
    };

    fetchNetworkData();
  }, [
    selectedNetworkId,
    locale,
    setDoreKesht,
    setIdShDo,
    setSaleZeraee,
    t,
    onNetworkDataChange,
  ]);

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("[HeaderForm] Network changed:", event.target.value);
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
    setSelectedPumpStation("");
    setPumpStationName("");
    setIdPumpStation(0);
    setNetworkData(null);
    setShabakeData(null);
    setSelectedSaleZeraee("");
    setSelectedIdsal(null);
    setSaleZeraee("");
    setSelectedDore("");
    setSelectedIddore(null);
    setDoreKesht("");
    setIdShDo(0);
    setCalendarFetched(false);
    setError(null);
    if (onNetworkDataChange) {
      onNetworkDataChange({
        SaleZeraee: [],
        Dore: [],
        currentSaleZeraee: null,
        currentDoreKesht: null,
        IdShDo: 0,
      });
    }
    if (onShabakeDataChange) {
      onShabakeDataChange({
        mahList: [],
        currentFiddahe: null,
        trikhshorooe: new Date(),
        trikhpayan: new Date(),
        IdShDo: 0,
        error: undefined,
        SaleZeraee: [],
        Dore: [],
        currentDoreKesht: null,
        currentSaleZeraee: null,
        currentFiddec: null,
      });
    }
  };

  const handlePumpStationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("[HeaderForm] Pump station changed:", event.target.value);
    const stationName = event.target.value;
    setSelectedPumpStation(stationName);

    const selectedStation = pumpStations.find(
      (station) => station.namestation === stationName
    );

    if (selectedStation) {
      setPumpStationName(getLocalizedPumpStationName(selectedStation));
      setIdPumpStation(selectedStation.idpumpsta);
    } else {
      setPumpStationName("");
      setIdPumpStation(0);
    }
  };

  useEffect(() => {
    if (selectedNetworkId === null) {
      console.log(
        "[HeaderForm] No selected network, skipping pump stations fetch"
      );
      return;
    }

    console.log(
      "[HeaderForm] Fetching pump stations for networkId:",
      selectedNetworkId
    );
    fetch(
      `/api/pump-stations?networkId=${selectedNetworkId}&FIdDP=2&locale=${locale}`,
      {
        credentials: "include",
        cache: "no-store",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pump stations");
        return res.json();
      })
      .then((data) => {
        console.log("[HeaderForm] Pump stations:", data);
        setPumpStations(data.pumpStations);

        if (data.pumpStations.length === 1) {
          const station = data.pumpStations[0];
          setSelectedPumpStation(station.namestation);
          setPumpStationName(getLocalizedPumpStationName(station));
          setIdPumpStation(station.idpumpsta);
        } else {
          setSelectedPumpStation("");
          setPumpStationName("");
          setIdPumpStation(0);
        }
      })
      .catch((error) => {
        console.error("[HeaderForm] Error fetching pump stations:", error);
        setError(t("fetchError"));
      });
  }, [
    selectedNetworkId,
    locale,
    setIdPumpStation,
    setPumpStationName,
    getLocalizedPumpStationName,
    t,
  ]);

  const handleSaleZeraeeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("[HeaderForm] SaleZeraee changed:", e.target.value);
    const value = e.target.value;
    setSelectedSaleZeraee(value);
    setSaleZeraee(value);

    const selectedSale = networkData?.SaleZeraee.find(
      (sale) => sale.name === value
    );
    if (selectedSale) {
      setSelectedIdsal(selectedSale.idsal);
    }

    if (selectedNetworkId && selectedIddore) {
      console.log(
        "[HeaderForm] Fetching ShabakeDoreKesht for SaleZeraee change..."
      );
      const data = await fetchShabakeDoreKesht(
        selectedNetworkId,
        selectedSale?.idsal || null,
        selectedIddore
      );
      if (data && onShabakeDataChange) {
        console.log(
          "[HeaderForm] SaleZeraee change, calling onShabakeDataChange:",
          data
        );
        setShabakeData(data);
        setCalendarFetched(true);
        onShabakeDataChange(data);
      }
    }
  };

  const handleDoreChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("[HeaderForm] Dore changed:", e.target.value);
    const value = e.target.value;
    setSelectedDore(value);
    setDoreKesht(value);

    const selectedDoreObj = networkData?.Dore.find(
      (dore) => dore.name === value
    );
    if (selectedDoreObj) {
      setSelectedIddore(selectedDoreObj.iddore);
    }

    if (selectedNetworkId && selectedIdsal) {
      console.log("[HeaderForm] Fetching ShabakeDoreKesht for Dore change...");
      const data = await fetchShabakeDoreKesht(
        selectedNetworkId,
        selectedIdsal,
        selectedDoreObj?.iddore || null
      );
      if (data && onShabakeDataChange) {
        console.log(
          "[HeaderForm] Dore change, calling onShabakeDataChange:",
          data
        );
        setShabakeData(data);
        setCalendarFetched(true);
        onShabakeDataChange(data);
      }
    }
  };

  const fetchShabakeDoreKesht = useCallback(
    async (networkId: number, idsal: number | null, iddore: number | null) => {
      if (!networkId || !idsal || !iddore) {
        console.warn(
          "[HeaderForm] Missing parameters for fetchShabakeDoreKesht:",
          { networkId, idsal, iddore }
        );
        setError(t("missingParameters"));
        return null;
      }

      console.log("[HeaderForm] Fetching ShabakeDoreKesht with parameters:", {
        networkId,
        idsal,
        iddore,
        locale,
      });

      try {
        const response = await fetch(
          `/api/getShabakeDoreKesht?networkId=${networkId}&idsal=${idsal}&iddore=${iddore}&locale=${locale}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "[HeaderForm] ShabakeDoreKesht error response:",
            errorData
          );
          throw new Error(errorData.error || t("fetchError"));
        }

        const data: ShabakeDoreKeshtData = await response.json();
        console.log("[HeaderForm] ShabakeDoreKesht data:", data);

        if (data.error) {
          console.error(
            "[HeaderForm] ShabakeDoreKesht data error:",
            data.error
          );
          setError(data.error);
          return null;
        }

        setError(null);
        return data;
      } catch (error) {
        console.error("[HeaderForm] Error fetching ShabakeDoreKesht:", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
        setError(t("fetchError"));
        return null;
      }
    },
    [t, locale]
  );

  useEffect(() => {
    if (
      !selectedNetworkId ||
      calendarFetched ||
      !selectedIdsal ||
      !selectedIddore
    ) {
      console.log(
        "[HeaderForm] Skipping ShabakeDoreKesht fetch due to conditions",
        {
          selectedNetworkId,
          calendarFetched,
          selectedIdsal,
          selectedIddore,
        }
      );
      return;
    }

    console.log("[HeaderForm] Initial fetch for ShabakeDoreKesht...");
    fetchShabakeDoreKesht(
      selectedNetworkId,
      selectedIdsal,
      selectedIddore
    ).then((data) => {
      if (data && onShabakeDataChange) {
        console.log(
          "[HeaderForm] Initial fetch, calling onShabakeDataChange:",
          data
        );
        setShabakeData(data);
        setCalendarFetched(true);
        onShabakeDataChange(data);
      }
    });
  }, [
    selectedNetworkId,
    selectedIdsal,
    selectedIddore,
    fetchShabakeDoreKesht,
    calendarFetched,
    onShabakeDataChange,
  ]);

  return (
    <div
      id="header-form"
      className="container flex flex-wrap items-center justify-center gap-2 rounded-lg bg-blue-100 px-2 shadow-md"
    >
      {error && (
        <div className="w-full text-center text-red-500">
          {error}
          <button
            className="ml-2 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            onClick={() => {
              setError(null);
              if (selectedNetworkId && selectedIdsal && selectedIddore) {
                fetchShabakeDoreKesht(
                  selectedNetworkId,
                  selectedIdsal,
                  selectedIddore
                );
              }
            }}
          >
            {t("retry")}
          </button>
        </div>
      )}
      <div className="flex items-center gap-1">
        <label className="text-sm font-semibold" htmlFor="network">
          {t("irrigationNetwork")}
        </label>
        {filteredNetworks.length === 1 ? (
          <input
            type="text"
            value={getLocalizedNetworkName(filteredNetworks[0])}
            readOnly
            className="w-32 rounded-lg border bg-gray-200 p-1 text-sm"
          />
        ) : (
          <select
            id="network"
            className="w-32 rounded-lg border p-1 text-sm"
            value={selectedNetwork || ""}
            onChange={handleNetworkChange}
            disabled={isSaving}
          >
            <option value="" disabled hidden>
              {t("select")}
            </option>
            {filteredNetworks.map((network) => (
              <option key={`network-${network.idnet}`} value={network.network}>
                {getLocalizedNetworkName(network)}
              </option>
            ))}
          </select>
        )}
      </div>

      {filteredNetworks.length === 1 || selectedNetwork ? (
        <div className="flex items-center gap-1">
          <label className="text-sm font-semibold" htmlFor="pumpStation">
            {t("pumpStation")}
          </label>
          {pumpStations.length === 1 ? (
            <input
              type="text"
              id="pumpStation"
              className="w-32 rounded-lg border bg-gray-200 p-1 text-sm"
              value={getLocalizedPumpStationName(pumpStations[0])}
              readOnly
            />
          ) : (
            <select
              id="pumpStation"
              className="w-32 rounded-lg border p-1 text-sm"
              value={selectedPumpStation}
              onChange={handlePumpStationChange}
              disabled={!selectedNetwork || isSaving}
            >
              <option value="" disabled hidden>
                {t("select")}
              </option>
              {pumpStations.map((station, index) => (
                <option
                  key={`station-${station.idpumpsta || `fallback-${index}`}`}
                  value={station.namestation}
                >
                  {getLocalizedPumpStationName(station)}
                </option>
              ))}
            </select>
          )}
        </div>
      ) : null}

      {(filteredNetworks.length === 1 || selectedNetwork) &&
      (pumpStations.length === 1 || selectedPumpStation) ? (
        <div className="flex items-center gap-1">
          <label className="text-sm font-semibold" htmlFor="saleZeraee">
            {t("cropYear")}
          </label>
          {networkData?.SaleZeraee.length === 1 ? (
            <input
              type="text"
              id="saleZeraee"
              className="w-24 rounded-lg border bg-gray-200 p-1 text-sm"
              value={networkData.SaleZeraee[0]?.name || ""}
              readOnly
            />
          ) : (
            <select
              id="saleZeraee"
              className="w-24 rounded-lg border p-1 text-sm"
              value={selectedSaleZeraee}
              onChange={handleSaleZeraeeChange}
              disabled={!selectedNetwork || isSaving}
            >
              <option value="" disabled hidden>
                {t("select")}
              </option>
              {networkData?.SaleZeraee.map((year) => (
                <option key={`year-${year.idsal}`} value={year.name}>
                  {year.name}
                </option>
              ))}
            </select>
          )}
        </div>
      ) : null}

      {(filteredNetworks.length === 1 || selectedNetwork) &&
      (pumpStations.length === 1 || selectedPumpStation) ? (
        <div className="flex items-center gap-1">
          <label className="text-sm font-semibold" htmlFor="dore">
            {t("irrigationPeriod")}
          </label>
          {networkData?.Dore.length === 1 ? (
            <input
              type="text"
              id="dore"
              className="w-24 rounded-lg border bg-gray-200 p-1 text-sm"
              value={getLocalizedDoreKesht(networkData.Dore[0]?.name) || ""}
              readOnly
            />
          ) : (
            <select
              id="dore"
              className="w-24 rounded-lg border p-1 text-sm"
              value={selectedDore}
              onChange={handleDoreChange}
              disabled={!selectedNetwork || isSaving}
            >
              <option value="" disabled hidden>
                {t("select")}
              </option>
              {networkData?.Dore.map((dore) => (
                <option key={`dore-${dore.iddore}`} value={dore.name}>
                  {getLocalizedDoreKesht(dore.name)}
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
