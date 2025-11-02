export interface WaliKelas {
  id: string;
  nama: string;
  telp: string;
  email: string;
  jkl: string;
}
export interface CreateWaliKelas {
  nama: string;
  telp: string;
  email: string;
  jkl: string;
}
export interface UpdateWaliKelas extends WaliKelas {}
