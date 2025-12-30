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
import { useKelas } from "@/lib/pinia/kelas";
import { useGetTeacher } from "@/lib/query/guru";
import { useGetJurusan } from "@/lib/query/jurusan";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed } from "vue";
import { watchEffect } from "vue";

import z from "zod";
import type { KelasAdd, KelasEdit } from "@/types/siswa/data_kelas";
import { useEditKelas, useGetKelasById, usePostKelas } from "@/lib/query/kelas";
const kelas = useKelas();
const { data: get_jurusan } = useGetJurusan();
const { data: get_teacher } = useGetTeacher();
const mutation = usePostKelas();
const mutationEdit = useEditKelas();

const formSchema = toTypedSchema(
  z.object({
    nama_kelas: z.string().min(1).max(50),
    jurusan: z.optional(z.string().max(50)),
    wali_kelas: z.optional(z.string().max(50)),
  })
);
const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
});
const isEditMode = computed(() => !!kelas.idKelas);
const { data: kelasData, isSuccess, data } = useGetKelasById(kelas.idKelas);

const onSubmit = handleSubmit((values) => {
  const payload: KelasAdd = {
    nama_kelas: values.nama_kelas,
    jurusanId: values.jurusan || "",
    wali_kelasId: values.wali_kelas || "",
  };
  const payloadEdit: KelasEdit = {
    id: kelas.idKelas,
    nama_kelas: values.nama_kelas,
    jurusanId: values.jurusan || "",
    wali_kelasId: values.wali_kelas || "",
  };

  if (isEditMode.value) {
    mutationEdit.mutate({ data: payloadEdit });
  } else {
    mutation.mutate(payload);
  }
  kelas.openModalKelas = false;
});

watchEffect(() => {
  if (kelas.idKelas && isSuccess.value && data.value?.id) {
    setFieldValue("nama_kelas", kelasData.value?.nama_kelas);
    setFieldValue("jurusan", kelasData.value?.jurusan?.id);
    setFieldValue("wali_kelas", kelasData.value?.wali_kelas?.id);
  } else {
    setFieldValue("nama_kelas", "", false);
    setFieldValue("jurusan", "", false);
    setFieldValue("wali_kelas", "", false);
  }
});
</script>

<template>
  <Dialog v-model:open="kelas.openModalKelas">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>
          {{
            kelas.idKelas ? "Edit Data Kelas" : "Tambah Data Kelas"
          }}</DialogTitle
        >
      </DialogHeader>
      <form id="dialogForm" @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="nama_kelas">
          <FormItem v-auto-animate>
            <FormLabel>Nama Kelas</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="nama kelas"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="jurusan">
          <FormItem v-auto-animate>
            <FormLabel>Jurusan</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger
                  :class="errors.jurusan ? 'border-red-500' : ''"
                  class="w-full py-2 px-3 bg-white border"
                >
                  <SelectValue placeholder="Select a fruit" class="font-mona" />
                </SelectTrigger>
                <SelectContent class="p-3">
                  <SelectGroup class="font-mona">
                    <SelectLabel class="font-mona-bold"
                      >Pilih Jurusan</SelectLabel
                    >
                    <SelectItem
                      v-for="(jurusan, index) in get_jurusan"
                      :key="index"
                      :value="jurusan.id"
                    >
                      {{ jurusan.nama_jurusan }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="wali_kelas">
          <FormItem v-auto-animate>
            <FormLabel>Wali Kelas</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger
                  :class="errors.jurusan ? 'border-red-500' : ''"
                  class="w-full py-2 px-3 bg-white border"
                >
                  <SelectValue
                    placeholder="Pilih Wali Kelas"
                    class="font-mona"
                  />
                </SelectTrigger>
                <SelectContent class="p-3">
                  <SelectGroup class="font-mona">
                    <SelectLabel class="font-mona-bold"
                      >Pilih Wali Kelas</SelectLabel
                    >
                    <SelectItem
                      v-for="(teacher, index) in get_teacher"
                      :key="index"
                      :value="teacher.id"
                    >
                      {{ teacher.nama }}
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
            @click="kelas.openModalKelas = false"
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
