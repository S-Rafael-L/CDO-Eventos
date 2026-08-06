function mostrarAsistentes() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="app">

            <header class="app-header">

                <h1>👋 Hola, Servidor</h1>
                <p>Sin Cadenas 2026</p>

            </header>

            <main class="app-content">

                <div class="app-card">

                    <h2>👥 Asistentes</h2>

                    <br>

                    <button
                        id="btnBuscarAsistente"
                        class="boton">

                        🔍 Buscar asistente

                    </button>

                    <button
                        id="btnListaAsistentes"
                        class="boton">

                        📋 Lista de asistentes

                    </button>

                    <button
                        id="btnNuevoAsistente"
                        class="boton principal">

                        ➕ Nuevo asistente

                    </button>

                </div>

            </main>

            <nav class="bottom-nav">

<button
    id="navAsistentes"
    class="nav-item nav-activo">
    👥
</button>

<button
    id="navDashboard"
    class="nav-item">
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
        .getElementById("btnNuevoAsistente")
        .addEventListener("click", mostrarFormularioAsistente);

        document
    .getElementById("btnBuscarAsistente")
    .addEventListener(
        "click",
        mostrarBuscarAsistente
    );

    document
    .getElementById("btnListaAsistentes")
    .addEventListener(
        "click",
        mostrarListaAsistentes
    );

    document
    .getElementById("navDashboard")
    .addEventListener(
        "click",
        mostrarDashboard
    );

    document
    .getElementById("navConfiguracion")
    .addEventListener(
        "click",
        mostrarConfiguracion
    );

}

function mostrarFormularioAsistente() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="app">

            <header class="app-header">

                <h1>👋 Hola, Servidor</h1>
                <p>Sin Cadenas 2026</p>

            </header>

            <main class="app-content">

                <div class="app-card">

                    <div class="form-header">

                        <h2>➕ Nuevo asistente</h2>

                        <p>
                            Ingresa los datos para generar
                            su registro y código QR.
                        </p>

                    </div>


                    <form
                        id="formAsistente"
                        class="form-asistente"
                    >

                        <div class="campo">

                            <label for="nombre">
                                Nombre completo *
                            </label>

                            <input
                                id="nombre"
                                type="text"
                                required
                                autocomplete="name"
                                placeholder="Ej. Juan Pérez"
                            >

                        </div>


                        <div class="campo">

                            <label for="telefono">
                                Teléfono
                            </label>

                            <input
                                id="telefono"
                                type="tel"
                                inputmode="tel"
                                autocomplete="tel"
                                placeholder="Ej. 3312345678"
                            >

                        </div>


                        <div class="campo">

                            <label for="edad">
                                Edad
                            </label>

                            <input
                                id="edad"
                                type="number"
                                min="1"
                                max="120"
                                inputmode="numeric"
                                placeholder="Ej. 18"
                            >

                        </div>


                        <div class="campo">

                            <label for="observaciones">
                                Observaciones
                            </label>

                            <textarea
                                id="observaciones"
                                rows="3"
                                placeholder="Opcional"
                            ></textarea>

                        </div>


                        <button
                            id="btnGuardar"
                            type="submit"
                            class="boton principal"
                        >
                            Guardar y generar QR
                        </button>


                        <button
                            id="btnCancelar"
                            type="button"
                            class="boton"
                        >
                            ← Cancelar
                        </button>

                    </form>

                </div>

            </main>

        </div>

    `;


    document
        .getElementById("btnCancelar")
        .addEventListener(
            "click",
            mostrarAsistentes
        );


    document
        .getElementById("formAsistente")
        .addEventListener(
            "submit",
            guardarNuevoAsistente
        );

}


async function guardarNuevoAsistente(evento) {

    evento.preventDefault();

    const boton = document.getElementById("btnGuardar");

    const datos = {

        nombre:
            document.getElementById("nombre").value.trim(),

        telefono:
            document.getElementById("telefono").value.trim(),

        edad:
            document.getElementById("edad").value.trim(),

        observaciones:
            document.getElementById("observaciones").value.trim()

    };


    if (!datos.nombre) {

        alert("El nombre es obligatorio.");
        return;

    }


    try {

        boton.disabled = true;
        boton.textContent = "Guardando...";

        const resultado =
            await registrarAsistenteAPI(datos);


        if (!resultado.ok) {

            throw new Error(
                resultado.mensaje ||
                "No fue posible registrar al asistente."
            );

        }


        mostrarRegistroExitoso(
            resultado.asistente
        );


    } catch (error) {

        console.error(error);

        alert(
            "No fue posible registrar al asistente.\n\n" +
            error.message
        );

        boton.disabled = false;
        boton.textContent = "Guardar asistente";

    }

}

function mostrarRegistroExitoso(asistente) {

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="app">

            <header class="app-header">

                <h1>👋 Hola, Servidor</h1>
                <p>Sin Cadenas 2026</p>

            </header>


            <main class="app-content">

                <div class="app-card registro-exitoso">


                    <div class="icono-exito">
                        ✓
                    </div>


                    <h2>
                        ¡Registro exitoso!
                    </h2>


                    <p>
                        ${escaparHTML(asistente.nombre)}
                    </p>


                    <p class="id-label">
                        ID DEL ASISTENTE
                    </p>


                    <div class="id-asistente">

                        ${escaparHTML(asistente.id)}

                    </div>


                    <div class="qr-container">

                        <img
                            src="${asistente.qr}"
                            alt="Código QR"
                        >

                    </div>


                    <p>
                        Guarda o comparte este código
                        para utilizarlo el día del evento.
                    </p>


                    <div class="acciones-registro">

                        <button
                            id="btnCompartirQR"
                            class="boton principal"
                        >
                            📤 Compartir QR
                        </button>


                        <button
                            id="btnRegistrarOtro"
                            class="boton"
                        >
                            ➕ Registrar otro
                        </button>


                        <button
                            id="btnVolverAsistentes"
                            class="boton"
                        >
                            ← Volver a asistentes
                        </button>

                    </div>

                </div>

            </main>

        </div>

    `;


    document
        .getElementById("btnRegistrarOtro")
        .addEventListener(
            "click",
            mostrarFormularioAsistente
        );


    document
        .getElementById("btnVolverAsistentes")
        .addEventListener(
            "click",
            mostrarAsistentes
        );


    document
        .getElementById("btnCompartirQR")
        .addEventListener("click", () => {

            compartirQR(asistente);

        });

}

