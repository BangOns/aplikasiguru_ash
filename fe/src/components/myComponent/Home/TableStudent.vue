<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Vicon from "../Vicon.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge.vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "@/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
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
  <article class="w-full flex max-xl:flex-col gap-5 pt-4">
    <section
      class="w-full md:basis-4/6 lg:basis-3/4 p-4 shadow-sm rounded-lg border"
    >
      <header class="w-full flex justify-between items-center">
        <h1 class="font-mona-bold text-lg">Student table</h1>
        <section class="flex gap-5">
          <Button variant="ghost" class="cursor-pointer text-black rounded-2xl">
            <Vicon name="pr-filter" scale="1.5" /> Filter
          </Button>
          <Button variant="ghost" class="cursor-pointer rounded-2xl">
            <Vicon name="pr-sort-alt" scale="1.5" />
            Sort
          </Button>
          <Button
            class="cursor-pointer bg-slate-200 text-black hover:bg-slate-300 rounded-2xl"
          >
            View All
          </Button>
        </section>
      </header>
      <section class="mt-4 font-mona-bold max-h-64 overflow-y-auto grow">
        <Table class="w-full relative">
          <TableHeader>
            <TableRow class="border-slate-300">
              <TableHead class="text-left px-0 sticky top-0" :colspan="2">
                <div class="flex items-center gap-1">
                  <Vicon name="fa-sort" scale="1" color="black" />
                  <p class="text-black">Student</p>
                </div>
              </TableHead>
              <TableHead class="text-black sticky top-0">Chapter</TableHead>
              <TableHead class="text-black sticky top-0">Grade</TableHead>
              <TableHead class="text-black sticky top-0"> Status </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="w-full overflow-y-auto">
            <TableRow
              class="border-none"
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

              <TableCell>{{ invoice.paymentStatus }}</TableCell>
              <TableCell>{{ invoice.paymentMethod }}</TableCell>
              <TableCell class="">
                <Badge variant="default" class="bg-green-500">Active</Badge>
              </TableCell>
              <TableCell class="">
                <DropdownMenu>
                  <DropdownMenuTrigger class="cursor-pointer">
                    <Vicon name="bi-three-dots-vertical" scale="1.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="left" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </section>
    <section
      class="w-full basis-1/3 p-4 bg-slate-50 shadow-sm border rounded-lg"
    >
      <header class="w-full flex justify-between items-center">
        <h2 class="font-mona-bold text-xl">Weekly Timeable</h2>
        <RouterLink
          to="#"
          class="font-mona-bold bg-slate-200 rounded-full py-2 px-5"
          >View All</RouterLink
        >
      </header>
      <article
        class="h-72 overflow-y-auto mt-4 space-y-3 scrollbar-track-white scrollbar-thumb-blue-400 scrollbar-thin"
      >
        <section
          v-for="value in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          class="w-full bg-slate-200 rounded-md py-3 px-2 flex gap-4"
          :key="value"
        >
          <figure class="bg-slate-500/50 flex flex-col justify-center rounded">
            <h1 class="px-2 py-0 font-mona">11:00</h1>
          </figure>
          <article>
            <h6 class="font-mona-bold text-lg">Title Notif</h6>
            <p class="font-mona-bold text-slate-600/50 text-xs">
              Lorem ipsum dolor sit amet
            </p>
          </article>
        </section>
      </article>
    </section>
  </article>
</template>

<style></style>
