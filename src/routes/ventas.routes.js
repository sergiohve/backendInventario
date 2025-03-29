import { Router } from "express";
import { createNewVentas, deleteVentaById, getVentaById, getVentas, updateVentaById } from "../controllers/ventas.controller.js";

const router = Router();

router.get("/ventas", getVentas);

router.post("/ventas", createNewVentas);

router.get("/ventas/:id", getVentaById);

router.delete("/ventas/:id", deleteVentaById);

router.put("/ventas/:id", updateVentaById);

export default router;