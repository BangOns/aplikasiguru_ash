import { Request, Response } from "express";
import { responseData } from "../schema/response.schema";
import {
  createWaliKelasService,
  deleteWaliKelasService,
  getAllWaliKelasService,
  updateWaliKelasService,
} from "../service/wali_kelas.service";
import { WaliKelas } from "../types/wali_kelas";
import { generateMessageResponse } from "../utils/generateMessageResponse";

export const GetAllWaliKelasController = async (
  req: Request,
  res: Response
) => {
  try {
    const { page: pages, limit: limits } = req.query;
    const { data, limit, page, total, totalPage } =
      await getAllWaliKelasService({
        page: pages ? Number(pages) : 1,
        limit: limits ? Number(limits) : 10,
      });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("wali_kelas", "GET", 200),
        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("wali_kelas", "GET", 500),
        data: error,
      },
      res
    );
  }
};

export const CreateWaliKelasController = async (
  req: Request,
  res: Response
) => {
  const data = req.body;
  try {
    const response = await createWaliKelasService(data);
    return responseData<WaliKelas>(
      {
        status: 200,
        message: generateMessageResponse("wali_kelas", "POST", 200),
        data: response,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("wali_kelas", "POST", 500),
        data: error,
      },
      res
    );
  }
};

export const UpdateWaliKelasController = async (
  req: Request,
  res: Response
) => {
  const data = req.body;
  try {
    const update = await updateWaliKelasService(data);
    return responseData<WaliKelas>(
      {
        status: 200,
        message: generateMessageResponse("wali_kelas", "PUT", 200),

        data: update,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("wali_kelas", "PUT", 500),

        data: error,
      },
      res
    );
  }
};

export const DeleteWaliKelasController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const response = await deleteWaliKelasService(id as string);
    return responseData<WaliKelas>(
      {
        status: 200,
        message: generateMessageResponse("wali_kelas", "DELETE", 200),

        data: response,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("wali_kelas", "DELETE", 500),

        data: error,
      },
      res
    );
  }
};