function escaparHTML(valor) {

    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


async function compartirQR(asistente) {

    const texto =
        `Sin Cadenas 2026\n` +
        `${asistente.nombre}\n` +
        `ID: ${asistente.id}`;

    try {

        // Descargar temporalmente la imagen del QR
        const respuesta = await fetch(asistente.qr);

        if (!respuesta.ok) {
            throw new Error("No fue posible obtener el código QR.");
        }

        const blob = await respuesta.blob();

        // Convertir la imagen en un archivo compartible
        const archivoQR = new File(
            [blob],
            `QR-${asistente.id}.png`,
            {
                type: blob.type || "image/png"
            }
        );

        // Intentar compartir la imagen
        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [archivoQR]
            })
        ) {

            try {

                await navigator.share({
                    title: "Sin Cadenas 2026",
                    text: texto,
                    files: [archivoQR]
                });

                return;

            } catch (error) {

                if (error.name === "AbortError") {
                    return;
                }

                console.error(
                    "Error al compartir:",
                    error
                );

            }

        }

        // Si el navegador no puede compartir archivos,
        // descargar el QR
        descargarQR(
            blob,
            asistente.id
        );

    } catch (error) {

        console.error(
            "Error preparando el QR:",
            error
        );

        // Último respaldo:
        // abrir el QR directamente
        window.open(
            asistente.qr,
            "_blank"
        );

    }

}

function descargarQR(blob, id) {

    const urlTemporal =
        URL.createObjectURL(blob);

    const enlace =
        document.createElement("a");

    enlace.href = urlTemporal;

    enlace.download =
        `QR-${id}.png`;

    document.body.appendChild(enlace);

    enlace.click();

    enlace.remove();

    URL.revokeObjectURL(
        urlTemporal
    );

}

