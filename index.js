import express from "express";
import { pool } from "./db/conexion.js";//siempre poner la extension .js aunque vsc no la coloque
import { testConexion } from "./db/test-conexion.js";

const app = express(); // instanciamos la app y le da todas las herramientas de Express para manejar rutas y middlewares.

//testeo de bbdd
await testConexion();

app.use(express.json());// se utiliza para registrar un Middleware, es una función que se ejecuta entre que la petición (Request) llega al servidor y el controlador (app.post o app.get) y la procesa.  

app.get('/', (req, res) => {
    console.log('test get');
    res.status(200).send({'estado': 'ok', 'msg' : 'API OK'});//se podria no poner el 200 y en bruno te marcaria 200 por defecto igual
    //res.send({'estado': 'ok', 'msg' : 'API OK'});
})

//ruta especialidades por id
app.get('/especialidades/:id_especialidades', async (req, res) => {
    try {
        const id_especialidades = req.params.id_especialidades;
        //const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ${id_especialidades}`; forma que puede terminar en inyeccion sql
        const sql = `SELECT * FROM especialidades WHERE activo = ? AND id_especialidad = ?`;
        //const [especialidades, fields] = await pool.query(sql);
        const [especialidades, fields] = await pool.execute(sql, [1, id_especialidades]);
        console.log(fields);

        res.status(200).send(
            {'estado' : 'ok',
                'especialidades' : especialidades
            }
        );
    } catch(error) {
        console.log(error);
    }
})
//ruta especialidades (retornas las especialidades)
app.get('/especialidades', async (req, res) => {
    try {
        const sql = "SELECT * FROM especialidades WHERE activo = 1";

        const [especialidades, [fields]] = await pool.query(sql);
        //console.log(resulst);

        res.send({'estado' : 'ok',
             'especialidades' : especialidades});

    } catch (error) {// se busca atrapa errores de red
        console.log(error);
    }
})

app.post('/especialidades', async (req, res) => {
    try {
        const {nombre} = req.body;
        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [nombre]);
        //console.log(result);
        if (result.affectedRows > 0) {
            res.status(201).send({'estado' : true, 'msg' : `ID Creado ${result.insertId}`})
        }

    } catch(error){//sirve para capturar errores de red
        console.log(error);
        res.status(500).send({'estado' : false, 'msg' : 'Error interno' });
    }
    
})


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

