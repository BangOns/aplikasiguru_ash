import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
import {
  validatePayloadXSS,
  validateUpdatePayloadXSS,
} from "../utils/validatePayload";
import { CreateKelas, UpdateKelas } from "../types/kelas";
export const createKelasMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jurusanId, nama_kelas, wali_kelasId } = req.body as CreateKelas;
    const validateData = validatePayloadXSS({
      jurusanId,
      nama_kelas,
      wali_kelasId,
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
export const updateKelasMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, jurusanId, nama_kelas, wali_kelasId } = req.body as UpdateKelas;

    const validateData = validateUpdatePayloadXSS({
      jurusanId,
      nama_kelas,
      wali_kelasId,
      id,
    });
    if (validateData) {
      throw new Error(validateData);
    }

    const getKelas = await prisma.kelas.findUnique({
      where: {
        id: id,
      },
    });
    if (!getKelas) {
      throw new Error("Kelas tidak ditemukan");
    }

    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
  }
};

export const deleteKelasMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const getKelas = await prisma.kelas.findUnique({
      where: {
        id: id,
      },
    });
    if (!getKelas) {
      throw new Error("Kelas tidak ditemukan");
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
