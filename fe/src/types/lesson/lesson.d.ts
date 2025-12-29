export type LessonType = {
  id: string;
  kelas: {
    id: string;
    nama_kelas: string;
  };
  nama_pelajaran: string;
  guru: {
    id: string;
    nama: string;
  };
};

export type LessonTypeAdd = {
  kelasId: string;
  nama_pelajaran: string;
  wali_kelasId: string;
};

export type LessonTypeEdit = {
  id: string;
  kelasId: string;
  nama_pelajaran: string;
  wali_kelasId: string;
};
