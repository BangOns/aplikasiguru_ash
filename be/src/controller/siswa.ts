import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { responseData } from "../schema/response.schema";
import { CreateSiswa, Siswa } from "../types/siswa";
import {
  createSiswaService,
  getAllSiswaService,
} from "../service/siswa.service";

export const getAllSiswaController = async (req: Request, res: Response) => {
  try {
    const { data, page, limit, total, totalPage } = await getAllSiswaService({
      page: 1,
      limit: 10,
    });
    return responseData(
      {
        status: 200,
        message: "success",
        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: "error",
        data: error,
      },
      res
    );
  }
};

export const createSiswaController = async (req: Request, res: Response) => {
  const data: CreateSiswa = req.body;
  try {
    const response = await createSiswaService(data);
    return responseData<Siswa>(
      {
        status: 200,
        message: "Berhasil menambahkan data Siswa",
        data: response,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: "Gagal menambahkan data Siswa",
        data: error,
      },
      res
    );
  }
};
