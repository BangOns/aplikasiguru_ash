import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
import { CreateJadwal, UpdateJadwal } from "../types/jadwal";
import {
  validateDateType,
  validatePayloadXSS,
  validateUpdatePayloadXSS,
} from "../utils/validatePayload";
export const createJadwalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { activity, date, end_time, start_time, description } =
      req.body as CreateJadwal;
    const validateData = validatePayloadXSS({
      activity,
      end_time,
      start_time,
      description,
    });
    const validateDate = validateDateType(date);
    if (validateData && validateDate) {
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
export const updateJadwalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, activity, date, end_time, start_time, description } =
      req.body as UpdateJadwal;

    const validateData = validateUpdatePayloadXSS({
      activity,
      end_time,
      start_time,
      description,
      id,
    });
    const validateDate = validateDateType(date);
    if (validateData && validateDate) {
      throw new Error(validateData);
    }

    const getFindJadwal = await prisma.jadwal.findUnique({
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

export const deletejadwalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const getFindJadwal = await prisma.jadwal.findUnique({
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
    next();
  }
};
