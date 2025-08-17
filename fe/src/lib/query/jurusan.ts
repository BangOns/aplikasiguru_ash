import type { JurusanType } from "@/types/siswa";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { useJurusan } from "../pinia/jurusan";
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

export const usePostJurusan = () => {
  const queryClient = useQueryClient();
  const jurusan = useJurusan();

  return useMutation({
    mutationFn: jurusan.postJurusan,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jurusan"] });
      handleMutationResponse(data);
    },
  });
};

export const useEditJurusan = () => {
  const queryClient = useQueryClient();
  const jurusan = useJurusan();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: JurusanType }) =>
      jurusan.editJurusanById(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jurusan"] });
      handleMutationEditResponse(data);
    },
  });
};
