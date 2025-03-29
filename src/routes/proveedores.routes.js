import { Router } from "express";
import { createNewProveedores, deleteProveedorById, getProveedorById, getProveedores, updateProveedorById } from "../controllers/proveedores.controller.js";

const router = Router();

router.get("/proveedores", getProveedores);

router.post("/proveedores", createNewProveedores);

router.get("/proveedores/:id", getProveedorById);

router.delete("/proveedores/:id", deleteProveedorById);

router.put("/proveedores/:id", updateProveedorById);

export default router;