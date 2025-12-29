import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { usePresent } from "../pinia/absensi";

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

export const useGetAbsensi = () => {
  const absensi = usePresent();
  return useQuery({
    queryKey: ["absensi"],
    queryFn: absensi.getAbsensi,
  });
};

export const usePostAbsensi = () => {
  const queryClient = useQueryClient();
  const absensi = usePresent();
  return useMutation({
    mutationFn: absensi.postAbsensi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["absensi"] });
      handleMutationResponse(data);
    },
  });
};
export const useEditAbsensi = () => {
  const queryClient = useQueryClient();
  const absensi = usePresent();
  return useMutation({
    mutationFn: absensi.editAbsensi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["absensi"] });
      handleMutationEditResponse(data);
    },
  });
};
