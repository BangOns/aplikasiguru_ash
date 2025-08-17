import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { useKelas } from "../pinia/kelas";
import type { KelasType } from "@/types/siswa/data_kelas";
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

export const usePostKelas = () => {
  const queryClient = useQueryClient();
  const kelas = useKelas();

  return useMutation({
    mutationFn: kelas.postKelas,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      handleMutationResponse(data);
    },
  });
};

export const useEditJurusan = () => {
  const queryClient = useQueryClient();
  const kelas = useKelas();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: KelasType }) =>
      kelas.editKelasById(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      handleMutationEditResponse(data);
    },
  });
};
export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  const kelas = useKelas();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => kelas.deleteKelasById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      handleMutationDeleteResponse(data);
    },
  });
};
