import { Request, Response } from "express";

import { responseData } from "../schema/response.schema";
import { generateMessageResponse } from "../utils/generateMessageResponse";
import {
  createNilaiService,
  deleteNilaiService,
  getAllNilaiService,
  updateNilaiService,
} from "../service/nilai_siswa.service";

export const GetAllNilaiController = async (req: Request, res: Response) => {
  try {
    const { page: pages, limit: limits } = req.query;
    const { data, limit, page, total, totalPage } = await getAllNilaiService({
      page: pages ? Number(pages) : 1,
      limit: limits ? Number(limits) : 10,
    });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("nilai siswa", "GET", 200),

        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("nilai siswa", "GET", 500),
        data: error,
      },
      res
    );
  }
};

export const CreateNilaiController = async (req: Request, res: Response) => {
  try {
    const create = await createNilaiService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("nilai siswa", "POST", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("nilai siswa", "POST", 500),
        data: error || [],
      },
      res
    );
  }
};
export const UpdateNilaiController = async (req: Request, res: Response) => {
  try {
    const create = await updateNilaiService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("nilai siswa", "PUT", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("nilai siswa", "PUT", 500),
        data: error || [],
      },
      res
    );
  }
};

export const DeleteNilaiController = async (req: Request, res: Response) => {
  try {
    await deleteNilaiService(req.params.id as string);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("nilai siswa", "DELETE", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("nilai siswa", "DELETE", 500),
        data: error || [],
      },
      res
    );
  }
};
