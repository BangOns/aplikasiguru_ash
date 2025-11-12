import { prisma } from "../libs/prisma";
import { CreateJurusan, Jurusan, UpdateJurusan } from "../types/jurusan.type";

export const getAllJurusanService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: Jurusan[] = await prisma.jurusan.findMany({
    skip,
    take: limit,
    orderBy: {
      nama_jurusan: "desc",
    },
    include: {
      kelas: true,
    },
  });
  const total = await prisma.jurusan.count();
  const totalPage = Math.ceil(total / limit);

  return { data: response, page, limit, total, totalPage };
};

export const createJurusanService = async (data: CreateJurusan) => {
  const jurusan = await prisma.jurusan.create({ data: data });
  return jurusan;
};
export const updateJurusanService = async (data: UpdateJurusan) => {
  const jurusan = await prisma.jurusan.update({
    where: { id: data.id },
    data: data,
  });
  return jurusan;
};

export const deleteJurusanService = async (id: string) => {
  const jurusan = await prisma.jurusan.delete({
    where: { id },
  });
  return jurusan;
};
