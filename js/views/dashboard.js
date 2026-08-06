function mostrarDashboard() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="app">

            <header class="app-header">

                <h1>📊 Dashboard</h1>

                <p>Sin Cadenas 2026</p>

            </header>


            <main class="app-content">

                <div class="app-card dashboard-card">

                    <div class="dashboard-header">

                        <h2>Resumen del evento</h2>

                        <p>
                            Estado general en tiempo real.
                        </p>

                    </div>


                    <div
                        id="dashboardContenido"
                        class="dashboard-contenido"
                    >

                        <div class="dashboard-cargando">

                            Cargando estadísticas...

                        </div>

                    </div>


                    <button
                        id="btnActualizarDashboard"
                        class="boton principal"
                    >
                        ↻ Actualizar
                    </button>


                    

                </div>

            </main>
<nav class="bottom-nav">

    <button
        id="navAsistentes"
        class="nav-item">
        👥
    </button>

    <button
        id="navDashboard"
        class="nav-item nav-activo">
        📊
    </button>

    <button
        id="navConfiguracion"
        class="nav-item">
        ⚙️
    </button>

</nav>

        </div>

    `;


document
    .getElementById("navAsistentes")
    .addEventListener(
        "click",
        mostrarAsistentes
    );


    document
        .getElementById("btnActualizarDashboard")
        .addEventListener(
            "click",
            cargarDashboard
        );


    cargarDashboard();

    document
    .getElementById("navConfiguracion")
    .addEventListener(
        "click",
        mostrarConfiguracion
    );

}

async function cargarDashboard() {

    const contenedor =
        document.getElementById(
            "dashboardContenido"
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = `

        <div class="dashboard-cargando">
            Cargando estadísticas...
        </div>

    `;


    try {

        const respuesta =
            await listarAsistentesAPI();


        if (
            !respuesta ||
            !respuesta.ok ||
            !Array.isArray(respuesta.asistentes)
        ) {

            throw new Error(
                "No fue posible obtener los asistentes."
            );

        }


        const asistentes =
            respuesta.asistentes;


        const total =
            asistentes.length;


        const entradas =
            asistentes.filter(
                asistente =>
                    asistente.entrada === true
            ).length;


        const comidas =
            asistentes.filter(
                asistente =>
                    asistente.comida === true
            ).length;


        const snacks =
            asistentes.filter(
                asistente =>
                    asistente.snack === true
            ).length;


        const pendientes =
            total - entradas;


        renderizarDashboard({

            total,
            entradas,
            comidas,
            snacks,
            pendientes

        });


    } catch (error) {

        console.error(
            "Error cargando dashboard:",
            error
        );


        contenedor.innerHTML = `

            <div class="dashboard-error">

                <strong>
                    ⚠️ No pudimos cargar las estadísticas
                </strong>

                <p>
                    Intenta actualizar nuevamente.
                </p>

            </div>

        `;

    }

}

function renderizarDashboard(datos) {

    const contenedor =
        document.getElementById(
            "dashboardContenido"
        );


    if (!contenedor) {
        return;
    }


    const porcentajeEntrada =
        calcularPorcentaje(
            datos.entradas,
            datos.total
        );


    const porcentajeComida =
        calcularPorcentaje(
            datos.comidas,
            datos.total
        );


    const porcentajeSnack =
        calcularPorcentaje(
            datos.snacks,
            datos.total
        );


    contenedor.innerHTML = `

        <div class="dashboard-grid">

            ${crearTarjetaDashboard(
                "👥",
                "Registrados",
                datos.total
            )}

            ${crearTarjetaDashboard(
                "🚪",
                "Entradas",
                datos.entradas
            )}

            ${crearTarjetaDashboard(
                "🍽️",
                "Comidas",
                datos.comidas
            )}

            ${crearTarjetaDashboard(
                "🍿",
                "Snacks",
                datos.snacks
            )}

        </div>


        <div class="dashboard-pendientes">

            <span>
                ⏳ Pendientes por llegar
            </span>

            <strong>
                ${datos.pendientes}
            </strong>

        </div>


        <div class="dashboard-progreso">

            ${crearProgresoDashboard(
                "🚪 Entrada",
                datos.entradas,
                datos.total,
                porcentajeEntrada
            )}

            ${crearProgresoDashboard(
                "🍽️ Comida",
                datos.comidas,
                datos.total,
                porcentajeComida
            )}

            ${crearProgresoDashboard(
                "🍿 Snack",
                datos.snacks,
                datos.total,
                porcentajeSnack
            )}

        </div>

    `;

}

function crearTarjetaDashboard(
    icono,
    titulo,
    valor
) {

    return `

        <div class="dashboard-stat">

            <div class="dashboard-stat-icono">
                ${icono}
            </div>

            <strong>
                ${valor}
            </strong>

            <span>
                ${titulo}
            </span>

        </div>

    `;

}

function crearProgresoDashboard(
    nombre,
    valor,
    total,
    porcentaje
) {

    return `

        <div class="dashboard-progreso-item">

            <div class="dashboard-progreso-info">

                <span>
                    ${nombre}
                </span>

                <strong>
                    ${valor}/${total}
                    ·
                    ${porcentaje}%
                </strong>

            </div>


            <div class="dashboard-barra">

                <div
                    class="dashboard-barra-progreso"
                    style="width:${porcentaje}%"
                >
                </div>

            </div>

        </div>

    `;

}

function calcularPorcentaje(
    valor,
    total
) {

    if (!total) {
        return 0;
    }


    return Math.round(
        (valor / total) * 100
    );

}

