// =========================================
// CONFIGURACIÓN
// =========================================

const API_URL =
    "https://script.google.com/macros/s/AKfycby78tunTVmPqvxswckMHxcmWx5T_ypvAwC2z1jcNvJtoZbgN5TOJoeFr17frZHEMp6B/exec?action=dashboard";

let participantes = [];
let tabla = null;

// =========================================
// INICIO
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    cargarDashboard();

    document
        .getElementById("btnActualizar")
        .addEventListener("click", cargarDashboard);

    document
        .getElementById("btnCSV")
        .addEventListener("click", descargarCSV);

});

// =========================================
// CARGAR DATOS
// =========================================

async function cargarDashboard() {

    try {

        const respuesta = await fetch(API_URL);

        participantes = await respuesta.json();

        actualizarKPIs();

        cargarTabla();

        crearGraficas(participantes);

    } catch (error) {

        console.error(error);

        alert("No fue posible obtener la información.");

    }

}

// =========================================
// KPI
// =========================================

function actualizarKPIs() {

    document.getElementById("kpiTotal").innerText =
        participantes.length;

    document.getElementById("kpiPresencial").innerText =
        participantes.filter(
            x => x.modalidad == "Presencial"
        ).length;

    document.getElementById("kpiVirtual").innerText =
        participantes.filter(
            x => x.modalidad == "Virtual"
        ).length;

    const estados =
        [...new Set(
            participantes.map(
                x => x.estado
            )
        )];

    document.getElementById("kpiEstados").innerText =
        estados.length;

}

function cargarTabla() {

    if (tabla) {

        tabla.destroy();

    }

    const tbody =
        document.querySelector("#tablaParticipantes tbody");

    tbody.innerHTML = "";

    participantes.forEach(p => {

        tbody.innerHTML += `
        <tr>
        
        <td>${p.folio}</td>
        
        <td>${p.nombre}</td>
        
        <td>${p.sexo}</td>
        
        <td>${p.edad}</td>
        
        <td>${p.telefono}</td>
        
        <td>${p.estado}</td>
        
        <td>${p.institucion}</td>
        
        <td>${p.correo}</td>
        
        <td>${p.profesion}</td>
        
        <td>${p.modalidad}</td>
        
        </tr>
        `;

    });

    tabla =
        new DataTable("#tablaParticipantes");

}


function descargarCSV() {

    let csv =

        "Folio,Nombre,Edad,Telefono,Estado,Institucion,Correo,Profesion,Modalidad\n";

    participantes.forEach(p => {

        csv +=
            `${p.folio},
${p.nombre},
${p.edad},
${p.telefono},
${p.estado},
${p.institucion},
${p.correo},
${p.profesion},
${p.modalidad}\n`;

    });

    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "Participantes.csv";

    link.click();

}
