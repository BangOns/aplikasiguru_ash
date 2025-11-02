import { Response } from "express";
import { Pagination } from "types/pagination";

export type ResponseType<T> = {
  status: number;
  message: string;
  data: T;
  pagination?: Pagination;
};

export const responseData = <T>(response: ResponseType<T>, res: Response) => {
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
    data: response.data,
    ...(response.pagination && { pagination: response.pagination }),
  });
};

export const responseDataFunction = <T>(response: ResponseType<T>) => {
  return response;
};
