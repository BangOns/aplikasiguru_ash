import { Request, Response } from "express";
import {
  createJurusanService,
  deleteJurusanService,
  getAllJurusanService,
  updateJurusanService,
} from "../service/jurusan.service";
import { generateMessageResponse } from "../utils/generateMessageResponse";
import { responseData } from "../schema/response.schema";

export const GetAllJurusanController = async (req: Request, res: Response) => {
  try {
    const { page: pages, limit: limits } = req.query;
    const { data, limit, page, total, totalPage } = await getAllJurusanService({
      page: pages ? Number(pages) : 1,
      limit: limits ? Number(limits) : 10,
    });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jurusan", "GET", 200),
        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jurusan", "GET", 500),
        data: error,
      },
      res
    );
  }
};

export const CreateJurusanController = async (req: Request, res: Response) => {
  const { nama_jurusan } = req.body;
  try {
    const create = await createJurusanService({ nama_jurusan });

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jurusan", "POST", 200),
        data: create,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jurusan", "POST", 500),
        data: error || [],
      },
      res
    );
  }
};

export const UpdateJurusanController = async (req: Request, res: Response) => {
  const { id, nama_jurusan } = req.body;
  try {
    const update = await updateJurusanService({ id, nama_jurusan });

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jurusan", "PUT", 200),
        data: update,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jurusan", "PUT", 500),
        data: error || [],
      },
      res
    );
  }
};

export const DeleteJurusanController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    await deleteJurusanService(id);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("jurusan", "DELETE", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("jurusan", "DELETE", 500),
        data: error || [],
      },
      res
    );
  }
};
