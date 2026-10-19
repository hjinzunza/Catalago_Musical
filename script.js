
const formulario = document.getElementById("formularioBusqueda");
const busqueda = document.getElementById("busqueda");
const resultados = document.getElementById("resultados");
const mensaje = document.getElementById("mensaje");

let canciones = [];

// Consulta la API de iTunes
async function buscarMusica(termino) {
    mensaje.textContent = "Buscando canciones...";
    resultados.replaceChildren();

    try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&entity=song&country=CL&limit=20`;

        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        canciones = datos.results;
       
        mostrarCanciones(canciones);
    } catch (error) {
        canciones = [];
        mensaje.textContent = "No se pudieron cargar los resultados. Intenta nuevamente.";
    }
}

// Muestra las canciones en pantalla
function mostrarCanciones(lista) {
    resultados.replaceChildren();

    if (lista.length === 0) {
        mensaje.textContent = "No se encontraron canciones.";
        return;
    }

    mensaje.textContent = `Se encontraron ${lista.length} canciones.`;

    lista.forEach(cancion => {
        const columna = document.createElement("div");
        columna.className = "col-12 col-sm-6 col-lg-4";

        const tarjeta = document.createElement("article");
        tarjeta.className = "cancion";

        const portada = document.createElement("img");
        portada.src = cancion.artworkUrl100 || "";
        portada.alt = "Portada del álbum";

        const titulo = document.createElement("h3");
        titulo.textContent = cancion.trackName || "Sin título";

        const artista = document.createElement("p");
        artista.textContent = `Artista: ${cancion.artistName || "Desconocido"}`;

        const album = document.createElement("p");
        album.textContent = `Álbum: ${cancion.collectionName || "No disponible"}`;

        tarjeta.append(portada, titulo, artista, album);
        columna.appendChild(tarjeta);
        resultados.appendChild(columna);
    });
}

// Busca por canción o artista
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    buscarMusica(busqueda.value.trim());
});


