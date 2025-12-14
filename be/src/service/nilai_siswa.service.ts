import { prisma } from "../libs/prisma";
import { CreateNilai, Nilai, UpdateNilai } from "../types/nilai_siswa";

export const getAllNilaiService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: Nilai[] = await prisma.nilai_siswa.findMany({
    skip,
    take: limit,
    orderBy: {
      tugas: "desc",
    },
    include: {
      kelas: true,
      pelajaran: true,
      siswa: true,
    },
  });
  const total = await prisma.nilai_siswa.count();
  const totalPage = Math.ceil(total / limit);

  return { data: response, page, limit, total, totalPage };
};
export const createNilaiService = async (data: CreateNilai) => {
  const nilai = await prisma.nilai_siswa.create({ data });
  return nilai;
};
export const updateNilaiService = async (data: UpdateNilai) => {
  const nilai = await prisma.nilai_siswa.update({
    where: { id: data.id },
    data,
  });
  return nilai;
};
export const deleteNilaiService = async (id: string) => {
  const nilai = await prisma.nilai_siswa.delete({
    where: { id },
  });
  return nilai;
};
