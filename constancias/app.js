const API_URL = "https://script.google.com/macros/s/AKfycbwcp7hZDk2woaYx-gQgpfHaWAWLaZSp1DkdmIlVf-aP-EWy_j6gHgOpRti2Y9IxoCPlFQ/exec";

const form = document.getElementById("buscarForm");

const resultado = document.getElementById("resultado");
const loader = document.getElementById("loader");
const boton = document.querySelector("#buscarForm button");

form.addEventListener("submit", buscarConstancia);

async function buscarConstancia(e) {

    e.preventDefault();

    resultado.style.display = "none";

    const correo = document.getElementById("correo").value.trim();

    try {

        loader.style.display = "block";
        resultado.style.display = "none";

        boton.disabled = true;
        boton.innerHTML = `
        <i class="bi bi-hourglass-split"></i>
        Buscando...
        `;

        const respuesta = await fetch(

            API_URL +

            "?action=constancia&correo=" +

            encodeURIComponent(correo)

        );

        const datos = await respuesta.json();

        if (!datos.success) {

            resultado.innerHTML = `

            <div class="alert alert-danger">
	<label class="bi bi-exclamation-circle"/>

            ${datos.mensaje}

            </div>

            `;

            resultado.style.display = "block";

            return;

        }

        resultado.innerHTML = `

        <div class="card border-success">
	<div class="card-body">
		<h4>
			<label class="bi bi-check-circle-fill text-success"/>

                Constancia localizada

                </h4>
		<hr>
			<p style="font-size:26px;font-weight:bold;">
				<b>Nombre:</b>

                ${datos.nombre}

                </p>
			<p style="font-size:26px;font-weight:bold;">
				<b>Folio de Registro:</b>

                ${datos.folio}

                </p>
				<p style="font-size:26px;font-weight:bold;">
				<b>Folio de Constancia:</b>

                ${datos.folioConstancia}

                </p>
			<div class="d-grid">
				<a href="constancias/${datos.folioConstancia}.pdf" target="_blank" class="btn btn-success btn-lg">
					<label class="bi bi-download"/>

                    Descargar constancia

                    </a>
			</div>
		</div>
	</div>


        `;

        resultado.style.display = "block";

    }

    catch (error) {

        resultado.innerHTML = `

        <div class="alert alert-danger">

        Ocurrió un error al consultar la información.

        </div>

        `;

        resultado.style.display = "block";

    }
    finally{

        loader.style.display = "none";
    
        boton.disabled = false;
    
        boton.innerHTML = `
        <i class="bi bi-search"></i>
        Buscar constancia
        `;
    
    }

}