const {Schema, model, SchemaType} = require("mongoose");//De moongose obtenemos la funcionalidad de modelo y Schema para crear los modelos en mi DB.

//Acá creamos creamos la estructura del modelo.
const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    biografia: {
        type: String,
        required: true
    },
    avatarId: {
        type: Schema.Types.ObjectId, // 👈 ID de un documento de otro modelo
        ref: 'Avatar',               // 👈 nombre del modelo al que hace referencia
        required: true
    }
});
// Se define un método personalizado llamado 'toJSON' para el esquema 'UserSchema'.
// Este método se invoca automáticamente cuando se llama a JSON.stringify() sobre un documento de usuario.
UserSchema.method('toJSON', function () {
    // Se utiliza 'this.toObject()' para convertir el documento de Mongoose en un objeto JavaScript plano.
    // Luego se aplica desestructuración para excluir los campos '__v' (versión del documento) e 'id'.
    // El resto de las propiedades se guardan en el objeto 'object'.
    const { __v, _id, ...object } = this.toObject();

    // Se agrega el campo 'id' al objeto final, asignándole el valor de '_id'.
    // Esto es útil porque muchas veces se prefiere trabajar con 'id' en lugar de '_id'.
    object.id = _id;

    // Se devuelve el objeto modificado, listo para ser enviado como respuesta JSON.
    return object;
});

// Se exporta el modelo 'Usuario' usando el esquema 'UserSchema'.
// Esto permite usarlo en otras partes del proyecto para interactuar con la colección 'usuarios' en la base de datos.
module.exports = model('Usuario', UserSchema);
