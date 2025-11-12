import { prisma } from "../libs/prisma";
import { CreateKelas, Kelas } from "../types/kelas";

export const getAllKelasService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: Kelas[] = await prisma.kelas.findMany({
    skip,
    take: limit,
    orderBy: {
      nama_kelas: "desc",
    },
    include: {
      jurusan: true,
      kehadiran: true,
      siswa: true,
      nilai_siswa: true,
      wali_kelas: true,
      pelajaran: true,
    },
  });
  const total = await prisma.kelas.count();
  const totalPage = Math.ceil(total / limit);

  return { data: response, page, limit, total, totalPage };
};

export const createKelasService = async (data: CreateKelas) => {
  const kelas = await prisma.kelas.create({ data: data });
  return kelas;
};
export const updateKelasService = async (data: Kelas) => {
  const kelas = await prisma.kelas.update({
    where: { id: data.id },
    data: data,
  });
  return kelas;
};
export const deleteKelasService = async (id: string) => {
  const kelas = await prisma.kelas.delete({
    where: { id },
  });
  return kelas;
};
