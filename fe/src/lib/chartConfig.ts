export const data = {
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as "bottom",
    },
  },
};

//example
// chartGrafik.data = {
//     ...chartGrafik.data,
//     datasets: [
//       {
//         ...chartGrafik.data.datasets[0],
//         data: [
//           penilaian.listNilaiSiswa.filter(
//             (n: PenilaianType) =>
//               ((n.tugas ?? 0) + (n.uts ?? 0) + (n.uas ?? 0)) / 3 < 40
//           ).length,
//           penilaian.listNilaiSiswa.filter(
//             (n: PenilaianType) =>
//               ((n.tugas ?? 0) + (n.uts ?? 0) + (n.uas ?? 0)) / 3 >= 40 &&
//               ((n.tugas ?? 0) + (n.uts ?? 0) + (n.uas ?? 0)) / 3 < 80
//           ).length,
//           penilaian.listNilaiSiswa.filter(
//             (n: PenilaianType) =>
//               ((n.tugas ?? 0) + (n.uts ?? 0) + (n.uas ?? 0)) / 3 >= 80
//           ).length,
//         ],
//       },
//     ],
//   };
