import { toast } from "vue-sonner";
import { useSchedule } from "../pinia/schedule";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { ScheduleType } from "@/types/schedule";
import type {
  ScheduleTypeAdd,
  ScheduleTypeEdit,
} from "@/types/schedule/ScheduleType";

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

export const useGetSchedule = () => {
  const schedule = useSchedule();
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => schedule.getSchedule(),
  });
};
export const useGetScheduleById = (id: string) => {
  const schedule = useSchedule();
  return useQuery({
    queryKey: ["schedule", id],
    queryFn: () => schedule.getScheduleByID(id),
    enabled: !!id,
  });
};
export const uesPostSchedule = () => {
  const queryClient = useQueryClient();
  const schedule = useSchedule();
  return useMutation({
    mutationFn: (data: ScheduleTypeAdd) => schedule.postSchedule(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      handleMutationResponse(data);
    },
  });
};
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  const schedule = useSchedule();
  return useMutation({
    mutationFn: (id: string) => schedule.deleteSchedule(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      handleMutationDeleteResponse(data);
    },
  });
};
export const useEditSchedule = () => {
  const queryClient = useQueryClient();
  const schedule = useSchedule();
  return useMutation({
    mutationFn: (data: ScheduleTypeEdit) => schedule.editSchedules(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      handleMutationEditResponse(data);
    },
  });
};
