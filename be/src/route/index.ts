import {
  CreateJurusanController,
  DeleteJurusanController,
  GetAllJurusanController,
  UpdateJurusanController,
} from "../controller/jurusan";
import {
  CreateJadwalController,
  DeleteJadwalController,
  GetAllJadwalController,
  UpdateJadwalController,
} from "../controller/jadwal";
import {
  createSiswaController,
  getAllSiswaController,
} from "../controller/siswa";
import { Request, Response, Router } from "express";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  res.send("Hello API Working");
});
// siswa
route.get("/siswa", getAllSiswaController);
route.post("/siswa", createSiswaController);

//jadwal
route.get("/jadwal", GetAllJadwalController);
route.post("/jadwal", CreateJadwalController);
route.put("/jadwal", UpdateJadwalController);
route.delete("/jadwal/:id", DeleteJadwalController);

// Jurusan
route.get("/jurusan", GetAllJurusanController);
route.post("/jurusan", CreateJurusanController);
route.put("/jurusan", UpdateJurusanController);
route.delete("/jurusan/:id", DeleteJurusanController);

export default route;
