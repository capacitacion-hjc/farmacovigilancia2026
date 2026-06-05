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
    };

    const respuesta = await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(datos)
    });

    
const resultado = await respuesta.json();

    document.getElementById("resultado").innerHTML = `
      <div class="alert alert-success">
      Registro enviado correctamente. Folio asignado:
      <b>${resultado.folio}</b>
      </div>
      `;

    document.getElementById("registroForm").reset();
  });
