import { Router } from "express";
import { createNewDeudas, deleteDeudasById, getDeudasById, getDeudas, updateDeudasById } from "../controllers/deudas.controller.js";

const router = Router();

router.get("/deudas", getDeudas);

router.post("/deudas", createNewDeudas);

router.get("/deudas/:id", getDeudasById);

router.delete("/deudas/:id", deleteDeudasById);

router.put("/deudas/:id", updateDeudasById);

export default router;