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

async function cargarDashboard(){

    try{

        const respuesta = await fetch(API_URL);

        participantes = await respuesta.json();

        actualizarKPIs();

        cargarTabla();

        crearGraficas(participantes);

    }catch(error){

        console.error(error);

        alert("No fue posible obtener la información.");

    }

}

// =========================================
// KPI
// =========================================

function actualizarKPIs(){

    document.getElementById("kpiTotal").innerText =
        participantes.length;

    document.getElementById("kpiPresencial").innerText =
        participantes.filter(
            x=>x.modalidad=="Presencial"
        ).length;

    document.getElementById("kpiVirtual").innerText =
        participantes.filter(
            x=>x.modalidad=="Virtual"
        ).length;

    const estados =
        [...new Set(
            participantes.map(
                x=>x.estado
            )
        )];

    document.getElementById("kpiEstados").innerText =
        estados.length;

}
