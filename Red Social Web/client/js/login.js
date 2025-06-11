// const urlUsuario = "http://localhost:3000/api/usuario";
import { urlUsuario } from './utility.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-enviar').addEventListener('click', iniciarSesion);
});

const iniciarSesion = async () => {
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  if (correo && password) {
    const credenciales = {
      correo: correo,
      password: password,
    };

    console.log("CORREO:", correo, "PASSWORD:", password);

    try {
      const response = await fetch(`${urlUsuario}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
      });

      const resultado = await response.json();
      const { message, user } = resultado;

      if (message && user) {
        window.location.href = '../PaginaPrincipal.html';
      }

      console.log("MESSAGE:", message, "USER:", user);
    } catch (error) {
      console.error("ERROR:", error.message);
    }
  }
};

