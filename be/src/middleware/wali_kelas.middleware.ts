import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
import { validatePayloadXSS } from "../utils/validatePayload";
import { CreateWaliKelas, UpdateWaliKelas } from "../types/wali_kelas";
export const createWaliKelasMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, jkl, nama, telp } = req.body as CreateWaliKelas;
    const validateData = validatePayloadXSS({
      email,
      jkl,
      nama,
      telp,
    });
    if (validateData) {
      throw new Error(validateData);
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
export const updateWaliKelasMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, email, jkl, nama, telp } = req.body as UpdateWaliKelas;

    const validateData = validatePayloadXSS({
      email,
      jkl,
      nama,
      telp,
      id,
    });
    if (validateData) {
      throw new Error(validateData);
    }

    const getFindWaliKelas = await prisma.wali_kelas.findUnique({
      where: {
        id: id,
      },
    });
    if (!getFindWaliKelas) {
      throw new Error("Wali Kelas tidak ditemukan");
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

export const deleteWaliKelasMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const getFindWaliKelas = await prisma.wali_kelas.findUnique({
      where: {
        id: id,
      },
    });
    if (!getFindWaliKelas) {
      throw new Error("wali Kelas tidak ditemukan");
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
