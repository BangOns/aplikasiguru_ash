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
import { useGetJurusan } from "@/lib/query/jurusan";
import { useGetKelas } from "@/lib/query/kelas";
import type { JurusanType } from "@/types/siswa";
import type { KelasType } from "@/types/siswa/data_kelas";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, watchEffect } from "vue";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useLesson } from "@/lib/pinia/pelajaran";
import type { LessonType } from "@/types/lesson";
import {
  useEditLesson,
  useGetLessonById,
  usePostLesson,
} from "@/lib/query/pelajaran";
import { useGetTeacher } from "@/lib/query/guru";
import type { GuruType } from "@/types/guru";

const formSchema = toTypedSchema(
  z.object({
    mapel: z.string().min(2).max(50),
    kelas: z.string().min(2).max(50),
    teacher: z.string().min(1).max(50),
  })
);
const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
});

const lesson = useLesson();
const { data: get_kelas } = useGetKelas();
const { data: get_jurusan } = useGetJurusan();
const { data: get_teacher } = useGetTeacher();
const mutation = usePostLesson();
const mutationEdit = useEditLesson();
const isEditMode = computed(() => !!lesson.idLesson);

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

const { data: dataEditLesson, isSuccess } = useGetLessonById(
  get_kelas.value,
  get_teacher.value,
  lesson.idLesson
);

const onSubmit = handleSubmit((values) => {
  const payload: LessonType = {
    id: isEditMode.value ? lesson.idLesson : uuidv4(),
    ...values,
  };

  if (isEditMode.value) {
    mutationEdit.mutate({ data: payload });
  } else {
    mutation.mutate(payload);
  }
  lesson.openModalLesson = false;
});

watchEffect(() => {
  if (lesson.idLesson && isSuccess.value && dataEditLesson.value?.id) {
    setFieldValue("mapel", dataEditLesson.value.mapel);
    setFieldValue("kelas", dataEditLesson.value.kelas.id);
    setFieldValue("teacher", dataEditLesson.value.teacher.id);
  } else {
    setFieldValue("mapel", "", false);
    setFieldValue("kelas", "", false);
    setFieldValue("teacher", "", false);
  }
});
</script>

<template>
  <Dialog v-model:open="lesson.openModalLesson">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>
          {{ isEditMode ? "Edit Data Pelajaran" : "Tambah Data Pelajaran" }}
        </DialogTitle>
      </DialogHeader>
      <form id="dialogForm" @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="mapel">
          <FormItem v-auto-animate>
            <FormLabel>Nama Pelajaran</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="nama pelajaran"
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

        <FormField v-slot="{ componentField }" name="teacher">
          <FormItem v-auto-animate>
            <FormLabel>Guru Pengajar</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger
                  :class="errors.teacher ? 'border-red-500' : ''"
                  class="w-full py-2 px-3 bg-white border"
                >
                  <SelectValue
                    placeholder="Pilih Guru Pengajar"
                    class="font-mona"
                  />
                </SelectTrigger>
                <SelectContent class="p-3">
                  <SelectGroup class="font-mona">
                    <SelectLabel class="font-mona-bold"
                      >Pilih Guru Pengajar</SelectLabel
                    >
                    <SelectItem
                      v-for="(data, index) in get_teacher as GuruType[]"
                      :key="index"
                      :value="data.id"
                    >
                      {{ data.nama }}
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
            @click="lesson.openModalLesson = false"
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
