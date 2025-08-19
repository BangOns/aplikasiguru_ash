export const ListNav = [
  {
    name: "Dashboard",
    icon: "md-spacedashboard",
    link: "home",
  },
  {
    name: "Jadwal Kegiatan",
    icon: "co-book",
    link: "jadwal_kegiatan",
  },
  {
    name: "Siswa",
    icon: "bi-people-fill",
    child: [
      {
        name: "Data Siswa",
        icon: "bi-people-fill",
        link: "data_siswa",
      },
      {
        name: "Data Kelas",
        icon: "ri-door-open-fill",
        link: "data_kelas",
      },
      {
        name: "Data Jurusan",
        icon: "gi-skills",
        link: "data_jurusan",
      },
      {
        name: "Absensi Siswa",
        icon: "bi-calendar-check-fill",
        link: "absensi",
      },
      {
        name: "Penilaian Siswa",
        icon: "ri-numbers-fill",
        link: "penilaian",
      },
    ],
  },
  {
    name: "Guru / Wali Kelas",
    icon: "bi-person-fill",
    child: [
      {
        name: "Data Guru",
        icon: "bi-person-fill",
        link: "data_guru",
      },
    ],
  },
];
