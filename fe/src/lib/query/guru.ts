import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { useTeacher } from "../pinia/guru";
import type { GuruTypeEdit } from "@/types/guru/data_guru";
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
export const useGetTeacher = () => {
  const teacher = useTeacher();
  return useQuery({
    queryKey: ["teacher"],
    queryFn: teacher.getTeacher,
  });
};

export const usePostTeacher = () => {
  const queryClient = useQueryClient();
  const teacher = useTeacher();

  return useMutation({
    mutationFn: teacher.postTeacher,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      handleMutationResponse(data);
    },
  });
};

export const useEditTeacher = () => {
  const queryClient = useQueryClient();
  const teacher = useTeacher();

  return useMutation({
    mutationFn: ({ data }: { data: GuruTypeEdit }) =>
      teacher.editTeacherById(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      handleMutationEditResponse(data);
    },
  });
};
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  const teacher = useTeacher();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => teacher.deleteTeacherById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      handleMutationDeleteResponse(data);
    },
  });
};
