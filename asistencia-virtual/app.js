
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbx2DulpzmZui_aRU3dms6l8me-WHK33vO5b13WsKShmsAvNfrqjUaTU_AH53p1LVVnk/exec";

const formulario = document.getElementById("formAsistencia");
const boton = document.getElementById("btnRegistrar");
const cargando = document.getElementById("cargando");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    ocultarMensaje();

    const folio = document.getElementById("folio").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (!folio || !correo) {
        mostrarMensaje(
            "Captura el folio y el correo electrónico de tu inscripción.",
            "error"
        );
        return;
    }

    boton.disabled = true;
    cargando.hidden = false;
    boton.textContent = "Validando...";

    try {
        const parametros = new URLSearchParams();

        parametros.append("accion", "registrarAsistencia");
        parametros.append("folio", folio);
        parametros.append("correo", correo);

        const respuesta = await fetch(URL_SCRIPT, {
            method: "POST",
            body: parametros
        });

        if (!respuesta.ok) {
            throw new Error("No fue posible comunicarse con el servicio.");
        }

        const resultado = await respuesta.json();

        if (resultado.success) {
            mostrarMensaje(
                resultado.mensaje +
                (resultado.fecha
                    ? "\nFecha de asistencia: " + resultado.fecha
                    : ""),
                "exito"
            );

            formulario.reset();

        } else if (resultado.duplicado) {
            mostrarMensaje(
                resultado.mensaje ||
                "Tu asistencia de hoy ya se encuentra registrada.",
                "info"
            );

        } else {
            mostrarMensaje(
                resultado.mensaje ||
                "No fue posible validar tu asistencia.",
                "error"
            );
        }

    } catch (error) {
        console.error("Error al registrar asistencia:", error);

        mostrarMensaje(
            "No fue posible completar el registro. Verifica tu conexión " +
            "e inténtalo nuevamente. Si el problema continúa, contacta " +
            "a la Coordinación de Capacitación.",
            "error"
        );

    } finally {
        boton.disabled = false;
        boton.textContent = "Registrar asistencia";
        cargando.hidden = true;
    }
});

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje mt-4 " + tipo;
    mensaje.hidden = false;
}

function ocultarMensaje() {
    mensaje.hidden = true;
    mensaje.textContent = "";
    mensaje.className = "mensaje mt-4";
}
