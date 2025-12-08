import { prisma } from "../libs/prisma";
import {
  CreateKehadiran,
  Kehadiran,
  UpdateKehadiran,
} from "../types/kehadiran";

export const getAllKehadiranService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: Kehadiran[] = await prisma.kehadiran.findMany({
    skip,
    take: limit,
    orderBy: {
      date: "desc",
    },
    include: {
      kelas: true,
      pelajaran: true,
    },
  });
  const total = await prisma.kehadiran.count();
  const totalPage = Math.ceil(total / limit);

  return { data: response, page, limit, total, totalPage };
};
export const createKehadiranService = async (data: CreateKehadiran) => {
  const kehadiran = await prisma.kehadiran.create({ data });
  return kehadiran;
};
export const updateKehadiranService = async (data: UpdateKehadiran) => {
  const kehadiran = await prisma.kehadiran.update({
    where: { id: data.id },
    data,
  });
  return kehadiran;
};
export const deleteKehadiranService = async (id: string) => {
  const kehadiran = await prisma.pelajaran.delete({
    where: { id },
  });
  return kehadiran;
};
