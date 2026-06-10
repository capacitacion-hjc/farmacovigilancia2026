const API_URL =
  "https://script.google.com/macros/s/AKfycbwo8NRuSEUCsw42kZ9eD1rTR33qMHM4XO01FMDhIaHjshHzMCVYWXX8N0o0xcqZQPk_/exec";

document
  .getElementById("registroForm")
  .addEventListener("submit", async function (e) {

    e.preventDefault();

    document
      .getElementById("loader")
      .classList.remove("d-none");

    try {

      const datos = {
        nombre: document.getElementById("nombre").value,
        sexo: document.getElementById("sexo").value,
        estado: document.getElementById("estado").value,
        institucion: document.getElementById("institucion").value,
        correo: document.getElementById("correo").value,
        profesion: document.getElementById("profesion").value,
        gradoAcademico: document.getElementById("gradoAcademico").value,
        modalidad: "Presencial"
      };

      document
        .getElementById("btnRegistrar")
        .disabled = true;

      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(datos)
      });

      const resultado =
        await respuesta.json();

      document.getElementById("resultado").innerHTML = `
        <div class="alert alert-success" style="text-align:center;">
           <h3> Registro exitoso<br>
            Folio:
            <strong>${resultado.folio}</strong>
            </h3>
        </div>
      `;

      document
        .getElementById("registroForm")
        .reset();

    } catch (error) {

      console.error(error);

      document.getElementById("resultado").innerHTML = `
        <div class="alert alert-danger">
            Error al registrar la información.
        </div>
      `;

    } finally {

      document
        .getElementById("loader")
        .classList.add("d-none");

      document
        .getElementById("btnRegistrar")
        .disabled = false;

    }

  });
