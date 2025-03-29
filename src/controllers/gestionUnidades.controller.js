import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getUnidades = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllUnidades);

    res.json({ data: result.recordset, length: result.recordset.length });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const createNewUnidades = async (req, res) => {
  const { nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano } = req.body;


  if (nombreUnidad == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombreUnidad", sql.VarChar, nombreUnidad.trim())
      .input("tipoMaquina", sql.VarChar, tipoMaquina.trim())
      .input("modelo", sql.VarChar, modelo.trim())
      .input("marca", sql.VarChar, marca.trim())
      .input("serialMaquina", sql.VarChar, serialMaquina.trim())
      .input("modeloMotor", sql.VarChar, modeloMotor.trim())
      .input("serialMotor", sql.VarChar, serialMotor.trim())
      .input("arregloPlacas", sql.VarChar, arregloPlacas.trim())
      .input("plantaUbicacion", sql.VarChar, plantaUbicacion.trim())
      .input("condicion", sql.VarChar, condicion.trim())
      .input("ano", sql.VarChar, ano.trim())
      .query(querys.addNewUnidades);

    res.json({
      data: {
        nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano
      },
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUnidadesById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getUnidadesById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteUnidadesById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const unidadDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getUnidadesById);
    await pool.request().input("Id", id).query(querys.deleteUnidades);

    res.json(unidadDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateUnidadesById = async (req, res) => {
  const { nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano } = req.body;
  const { id } = req.params;

  if (nombreUnidad == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("nombreUnidad", sql.VarChar, nombreUnidad.trim())
    .input("tipoMaquina", sql.VarChar, tipoMaquina.trim())
    .input("modelo", sql.VarChar, modelo.trim())
    .input("marca", sql.VarChar, marca.trim())
    .input("serialMaquina", sql.VarChar, serialMaquina.trim())
    .input("modeloMotor", sql.VarChar, modeloMotor.trim())
    .input("serialMotor", sql.VarChar, serialMotor.trim())
    .input("arregloPlacas", sql.VarChar, arregloPlacas.trim())
    .input("plantaUbicacion", sql.VarChar, plantaUbicacion.trim())
    .input("condicion", sql.VarChar, condicion.trim())
    .input("ano", sql.VarChar, ano.trim())
    .input("id", sql.Int, id)
    .query(querys.updateUnidadesById);

  res.json({ nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano })
};
