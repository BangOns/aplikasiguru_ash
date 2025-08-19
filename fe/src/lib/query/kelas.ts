import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { useKelas } from "../pinia/kelas";
import type { KelasType } from "@/types/siswa/data_kelas";
import { computed } from "vue";
import type { JurusanType } from "@/types/siswa";
import type { GuruType } from "@/types/guru";
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

export const useGetKelas = () => {
  const kelas = useKelas();
  return useQuery({
    queryKey: ["kelas", kelas.searchKelas],
    queryFn: () => kelas.getKelas(),
  });
};

export const useGetKelasById = (
  get_jurusan: JurusanType[],
  get_teacher: GuruType[],
  idKelas: string
) => {
  const kelas = useKelas();
  // Konversi ke lookup object
  const jurusanLookup = computed(() =>
    Object.fromEntries(get_jurusan?.map((j) => [j.id, j]) || [])
  );
  const teacherLookup = computed(() =>
    Object.fromEntries(get_teacher?.map((t) => [t.id, t]) || [])
  );
  return useQuery({
    queryKey: ["kelas-id", idKelas],
    queryFn: () => kelas.getKelasById(idKelas),
    enabled: !!idKelas,
    select: (data) => ({
      ...data,
      jurusan: jurusanLookup.value[data.jurusan],
      teacher: teacherLookup.value[data.wali_kelas],
    }),
  });
};
export const useGetKelasByIdBiasa = (idKelas: string) => {
  const kelas = useKelas();

  return useQuery({
    queryKey: ["kelas-id", idKelas],
    queryFn: () => kelas.getKelasById(idKelas),
    enabled: !!idKelas,
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

export const useEditKelas = () => {
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
