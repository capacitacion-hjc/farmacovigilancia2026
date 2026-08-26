// ======================================================
// CONFIGURACIÓN
// ======================================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbx2DulpzmZui_aRU3dms6l8me-WHK33vO5b13WsKShmsAvNfrqjUaTU_AH53p1LVVnk/exec?action=dashboard";

const REGISTROS_POR_PAGINA = 10;


// ======================================================
// VARIABLES
// ======================================================

let participantes = [];

let participantesFiltrados = [];

let paginaActual = 1;


// ======================================================
// INICIO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    cargarDashboard();

    document
        .getElementById("btnActualizar")
        .addEventListener("click", cargarDashboard);

    document
        .getElementById("btnCSV")
        .addEventListener("click", descargarCSV);

    document
        .getElementById("buscarParticipante")
        .addEventListener("input", filtrarTabla);

});


// ======================================================
// CARGAR DASHBOARD
// ======================================================

async function cargarDashboard() {

    mostrarLoader(true);

    try {

        const respuesta = await fetch(API_URL, {
            method: "GET",
            cache: "no-store"
        });

        if (!respuesta.ok) {
            throw new Error(
                `HTTP ${respuesta.status}`
            );
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
            throw new Error(
                "La respuesta de la API no tiene el formato esperado."
            );
        }

        participantes = datos;

        participantesFiltrados = [...participantes];

        paginaActual = 1;

        actualizarKPIs();

        renderizarTabla();

        crearGraficas(participantes);

        actualizarFecha();

    } catch (error) {

        console.error(
            "Error al cargar dashboard:",
            error
        );

        mostrarError(
            "No fue posible obtener la información del dashboard."
        );

    } finally {

        mostrarLoader(false);

    }

}


// ======================================================
// KPIs
// ======================================================

function actualizarKPIs() {

    const total =
        participantes.length;

    const hombres =
        participantes.filter(
            p => normalizar(p.sexo) === "hombre"
        ).length;

    const mujeres =
        participantes.filter(
            p => normalizar(p.sexo) === "mujer"
        ).length;

    const presencial =
        participantes.filter(
            p => normalizar(p.modalidad) === "presencial"
        ).length;

    const virtual =
        participantes.filter(
            p => normalizar(p.modalidad) === "virtual"
        ).length;

    const estados =
        new Set(
            participantes
                .map(p => normalizarTexto(p.estado))
                .filter(Boolean)
        ).size;

    document.getElementById("kpiTotal")
        .textContent = total;

    document.getElementById("kpiHombres")
        .textContent = hombres;

    document.getElementById("kpiMujeres")
        .textContent = mujeres;

    document.getElementById("kpiPresencial")
        .textContent = presencial;

    document.getElementById("kpiVirtual")
        .textContent = virtual;

    document.getElementById("kpiEstados")
        .textContent = estados;

}


// ======================================================
// TABLA
// ======================================================

