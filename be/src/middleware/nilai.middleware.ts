import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
import { validatePayloadXSS } from "../utils/validatePayload";
import { CreatePelajaran, UpdatePelajaran } from "../types/pelajaran";
import xss from "xss";
import { CreateNilai, UpdateNilai } from "../types/nilai_siswa";
export const createNilaiMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kelasId, pelajaranId, rata_rata, siswaId, tugas, uas, uts } =
      req.body as CreateNilai;
    const validateData = validatePayloadXSS({
      kelasId,
      pelajaranId,
      rata_rata,
      siswaId,
      tugas,
      uas,
      uts,
    });
    if (validateData) {
      throw new Error(validateData);
    }

    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
  }
};
export const updateNilaiMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, rata_rata, tugas, uas, uts } = req.body as UpdateNilai;

    const validateData = validatePayloadXSS({
      rata_rata,
      tugas,
      uas,
      uts,
      id,
    });
    if (validateData) {
      throw new Error(validateData);
    }

    const getNilai = await prisma.nilai_Siswa.findUnique({
      where: {
        id: id,
      },
    });
    if (!getNilai) {
      throw new Error("Nilai tidak ditemukan");
    }

    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
  }
};

export const deleteNilaiMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = xss(req.params.id as string);
    const getNilai = await prisma.nilai_Siswa.findUnique({
      where: {
        id: id,
      },
    });
    if (!getNilai) {
      throw new Error("Nilai tidak ditemukan");
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
