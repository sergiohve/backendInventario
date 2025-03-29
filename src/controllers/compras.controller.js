import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getCompras = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllCompras);

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

export const createNewCompras = async (req, res) => {
  const { nombreProducto, precioCompra, cantidad, idProveedor } = req.body;

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
  const fechaCompra = new Date(localDateString);

  if (nombreProducto == null || precioCompra == null || cantidad == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }

  try {
    const pool = await getConnection();

    // Verificar si el producto existe
    const productoExistente = await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .query(querys.getProductByName);

    if (productoExistente.recordset.length > 0) {
      // Si el producto existe, actualizar la cantidad
      await pool
        .request()
        .input("nombreProducto", sql.VarChar, nombreProducto)
        .input("cantidadComprada", sql.Int, cantidad)
        .query(querys.updateProductoCantidadCompra); // Asegúrate de tener esta consulta en tus querys
    } else {
      // Si el producto no existe, insertar un nuevo registro
      await pool
        .request()
        .input("nombreProducto", sql.VarChar, nombreProducto)
        .input("precioCompra", sql.Float, precioCompra)
        .input("cantidad", sql.Int, cantidad)
        .input("idProveedor", sql.Int, idProveedor)
        .query(querys.addNewProducto);
    }

    // Crear la compra
    await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("precioCompra", sql.Float, precioCompra)
      .input("cantidad", sql.Int, cantidad)
      .input("fechaCompra", sql.DateTime, fechaCompra)
      .input("idProveedor", sql.Int, idProveedor)
      .query(querys.addNewCompra);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        nombreProducto,
        precioCompra,
        cantidad,
        fechaCompra,
        idProveedor,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getCompraById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getCompraById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteCompraById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const piezasDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getProductoById);
    await pool.request().input("Id", id).query(querys.deleteCompra);

    res.json(piezasDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateCompraById = async (req, res) => {
  const { nombreProducto, precioCompra, cantidad, idProveedor  } = req.body;
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
  const fechaCompra = new Date(localDateString);

  if (nombreProducto == null || precioCompra == null || cantidad == null || fechaCompra == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("precioCompra", sql.Float, precioCompra)
      .input("cantidad", sql.Int, cantidad)
      .input("fechaCompra", sql.DateTime, fechaCompra)
      .input("idProveedor", sql.Int, idProveedor)
      .query(querys.updateCompraById);

    res.json({ result: "Registro actualizado con éxito" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
