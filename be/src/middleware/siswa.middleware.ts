import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { CreateSiswa, UpdateSiswa } from "../types/siswa";
import { responseData } from "../schema/response.schema";

export const createSiswaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kelasId, jkl } = req.body as CreateSiswa;
    const getFindKelas = await prisma.kelas.findUnique({
      where: {
        id: kelasId,
      },
    });
    if (!getFindKelas) {
      throw new Error("Kelas tidak ditemukan");
    }

    if (jkl !== "L" && jkl !== "P") {
      throw new Error("Jenis Kelamin tidak sesuai");
    }
    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
  }
};

export const updateSiswaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kelasId, jkl, id } = req.body as UpdateSiswa;
    const getFindSiswa = await prisma.siswa.findUnique({
      where: {
        id: id,
      },
    });
    const getFindKelas = await prisma.kelas.findUnique({
      where: {
        id: kelasId,
      },
    });
    if (!getFindSiswa) {
      throw new Error("Siswa tidak ditemukan");
    }
    if (!getFindKelas) {
      throw new Error("Kelas tidak ditemukan");
    }

    if (jkl !== "L" && jkl !== "P") {
      throw new Error("Jenis Kelamin tidak sesuai");
    }
    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
    next();
  }
};
export const deleteSiswaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const getFindSiswa = await prisma.siswa.findUnique({
      where: {
        id: id,
      },
    });
    if (!getFindSiswa) {
      throw new Error("Siswa tidak ditemukan");
    }
    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
    next();
  }
};
