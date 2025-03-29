import express from "express";
import cors from "cors";
import config from "./config";
import gestionUnidadesRoutes from "./routes/gestionUnidades.routes";
import authRoutes from "./routes/auth.routes";
import equiposRoutes from "./routes/equipos.routes.js";
import piezasRoutes from "./routes/piezas.routes.js";
import productosRoutes from "./routes/productos.routes.js"
import ventasRoutes from "./routes/ventas.routes.js"
import comprasRoutes from "./routes/compras.routes.js"
import proveedoresRoutes from "./routes/proveedores.routes.js"
import deudoresRoutes from "./routes/deudores.routes.js"
import deudasRoutes from "./routes/deudas.routes.js"
import dataGeneral from "./routes/dataGeneral.routes.js"

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}))

//settings
app.set("port", config.port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(equiposRoutes);
app.use(gestionUnidadesRoutes);
app.use(piezasRoutes);
app.use(productosRoutes);
app.use(ventasRoutes);
app.use(comprasRoutes);
app.use(proveedoresRoutes);
app.use(deudoresRoutes);
app.use(deudasRoutes);
app.use(dataGeneral);

export default app;
