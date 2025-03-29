import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getPiezas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllPiezas);

    res.json({ data: result.recordset, length: result.recordset.length });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewPiezas = async (req, res) => {
  const { nombrePieza, marcaPieza, serialPieza, descripCambioAceite, marcaAceite, idPieza } = req.body;


  if (nombrePieza == null || marcaPieza == null || serialPieza==null || descripCambioAceite==null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idPieza", sql.Int, idPieza)
      .input("nombrePieza", sql.VarChar, nombrePieza)
      .input("marcaPieza", sql.VarChar, marcaPieza)
      .input("serialPieza", sql.VarChar, serialPieza)
      .input("descripCambioAceite", sql.VarChar, descripCambioAceite)
      .input("marcaAceite", sql.VarChar, marcaAceite)
      .query(querys.addNewPiezas);

    res.json({
      data: {
        idPieza,
        nombrePieza,
        marcaPieza,
        serialPieza,
        descripCambioAceite,
        marcaAceite
      },
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getPiezasById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getPiezasById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deletePiezasById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const piezasDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getPiezasById);
    await pool.request().input("Id", id).query(querys.deletePiezas);

    res.json(piezasDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updatePiezasById = async (req, res) => {
  const { nombrePieza, marcaPieza, serialPieza, descripCambioAceite, marcaAceite, idPieza } = req.body;
  const { id } = req.params;

  if (nombrePieza == null || marcaPieza == null || serialPieza == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("idPieza", sql.Int, idPieza)
    .input("nombrePieza", sql.VarChar, nombrePieza)
    .input("marcaPieza", sql.VarChar, marcaPieza)
    .input("serialPieza", sql.VarChar, serialPieza)
    .input("descripCambioAceite", sql.VarChar, descripCambioAceite)
    .input("marcaAceite", sql.VarChar, marcaAceite)
    .input("id", sql.Int, id)
    .query(querys.updatePiezasById);

  res.json("Registro actualizado con éxito")
};
