import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { CreateSiswa, UpdateSiswa } from "../types/siswa";
import { responseData } from "../schema/response.schema";
import {
  validateDateType,
  validatePayloadXSS,
  validateUpdatePayloadXSS,
} from "../utils/validatePayload";
import xss from "xss";
import { CreateKehadiran, UpdateKehadiran } from "../types/kehadiran";

export const createKehadiranMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kelasId, date, pelajaranId, siswaId, status } =
      req.body as CreateKehadiran;
    console.log(kelasId);

    const validateData = validatePayloadXSS({
      pelajaranId,
      kelasId,
      siswaId,
      status,
    });
    const validateDate = validateDateType(date);
    if (validateData && validateDate) {
      throw new Error(validateData);
    }

    const getFindKelas = await prisma.kelas.findUnique({
      where: {
        id: kelasId,
      },
    });
    if (!getFindKelas) {
      throw new Error("Kelas tidak ditemukan");
    }
    const getFindPelajaran = await prisma.pelajaran.findUnique({
      where: {
        id: pelajaranId,
      },
    });
    if (!getFindPelajaran) {
      throw new Error("Pelajaran Kelas tidak ditemukan");
    }
    const getFindSiswa = await prisma.siswa.findUnique({
      where: {
        id: siswaId,
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
  }
};

export const updateKehadiranMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pelajaranId, kelasId, siswaId, status, id } =
      req.body as UpdateKehadiran;
    const validateData = validateUpdatePayloadXSS({
      pelajaranId,
      kelasId,
      siswaId,
      status,
      id,
    });
    if (validateData) {
      throw new Error(validateData);
    }
    const getFindKehadiran = await prisma.kehadiran.findUnique({
      where: {
        id: id,
      },
    });
    const getFindSiswa = await prisma.siswa.findUnique({
      where: {
        id: siswaId,
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
    if (!getFindKehadiran) {
      throw new Error("Kehadiran tidak ditemukan");
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
export const deleteKehadiranMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = xss(req.params.id as string);
    const getFindKehadiran = await prisma.kehadiran.findUnique({
      where: {
        id: id,
      },
    });
    if (!getFindKehadiran) {
      throw new Error("kehadiran tidak ditemukan");
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
