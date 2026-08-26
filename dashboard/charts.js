// ======================================================
// VARIABLES DE GRÁFICAS
// ======================================================

let graficaProfesion = null;
let graficaModalidad = null;
let graficaEdades = null;


// ======================================================
// CREAR TODAS LAS GRÁFICAS
// ======================================================

function crearGraficas(datos) {

    crearGraficaProfesion(datos);

    crearGraficaModalidad(datos);

    crearGraficaEdades(datos);

}


// ======================================================
// PROFESIÓN
// ======================================================

function crearGraficaProfesion(datos) {

    if (graficaProfesion) {
        graficaProfesion.destroy();
    }


    const conteo = {};


    datos.forEach(p => {

        const profesion =
            String(
                p.profesion || "No especificado"
            ).trim();

        conteo[profesion] =
            (conteo[profesion] || 0) + 1;

    });


    const ordenado =
        Object.entries(conteo)
            .sort(
                (a, b) => b[1] - a[1]
            );


    graficaProfesion = new Chart(

        document.getElementById(
            "chartProfesion"
        ),

        {

            type: "bar",

            data: {

                labels:
                    ordenado.map(
                        item => item[0]
                    ),

                datasets: [{

                    label:
                        "Participantes",

                    data:
                        ordenado.map(
                            item => item[1]
                        ),
                    
                    backgroundColor: [
                        '#046398'
                    ],

                    borderWidth: 1

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            precision: 0
                        }

                    }

                }

            }

        }

    );

}


// ======================================================
// MODALIDAD
// ======================================================

function crearGraficaModalidad(datos) {

    if (graficaModalidad) {
        graficaModalidad.destroy();
    }


    const conteo = {

        Presencial: 0,

        Virtual: 0

    };


    datos.forEach(p => {

        const modalidad =
            String(
                p.modalidad || ""
            )
                .trim()
                .toLowerCase();


        if (modalidad === "presencial") {

            conteo.Presencial++;

        } else if (
            modalidad === "virtual"
        ) {

            conteo.Virtual++;

        }

    });


    graficaModalidad = new Chart(

        document.getElementById(
            "chartModalidad"
        ),

        {

            type: "doughnut",

            data: {

                labels: [
                    "Presencial",
                    "Virtual"
                ],

                datasets: [{

                    data: [
                        conteo.Presencial,
                        conteo.Virtual
                    ],

                    borderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "60%",

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }

        }

    );

}


// ======================================================
// RANGOS DE EDAD
// ======================================================

function crearGraficaEdades(datos) {

    if (graficaEdades) {
        graficaEdades.destroy();
    }


    const rangos = {

        "18 - 20": 0,

        "21 - 30": 0,

        "31 - 40": 0,

        "41 - 50": 0,

        "51 o más": 0

    };


    datos.forEach(p => {

        const edad =
            parseInt(
                p.edad,
                10
            );


        if (Number.isNaN(edad)) {
            return;
        }


        if (
            edad >= 18 &&
            edad <= 20
        ) {

            rangos["18 - 20"]++;

        }

        else if (
            edad >= 21 &&
            edad <= 30
        ) {

            rangos["21 - 30"]++;

        }

        else if (
            edad >= 31 &&
            edad <= 40
        ) {

            rangos["31 - 40"]++;

        }

        else if (
            edad >= 41 &&
            edad <= 50
        ) {

            rangos["41 - 50"]++;

        }

        else if (
            edad >= 51
        ) {

            rangos["51 o más"]++;

        }

    });


    graficaEdades = new Chart(

        document.getElementById(
            "chartEdades"
        ),

        {

            type: "bar",

            data: {

                labels:
                    Object.keys(rangos),

                datasets: [{

                    label:
                        "Participantes",

                    data:
                        Object.values(rangos),

                    borderWidth: 1

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            precision: 0
                        }

                    }

                }

            }

        }

    );

}