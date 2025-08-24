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
import { useSiswa } from "@/lib/pinia/siswa";
import { computed, watchEffect } from "vue";
import { useDeleteSiswa, useGetSiswa } from "@/lib/query/siswa";
import type { StudentType } from "@/types/siswa/data_siswa";
import type { JurusanType } from "@/types/siswa";
import { useGetKelas } from "@/lib/query/kelas";
import type { KelasType } from "@/types/siswa/data_kelas";
import { useGetJurusan } from "@/lib/query/jurusan";

const siswa = useSiswa();
const { data: get_siswa, isPending, isError, error } = useGetSiswa();
const { data: get_kelas } = useGetKelas();
const { data: get_jurusan } = useGetJurusan();
const filteredSiswa = computed(() => {
  if (!get_siswa.value) return [];

  const searchTerm = siswa.searchSiswa?.toLowerCase() || "";
  const searchTermKelas = siswa.searchKelas?.toLowerCase() || "";
  const searchTermJurusan = siswa.searchJurusan?.toLowerCase() || "";

  return get_siswa.value
    .map((siswaItem: StudentType) => {
      const kelas = get_kelas.value?.find(
        (item: KelasType) => item.id === siswaItem.kelas
      );
      const jurusan = get_jurusan.value?.find(
        (item: JurusanType) => item.id === kelas?.jurusan
      );

      return {
        ...siswaItem,
        nama: siswaItem.nama || "",
        kelas: kelas?.nama_kelas || "",
        jurusan: jurusan?.nama_jurusan || "",
      };
    })
    .filter(
      (siswaMerged: any) =>
        (siswaMerged.kelas || "").toLowerCase().includes(searchTermKelas) &&
        (siswaMerged.nama || "").toLowerCase().includes(searchTerm) &&
        (siswaMerged.jurusan || "").toLowerCase().includes(searchTermJurusan)
    );
});
const mutationDelete = useDeleteSiswa();
const handleDeleteSiswa = (id: string) => {
  if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
    mutationDelete.mutate({ id });
  }
};
watchEffect(() => {
  if (filteredSiswa.value.length > 0) {
    siswa.setDataSiswa = filteredSiswa.value.map((item: any) => {
      const { id, ...rest } = item;
      return rest;
    });
  }
});
</script>

<template>
  <article class="w-full mt-5">
    <section class="w-full flex justify-end">
      <button
        @click="siswa.openModals"
        class="py-2 px-3 cursor-pointer flex items-center bg-green-800 gap-2 hover:bg-green-900 text-white rounded-lg font-mona-bold border"
      >
        <Vicon name="bi-plus" scale="1.5" />
        <p>Tambah Data Siswa</p>
      </button>
    </section>
    <!-- Loading State -->
    <section
      v-if="isPending"
      class="w-full h-40 flex items-center justify-center"
    >
      <p>Loading...</p>
    </section>

    <!-- Error State -->
    <section
      v-else-if="isError"
      class="w-full h-40 flex items-center justify-center"
    >
      <p>Error: {{ error }}</p>
    </section>

    <!-- Empty State -->
    <section
      v-else-if="!get_siswa || get_siswa.length === 0"
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
              <p class="text-black">Siswa</p>
            </div>
          </TableHead>
          <TableHead class="text-black text-center">Kelas</TableHead>
          <TableHead class="text-black text-center">Jurusan</TableHead>
          <TableHead class="text-black text-center"> Jenis Kelamin</TableHead>
          <TableHead class="text-black text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="w-full overflow-y-auto">
        <TableRow
          class="border-none text-center"
          v-for="(data, index) in filteredSiswa"
          :key="index"
        >
          <TableCell class="text-left" :colspan="2">
            <div class="flex items-center gap-3">
              <p>{{ Number(index) + 1 }}</p>
              <p>
                {{ data.nama }}
              </p>
            </div>
          </TableCell>

          <TableCell>
            <p>{{ data.kelas }}</p>
          </TableCell>
          <TableCell>
            <p>{{ data.jurusan }}</p>
          </TableCell>
          <TableCell class="font-mona-bold">
            <p>{{ data.jkl }}</p>
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
                  @click="siswa.openModalsWithEdit(data.id)"
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
                  @click="() => handleDeleteSiswa(data.id)"
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
