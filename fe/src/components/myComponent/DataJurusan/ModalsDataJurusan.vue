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
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
const siswa = useSiswa();
const formSchema = toTypedSchema(
  z.object({
    nama_jurusan: z.string().min(2).max(50),
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
  <Dialog v-model:open="siswa.openModalsSiswa">
    <DialogContent class="font-mona">
      <DialogHeader>
        <DialogTitle>Tambah Data Jurusan</DialogTitle>
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
            @click="siswa.openModalsSiswa = false"
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
