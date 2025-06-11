const mongoose = require('mongoose');
const conexionABaseDeDatos = async () =>{
   const stringConexion = process.env.DB_CNN;//Obtenemos el el string de conexion del archivo .env
   try {
    await mongoose.connect(stringConexion);//Realizamos la conexion a la base de datos de MongoDB
    console.info('Conectado a la base de datos');
   } catch (error) {//Sí hubo un error cae en el catch
    console.error("Hubo un error al conectarse a la base de datos");
    throw new Error("Error al conectarse a la base de datos");
   }
}
module.exports = {conexionABaseDeDatos}; //Cuando queremos exportar funciones tenemos que colocar las funciones en {} (Llaves)