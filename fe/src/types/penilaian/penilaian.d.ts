export type PenilaianType = {
  id: string;
  siswa: {
    id: string;
    nama: string;
  };
  kelas: {
    id: string;
    nama_kelas: string;
  };
  pelajaran: {
    id: string;
    nama_pelajaran: string;
  };
  nilai: {
    tugas: number;
    uts: number;
    uas: number;
    rata_rata: number;
  };
};

export type PenilaianTypeAdd = {
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  tugas: number;
  uts: number;
  uas: number;
};
export type PenilaianTypeEdit = {
  id: string;
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  tugas: number;
  uts: number;
  uas: number;
};
