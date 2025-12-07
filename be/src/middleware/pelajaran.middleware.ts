import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
import { validatePayloadXSS } from "../utils/validatePayload";
import { CreateKelas, UpdateKelas } from "../types/kelas";
import { CreatePelajaran, UpdatePelajaran } from "../types/pelajaran";
import xss from "xss";
export const createPelajaranMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kelasId, nama_pelajaran, wali_kelasId } =
      req.body as CreatePelajaran;
    const validateData = validatePayloadXSS({
      kelasId,
      nama_pelajaran,
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
export const updatePelajaranMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, kelasId, nama_pelajaran, wali_kelasId } =
      req.body as UpdatePelajaran;

    const validateData = validatePayloadXSS({
      kelasId,
      nama_pelajaran,
      wali_kelasId,
      id,
    });
    if (validateData) {
      throw new Error(validateData);
    }

    const getPelajaran = await prisma.pelajaran.findUnique({
      where: {
        id: id,
      },
    });
    if (!getPelajaran) {
      throw new Error("Pelajaran tidak ditemukan");
    }

    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
  }
};

export const deletePelajaranMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = xss(req.params.id as string);
    const getPelajaran = await prisma.pelajaran.findUnique({
      where: {
        id: id,
      },
    });
    if (!getPelajaran) {
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
