import { Router } from "express";
import { createNewProductos, deleteProductoById, getProductoById, getProductos, updateProductoById } from "../controllers/productos.controller.js";

const router = Router();

router.get("/productos", getProductos);

router.post("/productos", createNewProductos);

router.get("/productos/:id", getProductoById);

router.delete("/productos/:id", deleteProductoById);

router.put("/productos/:id", updateProductoById);

export default router;