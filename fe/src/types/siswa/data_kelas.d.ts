export type KelasType = {
  id: string;
  nama_kelas: string;
  jurusan: {
    id: string;
    nama_jurusan: string;
  };
  wali_kelas: {
    id: string;
    nama_guru: string;
  };
};
export type KelasAdd = {
  nama_kelas: string;
  jurusanId: string;
  wali_kelasId: string;
};
export type KelasEdit = {
  id: string;
  nama_kelas: string;
  jurusanId: string;
  wali_kelasId: string;
};
