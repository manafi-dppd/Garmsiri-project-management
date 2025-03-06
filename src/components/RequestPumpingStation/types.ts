// src/components/RequestPumpingStation/types.ts
export interface KhatRanesh {
  IdRanesh: number;
  RaneshName: string;
  FIdPumpSta: number;
  FIdDPipe: number;
  FIdSePu: number;
  FIdMeasuring: number;
  Zarfiat?: number; // اختیاری
  Active?: boolean; // اختیاری
  DebiPomp?: number;
  TedadPump?: number;
  FesharPump?: number;
  Randeman?: number;
  TavaneNami?: number;
}

export interface RecordType {
  raneshData: any;
  Zarfit: string;
  name: React.ReactNode;
  IdTarDor: number;
  Trikh: string;
  Dahe: number;
}

export interface PumpingData {
  Tedad: number;
  Zarfiat: number | null;
  Shorooe: string | null;
  Paian: string | null;
}

export interface PredictedVolume {
  [IdTarDor: number]: {
    [IdRanesh: number]: number;
  };
}

export interface BodyRequestPumpingProps {
  userName: string;
  userRole: string;
  firstName: string;
  lastName: string;
  networkName: string;
  pumpStationName: string;
  selectedNetworkId: number | null;
  idPumpStation: number;
  saleZeraee: string;
  doreKesht: string;
  idShDo: number;
}

export interface MahItem {
  dahe(dahe: any): unknown;
  Msh(Msh: any): unknown;
  Mah: number; // شماره ماه
  Sal: number; // سال زراعی
}

// src/components/RequestPumpingStation/types.ts
export interface TaeedProgramData {
  FirstNErsal: string;
  LastNErsal: string;
  TarikhErsal: string;
  TaedAbMantaghe: boolean;
  TaedPeymankar: boolean;
  TaedAbNiroo: boolean;
  FileNameNahaee: boolean;
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
  TaeedNahaee: boolean;
}

export interface PumpingActionsProps {
  onSave: () => void;
  onReset: () => void;
  disabled?: boolean;
  isFormDisabled: boolean;
  isFormFilled: boolean;
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}};
  selectedPumpCounts: {[key: number]: {[date: string]: number}};
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}};
  finalVolumes: {[key: number]: number};
  selectedZarfiat: {[key: number]: {[key: number]: number}};
}

export interface PumpingActionsProps {
  onSave: () => void;
  onReset: () => void;
  disabled?: boolean;
  isFormDisabled: boolean;
  isFormFilled: boolean;
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}};
  selectedPumpCounts: {[key: number]: {[date: string]: number}};
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}};
  finalVolumes: {[key: number]: number};
  selectedZarfiat: {[key: number]: {[key: number]: number}};
}
