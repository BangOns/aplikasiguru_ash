import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { NextFunction, Request, Response } from "express";
export const createJadwalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kelasId } = req.body;
    const getFindKelas = await prisma.kelas.findUnique({
      where: {
        id: kelasId,
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
