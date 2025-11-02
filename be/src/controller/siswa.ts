import { Request, Response } from "express";
import { responseData } from "../schema/response.schema";
import { CreateSiswa, Siswa } from "../types/siswa";
import {
  createSiswaService,
  getAllSiswaService,
} from "../service/siswa.service";
import { generateMessageResponse } from "../utils/generateMessageResponse";

export const getAllSiswaController = async (req: Request, res: Response) => {
  try {
    const { page: pages, limit: limits } = req.query;

    const { data, page, limit, total, totalPage } = await getAllSiswaService({
      page: pages ? Number(pages) : 1,
      limit: limits ? Number(limits) : 10,
    });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("siswa", "GET", 200),
        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("siswa", "GET", 500),
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
