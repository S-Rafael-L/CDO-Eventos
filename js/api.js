const API_URL =
    "https://script.google.com/macros/s/AKfycbxmQ0I6-EazBUQtOgxoaxlEl5YjCMDrohjiKjw86LEeXOwRCsBjGDSVH-QoO8YuL7s6/exec";


async function registrarAsistenteAPI(datos) {

    const respuesta = await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({
            accion: "registrarAsistente",
            datos: datos
        })

    });

    if (!respuesta.ok) {
        throw new Error(
            `Error de comunicación: ${respuesta.status}`
        );
    }

    return await respuesta.json();

}

async function buscarAsistenteAPI(id) {

    const respuesta = await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({
            accion: "buscarAsistente",
            id: id
        })

    });


    if (!respuesta.ok) {

        throw new Error(
            `Error de comunicación: ${respuesta.status}`
        );

    }


    return await respuesta.json();

}

async function listarAsistentesAPI() {

    const respuesta = await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({
            accion: "listarAsistentes"
        })

    });


    if (!respuesta.ok) {

        throw new Error(
            `Error de comunicación: ${respuesta.status}`
        );

    }


    return await respuesta.json();

}

async function registrarServicioAPI(
    tipo,
    id
) {

    const respuesta = await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            accion: "registrarServicio",

            tipo: tipo,

            id: id

        })

    });


    if (!respuesta.ok) {

        throw new Error(
            `Error de comunicación: ${respuesta.status}`
        );

    }


    return await respuesta.json();

}

