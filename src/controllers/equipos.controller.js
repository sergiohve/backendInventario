import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getEquipos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllEquipos);

    res.json({ data: result.recordset, length: result.recordset.length });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewEquipo = async (req, res) => {
  const { nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano, fechaReparacion,
    serialUnidad, tallerReparacion, nombreMecanico, ubicacionTaller, nombreConductor,
    nombrePieza, marcaPieza, serialPieza, descripCambioAceite, marcaAceite } = req.body;


  if (tipoMaquina == null || modelo == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }
  if (marca == null) {
    marca = 0;
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombreUnidad", sql.VarChar, nombreUnidad)
      .input("tipoMaquina", sql.VarChar, tipoMaquina)
      .input("modelo", sql.VarChar, modelo)
      .input("marca", sql.VarChar, marca)
      .input("serialMaquina", sql.VarChar, serialMaquina)
      .input("modeloMotor", sql.VarChar, modeloMotor)
      .input("serialMotor", sql.VarChar, serialMotor)
      .input("arregloPlacas", sql.VarChar, arregloPlacas)
      .input("plantaUbicacion", sql.VarChar, plantaUbicacion)
      .input("condicion", sql.VarChar, condicion)
      .input("ano", sql.VarChar, ano)
      .input("fechaReparacion", sql.VarChar, fechaReparacion)
      .input("serialUnidad", sql.VarChar, serialUnidad)
      .input("tallerReparacion", sql.VarChar, tallerReparacion)
      .input("nombreMecanico", sql.VarChar, nombreMecanico)
      .input("ubicacionTaller", sql.VarChar, ubicacionTaller)
      .input("nombreConductor", sql.VarChar, nombreConductor)
      .input("nombrePieza", sql.VarChar, nombrePieza)
      .input("marcaPieza", sql.VarChar, marcaPieza)
      .input("serialPieza", sql.VarChar, serialPieza)
      .input("descripCambioAceite", sql.VarChar, descripCambioAceite)
      .input("marcaAceite", sql.VarChar, marcaAceite)
      .query(querys.addNewEquipo);

    res.json({
      data: {
        tipoMaquina,
        modelo,
        marca,
        serialMaquina,
        modeloMotor,
        serialMotor,
        arregloPlacas,
        plantaUbicacion,
        condicion,
        ano,
        fechaReparacion,
        serialUnidad,
        tallerReparacion,
        nombreMecanico,
        ubicacionTaller,
        nombreConductor,
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

export const getEquipoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getEquipoById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteEquipoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const equipoDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getEquipoById);
    await pool.request().input("Id", id).query(querys.deleteEquipo);

    res.json(equipoDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateEquipoById = async (req, res) => {
  const { tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano, fechaReparacion,
    serialUnidad, tallerReparacion, nombreMecanico, ubicacionTaller, nombreConductor,
    nombrePieza, marcaPieza, serialPieza, descripCambioAceite, marcaAceite } = req.body;
  const { id } = req.params;

  if (tipoMaquina == null || modelo == null || marca == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("tipoMaquina", sql.VarChar, tipoMaquina)
    .input("modelo", sql.VarChar, modelo)
    .input("marca", sql.VarChar, marca)
    .input("serialMaquina", sql.VarChar, serialMaquina)
    .input("modeloMotor", sql.VarChar, modeloMotor)
    .input("serialMotor", sql.VarChar, serialMotor)
    .input("arregloPlacas", sql.VarChar, arregloPlacas)
    .input("plantaUbicacion", sql.VarChar, plantaUbicacion)
    .input("condicion", sql.VarChar, condicion)
    .input("ano", sql.VarChar, ano)
    .input("fechaReparacion", sql.VarChar, fechaReparacion)
    .input("serialUnidad", sql.VarChar, serialUnidad)
    .input("tallerReparacion", sql.VarChar, tallerReparacion)
    .input("nombreMecanico", sql.VarChar, nombreMecanico)
    .input("ubicacionTaller", sql.VarChar, ubicacionTaller)
    .input("nombreConductor", sql.VarChar, nombreConductor)
    .input("nombrePieza", sql.VarChar, nombrePieza)
    .input("marcaPieza", sql.VarChar, marcaPieza)
    .input("serialPieza", sql.VarChar, serialPieza)
    .input("descripCambioAceite", sql.VarChar, descripCambioAceite)
    .input("marcaAceite", sql.VarChar, marcaAceite)
    .input("id", sql.Int, id)
    .query(querys.updateEquipoById);

  res.json("Registro actualizado con éxito")
};
