import express from "express";
import { router as v1Especialidades } from "./routes/v1/especialidadesRutas.js";
// import { pool } from "./db/conexion.js";//siempre poner la extension .js aunque vsc no la coloque
import { testConexion } from "./db/test-conexion.js";
// import { check } from "express-validator";
// import { validarCampos } from "./middlewares/validarCampos.js";
// import { param } from "express-validator";

const app = express(); // instanciamos la app y le da todas las herramientas de Express para manejar rutas y middlewares.

//testeo de bbdd
await testConexion();

app.use(express.json());// se utiliza para registrar un Middleware, es una función que se ejecuta entre que la petición (Request) llega al servidor y el controlador (app.post o app.get) y la procesa.  

app.get('/', (req, res) => {
    console.log('test get');
    res.status(200).send({'estado': 'ok', 'msg' : 'API OK'});//se podria no poner el 200 y en bruno te marcaria 200 por defecto igual
    //res.send({'estado': 'ok', 'msg' : 'API OK'});
})

app.use('/api/v1/especialidades', v1Especialidades);

// //ruta especialidades por id
// app.get('/especialidades/:id_especialidades', async (req, res) => {
//     try {
//         const id_especialidades = req.params.id_especialidades;
//         //const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ${id_especialidades}`; forma que puede terminar en inyeccion sql
//         const sql = `SELECT * FROM especialidades WHERE activo = ? AND id_especialidad = ?`;
//         //const [especialidades, fields] = await pool.query(sql);
//         const [especialidades, fields] = await pool.execute(sql, [1, id_especialidades]);
//         console.log(fields);

//         res.status(200).send(
//             {'estado' : 'ok',
//                 'especialidades' : especialidades
//             }
//         );
//     } catch(error) {
//         console.log(error);
//     }
// })
// //ruta especialidades (retornas las especialidades)
// app.get('/especialidades', async (req, res) => {
//     try {
//         const sql = "SELECT * FROM especialidades WHERE activo = 1";

//         const [especialidades, [fields]] = await pool.query(sql);
//         //console.log(resulst);

//         res.send({'estado' : 'ok',
//              'especialidades' : especialidades});

//     } catch (error) {// se busca atrapa errores de red
//         console.log(error);
//     }
// })

// app.post('/especialidades',
//     [
//         check('nombre', 'El nombre es obligatorio').notEmpty(),//solo detecta el error es un middleware de validacion
//         validarCampos
//     ],
//     async (req, res) => {
//     try {
//         const {nombre} = req.body;
//         const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
//         const [result] = await pool.execute(sql, [nombre]);
//         //console.log(result);
//         if (result.affectedRows > 0) {
//             res.status(201).send({'estado' : true, 'msg' : `ID Creado ${result.insertId}`})
//         }

//     } catch(error){//sirve para capturar distintos errores es generico entre ellos errores de red
//         console.log(error);
//         res.status(500).send({'estado' : false, 'msg' : 'Error interno' });
//     }
    
// })

// app.put('/especialidades/:id_especialidad',
//     [
//         check('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({max:120}).withMessage('el nombre no debe ser mayor a 120'),
//         param('id_especialidad', 'el parametro debe er entero').isInt(),
//         validarCampos
//     ],
//     async (req, res) => {
//         console.log("1. Entró a la ruta PUT"); // Debug
//         try {
//             const { nombre } = req.body;
//             const id_especialidad = req.params.id_especialidad;
//             console.log(`2. Datos recibidos: nombre=${nombre}, id=${id_especialidad}`);

//             const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';
//             console.log("3. Intentando ejecutar SQL...");

//             // Aquí es donde suele trabarse si hay problemas de conexión o bloqueos
//             const [result] = await pool.execute(sql, [nombre, id_especialidad]);
            
//             console.log("4. SQL ejecutado con éxito. Filas afectadas:", result.affectedRows);

//             if (result.affectedRows > 0) {
//                 return res.status(200).send({ estado: true, msg: 'Especialidad modificada' });
//             } else {
//                 return res.status(404).send({ estado: false, msg: 'No se encontraron cambios' });
//             }

//         } catch (error) {
//             console.log("X. ERROR DETECTADO:", error.message);
//             return res.status(500).send({ estado: false, msg: 'Error interno', error: error.message });
//         }
//     }
// );

// app.delete('/especialidades/:id_especialidad',
//     [
//         param('id_especialidad', 'El parametro debe ser entero').isInt(),
//         validarCampos
//     ],
//     async (req, res) => {
//         try {
//             const id_especialidad = req.params.id_especialidad;
//             const sqlb = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
//             const [especialidades, fields] = await pool.execute(sqlb, [id_especialidad]);

//             if (especialidades.length === 0) {
//                 return res.status(404).send({'estado' : false, 'msg' : 'Especialidad no encontrada'});
//             }

//             const {nombre} = req.body;
//             const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';
//             const [result] = await pool.execute(sql, [id_especialidad]);
//             if (result.affectedRows > 0) {
//                 res.status(200).send({'estado' : true, 'msg' : 'especializacion eliminada'});
//             }
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({'estado' : false, 'msg' : 'Error interno'});
//         }
//     }
// )



/*
app.post('/', (req, res) => {
    console.log('post');// lo usas como control
    console.log(req.body.nombre);
    res.send({'estado': 'ok', 'msg' : 'Creado'});
    
})
*/

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado Ok en puerto ${PUERTO}`);//como tiene 2 opciones por el or es buena practica usar un template literal para que cambie la opcion
})

