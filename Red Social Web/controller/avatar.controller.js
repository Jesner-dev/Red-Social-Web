const {request, response} = require('express');
const Avatar = require('../models/avatar.model');

const obtenerAvatars = async (req = request, res = response) => {
    try {
        const avatars = await Avatar.find();

        return res.status(200).send({
            message: 'Se obtuvieron los avatars',
            data: avatars
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).send({
            message: 'Error al obtener los avatars'
        });
    }
};

module.exports = {
    obtenerAvatars
};