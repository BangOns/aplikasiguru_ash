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

import { computed } from "vue";
import { useTeacher } from "@/lib/pinia/guru";
import { useDeleteTeacher, useGetTeacher } from "@/lib/query/guru";
import type { GuruType } from "@/types/guru";
const teacher = useTeacher();
const query = useGetTeacher();
const filteredTeacher = computed(() => {
  if (!query.data.value) return [];
  const searchTerm = teacher.searchTeacher.toLowerCase();
  return query.data.value.filter((j: GuruType) =>
    j.nama.toLowerCase().includes(searchTerm)
  );
});

const mutationDelete = useDeleteTeacher();
const handleDeleteTeacher = (id: string) => {
  if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
    mutationDelete.mutate({ id });
  }
};
</script>

<template>
  <article class="w-full mt-5">
    <section class="w-full flex justify-end">
      <button
        @click="teacher.openModals"
        class="py-2 px-3 cursor-pointer flex items-center bg-green-800 gap-2 hover:bg-green-900 text-white rounded-lg font-mona-bold border"
      >
        <Vicon name="bi-plus" scale="1.5" />
        <p>Tambah Data Guru</p>
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
              <p class="text-black">Nama Guru</p>
            </div>
          </TableHead>
          <TableHead
            v-for="(value, index) in teacher.listHeadTable"
            :key="index"
            class="text-black text-center"
          >
            {{ value }}
          </TableHead>
          <TableHead class="text-black text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="w-full overflow-y-auto">
        <TableRow
          class="border-none text-center"
          v-for="(values, index) in filteredTeacher as GuruType[]"
          :key="index"
        >
          <TableCell class="text-left" :colspan="2">
            <div class="flex items-center gap-3">
              <p>{{ Number(index) + 1 }}</p>
              <p>
                {{ values.nama }}
              </p>
            </div>
          </TableCell>
          <TableCell class="text-center">
            <p>
              {{ values.email }}
            </p>
          </TableCell>
          <TableCell class="text-center">
            <p>
              {{ values.telp }}
            </p>
          </TableCell>
          <TableCell class="text-center">
            <p>
              {{ values.jkl }}
            </p>
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
                    @click="teacher.openModalsWithEdit(values.id)"
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
                <DropdownMenuItem as-child>
                  <button
                    @click="handleDeleteTeacher(values.id)"
                    class="flex w-full p-2 items-center gap-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Vicon
                      name="md-deleteforever"
                      scale="1.5"
                      class="text-white"
                    />
                    <p class="pt-1">Hapus</p>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </article>
</template>
