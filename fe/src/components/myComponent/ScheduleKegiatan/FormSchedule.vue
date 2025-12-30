<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Vicon from "../Vicon.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import Input from "@/components/ui/input/Input.vue";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { computed, watch } from "vue";
import { useSchedule } from "@/lib/pinia/schedule";
import {
  uesPostSchedule,
  useEditSchedule,
  useGetScheduleById,
} from "@/lib/query/schedule";
import type {
  ScheduleTypeAdd,
  ScheduleTypeEdit,
} from "@/types/schedule/ScheduleType";
import { toast } from "vue-sonner";

const scheduleUse = useSchedule();
const mutationPost = uesPostSchedule();
const mutationEdit = useEditSchedule();

// 1. Buat computed untuk properti yang sering digunakan
const daySchedule = computed(() => scheduleUse.daySchedule);
const editSchedule = computed(() => scheduleUse.editSchedule);
const setDatesSchedule = computed(() => scheduleUse.setDatesSchedule);
const datesSchedule = computed(() => scheduleUse.datesSchedule);

// 2. Validasi schema
const formSchema = toTypedSchema(
  z.object({
    day: z.string().min(1, "Hari harus dipilih"),
    start_time: z.string().min(1, "Jam mulai harus diisi"),
    end_time: z.string().min(1, "Jam selesai harus diisi"),
    activity: z.string().min(2, "Kegiatan minimal 2 karakter").max(50),
    description: z.string().min(2, "Deskripsi minimal 2 karakter").max(500),
  })
);

// 3. Setup form
const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    day: "",
    start_time: "",
    end_time: "",
    activity: "",
    description: "",
  },
});

// 4. Fetch data untuk edit mode
const { data: get_scheduleId } = useGetScheduleById(
  setDatesSchedule.value?.id || ""
);

// 5. Computed untuk edit mode
const isEditMode = computed(() => !!setDatesSchedule.value?.id);

// 6. Watch untuk update form berdasarkan schedule store
watch([daySchedule, editSchedule, setDatesSchedule], () => {
  // Jika ada daySchedule (dari calendar click)
  if (daySchedule.value && !editSchedule.value) {
    setFieldValue("day", daySchedule.value);
    return;
  }

  // Jika mode edit aktif
  if (editSchedule.value && setDatesSchedule.value) {
    try {
      // Format day dari date string
      const scheduleDate = setDatesSchedule.value.date;
      let dayName = "";

      if (scheduleDate) {
        // Coba parse date
        const dateObj = new Date(scheduleDate);
        if (!isNaN(dateObj.getTime())) {
          dayName = dateObj.toLocaleDateString("id-ID", { weekday: "long" });
        }
      }

      // Set semua field values
      setFieldValue("day", dayName || "");
      setFieldValue("start_time", setDatesSchedule.value.start_time || "");
      setFieldValue("end_time", setDatesSchedule.value.end_time || "");
      setFieldValue("activity", setDatesSchedule.value.activity || "");
      setFieldValue("description", setDatesSchedule.value.description || "");
    } catch (error) {
      toast.error("Error parsing date");
    }
  }
});

// 7. Juga watch data dari API query (jika menggunakan useGetScheduleById)
watch(get_scheduleId, (newData) => {
  if (newData && isEditMode.value) {
    // Format day dari date string API
    try {
      const dates = new Date(newData.date);
      const dayName = dates.toLocaleDateString("id-ID", { weekday: "long" });

      setFieldValue("day", dayName);
      setFieldValue("start_time", newData.start_time || "");
      setFieldValue("end_time", newData.end_time || "");
      setFieldValue("activity", newData.activity || "");
      setFieldValue("description", newData.description || "");
    } catch (error) {
      toast.error("Error parsing API date");
      return;
    }
  }
});

// 8. Handle submit
const onSubmit = handleSubmit(async (values) => {
  try {
    // Cari full date berdasarkan day name
    const getDate = datesSchedule.value.find(
      (date) => date.dayName === values.day
    );

    if (!getDate?.fullDate) {
      toast.error("Date not found for day: " + values.day);
      return;
    }

    if (isEditMode.value && setDatesSchedule.value) {
      // Mode edit
      const dataEdit: ScheduleTypeEdit = {
        id: setDatesSchedule.value.id,
        date: String(getDate.fullDate),
        start_time: values.start_time,
        end_time: values.end_time,
        activity: values.activity,
        description: values.description,
        is_active: 1,
      };

      await mutationEdit.mutateAsync(dataEdit);
    } else {
      // Mode tambah baru
      const data: ScheduleTypeAdd = {
        date: String(getDate.fullDate),
        start_time: values.start_time,
        end_time: values.end_time,
        activity: values.activity,
        description: values.description,
        is_active: 1,
      };

      await mutationPost.mutateAsync(data);
    }

    // Reset form setelah berhasil
    handleReset();
  } catch (error) {
    toast.error("Error submitting form");
    return;
  }
});

