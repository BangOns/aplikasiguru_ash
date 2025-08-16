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
import { useQuery } from "@tanstack/vue-query";
import { useJurusan } from "@/lib/pinia/jurusan";
import { watch } from "vue";
const invoices = [
  {
    invoice: "INV001",
  },
  {
    invoice: "INV002",
  },
  {
    invoice: "INV003",
  },
  {
    invoice: "INV004",
  },
  {
    invoice: "INV005",
  },
  {
    invoice: "INV006",
  },
  {
    invoice: "INV007",
  },
];
const jurusan = useJurusan();
const query = useQuery({
  queryKey: ["jurusan"],
  queryFn: jurusan.getJurusan,
});
</script>

<template>
  <article class="w-full mt-5">
    <section class="w-full flex justify-end">
      <button
        @click="jurusan.openModals"
        class="py-2 px-3 cursor-pointer flex items-center bg-green-800 gap-2 hover:bg-green-900 text-white rounded-lg font-mona-bold border"
      >
        <Vicon name="bi-plus" scale="1.5" />
        <p>Tambah Data Jurusan</p>
      </button>
    </section>
    <Table class="w-full relative font-mona">
      <TableHeader>
        <TableRow class="border-slate-300 text-center">
          <TableHead class="text-left px-0" :colspan="2">
            <div class="flex items-center gap-1">
              <Vicon name="fa-sort" scale="1" color="black" />
              <p class="text-black">Nama Jurusan</p>
            </div>
          </TableHead>
          <TableHead class="text-black text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="w-full overflow-y-auto">
        <TableRow
          class="border-none text-center"
          v-for="(values, index) in query.data.value"
          :key="index"
        >
          <TableCell class="text-left" :colspan="2">
            <div class="flex items-center gap-3">
              <p>{{ Number(index) + 1 }}</p>
              <p>
                {{ values.nama_jurusan }}
              </p>
            </div>
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
                <DropdownMenuItem as-child>
                  <button
                    @click="jurusan.openModalsWithEdit(values.id)"
                    class="flex w-full p-2 items-center gap-2 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    <Vicon
                      name="fa-regular-edit"
                      scale="1.5"
                      class="text-white"
                    />
                    <p class="pt-1">Edit</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="jurusan.openModalJurusan = true"
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
