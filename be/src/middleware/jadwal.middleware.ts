import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
import { CreateJadwal } from "../types/jadwal";
export const createJadwalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { activity, date, end_time, start_time, description, is_active } =
      req.body as CreateJadwal;

    const findValidate = [
      activity,
      date,
      end_time,
      start_time,
      description,
      is_active,
    ].filter((item) => item === "");
    console.log(activity, date, end_time, start_time, description, is_active);

    if (findValidate.length > 0) {
      throw new Error(
        `Data ${findValidate
          .map((item) => item)
          .join("dan ")} tidak boleh ada yang kosong`
      );
    }
    next();
  } catch (error: any) {
    responseData(
      { status: 500, message: error?.message || "Error Server", data: [] },
      res
    );
  }
};
export const updateJadwalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const getFindKelas = await prisma.kelas.findUnique({
      where: {
        id: id,
      },
    });
    if (!getFindKelas) {
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

export const deletejadwalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const getFindSiswa = await prisma.jadwal.findUnique({
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
