const API_URL =
  "https://script.google.com/macros/s/AKfycbyRL8JT9Kcr7yVGQ4wPcFEyauADmQti_bMTjXbHSLApQcv-Kt8rNWZiKCcNNYB86Y2u/exec";

document
  .getElementById("registroForm")
  .addEventListener("submit", async function (e) {

    e.preventDefault();

    const datos = {
      nombre: document.getElementById("nombre").value,
      sexo: document.getElementById("sexo").value,
      estado: document.getElementById("estado").value,
      institucion: document.getElementById("institucion").value,
      correo: document.getElementById("correo").value,
      profesion: document.getElementById("profesion").value,
      gradoAcademico: document.getElementById("gradoAcademico").value,
      modalidad: document.querySelector(
        'input[name="modalidad"]:checked'
    ).value
    };

    try {

      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(datos)
      });

      document.getElementById("resultado").innerHTML = `
        <div class="alert alert-success">
          Registro enviado correctamente.
        </div>
      `;

      document.getElementById("registroForm").reset();

    } catch (error) {

      document.getElementById("resultado").innerHTML = `
        <div class="alert alert-danger">
          Ocurrió un error al registrar la información.
        </div>
      `;

      console.error(error);
    }

    document.getElementById("registroForm").reset();
  });
