const API_URL =
  "https://script.google.com/macros/s/AKfycbzzk6hdkW5F06qnYZ0wOavPDHaN8s1zGaBQISDkqVhjBpkNdkkb_r0Ydq9c1fmUX4Qw/exec";

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


    document.getElementById("resultado").innerHTML = `
      <div class="alert alert-success">
      Registro enviado correctamente.
      </div>
      `;

    document.getElementById("registroForm").reset();
  });
