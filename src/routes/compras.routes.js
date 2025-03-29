import { Router } from "express";
import { createNewCompras, deleteCompraById, getCompraById, getCompras, updateCompraById } from "../controllers/compras.controller.js";

const router = Router();

router.get("/compras", getCompras);

router.post("/compras", createNewCompras);

router.get("/compras/:id", getCompraById);

router.delete("/compras/:id", deleteCompraById);

router.put("/compras/:id", updateCompraById);

export default router;