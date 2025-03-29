import { Router } from "express";
import { createNewDeudores, deleteDeudorById, getDeudorById, getDeudores, updateDeudorById } from "../controllers/deudores.controller.js";

const router = Router();

router.get("/deudores", getDeudores);

router.post("/deudores", createNewDeudores);

router.get("/deudores/:id", getDeudorById);

router.delete("/deudores/:id", deleteDeudorById);

router.put("/deudores/:id", updateDeudorById);

export default router;