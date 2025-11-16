import { Request, Response } from "express";
import {
  createPelajaranService,
  deletePelajaranService,
  getAllPelajaranService,
  updatePelajaranService,
} from "../service/pelajaran.service";
import { responseData } from "../schema/response.schema";
import { generateMessageResponse } from "../utils/generateMessageResponse";

export const GetAllPelajaranController = async (
  req: Request,
  res: Response
) => {
  try {
    const { page: pages, limit: limits } = req.query;
    const { data, limit, page, total, totalPage } =
      await getAllPelajaranService({
        page: pages ? Number(pages) : 1,
        limit: limits ? Number(limits) : 10,
      });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("pelajaran", "GET", 200),

        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("pelajaran", "GET", 500),
        data: error,
      },
      res
    );
  }
};

export const CreatePelajaranController = async (
  req: Request,
  res: Response
) => {
  try {
    const create = await createPelajaranService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("pelajaran", "POST", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("pelajaran", "POST", 500),
        data: error || [],
      },
      res
    );
  }
};
export const UpdatePelajaranController = async (
  req: Request,
  res: Response
) => {
  try {
    const create = await updatePelajaranService(req.body);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("pelajaran", "PUT", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("pelajaran", "PUT", 500),
        data: error || [],
      },
      res
    );
  }
};

export const DeletePelajaranController = async (
  req: Request,
  res: Response
) => {
  try {
    await deletePelajaranService(req.params.id as string);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("pelajaran", "DELETE", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("pelajaran", "DELETE", 500),
        data: error || [],
      },
      res
    );
  }
};
