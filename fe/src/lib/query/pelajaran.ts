import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { computed } from "vue";
import type { JurusanType } from "@/types/siswa";
import type { GuruType } from "@/types/guru";
import { useLesson } from "../pinia/pelajaran";
import type { LessonType } from "@/types/lesson";
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

export const useGetLesson = () => {
  const lesson = useLesson();
  return useQuery({
    queryKey: ["lesson", lesson.searchLesson],
    queryFn: () => lesson.getLesson(),
  });
};

export const useGetLessonById = (
  get_jurusan: JurusanType[],
  get_teacher: GuruType[],
  idLesson: string
) => {
  const lesson = useLesson();
  // Konversi ke lookup object
  const jurusanLookup = computed(() =>
    Object.fromEntries(get_jurusan?.map((j) => [j.id, j]) || [])
  );
  const teacherLookup = computed(() =>
    Object.fromEntries(get_teacher?.map((t) => [t.id, t]) || [])
  );
  //   return useQuery({
  //     queryKey: ["kelas-id", idLesson],
  //     queryFn: () => lesson.getLessonById(idLesson),
  //     enabled: !!idLesson,
  //     select: (data) => ({
  //       ...data,
  //       jurusan: jurusanLookup.value[data.jurusan],
  //       teacher: teacherLookup.value[data.wali_kelas],
  //     }),
  //   });
};
export const useGetLessonByIdBiasa = (idLesson: string) => {
  const lesson = useLesson();

  return useQuery({
    queryKey: ["kelas-id", idLesson],
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
    mutationFn: ({ id, data }: { id: string; data: LessonType }) =>
      lesson.editLessonById(id, data),
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
