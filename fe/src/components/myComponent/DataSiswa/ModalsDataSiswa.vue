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
import type { StudentTypeAdd, StudentTypeEdit } from "@/types/siswa/data_siswa";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, ref, watchEffect } from "vue";
import z from "zod";
import { useEditSiswa, useGetSiswaById, usePostSiswa } from "@/lib/query/siswa";

const formSchema = toTypedSchema(
  z.object({
    nama: z.string().min(2).max(50),
    kelas: z.string().min(2).max(50),
    jkl: z.string().min(1).max(50),
  })
);
const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
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
const jurusan = ref<string>("");
const siswa = useSiswa();
const { data: get_kelas } = useGetKelas();
const { data: get_jurusan } = useGetJurusan();
const mutation = usePostSiswa();
const mutationEdit = useEditSiswa();
const isEditMode = computed(() => !!siswa.idSiswa);

const labelFormKelasDanJurusan = computed(() => {
  if (!get_kelas.value || !get_jurusan.value) return [];
  return get_kelas.value.map((kelas: KelasType) => {
    const dataJurusan = get_jurusan.value.find(
      (jurusan: JurusanType) => jurusan.id === kelas.jurusan.id
    );
    return {
      ...kelas,
      jurusan: dataJurusan,
    };
  });
});

const { data: dataEditSiswa, isSuccess } = useGetSiswaById(
  get_kelas.value,
  siswa.idSiswa
);

const onSubmit = handleSubmit((values) => {
  const payload: StudentTypeAdd = {
    kelasId: values.kelas,
    nama: values.nama,
    jkl: values.jkl,
    jurusanId: jurusan.value,
  };
  const payloadEdit: StudentTypeEdit = {
    nama: values.nama,
    id: siswa.idSiswa,
    kelasId: values.kelas,
    jurusanId: jurusan.value,
    jkl: values.jkl,
  };

  if (isEditMode.value) {
    mutationEdit.mutate({ data: payloadEdit });
  } else {
    mutation.mutate(payload);
  }
  siswa.openModalsWithEdit("");
  siswa.openModalSiswa = false;
});

watchEffect(() => {
  if (siswa.idSiswa && isSuccess.value && dataEditSiswa.value?.id) {
    setFieldValue("nama", dataEditSiswa.value.nama);
    setFieldValue("kelas", dataEditSiswa.value.kelas.id);
    jurusan.value = dataEditSiswa.value.jurusan?.id || "";
    setFieldValue("jkl", dataEditSiswa.value.jkl);
  } else {
    setFieldValue("nama", "", false);
    setFieldValue("kelas", "", false);
    setFieldValue("jkl", "", false);
    jurusan.value = "";
  }
});
</script>

<template>
  <Dialog v-model:open="siswa.openModalSiswa">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>
          {{ isEditMode ? "Edit Data Siswa" : "Tambah Data Siswa" }}
        </DialogTitle>
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
                      @click="jurusan = data?.jurusan?.id"
                    >
                      {{ data?.nama_kelas || "-" }} |
                      {{ data?.jurusan.nama_jurusan || "-" }}
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
