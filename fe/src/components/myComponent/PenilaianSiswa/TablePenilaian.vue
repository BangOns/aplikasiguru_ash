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
import type { PenilaianType } from "@/types/penilaian/penilaian";
import {
  useEditPenilaian,
  useGetPenilaian,
  usePostPenilaian,
} from "@/lib/query/penilaian";

const { data: get_siswa, isPending, isError, error } = useGetSiswa();
const { data: get_nilai } = useGetPenilaian();
const mutatePostPenilaian = usePostPenilaian();
const mutateEditPenilaian = useEditPenilaian();
const penilaian = usePenilaian();
const nilaiSiswa = ref<PenilaianType[]>([]);
watchEffect(() => {
  if (
    !penilaian.searchKelas ||
    !penilaian.searchMapel ||
    !get_siswa.value ||
    !get_nilai.value
  ) {
    nilaiSiswa.value = [];
    return;
  }

  penilaian.listNilaiSiswa = get_siswa.value
    .filter((siswa: StudentType) => siswa.kelas.id === penilaian.searchKelas)
    .map((siswa: StudentType) => {
      // cek apakah sudah ada data sebelumnya

      const existing = get_nilai.value.find(
        (n: PenilaianType) =>
          n.siswa.id === siswa.id &&
          n.kelas.id === penilaian.searchKelas &&
          n.pelajaran.id === penilaian.searchMapel
      );

      return (
        existing || {
          id: crypto.randomUUID(), // atau dari DB
          siswa: {
            id: siswa.id,
            nama: siswa.nama,
          },
          id_kelas: penilaian.searchKelas,
          id_lesson: penilaian.searchMapel,
          nilai: {
            tugas: 0,
            uts: 0,
            uas: 0,
            rata_rata: 0,
          },
        }
      );
    });
});
console.log(penilaian.listNilaiSiswa);

const getNamaSiswa = (idSiswa: string) => {
  return (
    get_siswa.value.find((siswa: StudentType) => siswa.id === idSiswa)?.nama ||
    "-"
  );
};

const updateRataRata = (penilaian: PenilaianType) => {
  penilaian.nilai.rata_rata =
    (penilaian.nilai.tugas + penilaian.nilai.uts + penilaian.nilai.uas) / 3;
};
const getColorRataRata = (nilai: number) => {
  if (nilai < 50) return "bg-red-500";
  if (nilai < 75) return "bg-yellow-500";
  return "bg-green-500";
};

const saveData = (data: PenilaianType) => {
  // Validasi data sebelum menyimpan
  if (data.nilai.tugas < 0 || data.nilai.uts < 0 || data.nilai.uas < 0) {
    alert("Nilai tidak boleh kurang dari 0");
    return;
  }
  if (data.nilai.tugas > 100 || data.nilai.uts > 100 || data.nilai.uas > 100) {
    alert("Nilai tidak boleh lebih dari 100");
    return;
  }
  if (get_nilai.value?.includes(data)) {
    mutateEditPenilaian.mutate(data);
  } else {
    mutatePostPenilaian.mutate(data);
  }
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
              :class="getColorRataRata(data.nilai.rata_rata)"
              >{{ data.nilai.rata_rata.toFixed(2) || 0 }}</Badge
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
