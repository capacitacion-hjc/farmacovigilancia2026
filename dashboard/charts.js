// ==========================================
// VARIABLES GLOBALES
// ==========================================

let graficaProfesion = null;
let graficaModalidad = null;
let graficaEstados = null;

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

function crearGraficas(datos) {

    crearGraficaProfesion(datos);

    crearGraficaModalidad(datos);

    crearGraficaEstados(datos);

}

// ==========================================
// PROFESIONES
// ==========================================

function crearGraficaProfesion(datos) {

    if (graficaProfesion) {

        graficaProfesion.destroy();

    }

    const conteo = {};

    datos.forEach(p => {

        conteo[p.profesion] =
            (conteo[p.profesion] || 0) + 1;

    });

    graficaProfesion = new Chart(

        document.getElementById("chartProfesion"),

        {

            type: "bar",

            data: {

                labels: Object.keys(conteo),

                datasets: [{

                    label: "Participantes",

                    data: Object.values(conteo),

                    borderWidth: 1,
                    borderColor: '#13322e',
                    backgroundColor: '#98989A'

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        }

    );

}

// ==========================================
// MODALIDAD
// ==========================================

function crearGraficaModalidad(datos) {

    if (graficaModalidad) {

        graficaModalidad.destroy();

    }

    const conteo = {};

    datos.forEach(p => {

        conteo[p.modalidad] =
            (conteo[p.modalidad] || 0) + 1;

    });

    graficaModalidad = new Chart(

        document.getElementById("chartModalidad"),

        {

            type: "pie",

            data: {

                labels: Object.keys(conteo),

                datasets: [{

                    data: Object.values(conteo)

                }]

            },

            options: {

                responsive: true

            }

        }

    );

}

// ==========================================
// EDADES
// ==========================================

function crearGraficaEstados(datos){

    if(graficaEstados){
        graficaEstados.destroy();
    }

    const rangos = {
        "18 - 20": 0,
        "21 - 30": 0,
        "31 - 40": 0,
        "41 - 50": 0,
        "51 o más": 0
    };

    datos.forEach(p => {

        const edad = parseInt(p.edad);

        if (isNaN(edad)) return;

        if (edad >= 18 && edad <= 20) {
            rangos["18 - 20"]++;
        }
        else if (edad >= 21 && edad <= 30) {
            rangos["21 - 30"]++;
        }
        else if (edad >= 31 && edad <= 40) {
            rangos["31 - 40"]++;
        }
        else if (edad >= 41 && edad <= 50) {
            rangos["41 - 50"]++;
        }
        else if (edad >= 51) {
            rangos["51 o más"]++;
        }

    });

    graficaEstados = new Chart(

        document.getElementById("chartEdades"),

        {

            type: "bar",

            data: {

                labels: Object.keys(rangos),

                datasets: [{

                    label: "Participantes",

                    data: Object.values(rangos),

                    borderWidth: 1,
                    borderColor: '#13322e',
                    backgroundColor: '#98989A'

                }]

            },

            options: {

                responsive: true,

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

// ==========================================
// ESTADOS
// ==========================================

/*
function crearGraficaEstados(datos) {

    if (graficaEstados) {

        graficaEstados.destroy();

    }

    const conteo = {};

    datos.forEach(p => {

        conteo[p.estado] =
            (conteo[p.estado] || 0) + 1;

    });

    graficaEstados = new Chart(

        document.getElementById("chartEstados"),

        {

            type: "bar",

            data: {

                labels: Object.keys(conteo),

                datasets: [{

                    label: "Participantes",

                    data: Object.values(conteo),

                    borderWidth: 1,
                    borderColor: '#13322e',
                    backgroundColor: '#98989A'

                }]

            },

            options: {
                indexAxis: 'y',

                responsive: true,

                scales: {

                    x: {

                        beginAtZero: true

                    }

                }

            }

        }

    );

}
*/