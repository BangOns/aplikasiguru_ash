import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
import {
  validatePayloadXSS,
  validateUpdatePayloadXSS,
} from "../utils/validatePayload";
import { CreateJurusan, UpdateJurusan } from "../types/jurusan.type";
export const createJurusanMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nama_jurusan } = req.body as CreateJurusan;
    const validateData = validatePayloadXSS({
      nama_jurusan,
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
export const updateJurusanMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, nama_jurusan } = req.body as UpdateJurusan;

    const validateData = validateUpdatePayloadXSS({
      nama_jurusan,
      id,
    });
    if (validateData) {
      throw new Error(validateData);
    }

    const getFindJadwal = await prisma.jurusan.findUnique({
      where: {
        id: id,
      },
    });
    if (!getFindJadwal) {
      throw new Error("Jadwal tidak ditemukan");
    }

    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
  }
};

export const deletejurusanMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const getFindSiswa = await prisma.jurusan.findUnique({
      where: {
        id: id,
      },
    });
    if (!getFindSiswa) {
      throw new Error("Jadwal tidak ditemukan");
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
