export interface TPengajuan {
  id: number;
  user_id: string;
  name: string;
  alamat: string;
  jaminan: string;
  alasan: string;
  no_hp: string;
  status: string;
  is_status: string | null;
  nominal: string;
  created_at: string;
  updated_at: string;
}

export interface TPengajuanForm {
  user_id: number;
  alamat: string;
  no_hp: string;
  alasan: string;
  jaminan: string;
  nominal: string;
}

export interface TPengajuanAction {
  id: number;
  status: string;
}

export interface TErrors {
  alamat: string[];
  jaminan: string[];
  alasan: string[];
}
