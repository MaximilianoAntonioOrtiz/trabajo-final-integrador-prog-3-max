import { pool } from "./conexion.js";

export async function testConexion() {
    try {
        const con = await pool.getConnection();
        console.log("Conexion con base de datos OK");

        const [resulst] = await con.query("SELECT NOW() AS hora_servidor, DATABASE() AS base_datos");
        console.log("Datos de Prueba");

        console.table(resulst);//el table te muestra los resultados en formato tabla

        con.release();//sirve para liberar la conexion 
    } catch (error) {
        console.log("Error en conectarse a la base de datos", error);
        console.error({
            codigo : error.code,
            msg : error.message
        });
        process.exit(1);
    }
}