export interface Siswa {
  id: string;
  nama: String;
  kelasId: String;
  kelas?: any;
  jkl: String;
}

export interface CreateSiswa {
  id: string;
  nama: string;
  kelasId: string;
  jkl: string;
}
