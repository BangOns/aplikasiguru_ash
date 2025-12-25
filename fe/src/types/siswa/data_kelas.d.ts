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
