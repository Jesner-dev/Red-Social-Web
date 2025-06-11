const{Schema, model} = require('mongoose');

const AvatarSchema = new Schema({
    ruta:{
        type:String,
        require: true
    }
})

AvatarSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('Avatar', AvatarSchema)