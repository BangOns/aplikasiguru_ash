export type StatusAbsensi = "HADIR" | "SAKIT" | "IZIN" | "ALPA";
export type AbsensiType = {
  id: string;
  date: string;
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

  status: StatusAbsensi;
};

export type AbsensiTypeAdd = {
  date: string;
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  status: StatusAbsensi;
};
export type AbsensiTypeEdit = {
  id: string;
  date: string;
  siswaId: string;
  kelasId: string;
  pelajaranId: string;
  status: StatusAbsensi;
};
