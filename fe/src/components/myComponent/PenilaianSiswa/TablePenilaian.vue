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
import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import { ref, watchEffect } from "vue";

import { usePenilaian } from "@/lib/pinia/penilaian";
import { useGetSiswa } from "@/lib/query/siswa";
import type { StudentType } from "@/types/siswa/data_siswa";
import type {
  PenilaianType,
  PenilaianTypeAdd,
  PenilaianTypeEdit,
} from "@/types/penilaian/penilaian";
import {
  useEditPenilaian,
  useGetPenilaian,
  usePostPenilaian,
} from "@/lib/query/penilaian";
import { useGetKelas } from "@/lib/query/kelas";
import { useGetLesson } from "@/lib/query/pelajaran";
import type { KelasType } from "@/types/siswa/data_kelas";
import type { LessonType } from "@/types/lesson";

const { data: get_siswa, isPending, isError, error } = useGetSiswa();
const { data: get_nilai } = useGetPenilaian();
const { data: get_kelas } = useGetKelas();
const { data: get_lesson } = useGetLesson();
const mutatePostPenilaian = usePostPenilaian();
const mutateEditPenilaian = useEditPenilaian();
const nilaiSiswa = ref<PenilaianType[]>([]);
const penilaian = usePenilaian();
watchEffect(async () => {
  if (
    !penilaian.searchKelas ||
    !penilaian.searchMapel ||
    !get_siswa.value ||
    !get_nilai.value
  ) {
    penilaian.listNilaiSiswa = [];
    return;
  }

  penilaian.listNilaiSiswa = await get_siswa.value
    .filter((siswa: StudentType) => siswa.kelas.id === penilaian.searchKelas)
    .map((siswa: StudentType) => {
      // cek apakah sudah ada data sebelumnya

      const existing = get_nilai.value.find(
        (n: PenilaianType) =>
          n.siswa.id === siswa.id &&
          n.kelas.id === penilaian.searchKelas &&
          n.pelajaran.id === penilaian.searchMapel
      );

      if (existing) {
        return {
          ...existing,
          nilai: { ...existing.nilai },
          siswa: { ...existing.siswa },
          kelas: { ...existing.kelas },
          pelajaran: { ...existing.pelajaran },
        };
      } else {
        const getDataKelasById = get_kelas?.value?.find(
          (kelas: KelasType) => kelas.id === penilaian.searchKelas
        );
        const getDataMapelById = get_lesson?.value?.find(
          (mapel: LessonType) => mapel.id === penilaian.searchMapel
        );
        return {
          id: crypto.randomUUID(), // atau dari DB
          siswa: {
            id: siswa.id,
            nama: siswa.nama,
          },
          kelas: getDataKelasById?.id
            ? {
                id: getDataKelasById.id,
                nama_kelas: getDataKelasById.nama_kelas,
              }
            : null,
          pelajaran: getDataMapelById?.id
            ? {
                id: getDataMapelById.id,
                nama_pelajaran: getDataMapelById.nama_pelajaran,
              }
            : null,
          nilai: {
            tugas: 0,
            uts: 0,
            uas: 0,
            rata_rata: 0,
          },
        };
      }
    });
});

const updateRataRata = (penilaian: PenilaianType) => {
  penilaian.nilai.rata_rata =
    (Number(penilaian.nilai.tugas) +
      Number(penilaian.nilai.uts) +
      Number(penilaian.nilai.uas)) /
    3;
};
const getColorRataRata = (nilai: number) => {
  if (nilai < 50) return "bg-red-500";
  if (nilai < 75) return "bg-yellow-500";
  return "bg-green-500";
};

