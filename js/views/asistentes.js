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

                    <p>
                        Aquí aparecerá el listado de asistentes.
                    </p>

                    <br>

                    <button
                        id="btnVolver"
                        class="boton principal">

                        ⬅ Cambiar modo

                    </button>

                </div>

            </main>

            <nav class="bottom-nav">

                <button class="nav-item">👥</button>

                <button class="nav-item">📊</button>

                <button class="nav-item">⚙️</button>

            </nav>

        </div>

    `;

    document
        .getElementById("btnVolver")
        .addEventListener("click",()=>{

            cargarVista("inicio");

        });

}

