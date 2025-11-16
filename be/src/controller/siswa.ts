import { Request, Response } from "express";
import { responseData } from "../schema/response.schema";
import { CreateSiswa, Siswa, UpdateSiswa } from "../types/siswa";
import {
  createSiswaService,
  deleteSiswaService,
  getAllSiswaService,
  updateSiswaService,
} from "../service/siswa.service";
import { generateMessageResponse } from "../utils/generateMessageResponse";

export const GetAllSiswaController = async (req: Request, res: Response) => {
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

export const CreateSiswaController = async (req: Request, res: Response) => {
  const data: CreateSiswa = req.body;
  try {
    const update = await createSiswaService(data);
    return responseData<Siswa>(
      {
        status: 200,
        message: generateMessageResponse("siswa", "PUT", 200),
        data: update,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("siswa", "PUT", 200),
        data: {},
      },
      res
    );
  }
};

export const UpdateSiswaController = async (req: Request, res: Response) => {
  const data: UpdateSiswa = req.body;
  try {
    const response = await updateSiswaService(data);
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("siswa", "PUT", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("siswa", "PUT", 500),
        data: error,
      },
      res
    );
  }
};

export const DeleteSiswaController = async (req: Request, res: Response) => {
  try {
    await deleteSiswaService(req.params.id as string);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("siswa", "DELETE", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("siswa", "DELETE", 500),
        data: error || [],
      },
      res
    );
  }
};
