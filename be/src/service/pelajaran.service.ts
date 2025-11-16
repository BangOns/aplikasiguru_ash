import {
  CreatePelajaran,
  Pelajaran,
  UpdatePelajaran,
} from "../types/pelajaran";
import { prisma } from "../libs/prisma";

export const getAllPelajaranService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: Pelajaran[] = await prisma.pelajaran.findMany({
    skip,
    take: limit,
    orderBy: {
      nama_pelajaran: "desc",
    },
    include: {
      kelas: true,
      wali_kelas: true,
    },
  });
  const total = await prisma.pelajaran.count();
  const totalPage = Math.ceil(total / limit);

  return { data: response, page, limit, total, totalPage };
};
export const createPelajaranService = async (data: CreatePelajaran) => {
  const pelajaran = await prisma.pelajaran.create({ data });
  return pelajaran;
};
export const updatePelajaranService = async (data: UpdatePelajaran) => {
  const pelajaran = await prisma.pelajaran.update({
    where: { id: data.id },
    data,
  });
  return pelajaran;
};
export const deletePelajaranService = async (id: string) => {
  const pelajaran = await prisma.pelajaran.delete({
    where: { id },
  });
  return pelajaran;
};
