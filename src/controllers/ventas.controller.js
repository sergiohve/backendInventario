import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getVentas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllVentas);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        data: result.recordset,
        length: result.recordset.length,
      },
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewVentas = async (req, res) => {
  const { nombreProducto, precioVenta, cantidad } = req.body;


   const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const localDateString = formatter.format(new Date()).replace(", ", "T");
  const fechaVenta = new Date(localDateString);


  if (nombreProducto == null || precioVenta == null || cantidad == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }

  try {
    const pool = await getConnection();

    // Verificar si hay suficiente cantidad en el inventario
    const productoResult = await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .query(querys.getProductByName);

    if (productoResult.recordset.length === 0) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    const producto = productoResult.recordset[0];
      console.log(producto, cantidad)
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ msg: "Cantidad insuficiente en el inventario" });
    }

    // Crear la venta
    await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("precioVenta", sql.Float, precioVenta)
      .input("cantidad", sql.Int, cantidad)
      .input("fechaVenta", sql.DateTime, fechaVenta)
      .query(querys.addNewVenta);

    // Actualizar la cantidad en el inventario
    await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("cantidadVendida", sql.Int, cantidad)
      .query(querys.updateProductoCantidad);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        nombreProducto,
        precioVenta,
        cantidad,
        fechaVenta, 
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getVentaById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getVentaById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteVentaById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const piezasDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getProductoById);
    await pool.request().input("Id", id).query(querys.deleteVenta);

    res.json(piezasDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateVentaById = async (req, res) => {
  const { nombreProducto, precioVenta, cantidad  } = req.body;
  const { id } = req.params;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const localDateString = formatter.format(new Date()).replace(", ", "T");
  const fechaVenta = new Date(localDateString);

  if (nombreProducto == null || precioVenta == null || cantidad == null || fechaVenta == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("precioVenta", sql.Float, precioVenta)
      .input("cantidad", sql.Int, cantidad)
      .input("fechaVenta", sql.DateTime, fechaVenta)
      .query(querys.updateVentaById);

    res.json({ result: "Registro actualizado con éxito" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
