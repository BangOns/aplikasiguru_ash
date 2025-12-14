import { prisma } from "../libs/prisma";
import { CreateWaliKelas, WaliKelas } from "../types/wali_kelas";

export const getAllWaliKelasService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: WaliKelas[] = await prisma.wali_kelas.findMany({
    skip,
    take: limit,
    orderBy: {
      nama: "desc",
    },
  });
  const total = await prisma.wali_kelas.count();
  const totalPage = Math.ceil(total / limit);

  return { data: response, page, limit, total, totalPage };
};

export const createWaliKelasService = async (data: CreateWaliKelas) => {
  const wali_kelaswali_kelas = await prisma.wali_kelas.create({ data: data });
  return wali_kelaswali_kelas;
};

export const updateWaliKelasService = async (data: WaliKelas) => {
  const wali_kelaswali_kelas = await prisma.wali_kelas.update({
    where: { id: data.id },
    data: data,
  });
  return wali_kelaswali_kelas;
};

export const deleteWaliKelasService = async (id: string) => {
  const wali_kelaswali_kelas = await prisma.wali_kelas.delete({
    where: { id: id },
  });
  return wali_kelaswali_kelas;
};
