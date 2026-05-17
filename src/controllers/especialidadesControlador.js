// el controlador va a utilizar algun servicio , llama un servicio y va a ver como responderle
import EspecialidadesServicio from "../services/especialidadesServicio.js";
//a esta clase la va a usar las rutas
export default class EspecialidadesControlador {

    // necesita un constructor que instancie el servicio
    constructor () {
        this.especialidades = new EspecialidadesServicio();
    }

    buscarTodas = async (req, res) => {
        try{
            const especialidades = await this.especialidades.buscarTodas();
            res.status(200).send(
                {
                    'estado' : true,
                    'especialidades' : especialidades
                }
            );
        } catch (error) {
            console.log(`Error en GET / especialidades ${error}`);
            res.status(500).json({
                'estado' : false,
                'msg' : 'Error interno'
            })
        }
    }


}