import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getDeudores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllDeudores);

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

export const createNewDeudores = async (req, res) => {
  const { nombreDeudor, cantidad } = req.body;
 

  if (nombreDeudor == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }

  try {
    const pool = await getConnection();


   
    await pool
      .request()
      .input("nombreDeudor", sql.VarChar, nombreDeudor)
      .input("cantidad", sql.Float, cantidad)
      .query(querys.addNewDeudor);

    res.json({
      code: 0,
      description: "OK",
      respObj: {
        nombreDeudor,
        cantidad
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getDeudorById = async (req, res) => {
  const { idDeudor } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .query(querys.getDeudorById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteDeudorById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const deudorDeleted = await pool
      .request()
      .input("id", id)
      .query(querys.getDeudorById);
      await pool.request().input("idDeudor", id).query(querys.deleteDeudor);

    res.json(deudorDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateDeudorById = async (req, res) => {
  const { nombreDeudor, cantidad } = req.body;
  const { id } = req.params;

  if (nombreDeudor == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

   
    const result = await pool
      .request()
      .input("nombreDeudor", sql.VarChar, nombreDeudor)
      .input("cantidad", sql.Float, cantidad)
      .input("id", sql.Int, id) 
      .query(querys.getDeudorByNameExceptId); 

    if (result.recordset.length > 0) {
      return res
        .status(409)
        .json({ msg: "El nombre del deudor ya existe" });
    }

    
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombreDeudor", sql.VarChar, nombreDeudor)
      .input("cantidad", sql.Float, cantidad)
      .query(querys.updateDeudorById);

    res.json({ result: "Registro actualizado con éxito" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
