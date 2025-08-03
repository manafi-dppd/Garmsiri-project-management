import { useState, useEffect } from "react";
import {
  KhatRanesh,
  MahItem,
  PredictedVolume,
  PumpingData,
  RecordType,
  ShabakeDoreKeshtData,
  NetworkDataResponse,
} from "../types";

interface TaeedProgramData {
  fiddahe: number;
  FirstNErsal: string;
  LastNErsal: string;
  TarikhErsal: string;
  FirstNAbMantaghe: string;
  LastNAbMantaghe: string;
  TarikhAbMantaghe: string;
  FirstNPeymankar: string;
  LastNPeymankar: string;
  TarikhPeymankar: string;
  FirstNAbNiroo: string;
  LastNAbNiroo: string;
  TarikhAbNiroo: string;
  TarikhFileNahee: string;
  FirstNTaeedNahaee: string;
  LastNTaeedNahaee: string;
  TarikhTaeedNahaee: string;
}

interface VolumeItem {
  fidranesh: number;
  totaltaghvim: number;
}

interface RecordsResponse {
  message: string;
  records: RecordType[];
  predictedVolumes: {
    idtardor: number;
    volumes: VolumeItem[];
  }[];
}

interface BahrebardairItem {
  fidtardor: number;
  fidranesh: number;
  tedad: number;
  shorooe: string | null;
  paian: string | null;
}

interface BahrebardairSeghliItem {
  fidtardor: number;
  fidranesh: number;
  zarfiat: number | null;
  shorooe: string | null;
  paian: string | null;
}

