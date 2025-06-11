const express = require('express'); //Cargamos el module de express para crear el api.
const router = express.Router();//Acá lo que hacemos es que creamos una instancia de Router para manejar las rutas agrupadas.
const {registrarUsuario, iniciarSesion} = require('../controller/user.controller');// Importamos los controladores necesarios para las rutas, osea, cuando se ejecuta una ruta que se haga la acción del controlador especificado.
//Cuando creamos una instancia de Router significa que es reactivo, osea, la instancia de router en api.router es la misma que está acá. 
//Eso significa que los cambios o acciones que ocurrén allá se ven reflejados acá, por eso sabemos que tipo de petición es la que entró a la aplicación. 
router.post('/', registrarUsuario);//Acá lo que hacemos es que cuando la instancia de router detecta que la petición es post, se ejecuta la acción del controlador.
router.post('/login', iniciarSesion);
module.exports = router;//Exportamos el router para que pueda usar los metodos con las peticiones(GET, PUT, DELETE, POST).