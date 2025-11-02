import { Request, Response } from "express";
import { responseData } from "../schema/response.schema";
import {
  createJadwalService,
  deleteJadwalService,
  getAllJadwalService,
  updateJadwalService,
} from "../service/jadwal.service";
import { generateMessageResponse } from "../utils/generateMessageResponse";

export const GetAllJadwalController = async (req: Request, res: Response) => {
  try {
    const { page: pages, limit: limits } = req.query;
    const { data, limit, page, total, totalPage } = await getAllJadwalService({
      page: pages ? Number(pages) : 1,
      limit: limits ? Number(limits) : 10,
    });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jadwal", "GET", 200),

        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jadwal", "GET", 500),
        data: error,
      },
      res
    );
  }
};

export const CreateJadwalController = async (req: Request, res: Response) => {
  try {
    const create = await createJadwalService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jadwal", "POST", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jadwal", "POST", 500),
        data: error || [],
      },
      res
    );
  }
};
export const UpdateJadwalController = async (req: Request, res: Response) => {
  try {
    const create = await updateJadwalService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jadwal", "PUT", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jadwal", "PUT", 500),
        data: error || [],
      },
      res
    );
  }
};
export const DeleteJadwalController = async (req: Request, res: Response) => {
  try {
    await deleteJadwalService(req.params.id as string);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jadwal", "DELETE", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jadwal", "DELETE", 500),
        data: error || [],
      },
      res
    );
  }
};
