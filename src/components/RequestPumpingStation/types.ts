// src/components/RequestPumpingStation/types.ts
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
}

export interface MahItem {
  dahe: (dahe: number) => void;
  Msh: (Msh: string) => void;
  mah: number;
  sal: number;
}

export interface ShabakeDoreKeshtData {
  mahList: MahItem[];
  currentFiddahe: number | null;
  trikhshorooe: string;
  trikhpayan: string;
}

export interface TaeedProgramData {
  fiddahe: number;
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

export interface PumpingActionsProps {
  onSave: () => void;
  onReset: () => void;
  disabled?: boolean;
  isFormDisabled: boolean;
  isFormFilled: boolean;
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: { [idTarDor: number]: { [idRanesh: number]: PumpingData } };
  selectedPumpCounts: { [key: number]: { [date: string]: number } };
  timeValues: {
    [key: number]: { [key: number]: { from: string; to: string } };
  };
  finalVolumes: { [key: number]: number };
  selectedZarfiat: { [key: number]: { [key: number]: number } };
}
