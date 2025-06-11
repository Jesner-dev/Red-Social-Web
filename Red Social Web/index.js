const express = require("express");// Framework para crear servidores web en node.js
const cors = require('cors');//Middleware para permitir peticiones entre diferentes origenes.
const path = require('path');//Maneja las rutas de los archivos.
const app = express();//Instanciamos express
const {conexionABaseDeDatos} = require('./db/config');//Importamos el metodo para hacer la conexion a la base de datos.
const apiRouter = require('./api.router');//Importamos el lugar donde definiremos las rutas del api.
const PORT = process.env.PORT || 3000;// Obtenemos puerto que está en nuestro archivo .env
conexionABaseDeDatos();//Ejecutamos la función para hacer la conexion.
app.use(express.json());//Acá lo que hacemos es que el servidor entienda el formato JSON en el cuerpo de las peticiones(req.body)
app.use(cors());//Acá lo que hacemos es que el servidor pueda recibir peticiones desde cualquier origen.
app.use(express.static(path.join(__dirname, "client")));//Acá lo que hacemos es que le decimos al servidor que envie el contenido de la carpeta client al navegador. Le servimos el contenido al navegador
app.get('/', (_, res)=>{//Acá lo que hacemos es que cuando se ingrese la ruta '/' se cargue el archivo index.html, osea, que se renderize. 
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
console.log("ERROR");
app.use('/api', apiRouter);//Acá lo que hacemos es que cuando se ingrese a la ruta '/api' se envie al archivo apiRouter.js donde se manejara todo lo que tenga que ver con la ruta '/api'
app.listen(PORT, ()=>{//Acá escuchamos al servidor 
    console.log(`Fronted corriendo en http://localhost:${PORT}`);
    console.log(`API corriendo en http://localhost:${PORT}/api`);
});