export interface Siswa {
  id: string;
  nama: String;
  kelasId: String;
  jkl: String;
}

export interface CreateSiswa {
  nama: string;
  kelasId: string;
  jkl: string;
}
export interface UpdateSiswa {
  id: string;
  nama: string;
  kelasId: string;
  jkl: string;
}
