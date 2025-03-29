import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getProductos = async (req, res) => {
  try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllProductos);

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

export const createNewProductos = async (req, res) => {
  const { nombreProducto, precio, cantidad } = req.body;
  console.log(nombreProducto, precio, cantidad);

  if (nombreProducto == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }

  try {
    const pool = await getConnection();

    // Verificar si el nombreProducto ya existe
    const result = await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .query(querys.getProductByName); 

    if (result.recordset.length > 0) {
      return res
        .status(409)
        .json({ msg: "El nombre del producto ya existe" });
    }

    // Insertar el nuevo producto si no existe
    await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("precio", sql.Float, precio)
      .input("cantidad", sql.Int, cantidad)
      .query(querys.addNewProducto);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        nombreProducto,
        precio,
        cantidad,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getProductoById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const piezasDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getProductoById);
    await pool.request().input("Id", id).query(querys.deleteProducto);

    res.json(piezasDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateProductoById = async (req, res) => {
  const { nombreProducto, precio, cantidad } = req.body;
  const { id } = req.params;

  if (nombreProducto == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    // Verificar si el nombreProducto ya existe para otros productos
    const result = await pool
      .request()
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("id", sql.Int, id) // Agregar el ID del producto actual
      .query(querys.getProductByNameExceptId); // Nueva consulta

    if (result.recordset.length > 0) {
      return res
        .status(409)
        .json({ msg: "El nombre del producto ya existe para otro producto" });
    }

    // Actualizar el producto si el nombre no existe para otros productos
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombreProducto", sql.VarChar, nombreProducto)
      .input("precio", sql.Float, precio)
      .input("cantidad", sql.Int, cantidad)
      .query(querys.updateProductoById);

    res.json({ result: "Registro actualizado con éxito" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
