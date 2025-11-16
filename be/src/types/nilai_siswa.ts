export interface Nilai {
  id: string;
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  tugas: number;
  uts: number;
  uas: number;
  rata_rata: number;
}

export interface CreateNilai {
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  tugas: number;
  uts: number;
  uas: number;
  rata_rata: number;
}

export interface UpdateNilai {
  id: string;
  tugas: number;
  uts: number;
  uas: number;
  rata_rata: number;
}
