export interface Pelajaran {
  id: string;
  nama_pelajaran: string;
  kelasId: string;
  wali_kelasId: string;
}
export interface CreatePelajaran {
  nama_pelajaran: string;
  kelasId: string;
  wali_kelasId: string;
}
export interface UpdatePelajaran extends Pelajaran {}
