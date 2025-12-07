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
import {
  createJurusanMiddleware,
  deletejurusanMiddleware,
  updateJurusanMiddleware,
} from "../middleware/jurusan.middleware";
import {
  createWaliKelasMiddleware,
  deleteWaliKelasMiddleware,
  updateWaliKelasMiddleware,
} from "../middleware/wali_kelas.middleware";
import {
  createKelasMiddleware,
  deleteKelasMiddleware,
  updateKelasMiddleware,
} from "../middleware/kelas.middleware";
import {
  createPelajaranMiddleware,
  deletePelajaranMiddleware,
  updatePelajaranMiddleware,
} from "../middleware/pelajaran.middleware";
import {
  createKehadiranMiddleware,
  deleteKehadiranMiddleware,
  updateKehadiranMiddleware,
} from "../middleware/kehadiran.middleware";
import {
  createNilaiMiddleware,
  deleteNilaiMiddleware,
  updateNilaiMiddleware,
} from "../middleware/nilai.middleware";

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
route.post("/jurusan", createJurusanMiddleware, CreateJurusanController);
route.put("/jurusan", updateJurusanMiddleware, UpdateJurusanController);
route.delete("/jurusan/:id", deletejurusanMiddleware, DeleteJurusanController);

// wali kelas
route.get("/wali_kelas", GetAllWaliKelasController);
route.post("/wali_kelas", createWaliKelasMiddleware, CreateWaliKelasController);
route.put("/wali_kelas", updateWaliKelasMiddleware, UpdateWaliKelasController);
route.delete(
  "/wali_kelas/:id",
  deleteWaliKelasMiddleware,
  DeleteWaliKelasController
);

// kelas
route.get("/kelas", GetAllKelasController);
route.post("/kelas", createKelasMiddleware, CreateKelasController);
route.put("/kelas", updateKelasMiddleware, UpdateKelasController);
route.delete("/kelas/:id", deleteKelasMiddleware, DeleteKelasController);

// pelajaran
route.get("/pelajaran", GetAllPelajaranController);
route.post("/pelajaran", createPelajaranMiddleware, CreatePelajaranController);
route.put("/pelajaran", updatePelajaranMiddleware, UpdatePelajaranController);
route.delete(
  "/pelajaran/:id",
  deletePelajaranMiddleware,
  DeletePelajaranController
);

// kehadiran
route.get("/kehadiran", GetAllKehadiranController);
route.post("/kehadiran", createKehadiranMiddleware, CreateKehadiranController);
route.put("/kehadiran", updateKehadiranMiddleware, UpdateKehadiranController);
route.delete(
  "/kehadiran/:id",
  deleteKehadiranMiddleware,
  DeleteKehadiranController
);

//nilai siswa
route.get("/nilai-siswa", GetAllNilaiController);
route.post("/nilai-siswa", createNilaiMiddleware, CreateNilaiController);
route.put("/nilai-siswa", updateNilaiMiddleware, UpdateNilaiController);
route.delete("/nilai-siswa/:id", deleteNilaiMiddleware, DeleteNilaiController);

export default route;
