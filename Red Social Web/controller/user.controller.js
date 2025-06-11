const { response, request } = require("express");
const User = require("../models/usuario.model");
const registrarUsuario = async (resq = request, resp = response) => {
  try {
    const { nombre, correo, biografia, password, avatarId } = resq.body;
    if (!nombre || !correo || !biografia || !password || !avatarId) {
      return resp
        .status(400)
        .json({ mensaje: "Los datos tienen que ser correctos" });
    }
    const newUser = new User({ nombre, correo, biografia, password, avatarId });
    await newUser.save();
    return resp.status(200).json({mensaje: "Usuario registrado con exito", usuario: newUser});
  } catch (error) {
     console.error("Error en el servidor: "+error);
     return resp.status(400).json({mensaje: "Error en el servidor", error: error.message});
  }
};
const iniciarSesion = async (req = request, res = response) => {
  try {
    const { correo, password } = req.body;
    if (!correo || !password) {
      return res.status(400).send({ message: 'Faltan correo o password' });
    }
    const userEncontrado = await User.findOne({ correo, password });

    if (!userEncontrado) {
      return res.status(404).send({ message: 'Usuario no encontrado o contraseña incorrecta' });
    }
    return res.status(200).send({ message: 'Usuario encontrado con éxito', user: userEncontrado });

  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(500).send({ message: 'Hubo un error al iniciar sesión', errorMessage: error.message });
  }
};


module.exports = {registrarUsuario, iniciarSesion};
