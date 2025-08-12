import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
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
  fiddahe?: number;
  fiddec?: number;
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
  const locale = useLocale();
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
  // useEffect(() => {
  //   if (idPumpStation > 0 && sal && mah && dahe) {
  //     const fetchTaedProgramData = async () => {
  //       try {
  //         const response = await fetch("/api/getTaeedProgramDetails", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             fidpumpsta: idPumpStation,
  //             sal,
  //             mah,
  //             dahe,
  //           }),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to fetch TaeedProgram data");
  //         }
  //         setTaedProgramData(await response.json());
  //       } catch {
  //         setTaedProgramData(null);
  //       }
  //     };
  //     fetchTaedProgramData();
  //   }
  // }, [idPumpStation, sal, mah, dahe]);
  // console.log("dahe: ", dahe);
  useEffect(() => {
    if (idPumpStation > 0 && sal && mah && dahe) {
      const fetchTaedProgramData = async () => {
        setLoading(true);
        try {
          console.log("[usePumpingData] Fetching TaeedProgramData with:", {
            fidpumpsta: idPumpStation,
            sal,
            mah,
            dahe,
            locale,
          });
          const response = await fetch("/api/getTaeedProgramDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fidpumpsta: idPumpStation,
              sal,
              mah,
              dahe,
              locale,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to fetch TaeedProgram data: ${
                errorData.error || response.statusText
              }`
            );
          }
          const data = await response.json();
          console.log("[usePumpingData] TaeedProgramData:", data);
          setTaedProgramData(data);
          setCurrentFiddahe(locale === "fa" ? data.fiddahe : data.fiddec);
        } catch (error) {
          console.error(
            "[usePumpingData] Error fetching TaeedProgramData:",
            error
          );
          setMessage(
            locale === "fa"
              ? "خطا در دریافت اطلاعات برنامه تأیید"
              : "Error fetching TaeedProgram data"
          );
          setTaedProgramData(null);
          setCurrentFiddahe(null);
        } finally {
          setLoading(false);
        }
      };
      fetchTaedProgramData();
    } else {
      console.warn(
        "[usePumpingData] Invalid parameters for TaeedProgramData:",
        {
          idPumpStation,
          sal,
          mah,
          dahe,
        }
      );
    }
  }, [idPumpStation, sal, mah, dahe, locale]);

  useEffect(() => {
    if (idPumpStation > 0) {
      const fetchTaedAbMantaghe = async () => {
        setLoading(true);
        try {
          const queryParams = new URLSearchParams({
            sal: sal.toString(),
            mah: selectedMah.toString(),
            dahe: dahe.toString(),
            fidpumpsta: idPumpStation.toString(),
          }).toString();

          console.log(
            "[usePumpingData] Fetching TaedAbMantaghe with:",
            queryParams
          );
          const response = await fetch(`/api/getTaedAbMantaghe?${queryParams}&locale=${locale}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to fetch TaedAbMantaghe: ${
                errorData.error || response.statusText
              }`
            );
          }
          const data = await response.json();
          console.log("[usePumpingData] TaedAbMantaghe:", data);
          setTaedAbMantaghe(data);
        } catch (err) {
          console.error("[usePumpingData] Error fetching TaedAbMantaghe:", err);
          setMessage(
            locale === "fa"
              ? "خطا در دریافت اطلاعات تأیید آب منطقه"
              : "Error fetching TaedAbMantaghe"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchTaedAbMantaghe();
    }
  }, [sal, selectedMah, dahe, idPumpStation, locale]);

  useEffect(() => {
    if (shabakeData?.mahList) {
      console.log(
        "[usePumpingData] MahList from shabakeData:",
        shabakeData.mahList
      );
      const uniqueMahList = Array.from(
        new Map(
          shabakeData.mahList.map((item) => [`${item.sal}-${item.mah}`, item])
        ).values()
      );
      setMahList(uniqueMahList);
      if (
        shabakeData.currentFiddahe !== undefined ||
        shabakeData.currentFiddec !== undefined
      ) {
        const fidValue =
          locale === "fa"
            ? shabakeData.currentFiddahe
            : shabakeData.currentFiddec ?? null;
        console.log("[usePumpingData] Setting currentFiddahe:", fidValue);
        setCurrentFiddahe(fidValue);
      }
    }
  }, [shabakeData, locale]);

  useEffect(() => {
    if (idPumpStation === 0) return;
    const fetchKhatRanesh = async () => {
      try {
        console.log(
          "[usePumpingData] Fetching KhatRanesh with idPumpStation:",
          idPumpStation
        );
        const res = await fetch(
          `/api/getKhatRanesh?idPumpStation=${idPumpStation}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            `Failed to fetch KhatRanesh: ${errorData.error || res.statusText}`
          );
        }
        const data: KhatRanesh[] = await res.json();
        console.log("[usePumpingData] KhatRanesh:", data);
        setKhatRaneshList(data);
      } catch (error) {
        console.error("[usePumpingData] Error fetching KhatRanesh:", error);
        setMessage(
          locale === "fa"
            ? "خطا در دریافت خط رانش"
            : "Error fetching KhatRanesh"
        );
      }
    };

    fetchKhatRanesh();
  }, [
    selectedNetworkId,
    sal,
    selectedMah,
    selectedDahe,
    idPumpStation,
    locale,
  ]);

  useEffect(() => {
    if (
      !selectedNetworkId ||
      !selectedMah ||
      idPumpStation === 0 ||
      !networkData
    ) {
      console.warn("[usePumpingData] Invalid parameters for Records:", {
        selectedNetworkId,
        selectedMah,
        idPumpStation,
        networkData,
      });
      return;
    }

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
          setMessage(
            locale === "fa"
              ? "سال زراعی یا دوره کشت انتخاب نشده است"
              : "Crop year or irrigation period not selected"
          );
          return;
        }

        const res = await fetch(
          `/api/getRecords?networkId=${selectedNetworkId}&sal=${sal}&mah=${selectedMah}&dahe=${dahe}&idsal=${idsal}&iddore=${iddore}&locale=${locale}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            `Failed to fetch Records: ${errorData.error || res.statusText}`
          );
        }

        const data: RecordsResponse = await res.json();
        console.log("[usePumpingData] Records response:", data);
        if (!Array.isArray(data.records)) {
          setMessage(
            data.message ||
              (locale === "fa" ? "خطایی رخ داده است" : "An error occurred")
          );
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
        setMessage(
          locale === "fa" ? "خطا در دریافت داده‌ها" : "Error fetching data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [
    selectedNetworkId,
    sal,
    selectedMah,
    dahe,
    idPumpStation,
    networkData,
    locale,
  ]);

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
        console.log("[usePumpingData] Fetching pump data");
        const response = await fetch("/api/request-pumping");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch pump data: ${
              errorData.error || response.statusText
            }`
          );
        }

        const { bahrebardair, bahrebardairSeghli } = await response.json();
        const newPumpData: typeof pumpData = {};

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
        console.error("[usePumpingData] Error fetching pump data:", error);
        setMessage(
          locale === "fa"
            ? "خطا در دریافت داده‌های پمپ"
            : "Error fetching pump data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (records.length > 0 && khatRaneshList.length > 0) {
      fetchData();
    }
  }, [records, khatRaneshList, setPumpData, locale]);

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
