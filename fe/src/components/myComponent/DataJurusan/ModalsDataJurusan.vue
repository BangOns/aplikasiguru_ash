<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJurusan } from "@/lib/pinia/jurusan";
import { useSiswa } from "@/lib/pinia/siswa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, watch, watchEffect } from "vue";
import { v4 as uuidv4 } from "uuid";

import z from "zod";
import type { JurusanType } from "@/types/siswa";
const formSchema = toTypedSchema(
  z.object({
    nama_jurusan: z.string().min(2).max(50),
  })
);
const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
});

const jurusan = useJurusan();
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: jurusan.postJurusan,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["jurusan"] });
    jurusan.openModalJurusan = false;
  },
});

const mutationEdit = useMutation({
  mutationFn: ({ id, data }: { id: string; data: JurusanType }) =>
    jurusan.editJurusanById(id, data),
});

const onSubmit = handleSubmit((values) => {
  if (jurusan.idJurusan) {
    const dataJurusan = {
      id: jurusan.idJurusan,
      nama_jurusan: values.nama_jurusan,
    };
    mutationEdit.mutate({ id: jurusan.idJurusan, data: dataJurusan });
    return;
  }
  const dataJurusan: JurusanType = {
    id: uuidv4(),
    nama_jurusan: values.nama_jurusan,
  };
  mutation.mutate(dataJurusan);
});
const { data, isLoading, isSuccess } = useQuery({
  queryKey: ["jurusan-id", jurusan.idJurusan],
  queryFn: () => jurusan.getJurusanById(jurusan.idJurusan),
  enabled: computed(() => !!jurusan.idJurusan),
});

watchEffect(() => {
  if (isSuccess.value && data.value?.id) {
    console.log("Setting field value:", data.value.nama_jurusan);
    setFieldValue("nama_jurusan", data.value.nama_jurusan);
  }
  console.log("Jurusan ID:", jurusan.idJurusan);
});
</script>

<template>
  <Dialog v-model:open="jurusan.openModalJurusan">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>{{
          jurusan.idJurusan ? "Edit Data Jurusan" : "Tambah Data Jurusan"
        }}</DialogTitle>
      </DialogHeader>
      <form id="dialogForm" @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="nama_jurusan">
          <FormItem v-auto-animate>
            <FormLabel>Nama Jurusan</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="nama jurusan"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter class="pt-2">
          <button
            type="button"
            class="cursor-pointer py-2 px-3 bg-slate-200 hover:bg-slate-400 rounded-lg font-mona-bold"
            @click="jurusan.openModalJurusan = false"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="cursor-pointer py-2 px-3 bg-green-500 hover:bg-green-700 rounded-lg font-mona-bold"
          >
            Save changes
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
