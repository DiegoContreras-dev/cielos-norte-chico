// =========================================================
// practica.js — se carga con "defer", así que el HTML ya existe
// =========================================================

// ===== 1. AÑO ACTUAL EN EL FOOTER =====
document.getElementById("anio").textContent = new Date().getFullYear();


// ===== 2. MENÚ HAMBURGUESA (celular) =====
const botonMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", function () {
    menu.classList.toggle("abierto"); // agrega la clase si no está, la quita si está
});

// Cerrar el menú al elegir una opción
const enlaces = document.querySelectorAll(".menu a"); // querySelectorAll = TODOS los que calzan

enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        menu.classList.remove("abierto");

        // Marcar como activo el link clickeado
        enlaces.forEach(function (e) { e.classList.remove("activo"); });
        enlace.classList.add("activo");
    });
});


// ===== 3. CONTADOR DE CARACTERES DEL MENSAJE =====
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const MAX_CARACTERES = 200;

mensaje.addEventListener("input", function () { // "input" = cada vez que se escribe
    const largo = mensaje.value.length;
    contador.textContent = largo + " / " + MAX_CARACTERES;
    contador.style.color = largo > MAX_CARACTERES ? "#dc2626" : "#6b7280";
});


// ===== 4. VALIDACIÓN DEL FORMULARIO =====
const formulario = document.getElementById("formulario");
const exito = document.getElementById("exito");

// Muestra u oculta el error de un campo
function mostrarError(idCampo, texto) {
    const campo = document.getElementById(idCampo);
    const error = document.getElementById("error-" + idCampo);

    error.textContent = texto;

    if (texto === "") {
        campo.classList.remove("invalido");
    } else {
        campo.classList.add("invalido");
    }
}

// Revisa si un correo tiene formato válido (algo@algo.algo)
function correoValido(correo) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // expresión regular
    return patron.test(correo);
}

formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // evita que la página se recargue

    // .trim() quita los espacios al inicio y al final
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const textoMensaje = mensaje.value.trim();

    let hayErrores = false;
    exito.textContent = "";

    // Nombre
    if (nombre === "") {
        mostrarError("nombre", "El nombre es obligatorio.");
        hayErrores = true;
    } else if (nombre.length < 2) {
        mostrarError("nombre", "El nombre debe tener al menos 2 letras.");
        hayErrores = true;
    } else {
        mostrarError("nombre", "");
    }

    // Apellido
    if (apellido === "") {
        mostrarError("apellido", "El apellido es obligatorio.");
        hayErrores = true;
    } else {
        mostrarError("apellido", "");
    }

    // Email
    if (email === "") {
        mostrarError("email", "El correo es obligatorio.");
        hayErrores = true;
    } else if (!correoValido(email)) {
        mostrarError("email", "Ingresa un correo válido.");
        hayErrores = true;
    } else {
        mostrarError("email", "");
    }

    // Mensaje
    if (textoMensaje.length > MAX_CARACTERES) {
        mostrarError("mensaje", "El mensaje no puede superar " + MAX_CARACTERES + " caracteres.");
        hayErrores = true;
    } else {
        mostrarError("mensaje", "");
    }

    // Si hubo algún error, no se envía
    if (hayErrores) {
        return;
    }

    // Todo bien: mostrar mensaje de éxito y limpiar
    exito.textContent = "¡Gracias " + nombre + " " + apellido + "! Tu mensaje fue enviado.";
    console.log("Datos enviados:", { nombre, apellido, email, mensaje: textoMensaje });

    formulario.reset();
    contador.textContent = "0 / " + MAX_CARACTERES;
});
