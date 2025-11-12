import { prisma } from "../libs/prisma";
import { CreateJadwal, Jadwal, UpdateJadwal } from "../types/jadwal";

export const getAllJadwalService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: Jadwal[] = await prisma.jadwal.findMany({
    skip,
    take: limit,
    orderBy: {
      date: "desc",
    },
  });
  const total = await prisma.jadwal.count();
  const totalPage = Math.ceil(total / limit);

  return { data: response, page, limit, total, totalPage };
};
export const createJadwalService = async (data: CreateJadwal) => {
  const newData = {
    ...data,
    date: data.date ? new Date(data.date).toISOString() : new Date(),
  };
  const jadwal = await prisma.jadwal.create({ data: newData });
  return jadwal;
};
export const updateJadwalService = async (data: UpdateJadwal) => {
  const newData = {
    ...data,
    date: data.date ? new Date(data.date) : new Date(),
  };
  const jadwal = await prisma.jadwal.update({
    where: { id: data.id },
    data: newData,
  });
  return jadwal;
};
export const deleteJadwalService = async (id: string) => {
  const jadwal = await prisma.jadwal.delete({
    where: { id },
  });
  return jadwal;
};
