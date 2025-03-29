import { Router } from "express";
import {
  createNewUnidades,
  getUnidadesById,
  deleteUnidadesById,
  getUnidades,
  updateUnidadesById,
} from "../controllers/gestionUnidades.controller";

const router = Router();

router.get("/gestionUnidades", getUnidades);

router.post("/gestionUnidades", createNewUnidades);

router.get("/gestionUnidades/:id", getUnidadesById);

router.delete("/gestionUnidades/:id", deleteUnidadesById);

router.put("/gestionUnidades/:id", updateUnidadesById);

export default router;
