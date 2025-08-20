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

import { useQuery } from "@tanstack/vue-query";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, watchEffect } from "vue";
import { v4 as uuidv4 } from "uuid";

import z from "zod";
import { useTeacher } from "@/lib/pinia/guru";
import { useEditTeacher, usePostTeacher } from "@/lib/query/guru";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GuruType } from "@/types/guru";
const formSchema = toTypedSchema(
  z.object({
    nama: z.string().min(2).max(50),
    telp: z.string().min(2).max(50),
    email: z.string().email(),
    jkl: z.string().min(1).max(50),
  })
);
const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
});
const genderOptions = [
  {
    value: "L",
    name: "Laki-laki",
  },
  {
    value: "P",
    name: "Perempuan",
  },
];
const teacher = useTeacher();
const mutation = usePostTeacher();
const mutationEdit = useEditTeacher();
const isEditMode = computed(() => !!teacher.idTeacher);
const onSubmit = handleSubmit((values) => {
  const payload: GuruType = {
    id: isEditMode.value ? teacher.idTeacher : uuidv4(),
    ...values,
  };

  if (isEditMode.value) {
    mutationEdit.mutate({ id: payload.id, data: payload });
  } else {
    mutation.mutate(payload);
  }
  teacher.openModalTeacher = false;
});
const { data, isSuccess } = useQuery({
  queryKey: ["teacher-id", teacher.idTeacher],
  queryFn: () => teacher.getTeacherById(teacher.idTeacher),
  enabled: isEditMode,
});
const allowedFields = ["nama", "telp", "email", "jkl"] as const;
watchEffect(() => {
  if (teacher.idTeacher && isSuccess.value && data.value?.id) {
    allowedFields.forEach((key) => {
      setFieldValue(key, data.value[key] ?? "");
    });
  } else {
    // reset semua field kecuali id
    allowedFields.forEach((key) => {
      setFieldValue(key, "", false);
    });
  }
});
</script>

<template>
  <Dialog v-model:open="teacher.openModalTeacher">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>{{
          teacher.idTeacher ? "Edit Data teacher" : "Tambah Data teacher"
        }}</DialogTitle>
      </DialogHeader>
      <form id="dialogForm" @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="nama">
          <FormItem v-auto-animate>
            <FormLabel>Nama Guru</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="nama guru"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="email mu"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="telp">
          <FormItem v-auto-animate>
            <FormLabel>No. Telp</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="089********"
                v-bind="componentField"
              />
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
                      v-for="(value, index) in genderOptions"
                      :key="index"
                      :value="value.value"
                    >
                      {{ value.name }}
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
            @click="teacher.openModalTeacher = false"
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