function renderizarTabla() {

    const tbody =
        document.getElementById("tablaBody");

    tbody.innerHTML = "";

    const total =
        participantesFiltrados.length;

    const totalPaginas =
        Math.max(
            1,
            Math.ceil(
                total /
                REGISTROS_POR_PAGINA
            )
        );

    if (paginaActual > totalPaginas) {
        paginaActual = totalPaginas;
    }

    const inicio =
        (paginaActual - 1) *
        REGISTROS_POR_PAGINA;

    const fin =
        inicio +
        REGISTROS_POR_PAGINA;

    const registrosPagina =
        participantesFiltrados.slice(
            inicio,
            fin
        );


    registrosPagina.forEach(p => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `

            <td>
                ${escapeHTML(p.folio)}
            </td>

            <td>
                ${escapeHTML(p.nombre)}
            </td>

            <td>
                ${escapeHTML(p.sexo)}
            </td>

            <td>
                ${escapeHTML(p.edad)}
            </td>

            <td>
                ${escapeHTML(p.estado)}
            </td>

            <td>
                ${escapeHTML(p.institucion)}
            </td>

            <td>
                ${escapeHTML(p.profesion)}
            </td>

            <td>
                ${escapeHTML(p.gradoAcademico)}
            </td>

            <td>
                <span class="badge ${claseModalidad(p.modalidad)}">
                    ${escapeHTML(p.modalidad)}
                </span>
            </td>

        `;

        tbody.appendChild(fila);

    });


    if (registrosPagina.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td
                    colspan="9"
                    class="text-center text-muted py-4">

                    No se encontraron registros.

                </td>
            </tr>
        `;

    }


    document.getElementById("contadorTabla")
        .textContent =
        `${total} registro${total === 1 ? "" : "s"}`;


    renderizarPaginacion(
        totalPaginas
    );

}


// ======================================================
// PAGINACIÓN
// ======================================================

function renderizarPaginacion(totalPaginas) {

    const contenedor =
        document.getElementById("paginacion");

    contenedor.innerHTML = "";

    if (totalPaginas <= 1) {
        return;
    }

    const nav =
        document.createElement("nav");

    const ul =
        document.createElement("ul");

    ul.className =
        "pagination pagination-sm mb-0";


    // ANTERIOR

    const liAnterior =
        document.createElement("li");

    liAnterior.className =
        `page-item ${
            paginaActual === 1
                ? "disabled"
                : ""
        }`;

    liAnterior.innerHTML = `
        <button class="page-link">
            Anterior
        </button>
    `;

    liAnterior
        .querySelector("button")
        .addEventListener(
            "click",
            () => {

                if (paginaActual > 1) {

                    paginaActual--;

                    renderizarTabla();

                }

            }
        );

    ul.appendChild(liAnterior);


    // PÁGINAS

    for (
        let i = 1;
        i <= totalPaginas;
        i++
    ) {

        const li =
            document.createElement("li");

        li.className =
            `page-item ${
                i === paginaActual
                    ? "active"
                    : ""
            }`;

        li.innerHTML = `
            <button class="page-link">
                ${i}
            </button>
        `;

        li
            .querySelector("button")
            .addEventListener(
                "click",
                () => {

                    paginaActual = i;

                    renderizarTabla();

                }
            );

        ul.appendChild(li);

    }


    // SIGUIENTE

    const liSiguiente =
        document.createElement("li");

    liSiguiente.className =
        `page-item ${
            paginaActual === totalPaginas
                ? "disabled"
                : ""
        }`;

    liSiguiente.innerHTML = `
        <button class="page-link">
            Siguiente
        </button>
    `;

    liSiguiente
        .querySelector("button")
        .addEventListener(
            "click",
            () => {

                if (
                    paginaActual <
                    totalPaginas
                ) {

                    paginaActual++;

                    renderizarTabla();

                }

            }
        );

    ul.appendChild(liSiguiente);

    nav.appendChild(ul);

    contenedor.appendChild(nav);

}


// ======================================================
// BÚSQUEDA
// ======================================================

function filtrarTabla(event) {

    const termino =
        normalizarTexto(
            event.target.value
        );

    if (!termino) {

        participantesFiltrados =
            [...participantes];

    } else {

        participantesFiltrados =
            participantes.filter(p => {

                const texto = [
                    p.folio,
                    p.nombre,
                    p.sexo,
                    p.edad,
                    p.estado,
                    p.institucion,
                    p.profesion,
                    p.gradoAcademico,
                    p.modalidad

                ]
                .join(" ");

                return normalizarTexto(
                    texto
                ).includes(termino);

            });

    }

    paginaActual = 1;

    renderizarTabla();

}


// ======================================================
// CSV
// ======================================================

function descargarCSV() {

    if (!participantes.length) {

        alert(
            "No existen registros para exportar."
        );

        return;

    }


    const encabezados = [

        "Folio",
        "Nombre",
        "Sexo",
        "Edad",
        "Estado",
        "Institucion",
        "Profesion",
        "Grado Academico",
        "Modalidad"

    ];


    let csv =
        encabezados
            .map(csvEscapar)
            .join(";")
        + "\r\n";


    participantes.forEach(p => {

        const fila = [

            p.folio,
            p.nombre,
            p.sexo,
            p.edad,
            p.estado,
            p.institucion,
            p.profesion,
            p.gradoAcademico,
            p.modalidad

        ];

        csv +=
            fila
                .map(csvEscapar)
                .join(";")
            + "\r\n";

    });


    // BOM UTF-8 para Excel

    const contenido =
        "\uFEFF" +
        csv;


    const blob =
        new Blob(
            [contenido],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);

    const enlace =
        document.createElement("a");

    const fecha =
        new Date();

    const fechaArchivo =
        `${fecha.getFullYear()}-${String(
            fecha.getMonth() + 1
        ).padStart(2, "0")}-${String(
            fecha.getDate()
        ).padStart(2, "0")}`;


    enlace.href = url;

    enlace.download =
        `Participantes_Farmacovigilancia_${fechaArchivo}.csv`;


    document.body.appendChild(enlace);

    enlace.click();

    document.body.removeChild(enlace);

    URL.revokeObjectURL(url);

}


// ======================================================
// UTILIDADES
// ======================================================

function normalizar(valor) {

    return String(valor ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


function normalizarTexto(valor) {

    return normalizar(valor);

}


function csvEscapar(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return '""';

    }

    return `"${String(valor)
        .replace(/"/g, '""')
        .replace(/\r?\n|\r/g, " ")
    }"`;

}


function escapeHTML(valor) {

    return String(valor ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function claseModalidad(modalidad) {

    return normalizar(modalidad) === "presencial"
        ? "text-bg-primary"
        : "text-bg-info";

}


// ======================================================
// LOADER
// ======================================================

function mostrarLoader(mostrar) {

    const loader =
        document.getElementById("loader");

    if (!loader) {
        return;
    }

    loader.classList.toggle(
        "show",
        mostrar
    );

}


// ======================================================
// FECHA DE ACTUALIZACIÓN
// ======================================================

function actualizarFecha() {

    const fecha =
        new Date();

    const formato =
        fecha.toLocaleString(
            "es-MX",
            {
                dateStyle: "short",
                timeStyle: "short"
            }
        );

    document.getElementById(
        "ultimaActualizacion"
    ).textContent =
        `Última actualización: ${formato}`;

}


// ======================================================
// ERROR
// ======================================================

function mostrarError(mensaje) {

    const tbody =
        document.getElementById("tablaBody");

    tbody.innerHTML = `
        <tr>
            <td
                colspan="9"
                class="text-center text-danger py-4">

                <i class="bi bi-exclamation-triangle-fill"></i>
                ${escapeHTML(mensaje)}

            </td>
        </tr>
    `;

}