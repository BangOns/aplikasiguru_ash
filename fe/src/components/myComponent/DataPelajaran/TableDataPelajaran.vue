<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Vicon from "../Vicon.vue";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetKelas } from "@/lib/query/kelas";
import { computed } from "vue";
import { useGetTeacher } from "@/lib/query/guru";
import type { JurusanType } from "@/types/siswa";
import type { GuruType } from "@/types/guru";
import { useLesson } from "@/lib/pinia/pelajaran";
import { useDeleteLesson, useGetLesson } from "@/lib/query/pelajaran";
import type { LessonType } from "@/types/lesson";

const lesson = useLesson();
const query = useGetLesson();
const { data: get_kelas } = useGetKelas();
const { data: get_teacher } = useGetTeacher();

const filteredLesson = computed(() => {
  if (!query.data.value) return [];

  const searchTerm = lesson.searchLesson.toLowerCase();
  const searchTermKelas = lesson.searchKelas.toLowerCase();

  return query.data.value
    ?.map((lessonItem: LessonType) => {
      const kelas = get_kelas.value?.find(
        (item: GuruType) => item.id === lessonItem?.kelas?.id
      );

      const teacher = get_teacher.value?.find(
        (item: JurusanType) => item.id === lessonItem.guru?.id
      );

      return {
        ...lessonItem,
        teacher: teacher?.nama ?? "",
        kelas: kelas?.nama_kelas ?? "",
      };
    })
    .filter(
      (lessonMerged: any) =>
        (lessonMerged.mapel || "").toLowerCase().includes(searchTerm) &&
        (lessonMerged.kelas || "").toLowerCase().includes(searchTermKelas)
    );
});

const mutationDelete = useDeleteLesson();
const handleDeleteLesson = (id: string) => {
  if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
    mutationDelete.mutate({ id });
  }
};
</script>

<template>
  <article class="w-full mt-5">
    <section class="w-full flex justify-end">
      <button
        @click="lesson.openModals"
        class="py-2 px-3 cursor-pointer flex items-center bg-green-800 gap-2 hover:bg-green-900 text-white rounded-lg font-mona-bold border"
      >
        <Vicon name="bi-plus" scale="1.5" />
        <p>Tambah Data Pelajaran</p>
      </button>
    </section>
    <!-- Loading State -->
    <section
      v-if="query.isPending.value"
      class="w-full h-40 flex items-center justify-center"
    >
      <p>Loading...</p>
    </section>

    <!-- Error State -->
    <section
      v-else-if="query.isError.value"
      class="w-full h-40 flex items-center justify-center"
    >
      <p>Error: {{ query.error }}</p>
    </section>

    <!-- Empty State -->
    <section
      v-else-if="!query.data.value || filteredLesson?.length === 0"
      class="w-full h-40 flex items-center justify-center"
    >
      <p>No data available</p>
    </section>
    <Table v-else class="w-full relative font-mona">
      <TableHeader>
        <TableRow class="border-slate-300 text-center">
          <TableHead class="text-left px-0" :colspan="2">
            <div class="flex items-center gap-1">
              <Vicon name="fa-sort" scale="1" color="black" />
              <p class="text-black">Nama Pelajaran</p>
            </div>
          </TableHead>
          <TableHead class="text-black text-center">Kelas</TableHead>
          <!-- <TableHead class="text-black text-center">Jurusan</TableHead> -->
          <TableHead class="text-black text-center">Guru Pengajar</TableHead>
          <TableHead class="text-black text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="w-full overflow-y-auto">
        <TableRow
          class="border-none text-center"
          v-for="(data, index) in filteredLesson"
          :key="index"
        >
          <TableCell class="text-left" :colspan="2">
            <div class="flex items-center gap-3">
              <p>{{ Number(index) + 1 }}</p>
              <p>
                {{ data?.nama_pelajaran || "" }}
              </p>
            </div>
          </TableCell>

          <TableCell>
            <p>{{ data?.kelas || "-" }}</p>
          </TableCell>

          <TableCell>
            <p>{{ data.teacher || "-" }}</p>
          </TableCell>

          <TableCell class="">
            <DropdownMenu>
              <DropdownMenuTrigger class="cursor-pointer">
                <Vicon name="bi-three-dots-vertical" scale="1.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="left"
                align="start"
                class="font-mona space-y-2"
              >
                <DropdownMenuItem
                  @click="lesson.openModalsWithEdit(data.id)"
                  class="flex w-full p-2 items-center gap-2 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Vicon
                    name="fa-regular-edit"
                    scale="1.5"
                    class="text-white"
                  />
                  <p class="pt-1">Edit</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="() => handleDeleteLesson(data.id)"
                  class="flex w-full p-2 items-center gap-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white"
                >
                  <Vicon
                    name="md-deleteforever"
                    scale="1.5"
                    class="text-white"
                  />
                  <p class="pt-1">Hapus</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </article>
</template>