export const usePumpingData = (
  selectedNetworkId: number | null,
  idPumpStation: number,
  selectedMah: number,
  sal: number,
  mah: number,
  dahe: number,
  selectedDahe: number,
  pumpData: { [idtardor: number]: { [idranesh: number]: PumpingData } },
  setPumpData: (data: {
    [idtardor: number]: { [idranesh: number]: PumpingData };
  }) => void,
  shabakeData: ShabakeDoreKeshtData | null,
  networkData: NetworkDataResponse | null
) => {
  const [taedAbMantaghe, setTaedAbMantaghe] = useState<
    Array<{ [key: string]: unknown }>
  >([]);
  const [khatRaneshList, setKhatRaneshList] = useState<KhatRanesh[]>([]);
  const [predictedVolumes, setPredictedVolumes] = useState<PredictedVolume>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [finalVolumes, setFinalVolumes] = useState<{ [key: number]: number }>(
    {}
  );
  const [mahList, setMahList] = useState<MahItem[]>([]);
  const [taedProgramData, setTaedProgramData] =
    useState<TaeedProgramData | null>(null);
  const [currentFiddahe, setCurrentFiddahe] = useState<number | null>(null);

  useEffect(() => {
    console.log("[usePumpingData] shabakeData:", shabakeData);
    console.log("[usePumpingData] networkData:", networkData);
    if (idPumpStation > 0 && sal && mah && dahe) {
      const fetchTaedProgramData = async () => {
        try {
          const response = await fetch("/api/getTaeedProgramDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fidpumpsta: idPumpStation,
              sal,
              mah,
              dahe,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch TaeedProgram data");
          }
          const data = await response.json();
          console.log("[usePumpingData] TaeedProgramData:", data);
          setTaedProgramData(data);
        } catch {
          setTaedProgramData(null);
        }
      };
      fetchTaedProgramData();
    }
  }, [idPumpStation, sal, mah, dahe, shabakeData, networkData]);

  useEffect(() => {
    if (idPumpStation > 0) {
      const fetchTaedAbMantaghe = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/getTaedAbMantaghe?sal=${sal}&mah=${selectedMah}&dahe=${dahe}&fidpumpsta=${idPumpStation}`
          );
          if (!response.ok) throw new Error("Failed to fetch data");
          const data = await response.json();
          console.log("[usePumpingData] TaedAbMantaghe:", data);
          setTaedAbMantaghe(data);
        } catch (err) {
          console.error(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchTaedAbMantaghe();
    }
  }, [sal, selectedMah, dahe, idPumpStation]);

  useEffect(() => {
    if (shabakeData?.mahList) {
      console.log(
        "[usePumpingData] MahList from shabakeData:",
        shabakeData.mahList
      );
      setMahList(shabakeData.mahList);
      if (shabakeData.currentFiddahe) {
        setCurrentFiddahe(shabakeData.currentFiddahe);
      }
    }
  }, [shabakeData]);

  useEffect(() => {
    if (idPumpStation === 0) return;
    const fetchKhatRanesh = async () => {
      try {
        const res = await fetch(
          `/api/getKhatRanesh?idPumpStation=${idPumpStation}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: KhatRanesh[] = await res.json();
        console.log("[usePumpingData] KhatRanesh:", data);
        setKhatRaneshList(data);
      } catch (error) {
        console.error("Error fetching KhatRanesh:", error);
      }
    };

    fetchKhatRanesh();
  }, [selectedNetworkId, sal, selectedMah, selectedDahe, idPumpStation]);

  useEffect(() => {
    if (
      !selectedNetworkId ||
      !selectedMah ||
      idPumpStation === 0 ||
      !networkData
    )
      return;

    const fetchRecords = async () => {
      setLoading(true);
      try {
        const idsal = networkData.currentSaleZeraee?.idsal;
        const iddore = networkData.currentDoreKesht?.iddore;

        console.log("[usePumpingData] Fetching records with:", {
          selectedNetworkId,
          sal,
          selectedMah,
          dahe,
          idsal,
          iddore,
        });

        if (!idsal || !iddore) {
          setMessage("سال زراعی یا دوره کشت انتخاب نشده است");
          return;
        }

        const res = await fetch(
          `/api/getRecords?networkId=${selectedNetworkId}&sal=${sal}&mah=${selectedMah}&dahe=${dahe}&idsal=${idsal}&iddore=${iddore}`
        );
        if (!res.ok) throw new Error("Failed to fetch");

        const data: RecordsResponse = await res.json();
        console.log("[usePumpingData] Records response:", data);
        if (!Array.isArray(data.records)) {
          setMessage(data.message || "خطایی رخ داده است");
          return;
        }

        setRecords(data.records);
        setMessage(null);

        const predictedVolumesMap: PredictedVolume = {};
        data.predictedVolumes.forEach(({ idtardor, volumes }) => {
          predictedVolumesMap[idtardor] = volumes.reduce<
            Record<number, number>
          >((acc, { fidranesh, totaltaghvim }) => {
            acc[fidranesh] = (acc[fidranesh] || 0) + (totaltaghvim || 0);
            return acc;
          }, {});
        });

        setPredictedVolumes(predictedVolumesMap);
      } catch (error) {
        console.error("[usePumpingData] Error fetching records:", error);
        setMessage("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [selectedNetworkId, sal, selectedMah, dahe, idPumpStation, networkData]);

  useEffect(() => {
    if (!predictedVolumes || !khatRaneshList.length) return;

    const summedVolumes: { [key: number]: number } = {};

    Object.values(predictedVolumes).forEach((tardor) => {
      Object.entries(tardor).forEach(([raneshId, volume]) => {
        const parsedRaneshId = Number(raneshId);
        const parsedVolume = parseFloat(volume as string);
        if (!isNaN(parsedRaneshId) && !isNaN(parsedVolume)) {
          summedVolumes[parsedRaneshId] =
            (summedVolumes[parsedRaneshId] || 0) + parsedVolume;
        }
      });
    });

    setFinalVolumes(summedVolumes);
  }, [predictedVolumes, khatRaneshList]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/request-pumping");
        if (!response.ok) throw new Error("Failed to fetch all pump data");

        const { bahrebardair, bahrebardairSeghli } = await response.json();
        const newPumpData: typeof pumpData = {};

        // مقداردهی اولیه برای تمام ردیف‌ها
        records.forEach((record) => {
          if (!newPumpData[record.idtardor]) {
            newPumpData[record.idtardor] = {};
          }
          khatRaneshList.forEach((ranesh) => {
            if (!newPumpData[record.idtardor][ranesh.idranesh]) {
              newPumpData[record.idtardor][ranesh.idranesh] = {
                tedad: 0,
                zarfiat: null,
                shorooe: null,
                paian: null,
              };
            }
          });
        });

        // پر کردن مقادیر از پایگاه داده
        bahrebardair.forEach((item: BahrebardairItem) => {
          if (!newPumpData[item.fidtardor]) {
            newPumpData[item.fidtardor] = {};
          }
          newPumpData[item.fidtardor][item.fidranesh] = {
            tedad: item.tedad,
            zarfiat: null,
            shorooe: item.shorooe,
            paian: item.paian,
          };
        });

        bahrebardairSeghli.forEach((item: BahrebardairSeghliItem) => {
          if (!newPumpData[item.fidtardor]) {
            newPumpData[item.fidtardor] = {};
          }
          newPumpData[item.fidtardor][item.fidranesh] = {
            tedad: 0,
            zarfiat: item.zarfiat,
            shorooe: item.shorooe,
            paian: item.paian,
          };
        });

        setPumpData(newPumpData);
      } catch (error) {
        console.error("Error fetching pump data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (records.length > 0 && khatRaneshList.length > 0) {
      fetchData();
    }
  }, [records, khatRaneshList, setPumpData]);

  return {
    khatRaneshList,
    predictedVolumes,
    pumpData,
    loading,
    mahList,
    selectedMah,
    sal,
    dahe,
    records,
    message,
    finalVolumes,
    taedAbMantaghe,
    taedProgramData,
    currentFiddahe,
  };
};
