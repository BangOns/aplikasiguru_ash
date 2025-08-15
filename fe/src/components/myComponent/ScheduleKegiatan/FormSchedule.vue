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
import { v4 as uuidv4 } from "uuid";
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
import { uesSchedule } from "@/lib/pinia/schedule";
import { watch } from "vue";
import type { ScheduleType } from "@/types/schedule";

const scheduleUse = uesSchedule();
const formSchema = toTypedSchema(
  z.object({
    day: z.string().min(2).max(50),
    start_time: z.string().min(2).max(50),
    end_time: z.string().min(2).max(50),
    activity: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
  })
);
const form = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
});

const onSubmit = form.handleSubmit((values) => {
  const getDates = scheduleUse.datesSchedule.find(
    (date) => date.dayName === values.day
  );
  const data: ScheduleType = {
    id: uuidv4(),
    date: getDates ? String(getDates.fullDate) : "",
    start_time: values.start_time,
    end_time: values.end_time,
    activity: values.activity,
    description: values.description,
    is_active: true,
  };
});

watch(scheduleUse, (newVal) => {
  if (!newVal) return; // kalau null atau undefined, stop

  const { editSchedule, daySchedule, datesSchedule, setDatesSchedule } = newVal;

  if (daySchedule) {
    form.setFieldValue("day", daySchedule);
  }
  if (editSchedule) {
    const getDay = Array.isArray(datesSchedule)
      ? datesSchedule.find((date) => date.fullDate === setDatesSchedule?.date)
      : null;

    form.setFieldValue("day", getDay?.dayName || "");
    form.setFieldValue("start_time", setDatesSchedule?.start_time || "");
    form.setFieldValue("end_time", setDatesSchedule?.end_time || "");
    form.setFieldValue("activity", setDatesSchedule?.activity || "");
    form.setFieldValue("description", setDatesSchedule?.description || "");
  }
});
</script>

<template>
  <article id="form-schedule" class="w-full rounded border shadow p-5 mt-5">
    <header class="w-full">
      <section class="flex font-mona-bold gap-2 items-center">
        <Vicon name="co-plus" scale="1.5" class="p-0 font-bold" />
        <h1 class="text-lg">Tambah Jadwal Baru</h1>
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

    <form @submit="onSubmit" class="mt-5 space-y-4">
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
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="start_time" class="w-full">
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
      </section>

      <!-- Row 2: End Time & Mapel -->
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
            <FormLabel>Mata Pelajaran</FormLabel>
            <FormControl>
              <Input
                type="text"
                class="w-full py-2 font-mona-bold bg-white"
                placeholder="Mata pelajaran"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>

      <!-- Row 3: Classroom -->
      <FormField v-slot="{ componentField }" name="description" class="w-full">
        <FormItem v-auto-animate class="w-full font-mona-bold">
          <FormLabel>Ruang Kelas</FormLabel>
          <FormControl>
            <Input
              type="text"
              class="w-full py-2 font-mona-bold bg-white"
              placeholder="Ruang kelas"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <Button
        type="submit"
        class="mt-5 bg-blue-500 hover:bg-blue-600 cursor-pointer w-full"
        :disabled="!form.meta.value.valid"
      >
        Submit Jadwal
      </Button>
    </form>
  </article>
</template>
