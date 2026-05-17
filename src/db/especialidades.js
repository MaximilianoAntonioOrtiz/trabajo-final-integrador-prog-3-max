//definimos la clase que tiene metodos de acceso a datos
// importamos el pool porque lo necesitamos para poder hacer el pool.query
import { pool } from "./conexion.js";

//la clase esta la va a instanciar el servicio (por eso lo exportamos)
export default class Especialidades {
    //vamos a tener metodos para buscar todas las especialidades
    buscarTodas = async () => {
        const sql = "SELECT * FROM especialidades WHERE activo = 1";
        const [especialidades] = await pool.query(sql);
        return especialidades;
    }

    // buscarPorId = () => {}

    // crear = () => {}

    // modificar = () => {}

    // borrar = () => {}

}
