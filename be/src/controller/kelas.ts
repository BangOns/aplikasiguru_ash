import { Request, Response } from "express";
import { responseData } from "../schema/response.schema";
import {
  createKelasService,
  deleteKelasService,
  getAllKelasService,
  updateKelasService,
} from "../service/kelas.service";
import { generateMessageResponse } from "../utils/generateMessageResponse";

export const GetAllKelasController = async (req: Request, res: Response) => {
  try {
    const { page: pages, limit: limits } = req.query;
    const { data, limit, page, total, totalPage } = await getAllKelasService({
      page: pages ? Number(pages) : 1,
      limit: limits ? Number(limits) : 10,
    });
    return responseData(
      {
        status: 200,
        message: generateMessageResponse("kelas", "GET", 200),
        data,
        pagination: { page, limit, total, totalPage },
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("kelas", "GET", 500),
        data: error,
      },
      res
    );
  }
};

export const CreateKelasController = async (req: Request, res: Response) => {
  const { nama_kelas, wali_kelasId, jurusanId } = req.body;
  try {
    const create = await createKelasService({
      nama_kelas,
      wali_kelasId,
      jurusanId,
    });

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

export const UpdateKelasController = async (req: Request, res: Response) => {
  const { id, nama_kelas, wali_kelasId, jurusanId } = req.body;
  try {
    const update = await updateKelasService({
      id,
      nama_kelas,
      wali_kelasId,
      jurusanId,
    });

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("kelas", "PUT", 200),
        data: update,
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("kelas", "PUT", 500),
        data: error || [],
      },
      res
    );
  }
};

export const DeleteKelasController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    await deleteKelasService(id);

    return responseData(
      {
        status: 200,
        message: generateMessageResponse("kelas", "DELETE", 200),
        data: {},
      },
      res
    );
  } catch (error) {
    return responseData(
      {
        status: 500,
        message: generateMessageResponse("kelas", "DELETE", 500),
        data: error || [],
      },
      res
    );
  }
};
