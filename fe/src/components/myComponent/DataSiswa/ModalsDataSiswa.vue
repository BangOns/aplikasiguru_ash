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
import { useSiswa } from "@/lib/pinia/siswa";
import { useGetJurusan } from "@/lib/query/jurusan";
import { useGetKelas } from "@/lib/query/kelas";
import type { JurusanType } from "@/types/siswa";
import type { KelasType } from "@/types/siswa/data_kelas";
import type { StudentType } from "@/types/siswa/data_siswa";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed } from "vue";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useEditSiswa, usePostSiswa } from "@/lib/query/siswa";

const siswa = useSiswa();
const { data: get_kelas } = useGetKelas();
const { data: get_jurusan } = useGetJurusan();

const labelFormKelasDanJurusan = computed(() => {
  if (!get_kelas.value || !get_jurusan.value) return [];
  return get_kelas.value.map((kelas: KelasType) => {
    const nameJurusan = get_jurusan.value.find(
      (jurusan: JurusanType) => jurusan.id === kelas.jurusan
    );
    return {
      ...kelas,
      jurusan: nameJurusan?.nama_jurusan,
    };
  });
});

const formSchema = toTypedSchema(
  z.object({
    nama: z.string().min(2).max(50),
    kelas: z.string().min(2).max(50),
    jkl: z.string().min(1).max(50),
  })
);
const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
});
const mutation = usePostSiswa();
const mutationEdit = useEditSiswa();

const isEditMode = computed(() => !!siswa.idSiswa);

const onSubmit = handleSubmit((values) => {
  const payload: StudentType = {
    id: isEditMode.value ? siswa.idSiswa : uuidv4(),
    ...values,
  };

  if (isEditMode.value) {
    mutationEdit.mutate({ data: payload });
  } else {
    mutation.mutate(payload);
  }
  siswa.openModalSiswa = false;
});
const genderOption: { value: string; label: string }[] = [
  {
    value: "L",
    label: "Laki-laki",
  },
  {
    value: "P",
    label: "Perempuan",
  },
];
</script>

<template>
  <Dialog v-model:open="siswa.openModalSiswa">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>Tambah Data Siswa</DialogTitle>
      </DialogHeader>
      <form id="dialogForm" @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="nama">
          <FormItem v-auto-animate>
            <FormLabel>Nama Siswa</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="nama siswa"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="kelas">
          <FormItem v-auto-animate>
            <FormLabel>Kelas</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger
                  :class="errors.kelas ? 'border-red-500' : ''"
                  class="w-full py-2 px-3 bg-white border"
                >
                  <SelectValue placeholder="Pilih Kelas" class="font-mona" />
                </SelectTrigger>
                <SelectContent class="p-3">
                  <SelectGroup class="font-mona">
                    <SelectLabel class="font-mona-bold"
                      >Pilih Kelas</SelectLabel
                    >
                    <SelectItem
                      v-for="(data, index) in labelFormKelasDanJurusan as KelasType[]"
                      :key="index"
                      :value="data.id"
                    >
                      {{ data.nama_kelas }}-{{ data.jurusan }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="jkl">
          <FormItem v-auto-animate>
            <FormLabel>Jenis Kelamin</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger
                  :class="errors.jkl ? 'border-red-500' : ''"
                  class="w-full py-2 px-3 bg-white border"
                >
                  <SelectValue
                    placeholder="Pilih Jenis Kelamin"
                    class="font-mona"
                  />
                </SelectTrigger>
                <SelectContent class="p-3">
                  <SelectGroup class="font-mona">
                    <SelectLabel class="font-mona-bold"
                      >Pilih Jenis Kelamin</SelectLabel
                    >
                    <SelectItem
                      v-for="(data, index) in genderOption"
                      :key="index"
                      :value="data.value"
                    >
                      {{ data.label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter class="pt-2">
          <button
            type="button"
            class="cursor-pointer py-2 px-3 bg-slate-200 hover:bg-slate-400 rounded-lg font-mona-bold"
            @click="siswa.openModalSiswa = false"
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
