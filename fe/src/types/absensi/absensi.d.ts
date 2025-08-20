export type StatusAbsensi = "HADIR" | "SAKIT" | "IZIN" | "ALPA";
export type AbsensiType = {
  id: string;
  date: string;
  id_siswa: string;
  id_lesson: string;
  status: StatusAbsensi;
};
