import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";

import { useLesson } from "../pinia/pelajaran";
import type { LessonTypeEdit } from "@/types/lesson/lesson";
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

export const useGetLesson = () => {
  const lesson = useLesson();
  return useQuery({
    queryKey: ["lesson"],
    queryFn: () => lesson.getLesson(),
  });
};

export const useGetLessonById = (idLesson: string) => {
  const lesson = useLesson();

  return useQuery({
    queryKey: ["lesson-id", idLesson],
    queryFn: () => lesson.getLessonById(idLesson),
    enabled: !!idLesson,
    select: (data) => ({
      ...data,
    }),
  });
};
export const useGetLessonByIdBiasa = (idLesson: string) => {
  const lesson = useLesson();

  return useQuery({
    queryKey: ["lesson-id", idLesson],
    queryFn: () => lesson.getLessonById(idLesson),
    enabled: !!idLesson,
  });
};

export const usePostLesson = () => {
  const queryClient = useQueryClient();
  const lesson = useLesson();

  return useMutation({
    mutationFn: lesson.postLesson,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lesson"] });
      handleMutationResponse(data);
    },
  });
};

export const useEditLesson = () => {
  const queryClient = useQueryClient();
  const lesson = useLesson();

  return useMutation({
    mutationFn: ({ data }: { data: LessonTypeEdit }) =>
      lesson.editLessonById(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lesson"] });
      handleMutationEditResponse(data);
    },
  });
};
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  const lesson = useLesson();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => lesson.deleteLessonById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lesson"] });
      handleMutationDeleteResponse(data);
    },
  });
};
