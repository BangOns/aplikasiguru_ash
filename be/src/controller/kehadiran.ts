import { Request, Response } from "express";

import { responseData } from "../schema/response.schema";
import { generateMessageResponse } from "../utils/generateMessageResponse";
import {
  createKehadiranService,
  deleteKehadiranService,
  getAllKehadiranService,
  updateKehadiranService,
} from "../service/kehadiran.service";

export const GetAllKehadiranController = async (
  req: Request,
  res: Response
) => {
  try {
    const { page: pages, limit: limits } = req.query;
    const { data, limit, page, total, totalPage } =
      await getAllKehadiranService({
        page: pages ? Number(pages) : 1,
        limit: limits ? Number(limits) : 10,
      });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("kehadiran", "GET", 200),

        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("kehadiran", "GET", 500),
        data: error,
      },
      res
    );
  }
};

export const CreateKehadiranController = async (
  req: Request,
  res: Response
) => {
  try {
    const create = await createKehadiranService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("kehadiran", "POST", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("kehadiran", "POST", 500),
        data: error || [],
      },
      res
    );
  }
};
export const UpdateKehadiranController = async (
  req: Request,
  res: Response
) => {
  try {
    const create = await updateKehadiranService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("kehadiran", "PUT", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("kehadiran", "PUT", 500),
        data: error || [],
      },
      res
    );
  }
};

export const DeleteKehadiranController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteKehadiranService(req.params.id as string);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("kehadiran", "DELETE", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("kehadiran", "DELETE", 500),
        data: error || [],
      },
      res
    );
  }
};