function mostrarBuscarAsistente() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="app">

            <header class="app-header">

                <h1>👋 Hola, Servidor</h1>
                <p>Sin Cadenas 2026</p>

            </header>


            <main class="app-content">

                <div class="app-card">

                    <div class="form-header">

                        <h2>🔍 Buscar asistente</h2>

                        <p>
                            Ingresa el ID asignado al asistente.
                        </p>

                    </div>


                    <form
                        id="formBuscarAsistente"
                        class="form-asistente"
                    >

                        <div class="campo">

                            <label for="buscarID">
                                ID del asistente
                            </label>

                            <input
                                id="buscarID"
                                type="text"
                                placeholder="Ej. SEP26-0018"
                                autocomplete="off"
                                required
                            >

                        </div>


                        <button
                            id="btnBuscar"
                            type="submit"
                            class="boton principal"
                        >
                            🔍 Buscar
                        </button>


                        <button
                            id="btnCancelarBusqueda"
                            type="button"
                            class="boton"
                        >
                            ← Volver
                        </button>

                    </form>


                    <div id="resultadoBusqueda"></div>

                </div>

            </main>

        </div>

    `;


    document
        .getElementById("btnCancelarBusqueda")
        .addEventListener(
            "click",
            mostrarAsistentes
        );


    document
        .getElementById("formBuscarAsistente")
        .addEventListener(
            "submit",
            ejecutarBusquedaAsistente
        );


    document
        .getElementById("buscarID")
        .focus();

}

async function ejecutarBusquedaAsistente(evento) {

    evento.preventDefault();

    const input =
        document.getElementById("buscarID");

    const boton =
        document.getElementById("btnBuscar");

    const resultado =
        document.getElementById("resultadoBusqueda");


    const id =
        input.value
            .trim()
            .toUpperCase();


    if (!id) {
        return;
    }


    try {

        boton.disabled = true;
        boton.textContent = "Buscando...";

        resultado.innerHTML = "";


        const respuesta =
            await buscarAsistenteAPI(id);


        if (!respuesta.ok) {

            resultado.innerHTML = `

                <div class="mensaje-busqueda error-busqueda">

                    <strong>
                        Asistente no encontrado
                    </strong>

                    <p>
                        Revisa el ID e intenta nuevamente.
                    </p>

                </div>

            `;

            return;

        }


        mostrarResultadoAsistente(
            respuesta.asistente
        );


    } catch (error) {

        console.error(error);

        resultado.innerHTML = `

            <div class="mensaje-busqueda error-busqueda">

                <strong>
                    Error de conexión
                </strong>

                <p>
                    No fue posible consultar al asistente.
                </p>

            </div>

        `;


    } finally {

        boton.disabled = false;
        boton.textContent = "🔍 Buscar";

    }

}

function mostrarResultadoAsistente(asistente) {

    const resultado =
        document.getElementById("resultadoBusqueda");


    resultado.innerHTML = `

        <div class="resultado-asistente">

            <div class="resultado-icono">
                👤
            </div>


            <h2>
                ${escaparHTML(asistente.nombre)}
            </h2>


            <div class="resultado-id">
                ${escaparHTML(asistente.id)}
            </div>


            <div class="datos-asistente">

                <div>

                    <span>📞 Teléfono</span>

                    <strong>
                        ${
                            asistente.telefono
                                ? escaparHTML(asistente.telefono)
                                : "Sin teléfono"
                        }
                    </strong>

                </div>


                <div>

                    <span>🎂 Edad</span>

                    <strong>
                        ${
                            asistente.edad
                                ? escaparHTML(asistente.edad) + " años"
                                : "Sin edad"
                        }
                    </strong>

                </div>

            </div>


            <div class="estado-asistente">

                <h3>Estado del asistente</h3>

                ${crearEstadoServicio(
                    "🚪",
                    "Entrada",
                    asistente.entrada,
                    asistente.horaEntrada
                )}

                ${crearEstadoServicio(
                    "🍽️",
                    "Comida",
                    asistente.comida,
                    asistente.horaComida
                )}

                ${crearEstadoServicio(
                    "🍿",
                    "Snack",
                    asistente.snack,
                    asistente.horaSnack
                )}

            </div>

        </div>

    `;

}

function crearEstadoServicio(
    icono,
    nombre,
    registrado,
    hora
) {

    const estado =
        registrado === true;


    return `

        <div class="estado-servicio">

            <div class="estado-nombre">

                <span>${icono}</span>

                <strong>
                    ${nombre}
                </strong>

            </div>


            <div class="
                estado-indicador
                ${estado ? "estado-ok" : "estado-pendiente"}
            ">

                ${
                    estado
                        ? "✓ Registrado"
                        : "○ Pendiente"
                }

            </div>

        </div>

    `;

}

let asistentesLista = [];

let asistentesFiltrados = [];

let paginaAsistentes = 1;

const ASISTENTES_POR_PAGINA = 10;

async function mostrarListaAsistentes() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="app">

            <header class="app-header">

                <h1>👋 Hola, Servidor</h1>
                <p>Sin Cadenas 2026</p>

            </header>


            <main class="app-content">

                <div class="app-card lista-card">

                    <div class="form-header">

                        <h2>📋 Lista de asistentes</h2>

                        <p>
                            Consulta los registros del evento.
                        </p>

                    </div>


                    <div class="campo buscador-lista">

                        <label for="buscarLista">
                            Buscar
                        </label>

                        <input
                            id="buscarLista"
                            type="search"
                            placeholder="Nombre, ID o teléfono"
                            autocomplete="off"
                        >

                    </div>


                    <div class="lista-resumen">

                        <span id="totalLista">
                            Cargando asistentes...
                        </span>

                    </div>


                    <div id="contenedorLista">

                        <div class="lista-cargando">
                            Cargando...
                        </div>

                    </div>


                    <div id="paginacionLista"></div>


                    <button
                        id="btnVolverLista"
                        class="boton"
                        type="button"
                    >
                        ← Volver
                    </button>

                </div>

            </main>

        </div>

    `;


    document
        .getElementById("btnVolverLista")
        .addEventListener(
            "click",
            mostrarAsistentes
        );


    document
        .getElementById("buscarLista")
        .addEventListener(
            "input",
            filtrarListaAsistentes
        );


    await cargarListaAsistentes();

}

