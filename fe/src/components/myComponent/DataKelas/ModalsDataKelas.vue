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
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
const jurusan = useJurusan();
const formSchema = toTypedSchema(
  z.object({
    nama_kelas: z.string().min(2).max(50),
    jurusan: z.string().min(2).max(50),
  })
);
const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
});

const onSubmit = handleSubmit((values) => {
  //   const getDates = scheduleUse.datesSchedule.find(
  //     (date) => date.dayName === values.day
  //   );
  //   const data = {
  //     id: uuidv4(),
  //     date: getDates ? String(getDates.fullDate) : "",
  //     start_time: values.start_time,
  //     end_time: values.end_time,
  //     activity: values.activity,
  //     description: values.description,
  //     is_active: true,
  //   };
});
</script>

<template>
  <Dialog v-model:open="jurusan.openModalJurusan">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>Tambah Data Kelas</DialogTitle>
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
        <FormField v-slot="{ componentField }" name="kelas">
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
                    <SelectLabel class="font-mona-bold">Day</SelectLabel>
                    <SelectItem
                      v-for="day in [12, 2, 3, 4]"
                      :key="day"
                      :value="day"
                    >
                      {{ day }}
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
