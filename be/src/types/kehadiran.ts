export interface Kehadiran {
  id: string;
  date: Date;
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  status: string;
}

export interface CreateKehadiran {
  date: Date;
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  status: string;
}
export interface UpdateKehadiran extends Kehadiran {}
