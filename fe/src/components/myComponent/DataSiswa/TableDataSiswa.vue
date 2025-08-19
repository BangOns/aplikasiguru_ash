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
</script>

<template>
  <article class="w-full mt-5">
    <section class="w-full flex justify-end">
      <button
        @click="siswa.openModalsSiswa = true"
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
          v-for="(invoice, index) in invoices"
          :key="invoice.invoice"
        >
          <TableCell class="text-left" :colspan="2">
            <div class="flex items-center gap-3">
              <p>{{ index + 1 }}</p>
              <p>
                {{ invoice.invoice }}
              </p>
            </div>
          </TableCell>

          <TableCell>
            <p>L</p>
          </TableCell>
          <TableCell>
            <p>L</p>
          </TableCell>
          <TableCell class="font-mona-bold">
            <p>L</p>
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
                  @click="siswa.openModalsSiswa = true"
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
                  @click="siswa.openModalsSiswa = true"
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
