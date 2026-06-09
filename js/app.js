const API_URL =
  "https://script.google.com/macros/s/AKfycbwo8NRuSEUCsw42kZ9eD1rTR33qMHM4XO01FMDhIaHjshHzMCVYWXX8N0o0xcqZQPk_/exec";

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
      modalidad: "Presencial"
    };

    try {

      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(datos)
      });

      const resultado =
        await respuesta.json();

      if (resultado.success) {

        document.getElementById("resultado")
          .innerHTML = `
              <div class="alert alert-success" style="text-align:center;">
                  <h3>Registro exitoso
                  <p>
                      Su folio es:
                      <strong>${resultado.folio}</strong>
                  </p>
                  </h3>
              </div>
          `;

        document
          .getElementById("registroForm")
          .reset();

      } else {

        document.getElementById("resultado")
          .innerHTML = `
              <div class="alert alert-danger">
                  ${resultado.error}
              </div>
          `;
      }

    } catch (error) {

      console.error(error);

      document.getElementById("resultado")
        .innerHTML = `
          <div class="alert alert-danger">
              Error de comunicación con el servidor.
          </div>
      `;
    }

    document.getElementById("registroForm").reset();
  });
