export interface Kelas {
  id: string;
  nama_kelas: string;
  jurusanId: string;
  wali_kelasId: string;
}
export interface CreateKelas {
  nama_kelas: string;
  jurusanId: string;
  wali_kelasId: string;
}
export interface UpdateKelas extends Kelas {}
