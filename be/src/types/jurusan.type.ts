export interface Jurusan {
  id: string;
  nama_jurusan: string;
}
export interface CreateJurusan {
  nama_jurusan: string;
}
export interface UpdateJurusan extends Jurusan {}
