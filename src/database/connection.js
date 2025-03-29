import sql from "mssql";

const dbSettings = {
  user: "sergiohve",
  password: "sergioh24118642",
  server: "DESKTOP-I780GS8",
  database: "webstore",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
}
export {sql}

