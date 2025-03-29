import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getGraficas = async (req, res) => {
  try {
    const pool = await getConnection();

    const ventas = await pool.request().query(querys.getAllVentasGraficas);
    const compras = await pool.request().query(querys.getAllComprasGraficas);
    const productos = await pool.request().query(querys.getAllProductosGraficas);
    const deudores = await pool.request().query(querys.getAllDeudoresGraficas);
    const deudas = await pool.request().query(querys.getAllDeudasGraficas);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        ventas: ventas.recordset,
        compras: compras.recordset,
        productos: productos.recordset,
        deudores: deudores.recordset,
        deudas: deudas.recordset,
      },
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
