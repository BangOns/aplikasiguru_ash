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
import { useGetSiswa } from "@/lib/query/siswa";
import type { StudentType } from "@/types/siswa/data_siswa";
import type { JurusanType } from "@/types/siswa";
import { useGetKelas } from "@/lib/query/kelas";
import type { KelasType } from "@/types/siswa/data_kelas";
import { useGetJurusan } from "@/lib/query/jurusan";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
const siswa = useSiswa();
const { data: get_siswa } = useGetSiswa();
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
        (siswaMerged.nama || "").toLowerCase().includes(searchTerm) &&
        (siswaMerged.kelas || "").toLowerCase().includes(searchTermKelas) &&
        (siswaMerged.jurusan || "").toLowerCase().includes(searchTermJurusan)
    );
});
watchEffect(() => {
  console.log(filteredSiswa.value);
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
    <Table class="w-full relative font-mona">
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
                  @click="siswa.openModals"
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
