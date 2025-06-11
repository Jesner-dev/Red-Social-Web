const express = require('express');//Cargamos el module de express para crear el api
const apiRouter = express.Router();//Acá lo que hacemos es que creamos una instancia de router para manejar rutas agrupadas.

apiRouter.get('/', (req, resp)=>{//Acá definimos una ruta raiz '/' con una petición GET 
    return resp.send("Bienvenido al api");
});//La función recibe 2 paramtros obligatorios aunque no los use, el req = request y el resp = response, ya que internamente express pasa esos paramtros a otra función (callback)
//Si no se pasa los 2 parametros no se puede usar el metedo send del resp, ya que sí solo pasamos el parametro resp, express por el orden de los parametros
//pensará que resp es req. Recordemos que request es la petición que hace el cliente y el response es la respuesta del servidor

apiRouter.use('/usuario', require('./router/user.route'));//Acá lo que hacemos es que indicamos que cuando se ingrese al api con la ruta /usuario
//Lo dirijimos al route de usuario donde según la petición (POST, GET, PUT, DELETE) se realizará la acción del controlador especificado.
apiRouter.use('/avatar', require('./router/avatar.route'));//Aca definimos que express use el router avatar.route en la ruta /avatar, ya dentro del avatar.route estan nuestros metodos GET, POST, PUT, que se ejecutaran dependiendo la request.
module.exports = apiRouter; // Tenemos que exportat el apiRouter para poderlo usar en el index.js