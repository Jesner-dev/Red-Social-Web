// const urlBase = "http://localhost:3000/api";
import { urlAvatar, urlUsuario } from "./utility.js"; //Hay que poner la terminación del archivo, osea, .js, .htnl, .jsx, etc, y no poner "./utility" sin el .js
let idAvatarSeleccionado = "";
document.addEventListener("DOMContentLoaded", () => {
  obtenerAvatars();
  document.getElementById("id-registrarse").addEventListener("click", () => {
    obtenerDatosRegistro();
  });
});

const obtenerDatosRegistro = async () => {
  const nombre = document.getElementById("register-nombre").value;
  const correo = document.getElementById("register-correo").value;
  const biografia = document.getElementById("register-biografia").value;
  const password = document.getElementById("password").value;

  console.log(
    "DATOS: " +
      nombre +
      " " +
      correo +
      " " +
      biografia +
      " Avatar: " +
      idAvatarSeleccionado +
      " password: " +
      password
  );

  if (nombre && correo && biografia && idAvatarSeleccionado.length > 0) {
    const nuevoUsuario = {
      nombre: nombre,
      correo: correo,
      biografia: biografia,
      password: password,
      avatarId: idAvatarSeleccionado,
    };
    await registrarUsuario(nuevoUsuario);
  } else {
    console.log("Faltan datos para el registro");
  }
};

const registrarUsuario = async (nuevoUsuario) => {
  try {
    const response = await fetch(urlUsuario, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });

    const resultado = await response.json();
    const datos = resultado.data;
    console.log("Usuario registrado:", datos);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
  }
};

const obtenerAvatars = async () => {
  try {
    // console.log(urlAvatar);
    const response = await fetch(urlAvatar);
    const result = await response.json();
    const avatars = result.data;
    console.log(avatars);
    crearAvatarsComponent(avatars);
  } catch (error) {
    console.log("Error al obtener los datos desde el front", error);
  }
};

const crearAvatarsComponent = (avatars) => {
  const divAvatar = document.getElementById("contenedor-avatars");
  if (avatars && divAvatar) {
    divAvatar.innerHTML = "";

    avatars.forEach((avatar) => {
      const avatarDiv = document.createElement("div");
      avatarDiv.className =
        "w-16 h-16 bg-gray-200 rounded-full inline-block m-2";
      avatarDiv.id = avatar.id;

      const img = document.createElement("img");
      img.src = avatar.ruta;
      img.alt = `Avatar ${avatar.id}`;
      img.className = "cursor-pointer w-full h-full object-cover rounded-full";
      img.addEventListener("click", () => {
        avatarSeleccionado(avatar.id);
      });
      avatarDiv.appendChild(img);
      divAvatar.appendChild(avatarDiv);
    });
  }
};

const avatarSeleccionado = (idAvatar) => {
  if (idAvatar) {
    idAvatarSeleccionado = idAvatar;
    console.log("Avatar seleccionado:", idAvatarSeleccionado);
    const todosLosAvatares = document.querySelectorAll(
      "#contenedor-avatars > div"
    );
    todosLosAvatares.forEach((div) => {
      div.classList.remove("border-4", "border-blue-500", "shadow-lg");
    });
    const avatarDivSeleccionado = document.getElementById(idAvatar);
    if (avatarDivSeleccionado) {
      avatarDivSeleccionado.classList.add(
        "border-4",
        "border-blue-500",
        "shadow-lg"
      );
    }
  }
};