function renderizarListaAsistentes() {

    const contenedor =
        document.getElementById("contenedorLista");

    const total =
        document.getElementById("totalLista");


    if (!contenedor || !total) {
        return;
    }


    total.textContent =
        `${asistentesFiltrados.length} ` +
        (
            asistentesFiltrados.length === 1
                ? "asistente"
                : "asistentes"
        );


    if (asistentesFiltrados.length === 0) {

        contenedor.innerHTML = `

            <div class="lista-vacia">

                <div>🔎</div>

                <strong>
                    No encontramos asistentes
                </strong>

                <p>
                    Prueba con otro nombre,
                    ID o teléfono.
                </p>

            </div>

        `;


        document
            .getElementById("paginacionLista")
            .innerHTML = "";


        return;

    }


    const totalPaginas =
        Math.ceil(
            asistentesFiltrados.length /
            ASISTENTES_POR_PAGINA
        );


    if (paginaAsistentes > totalPaginas) {
        paginaAsistentes = totalPaginas;
    }


    const inicio =
        (paginaAsistentes - 1) *
        ASISTENTES_POR_PAGINA;


    const fin =
        inicio +
        ASISTENTES_POR_PAGINA;


    const asistentesPagina =
        asistentesFiltrados.slice(
            inicio,
            fin
        );


    contenedor.innerHTML =
        asistentesPagina
            .map(crearTarjetaListaAsistente)
            .join("");


    conectarTarjetasLista();

    renderizarPaginacionLista(
        totalPaginas
    );

}

function crearTarjetaListaAsistente(asistente) {

    return `

        <button
            class="lista-asistente-item"
            data-id="${escaparHTML(asistente.id)}"
            type="button"
        >

            <div class="lista-avatar">
                👤
            </div>


            <div class="lista-info">

                <strong class="lista-nombre">

                    ${escaparHTML(asistente.nombre)}

                </strong>


                <div class="lista-id">

                    ${escaparHTML(asistente.id)}

                </div>


                <div class="lista-detalles">

                    ${
                        asistente.telefono
                            ? "📞 " +
                              escaparHTML(
                                  asistente.telefono
                              )
                            : "📞 Sin teléfono"
                    }

                    <span>•</span>

                    ${
                        asistente.edad
                            ? escaparHTML(
                                  asistente.edad
                              ) + " años"
                            : "Sin edad"
                    }

                </div>

            </div>


            <div class="lista-flecha">
                ›
            </div>

        </button>

    `;

}

