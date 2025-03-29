import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerCtrl = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(email, password, name);
    const hashedPassword = await bcrypt.hash(password, 2);

    const pool = await getConnection();
    await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .input("name", sql.VarChar, name)
      .query(querys.registerUser);

    res.status(201).json({ message: "Usuario registrado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Usuarios WHERE email = @email");

    if (result.recordset.length === 0) {
      res.status(401).json({ message: "Usuario no encontrado", ok: false });
    } else {
      const user = result.recordset[0];
      const userPassword = user.password.trim();
      const passwordSpace = password.trim();
      console.log(user.rol)
      if (userPassword !== passwordSpace) {
        return res
          .status(401)
          .json({ message: "Contraseña incorrecta", ok: false });
      } else {
        res.json({ message: "Inicio de sesión exitoso", code: 0, description: "OK", respObj: {
          access_token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2Lm1hcnRpbmV6QGtvbmtva28uY29tIiwidXNlcklkIjoiMjMwMDExIiwiZXhwIjoyMDIxODg1MjM0fQ.nOIfiYfL_Rj7FzNj9CziVbv7jnUNL_v71zruEbKiGPiiWABL_UYarSr8BfSXhT21xrHoKVzXQ5v6FrB8k26WPQ",
          email: email,
          user: {
            activated: true,
            createdBy: null,
            createdDate: null,
            email: email,
            firstName: user.name,
            id: user.id,
            imageUrl: null,
            imageUrl64: null,
            langKey: null,
            lastModifiedBy: null,
            lastModifiedDate: null,
            lastName: user.email,
            login: user.email,
            password: null,
            role: [user.rol],
            shortcuts: null

          }
        } });
      }
     
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const accessTokenCtrl = async (req, res) => {
  const { accessToken } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("accessToken", sql.VarChar, accessToken)
      .query("SELECT * FROM Usuarios WHERE accessToken = @accessToken");

    if (result.recordset.length === 0) {
      res.status(401).json({ message: "Sin autorización", ok: false });
    } else {
      const user = result.recordset[0];
      const accessToken = user.accessToken.trim();
      const accessTokenSpace = accessToken.trim();
      if (accessToken !== accessTokenSpace) {
        return res
          .status(401)
          .json({ message: "Sin autorización", ok: false });
      } else {
        console.log(user.rol)
        res.json({ message: "Reinicio de sesión exitoso", code: 0, description: "OK", respObj: {
          access_token: user.accessToken,
          email: user.email,
          user: {
            activated: true,
            createdBy: null,
            createdDate: null,
            email: user.email,
            firstName: user.name,
            id: user.id,
            imageUrl: null,
            imageUrl64: null,
            langKey: null,
            lastModifiedBy: null,
            lastModifiedDate: null,
            lastName: user.email,
            login: user.email,
            password: null,
            role: [user.rol],
            shortcuts: null

          }
        } });
      }
     
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};