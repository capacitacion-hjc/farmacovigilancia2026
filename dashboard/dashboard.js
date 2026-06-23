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

    document.getElementById("kpiHombres").innerText =
        participantes.filter(
            x => x.sexo.trim().toLowerCase() === "hombre"
        ).length;

    document.getElementById("kpiMujeres").innerText =
        participantes.filter(
            x => x.sexo.trim().toLowerCase() === "mujer"
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
            
        <td>${p.estado}</td>
        
        <td>${p.institucion}</td>        
  
        <td>${p.profesion}</td>        
        
        </tr>
        `;

    });

    tabla = $("#tablaParticipantes").DataTable();
}


function descargarCSV() {

    const encabezados = [
        "Folio",
        "Nombre",
        "Sexo",
        "Estado",
        "Institución",
        "Profesión",
        "Grado Académico",
    ];

    let csv = encabezados.join(",") + "\r\n";

    participantes.forEach(p => {

        const fila = [

            p.folio,
            p.nombre,
            p.sexo,
            p.estado,
            p.institucion,
            p.profesion,
            p.gradoAcademico,

        ].map(valor => {

            if (valor === null || valor === undefined) return "";

            return `"${String(valor).replace(/"/g, '""')}"`;

        });

        csv += fila.join(",") + "\r\n";

    });

    // BOM UTF-8 para Excel
    const blob = new Blob(
        ["\uFEFF" + csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);

    const fecha = new Date();

    enlace.download =
        `Participantes_${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2,"0")}-${String(fecha.getDate()).padStart(2,"0")}.csv`;

    document.body.appendChild(enlace);

    enlace.click();

    document.body.removeChild(enlace);

}