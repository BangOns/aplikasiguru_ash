import type { JurusanType } from "@/types/siswa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { useJurusan } from "../pinia/jurusan";
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
export const useGetJurusan = () => {
  const jurusan = useJurusan();
  return useQuery({
    queryKey: ["jurusan"],
    queryFn: jurusan.getJurusan,
  });
};
const handleMutationDeleteResponse = (data: any) => {
  const isSuccess = data?.status === true;
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
    mutationFn: ({ data }: { data: JurusanType }) =>
      jurusan.editJurusanById(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jurusan"] });
      handleMutationEditResponse(data);
    },
  });
};
export const useDeleteJurusan = () => {
  const queryClient = useQueryClient();
  const jurusan = useJurusan();

  return useMutation({
    mutationFn: ({
      id,
    }: {
      id: string;
      // id_kelas: string[];
      // id_siswa: string[];
      // id_lesson: string[];
    }) => jurusan.deleteJurusanById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jurusan"] });
      handleMutationDeleteResponse(data);
    },
  });
};
