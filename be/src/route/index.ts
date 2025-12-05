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
  CreateSiswaController,
  DeleteSiswaController,
  GetAllSiswaController,
  UpdateSiswaController,
} from "../controller/siswa";
import { Request, Response, Router } from "express";
import {
  CreateWaliKelasController,
  DeleteWaliKelasController,
  GetAllWaliKelasController,
  UpdateWaliKelasController,
} from "../controller/wali_kelas";
import {
  CreateKelasController,
  DeleteKelasController,
  GetAllKelasController,
  UpdateKelasController,
} from "../controller/kelas";
import {
  CreatePelajaranController,
  DeletePelajaranController,
  GetAllPelajaranController,
  UpdatePelajaranController,
} from "../controller/pelajaran";
import {
  CreateKehadiranController,
  DeleteKehadiranController,
  GetAllKehadiranController,
  UpdateKehadiranController,
} from "../controller/kehadiran";
import {
  CreateNilaiController,
  DeleteNilaiController,
  GetAllNilaiController,
  UpdateNilaiController,
} from "../controller/nilai_siswa";
import {
  createSiswaMiddleware,
  deleteSiswaMiddleware,
  updateSiswaMiddleware,
} from "../middleware/siswa.middleware";
import {
  createJadwalMiddleware,
  deletejadwalMiddleware,
  updateJadwalMiddleware,
} from "../middleware/jadwal.middleware";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  res.send("Hello API Working");
});
// siswa
route.get("/siswa", GetAllSiswaController);
route.post("/siswa", createSiswaMiddleware, CreateSiswaController);
route.put("/siswa", updateSiswaMiddleware, UpdateSiswaController);
route.delete("/siswa/:id", deleteSiswaMiddleware, DeleteSiswaController);

//jadwal
route.get("/jadwal", GetAllJadwalController);
route.post("/jadwal", createJadwalMiddleware, CreateJadwalController);
route.put("/jadwal", updateJadwalMiddleware, UpdateJadwalController);
route.delete("/jadwal/:id", deletejadwalMiddleware, DeleteJadwalController);

// Jurusan
route.get("/jurusan", GetAllJurusanController);
route.post("/jurusan", CreateJurusanController);
route.put("/jurusan", UpdateJurusanController);
route.delete("/jurusan/:id", DeleteJurusanController);

// wali kelas
route.get("/wali_kelas", GetAllWaliKelasController);
route.post("/wali_kelas", CreateWaliKelasController);
route.put("/wali_kelas", UpdateWaliKelasController);
route.delete("/wali_kelas/:id", DeleteWaliKelasController);

// kelas
route.get("/kelas", GetAllKelasController);
route.post("/kelas", CreateKelasController);
route.put("/kelas", UpdateKelasController);
route.delete("/kelas/:id", DeleteKelasController);

// pelajaran
route.get("/pelajaran", GetAllPelajaranController);
route.post("/pelajaran", CreatePelajaranController);
route.put("/pelajaran", UpdatePelajaranController);
route.delete("/pelajaran/:id", DeletePelajaranController);

// kehadiran
route.get("/kehadiran", GetAllKehadiranController);
route.post("/kehadiran", CreateKehadiranController);
route.put("/kehadiran", UpdateKehadiranController);
route.delete("/kehadiran/:id", DeleteKehadiranController);

//nilai siswa
route.get("/nilai-siswa", GetAllNilaiController);
route.post("/nilai-siswa", CreateNilaiController);
route.put("/nilai-siswa", UpdateNilaiController);
route.delete("/nilai-siswa/:id", DeleteNilaiController);

export default route;