function filtrarListaAsistentes(evento) {

    const termino =
        evento.target.value
            .trim()
            .toLowerCase();


    if (!termino) {

        asistentesFiltrados =
            [...asistentesLista];

    } else {

        asistentesFiltrados =
            asistentesLista.filter(
                asistente => {

                    const nombre =
                        String(
                            asistente.nombre || ""
                        ).toLowerCase();

                    const id =
                        String(
                            asistente.id || ""
                        ).toLowerCase();

                    const telefono =
                        String(
                            asistente.telefono || ""
                        ).toLowerCase();


                    return (
                        nombre.includes(termino) ||
                        id.includes(termino) ||
                        telefono.includes(termino)
                    );

                }
            );

    }


    paginaAsistentes = 1;

    renderizarListaAsistentes();

}

function renderizarPaginacionLista(
    totalPaginas
) {

    const paginacion =
        document.getElementById(
            "paginacionLista"
        );


    if (totalPaginas <= 1) {

        paginacion.innerHTML = "";

        return;

    }


    paginacion.innerHTML = `

        <div class="paginacion">

            <button
                id="paginaAnterior"
                type="button"
                ${paginaAsistentes === 1
                    ? "disabled"
                    : ""}
            >
                ←
            </button>


            <span>

                Página
                <strong>
                    ${paginaAsistentes}
                </strong>
                de
                <strong>
                    ${totalPaginas}
                </strong>

            </span>


            <button
                id="paginaSiguiente"
                type="button"
                ${paginaAsistentes === totalPaginas
                    ? "disabled"
                    : ""}
            >
                →
            </button>

        </div>

    `;


    document
        .getElementById("paginaAnterior")
        .addEventListener(
            "click",
            () => cambiarPaginaLista(-1)
        );


    document
        .getElementById("paginaSiguiente")
        .addEventListener(
            "click",
            () => cambiarPaginaLista(1)
        );

}

function cambiarPaginaLista(cambio) {

    paginaAsistentes += cambio;

    renderizarListaAsistentes();


    document
        .querySelector(".lista-card")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}

function conectarTarjetasLista() {

    document
        .querySelectorAll(
            ".lista-asistente-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const id =
                        item.dataset.id;


                    const asistente =
                        asistentesLista.find(
                            persona =>
                                persona.id === id
                        );


                    if (asistente) {

                        mostrarDetalleDesdeLista(
                            asistente
                        );

                    }

                }
            );

        });

}

function mostrarDetalleDesdeLista(
    asistente
) {

    const app =
        document.getElementById("app");


    app.innerHTML = `

        <div class="app">

            <header class="app-header">

                <h1>👋 Hola, Servidor</h1>
                <p>Sin Cadenas 2026</p>

            </header>


            <main class="app-content">

                <div class="app-card">

                    <div id="resultadoBusqueda">
                    </div>


                    <button
                        id="btnVolverDesdeDetalle"
                        class="boton"
                        type="button"
                    >
                        ← Volver a la lista
                    </button>

                </div>

            </main>

        </div>

    `;


    mostrarResultadoAsistente(
        asistente
    );


    document
        .getElementById(
            "btnVolverDesdeDetalle"
        )
        .addEventListener(
            "click",
            mostrarListaAsistentes
        );

}

async function cargarListaAsistentes() {

    const contenedor =
        document.getElementById("contenedorLista");

    try {

        const respuesta =
            await listarAsistentesAPI();


        if (!respuesta.ok) {

            throw new Error(
                respuesta.mensaje ||
                "No fue posible cargar los asistentes."
            );

        }


        asistentesLista =
            respuesta.asistentes || [];


        asistentesFiltrados =
            [...asistentesLista];


        paginaAsistentes = 1;


        renderizarListaAsistentes();


    } catch (error) {

        console.error(error);


        contenedor.innerHTML = `

            <div class="mensaje-busqueda error-busqueda">

                <strong>
                    No pudimos cargar los asistentes
                </strong>

                <p>
                    Intenta nuevamente.
                </p>

            </div>

        `;

    }

}

