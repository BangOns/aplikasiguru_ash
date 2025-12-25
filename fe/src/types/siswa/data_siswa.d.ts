export type StudentType = {
  id: string;
  nama: string;
  kelas: { nama_kelas: string; id: string };
  jurusan: { nama_jurusan: string; id: string };
  jkl: string;
};
export type StudentTypeAdd = {
  nama: string;
  kelas: string;
  jkl: string;
};
export type StudentTypeEdit = {
  id: string;
  nama: string;
  kelas: string;
  jkl: string;
};
