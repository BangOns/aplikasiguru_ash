<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
</script>

<template>
  <header class="w-full flex gap-5 mt-5">
    <section class="w-full basis-1/6">
      <Select class="w-full">
        <SelectTrigger class="w-full py-2 px-3 bg-white border-blue-300 border">
          <SelectValue placeholder="Select a fruit" class="font-mona" />
        </SelectTrigger>
        <SelectContent class="p-3">
          <SelectGroup class="font-mona">
            <SelectLabel class="font-mona-bold">Day</SelectLabel>
            <SelectItem v-for="day in [12, 2, 3, 4]" :key="day" :value="day">
              {{ day }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
    <section class="w-full basis-1/5">
      <Select>
        <SelectTrigger class="w-full py-2 px-3 bg-white border-blue-300 border">
          <SelectValue placeholder="Select a fruit" class="font-mona" />
        </SelectTrigger>
        <SelectContent class="p-3">
          <SelectGroup class="font-mona">
            <SelectLabel class="font-mona-bold">Day</SelectLabel>
            <SelectItem v-for="day in [12, 2, 3, 4]" :key="day" :value="day">
              {{ day }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  </header>

  <article class="w-full mt-5">
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
            <Input type="number" class="w-20 py-2 px-3 bg-white border" />
          </TableCell>
          <TableCell>
            <Input type="number" class="w-20 py-2 px-3 bg-white border" />
          </TableCell>
          <TableCell class="">
            <Input type="number" class="w-20 py-2 px-3 bg-white border" />
          </TableCell>
          <TableCell class="">
            <Badge variant="default" class="bg-green-500 text-base"
              >Active</Badge
            >
          </TableCell>
          <TableCell class="">
            <button
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
