import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getDeudas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllDeudas);

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

export const createNewDeudas = async (req, res) => {
  const { nombreDeudas, cantidad } = req.body;
 

  if (nombreDeudas == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }

  try {
    const pool = await getConnection();


   
    await pool
      .request()
      .input("nombreDeudas", sql.VarChar, nombreDeudas)
      .input("cantidad", sql.Float, cantidad)
      .query(querys.addNewDeudas);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        nombreDeudas,
        cantidad
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getDeudasById = async (req, res) => {
  const { idDeuda } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeuda", idDeuda)
      .query(querys.getDeudasById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteDeudasById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const deudasDeleted = await pool
      .request()
      .input("id", id)
      .query(querys.getDeudasById);
      await pool.request().input("idDeuda", id).query(querys.deleteDeudas);

    res.json(deudasDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateDeudasById = async (req, res) => {
  const { nombreDeudas, cantidad } = req.body;
  const { id } = req.params;

  if (nombreDeudas == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("nombreDeudas", sql.VarChar, nombreDeudas)
      .input("cantidad", sql.Float, cantidad)
      .input("id", sql.Int, id) 
      .query(querys.getDeudasByNameExceptId); 

    if (result.recordset.length > 0) {
      return res
        .status(409)
        .json({ msg: "El nombre del deudas ya existe" });
    }
 
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombreDeudas", sql.VarChar, nombreDeudas)
      .input("cantidad", sql.Float, cantidad)
      .query(querys.updateDeudasById);

    res.json({ result: "Registro actualizado con éxito" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