const saveData = (data: PenilaianType) => {
  const findData = get_nilai.value?.find(
    (n: PenilaianType) => n.id === data.id
  );
  if (findData) {
    const dataPenialaiSiswaEdit: PenilaianTypeEdit = {
      id: data.id,
      kelasId: data.kelas.id,
      siswaId: data.siswa.id,
      pelajaranId: data.pelajaran.id,
      tugas: data.nilai.tugas,
      uts: data.nilai.uts,
      uas: data.nilai.uas,
    };
    // Edit data
    mutateEditPenilaian.mutate(dataPenialaiSiswaEdit);
  } else {
    // Validasi data sebelum menyimpan
    const dataPenilaianSiswa: PenilaianTypeAdd = {
      kelasId: data.kelas.id,
      siswaId: data.siswa.id,
      pelajaranId: data.pelajaran.id,
      tugas: data.nilai.tugas,
      uts: data.nilai.uts,
      uas: data.nilai.uas,
    };
    // Tambah data
    mutatePostPenilaian.mutate(dataPenilaianSiswa);
  }

  // if (data.nilai.tugas < 0 || data.nilai.uts < 0 || data.nilai.uas < 0) {
  //   alert("Nilai tidak boleh kurang dari 0");
  //   return;
  // }
  // if (data.nilai.tugas > 100 || data.nilai.uts > 100 || data.nilai.uas > 100) {
  //   alert("Nilai tidak boleh lebih dari 100");
  //   return;
  // }
  // if (get_nilai.value?.includes(data)) {
  //   mutateEditPenilaian.mutate(data);
  // } else {
  //   mutatePostPenilaian.mutate(data);
  // }
};
</script>

<template>
  <!-- Loading State -->
  <section
    v-if="isPending"
    class="w-full h-40 flex items-center justify-center"
  >
    <p class="font-mona text-lg text-gray-500">Loading...</p>
  </section>

  <!-- Error State -->
  <section
    v-else-if="isError"
    class="w-full h-40 flex items-center justify-center"
  >
    <p class="font-mona text-lg text-gray-500">Error: {{ error }}</p>
  </section>

  <!-- Empty State -->
  <section
    v-else-if="penilaian.listNilaiSiswa.length === 0"
    class="w-full h-40 flex items-center justify-center"
  >
    <p class="font-mona text-lg text-gray-500">
      No data available {{ get_siswa.value }}
      {{ get_siswa.value?.length }}
    </p>
  </section>

  <article v-else class="w-full mt-5">
    <Table class="w-full relative font-mona">
      <TableHeader>
        <TableRow class="border-slate-300 text-center">
          <TableHead class="text-left px-0" :colspan="2">
            <div class="flex items-center gap-1">
              <Vicon name="fa-sort" scale="1" color="black" />
              <p class="text-black">Student</p>
            </div>
          </TableHead>
          <TableHead class="text-black text-center">Tugas</TableHead>
          <TableHead class="text-black text-center">UTS</TableHead>
          <TableHead class="text-black text-center"> UAS </TableHead>
          <TableHead class="text-black text-center"> Rata-Rata </TableHead>
          <TableHead class="text-black text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="w-full overflow-y-auto">
        <TableRow
          class="border-none text-center"
          v-for="(data, index) in penilaian.listNilaiSiswa"
          :key="index"
        >
          <TableCell class="text-left" :colspan="2">
            <div class="flex items-center gap-3">
              <p>{{ Number(index) + 1 }}</p>
              <p>
                {{ data.siswa?.nama || "-" }}
              </p>
            </div>
          </TableCell>

          <TableCell>
            <Input
              type="number"
              class="w-20 py-2 px-3 bg-white border"
              v-model="data.nilai.tugas"
              @input="updateRataRata(data)"
            />
          </TableCell>
          <TableCell>
            <Input
              type="number"
              class="w-20 py-2 px-3 bg-white border"
              v-model="data.nilai.uts"
              @input="updateRataRata(data)"
            />
          </TableCell>
          <TableCell class="">
            <Input
              type="number"
              class="w-20 py-2 px-3 bg-white border"
              v-model="data.nilai.uas"
              @input="updateRataRata(data)"
            />
          </TableCell>
          <TableCell class="">
            <Badge
              variant="default"
              class="bg-green-500 text-base"
              :class="getColorRataRata(Number(data?.nilai?.rata_rata))"
              >{{ Number(data?.nilai?.rata_rata)?.toFixed(2) || 0 }}</Badge
            >
          </TableCell>
          <TableCell class="">
            <button
              @click="saveData(data)"
              class="cursor-pointer p-2 text-white border rounded-lg gap-2 bg-green-500 hover:bg-green-600 flex justify-center items-center"
            >
              <Vicon name="fa-save" scale="1" />
              <p class="pt-1">Simpan</p>
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </article>
</template>
