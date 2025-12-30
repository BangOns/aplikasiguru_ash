import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";

import { usePenilaian } from "../pinia/penilaian";
const handleMutationResponse = (data: any) => {
  const isSuccess = data?.status === true;
  const message = isSuccess ? "Success Post Data" : "Gagal Post Data";

  toast(message, {
    style: {
      backgroundColor: isSuccess ? "green" : "red",
      color: "white",
      fontFamily: "mona",
      alignItems: "center",
    },
    duration: 1000,
  });
};
const handleMutationEditResponse = (data: any) => {
  const isSuccess = data?.status === true;
  const message = isSuccess ? "Success Edit Data" : "Gagal Edit Data";

  toast(message, {
    style: {
      backgroundColor: isSuccess ? "green" : "red",
      color: "white",
      fontFamily: "mona",
      alignItems: "center",
    },
    duration: 1000,
  });
};

export const useGetPenilaian = () => {
  const penilaian = usePenilaian();
  return useQuery({
    queryKey: ["nilai"],
    queryFn: () => penilaian.getPenilaian(),
  });
};

// export const useGetSiswaById = (get_kelas: KelasType[], idSiswa: string) => {
//   const siswa = useSiswa();
//   // Konversi ke lookup object

//   const kelasLookup = computed(() =>
//     Object.fromEntries(get_kelas?.map((t) => [t.id, t]) || [])
//   );
//   return useQuery({
//     queryKey: ["siswa-id", idSiswa],
//     queryFn: () => siswa.getSiswaById(idSiswa),
//     enabled: !!idSiswa,
//     select: (data) => ({
//       ...data,
//       kelas: kelasLookup.value[data.kelas],
//     }),
//   });
// };
// export const useGetgetSiswaByIdBiasa = (idSiswa: string) => {
//   const siswa = useSiswa();

//   return useQuery({
//     queryKey: ["siswa-id", idSiswa],
//     queryFn: () => siswa.getSiswaById(idSiswa),
//     enabled: !!idSiswa,
//   });
// };

export const usePostPenilaian = () => {
  const queryClient = useQueryClient();
  const penilaian = usePenilaian();

  return useMutation({
    mutationFn: penilaian.postPenilaian,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["penilaian"] });
      handleMutationResponse(data);
    },
  });
};
export const useEditPenilaian = () => {
  const queryClient = useQueryClient();
  const penilaian = usePenilaian();

  return useMutation({
    mutationFn: penilaian.editPenilaian,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["penilaian"] });
      handleMutationEditResponse(data);
    },
  });
};

// export const useEditSiswa = () => {
//   const queryClient = useQueryClient();
//   const siswa = useSiswa();

//   return useMutation({
//     mutationFn: ({ data }: { data: StudentType }) =>
//       siswa.editSiswaById(data.id, data),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["siswa"] });
//       handleMutationEditResponse(data);
//     },
//   });
// };
// export const useDeleteSiswa = () => {
//   const queryClient = useQueryClient();
//   const siswa = useSiswa();

//   return useMutation({
//     mutationFn: ({ id }: { id: string }) => siswa.deleteSiswaById(id),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["siswa"] });
//       handleMutationDeleteResponse(data);
//     },
//   });
// };
