export interface NetworkDataResponse {
  SaleZeraee: { idsal: number; name: string }[];
  Dore: { iddore: number; name: string }[];
  currentSaleZeraee: { idsal: number; name: string } | null;
  currentDoreKesht: { iddore: number; name: string } | null;
  IdShDo: number;
  error?: string;
}

export interface KhatRanesh {
  idranesh: number;
  raneshname: string;
  fidpumpsta: number;
  fiddpipe: number;
  fidsepu: number;
  fidmeasuring: number;
  zarfiat?: number;
  active?: boolean;
  debipomp?: number;
  tedadpump?: number;
  fesharpump?: number;
  randeman?: number;
  tavanenami?: number;
  fiddahe?: number;
}

export interface RecordType {
  raneshdata: Record<string, unknown>;
  zarfit: string;
  name: React.ReactNode;
  idtardor: number;
  trikh: string;
  dahe: number;
}

export interface PumpingData {
  tedad: number;
  zarfiat: number | null;
  shorooe: string | null;
  paian: string | null;
}

export interface PredictedVolume {
  [idtardor: number]: {
    [idranesh: number]: number;
  };
}

export interface BodyRequestPumpingProps {
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
  currentSal: number;
  setCurrentSal: (value: number) => void;
  setCurrentMah: (value: number) => void;
  setCurrentDahe: (value: number) => void;
}

export interface MahItem {
  idtardor?: number;
  dahe: (dahe: number) => void;
  Msh: (Msh: string) => void;
  mah: number;
  sal: number;
}

export interface ShabakeDoreKeshtData {
  error: any;
  mahList: MahItem[];
  currentFiddahe: number | null;
  currentFiddec: number | null;
  trikhshorooe: Date;
  trikhpayan: Date;
  SaleZeraee: { idsal: number; name: string }[];
  Dore: { iddore: number; name: string }[];
  currentDoreKesht: { iddore: number; name: string } | null;
  currentSaleZeraee: { idsal: number; name: string } | null;
  IdShDo: number;
}

export interface TaeedProgramData {
  fiddahe?: number;
  fiddec?: number;
  firstnersal: string;
  lastnersal: string;
  tarikhersal: string;
  taedabmantaghe: boolean;
  taedpeymankar: boolean;
  taedabniroo: boolean;
  filenamenahaee: boolean;
  firstnabmantaghe: string;
  lastnabmantaghe: string;
  tarikhabmantaghe: string;
  firstnpeymankar: string;
  lastnpeymankar: string;
  tarikhpeymankar: string;
  firstnabniroo: string;
  lastnabniroo: string;
  tarikhabniroo: string;
  tarikhfilenahee: string;
  firstntaeednahaee: string;
  lastntaeednahaee: string;
  tarikhtaeednahaee: string;
  taeednahaee: boolean;
  fiddore?: number;
  toziheslah: string;
}

export interface PumpingFormProps {
  khatRaneshList: KhatRanesh[];
  pumpData: { [idTarDor: number]: { [idRanesh: number]: PumpingData } };
  setPumpData: React.Dispatch<
    React.SetStateAction<{
      [idTarDor: number]: { [idRanesh: number]: PumpingData };
    }>
  >;
  selectedPumpCounts: { [key: number]: { [date: string]: number } };
  timeValues: {
    [key: number]: { [key: number]: { from: string; to: string } };
  };
  handlePumpCountChange: (
    idtardor: number,
    idranesh: number,
    value: number
  ) => void;
  handleTimeChange: (
    idtardor: number,
    idranesh: number,
    field: "from" | "to",
    value: string
  ) => void;
  updateTime: (
    idtardor: number,
    idranesh: number,
    field: "from" | "to",
    type: "hour" | "minute",
    increment: number
  ) => void;
  records: RecordType[];
  message: string | null;
  finalVolumes: { [key: number]: number };
  isFormDisabled: boolean;
  validationErrors: { date: string; raneshName: string; message: string }[];
  setValidationErrors: React.Dispatch<
    React.SetStateAction<
      { date: string; raneshName: string; message: string }[]
    >
  >;
  handleSave: () => void;
  handleReset: () => void;
  isFormFilled: boolean;
  selectedMah: number;
  sal: number;
  selectedDahe: number;
  setSelectedDahe: React.Dispatch<React.SetStateAction<number>>;
  setDahe: React.Dispatch<React.SetStateAction<number>>;
  allDates: { mah: number; dahe: number }[];
  mahList: MahItem[];
  currentMah: number;
  currentSal: number;
  currentDahe: number;
  selectedNetworkId: number | null;
  idPumpStation: number;
  setSelectedMah: React.Dispatch<React.SetStateAction<number>>;
  setSal: React.Dispatch<React.SetStateAction<number>>;
  setMah: React.Dispatch<React.SetStateAction<number>>;
  userRole: string[];
  firstName: string;
  lastName: string;
  taedProgramData: TaeedProgramData | null;
  selectedZarfiat: { [key: number]: { [key: number]: number } };
  setSelectedZarfiat: React.Dispatch<
    React.SetStateAction<{ [key: number]: { [key: number]: number } }>
  >;
  networkName: string;
  pumpStationName: string;
  currentFiddahe: number | null;
  networkTrustee: string | null;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  isFiddaheValid: boolean;
  isStationLoaded: boolean;
  setIsStationLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  prevPumpStation: number | null;
  setPrevPumpStation: React.Dispatch<React.SetStateAction<number | null>>;
  shabakeData: ShabakeDoreKeshtData | null;
  setCurrentMah: React.Dispatch<React.SetStateAction<number>>;
  setCurrentDahe: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSal: React.Dispatch<React.SetStateAction<number>>;
}
