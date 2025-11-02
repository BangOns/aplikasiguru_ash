import { prisma } from "../libs/prisma";
import { CreateSiswa, Siswa } from "../types/siswa";

export const getAllSiswaService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const pages = page;
  const limits = limit;
  const skip = (pages - 1) * limits;
  const response: Siswa[] = await prisma.siswa.findMany({
    skip,
    take: limit,
    orderBy: {
      nama: "desc",
    },
    include: {
      kelas: true,
    },
  });
  const total = await prisma.siswa.count();
  const totalPage = Math.ceil(total / limit);
  return { data: response, page, limit, total, totalPage };
};

export const createSiswaService = async (data: CreateSiswa) => {
  const siswa = await prisma.siswa.create({
    data: {
      nama: data.nama,
      kelasId: data.kelasId,
      jkl: data.jkl,
    },
  });

  return siswa;
};
