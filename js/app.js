const API_URL =
  "https://script.google.com/macros/s/AKfycby78tunTVmPqvxswckMHxcmWx5T_ypvAwC2z1jcNvJtoZbgN5TOJoeFr17frZHEMp6B/exec";

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
        edad: document.getElementById("edad").value,
        estado: document.getElementById("estado").value,
        institucion: document.getElementById("institucion").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        profesion: document.getElementById("profesion").value,
        gradoAcademico: document.getElementById("gradoAcademico").value,
        modalidad: document.querySelector('input[name="modalidad"]:checked').value
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

      const resultado = await respuesta.json();

      if (resultado.cupoLleno) {

        document.getElementById("resultado").innerHTML = `
              <div class="alert alert-warning text-center">
      
                  <h5 class="mb-2">
                      <i class="bi bi-exclamation-triangle-fill"></i>
                      Cupo lleno.
                  </h5>
      
                  <p class="mb-0">
                      ${resultado.mensaje}
                  </p>
      
              </div>
          `;

        document.querySelectorAll("#registroForm input, #registroForm select, #registroForm button")
          .forEach(campo => campo.disabled = true);

        return;
      }

      if (!resultado.success) {

        document.getElementById("resultado").innerHTML = `
              <div class="alert alert-danger">
                  ${resultado.mensaje}
              </div>
          `;

        return;
      }

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