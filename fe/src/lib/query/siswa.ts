import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";

import { useSiswa } from "../pinia/siswa";
import type { StudentType } from "@/types/siswa/data_siswa";
const handleMutationResponse = (data: any) => {
  const isSuccess = data?.status === 200;
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
  const isSuccess = data?.status === 200;
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
const handleMutationDeleteResponse = (data: any) => {
  const isSuccess = data?.status === 200;
  const message = isSuccess ? "Success Delete Data" : "Gagal Delete Data";

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

export const useGetSiswa = () => {
  const siswa = useSiswa();
  return useQuery({
    queryKey: ["siswa"],
    queryFn: () => siswa.getSiswa(),
  });
};

export const useGetgetSiswaById = (
  // get_kelas: KelasType[]
  idSiswa: string
) => {
  const siswa = useSiswa();
  // Konversi ke lookup object

  //   const kelasLookup = computed(() =>
  //     Object.fromEntries(get_kelas?.map((t) => [t.id, t]) || [])
  //   );
  return useQuery({
    queryKey: ["siswa-id", idSiswa],
    queryFn: () => siswa.getSiswaById(idSiswa),
    enabled: !!idSiswa,
    // select: (data) => ({
    //   ...data,
    //   kelas: kelasLookup.value[data.kelas],
    // }),
  });
};
export const useGetgetSiswaByIdBiasa = (idSiswa: string) => {
  const siswa = useSiswa();

  return useQuery({
    queryKey: ["siswa-id", idSiswa],
    queryFn: () => siswa.getSiswaById(idSiswa),
    enabled: !!idSiswa,
  });
};

export const usePostSiswa = () => {
  const queryClient = useQueryClient();
  const siswa = useSiswa();

  return useMutation({
    mutationFn: siswa.postSiswa,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["siswa"] });
      handleMutationResponse(data);
    },
  });
};

export const useEditSiswa = () => {
  const queryClient = useQueryClient();
  const siswa = useSiswa();

  return useMutation({
    mutationFn: ({ data }: { data: StudentType }) =>
      siswa.editSiswaById(data.id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["siswa"] });
      handleMutationEditResponse(data);
    },
  });
};
export const useDeleteSiswa = () => {
  const queryClient = useQueryClient();
  const siswa = useSiswa();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => siswa.deleteSiswaById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["siswa"] });
      handleMutationDeleteResponse(data);
    },
  });
};
