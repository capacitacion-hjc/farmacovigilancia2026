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
// ESTADOS
// ==========================================

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

                    //label: "Participantes",

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