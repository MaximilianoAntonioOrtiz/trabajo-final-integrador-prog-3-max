// 1. Le cambiamos el nombre al import para que no choque (ej: EspecialidadesModelo)
import EspecialidadesModelo from "../db/especialidades.js";

export default class EspecialidadesServicio { // 2. Nombramos la clase como Servicio

    constructor() {
        // 3. Instanciamos la clase de la base de datos usando su nuevo nombre
        this.modelo = new EspecialidadesModelo();
    }

    buscarTodas = async () => {
        // 4. Retornamos el llamado al modelo (y agregamos async/await por si conecta a la BBDD)
        return await this.modelo.buscarTodas();
    }
}