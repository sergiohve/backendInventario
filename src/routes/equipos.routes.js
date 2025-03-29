import { Router } from "express";
import {
  createNewEquipo,
  deleteEquipoById,
  getEquipoById,
  getEquipos,
  updateEquipoById,
} from "../controllers/equipos.controller.js";

const router = Router();

router.get("/equipos", getEquipos);

router.post("/equipos", createNewEquipo);

router.get("/equipos/:id", getEquipoById);

router.delete("/equipos/:id", deleteEquipoById);

router.put("/equipos/:id", updateEquipoById);

export default router;
