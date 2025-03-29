import { Router } from "express";
import { createNewPiezas, deletePiezasById, getPiezas, getPiezasById, updatePiezasById } from "../controllers/piezas.controller.js";


const router = Router();

router.get("/piezas", getPiezas);

router.post("/piezas", createNewPiezas);

router.get("/piezas/:id", getPiezasById);

router.delete("/piezas/:id", deletePiezasById);

router.put("/piezas/:id", updatePiezasById);

export default router;