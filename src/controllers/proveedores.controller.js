import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getProveedores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProveedores);

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

export const createNewProveedores = async (req, res) => {
  const { nombreProveedor } = req.body;
 

  if (nombreProveedor == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }

  try {
    const pool = await getConnection();

    // Verificar si el nombreProveedor ya existe
    const result = await pool
      .request()
      .input("nombreProveedor", sql.VarChar, nombreProveedor)
      .query(querys.getProveedorByName); 

    if (result.recordset.length > 0) {
      return res
        .status(409)
        .json({ msg: "El nombre del proveedor ya existe" });
    }

    // Insertar el nuevo proveedor si no existe
    await pool
      .request()
      .input("nombreProveedor", sql.VarChar, nombreProveedor)
      .query(querys.addNewProveedor);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        nombreProveedor
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProveedorById = async (req, res) => {
  const { idProveedor } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idProveedor", idProveedor)
      .query(querys.getProveedorById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteProveedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const proveedorDeleted = await pool
      .request()
      .input("id", id)
      .query(querys.getProveedorById);
      await pool.request().input("idProveedor", id).query(querys.deleteProveedor);

    res.json(proveedorDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateProveedorById = async (req, res) => {
  const { nombreProveedor } = req.body;
  const { id } = req.params;

  if (nombreProveedor == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    // Verificar si el nombreProveedor ya existe para otros proveedor
    const result = await pool
      .request()
      .input("nombreProveedor", sql.VarChar, nombreProveedor)
      .input("id", sql.Int, id) // Agregar el ID del proveedor actual
      .query(querys.getProveedorByNameExceptId); // Nueva consulta

    if (result.recordset.length > 0) {
      return res
        .status(409)
        .json({ msg: "El nombre del proveedor ya existe" });
    }

    // Actualizar el proveedor si el nombre no existe para otros proveedor
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombreProveedor", sql.VarChar, nombreProveedor)
      .query(querys.updateProveedorById);

    res.json({ result: "Registro actualizado con éxito" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
