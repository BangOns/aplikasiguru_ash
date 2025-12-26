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
import { useKelas } from "@/lib/pinia/kelas";
import { useDeleteKelas, useGetKelas } from "@/lib/query/kelas";
import { computed } from "vue";
import type { KelasType } from "@/types/siswa/data_kelas";
import { useGetJurusan } from "@/lib/query/jurusan";
import { useGetTeacher } from "@/lib/query/guru";
import type { JurusanType } from "@/types/siswa";
import type { GuruType } from "@/types/guru";
import { useGetSiswa } from "@/lib/query/siswa";
import { useGetLesson } from "@/lib/query/pelajaran";
import type { StudentType } from "@/types/siswa/data_siswa";
import type { LessonType } from "@/types/lesson";

const kelas = useKelas();
const query = useGetKelas();
const { data: get_jurusan } = useGetJurusan();
const { data: get_teacher } = useGetTeacher();
const { data: get_siswa } = useGetSiswa();
const { data: get_lesson } = useGetLesson();

const filteredKelas = computed(() => {
  if (!query.data.value) return [];

  const searchTerm = kelas.searchKelas.toLowerCase();
  const searchTermJurusan = kelas.searchJurusan.toLowerCase();
  const searchTermWaliKelas = kelas.searchWaliKelas.toLowerCase();
  return query.data.value;
  // return query.data.value
  //   .map((kelasItem: KelasType) => {
  //     const jurusan = get_jurusan.value?.find(
  //       (item: JurusanType) => item.id === kelasItem.jurusan
  //     );
  //     const wali_kelas = get_teacher.value?.find(
  //       (item: GuruType) => item.id === kelasItem.wali_kelas
  //     );

  //     return {
  //       ...kelasItem,
  //       jurusan,
  //       wali_kelas,
  //       jurusanNama: jurusan?.nama_jurusan,
  //       wali_kelasNama: wali_kelas?.nama,
  //     };
  //   })
  //   .filter(
  //     (kelasMerged: any) =>
  //       (kelasMerged.nama_kelas || "").toLowerCase().includes(searchTerm) &&
  //       (kelasMerged.jurusanNama || "")
  //         .toLowerCase()
  //         .includes(searchTermJurusan) &&
  //       (kelasMerged.wali_kelasNama || "")
  //         .toLowerCase()
  //         .includes(searchTermWaliKelas)
  //   );
});

const mutationDelete = useDeleteKelas();
const handleDeleteKelas = (id: string) => {
  if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
    // const id_siswa = get_siswa.value.reduce(
    //   (acc: string[], siswa: StudentType) => {
    //     if (siswa.kelas && siswa.kelas === id) {
    //       acc.push(siswa.id);
    //     }
    //     return acc;
    //   },
    //   []
    // );
    // const id_lesson = get_lesson.value.reduce(
    //   (acc: string[], lesson: LessonType) => {
    //     if (lesson.kelas && lesson.kelas === id) {
    //       acc.push(lesson.id);
    //     }
    //     return acc;
    //   },
    //   []
    // );

    mutationDelete.mutate({ id });
  }
};
</script>

<template>
  <article class="w-full mt-5">
    <section class="w-full flex justify-end">
      <button
        @click="kelas.openModals"
        class="py-2 px-3 cursor-pointer flex items-center bg-green-800 gap-2 hover:bg-green-900 text-white rounded-lg font-mona-bold border"
      >
        <Vicon name="bi-plus" scale="1.5" />
        <p>Tambah Data Kelas</p>
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
      v-else-if="!query.data.value || query.data.value.length === 0"
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
              <p class="text-black">Nama Kelas</p>
            </div>
          </TableHead>
          <TableHead class="text-black text-center">Wali Kelas</TableHead>
          <TableHead class="text-black text-center">Jurusan</TableHead>
          <TableHead class="text-black text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="w-full overflow-y-auto">
        <TableRow
          class="border-none text-center"
          v-for="(data, index) in filteredKelas"
          :key="index"
        >
          <TableCell class="text-left" :colspan="2">
            <div class="flex items-center gap-3">
              <p>{{ Number(index) + 1 }}</p>
              <p>
                {{ data?.nama_kelas || "-" }}
              </p>
            </div>
          </TableCell>

          <TableCell>
            <p>{{ data.wali_kelas?.nama || "-" }}</p>
          </TableCell>
          <TableCell>
            <p>{{ data.jurusan?.nama_jurusan || "-" }}</p>
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
                  @click="kelas.openModalsWithEdit(data.id)"
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
                  @click="() => handleDeleteKelas(data.id)"
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
