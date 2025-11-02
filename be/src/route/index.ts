import {
  createSiswaController,
  getAllSiswaController,
} from "../controller/siswa";
import { Request, Response, Router } from "express";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  res.send("Hello API Working");
});
route.get("/siswa", getAllSiswaController);
route.post("/siswa", createSiswaController);

export default route;
