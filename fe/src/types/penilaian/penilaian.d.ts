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