// 9. Reset form jika keluar dari edit mode
watch(isEditMode, (newVal) => {
  if (!newVal) {
    handleReset();
  }
});
const handleReset = () => {
  resetForm();
  scheduleUse.$patch({
    daySchedule: "",
    editSchedule: false,
    setDatesSchedule: {
      id: "",
      date: "",
      start_time: "",
      end_time: "",
      activity: "",
      description: "",
      is_active: 0,
    },
  });
};
</script>

<template>
  <article id="form-schedule" class="w-full rounded border shadow p-5 mt-5">
    <header class="w-full">
      <section class="flex font-mona-bold gap-2 items-center">
        <Vicon name="co-plus" scale="1.5" class="p-0 font-bold" />
        <h1 class="text-lg">
          {{ isEditMode ? "Edit Jadwal" : "Tambah Jadwal Baru" }}
        </h1>
      </section>
      <section class="flex font-mona-bold items-start gap-2 mt-5">
        <Vicon
          name="ri-alarm-warning-fill"
          scale="0.9"
          class="font-bold text-amber-400"
        />
        <h3 class="block text-sm">
          Catatan :
          <span class="text-blue-400"
            >Jadwal yang ditambahkan hanya berlaku pada hari yang sama</span
          >
        </h3>
      </section>
    </header>

    <form @submit.prevent="onSubmit" class="mt-5 space-y-4">
      <!-- Row 1: Hari & Start Time -->
      <section class="w-full flex max-md:flex-col justify-between gap-5">
        <FormField v-slot="{ componentField }" name="day" class="w-full">
          <FormItem v-auto-animate class="w-full font-mona-bold">
            <FormLabel>Hari</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="w-full py-2 px-3 bg-white">
                  <SelectValue placeholder="Pilih hari" />
                </SelectTrigger>
                <SelectContent class="p-3">
                  <SelectGroup class="font-mona">
                    <SelectLabel class="font-mona-bold">Day</SelectLabel>
                    <SelectItem
                      v-for="(day, index) in scheduleUse.filterDaySchedule(
                        scheduleUse.datesSchedule
                      )"
                      :key="index"
                      :value="day.dayName"
                    >
                      {{ day.dayName }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="start_time" class="w-full">
          <FormItem v-auto-animate class="w-full font-mona-bold">
            <FormLabel>Jam Mulai</FormLabel>
            <FormControl>
              <Input
                type="time"
                class="w-full py-2 font-mona-bold bg-white"
                placeholder="Jam mulai"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>

      <!-- Row 2: End Time & Activity -->
      <section class="w-full flex max-md:flex-col justify-between gap-5">
        <FormField v-slot="{ componentField }" name="end_time" class="w-full">
          <FormItem v-auto-animate class="w-full font-mona-bold">
            <FormLabel>Jam Selesai</FormLabel>
            <FormControl>
              <Input
                type="time"
                class="w-full py-2 font-mona-bold bg-white"
                placeholder="Jam selesai"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="activity" class="w-full">
          <FormItem v-auto-animate class="w-full font-mona-bold">
            <FormLabel>Nama Kegiatan</FormLabel>
            <FormControl>
              <Input
                type="text"
                class="w-full py-2 font-mona-bold bg-white"
                placeholder="Nama kegiatan"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>

      <!-- Deskripsi -->
      <FormField v-slot="{ componentField }" name="description" class="w-full">
        <FormItem v-auto-animate class="w-full font-mona-bold">
          <FormLabel>Deskripsi Kegiatan</FormLabel>
          <FormControl>
            <Input
              type="text"
              class="w-full py-2 font-mona-bold bg-white"
              placeholder="Deskripsi kegiatan"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <div class="flex gap-3">
        <Button
          v-if="isEditMode"
          type="button"
          variant="outline"
          class="mt-5 cursor-pointer w-1/2"
          @click="handleReset"
        >
          Batal Edit
        </Button>
        <Button
          type="submit"
          class="mt-5 bg-blue-500 hover:bg-blue-600 cursor-pointer"
          :class="isEditMode ? 'w-1/2' : 'w-full'"
        >
          {{ isEditMode ? "Update Jadwal" : "Submit Jadwal" }}
        </Button>
      </div>
    </form>
  </article>
</template>
