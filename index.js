import express from "express";
//console.log('prog3');

const app = express(); // instanciamos la app y le da todas las herramientas de Express para manejar rutas y middlewares.

app.use(express.json());// se utiliza para registrar un Middleware, es una función que se ejecuta entre que la petición (Request) llega al servidor y el controlador (app.post o app.get) y la procesa.  

app.get('/', (req, res) => {
    console.log('test get');
    res.status(200).send({'estado': 'ok', 'msg' : 'API OK'});//se podria no poner el 200 y en bruno te marcaria 200 por defecto igual
    //res.send({'estado': 'ok', 'msg' : 'API OK'});
})

app.post('/', (req, res) => {
    console.log('post');// lo usas como control
    console.log(req.body.nombre);
    res.send({'estado': 'ok', 'msg' : 'Creado'});
    
})

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado Ok en puerto ${PUERTO}`);//como tiene 2 opciones por el or es buena practica usar un template literal para que cambie la opcion
})