import { Router } from "express";
import { getGraficas } from "../controllers/dataGeneral.controller.js";

const router = Router();

router.get("/graficas", getGraficas);

export default router;