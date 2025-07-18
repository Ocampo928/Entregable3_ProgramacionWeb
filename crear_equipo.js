const API_POKE = "https://pokeapi.co/api/v2/pokemon?limit=151";
const API_EQUIPOS = "http://localhost:8000/equipos/";

const inputBusqueda = document.getElementById("busqueda-pokemon");
const inputNombre = document.getElementById("nombre-equipo");
const resultados = document.getElementById("resultados-pokemon");
const preview = document.getElementById("preview-equipo");
const botonGuardar = document.getElementById("guardar-equipo");

let equipo = [];
let todosLosPokemones = [];

// 1. Cargar todos los Pokémon al iniciar
fetch(API_POKE)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(poke => {
      fetch(poke.url)
        .then(res => res.json())
        .then(pokemon => {
          todosLosPokemones.push(pokemon);
        });
    });
  });

// 2. Buscar Pokémon al escribir
inputBusqueda.addEventListener("input", () => {
  const filtro = inputBusqueda.value.toLowerCase();
  resultados.innerHTML = "";

  const filtrados = todosLosPokemones.filter(p =>
    p.name.toLowerCase().includes(filtro)
  );

  filtrados.slice(0, 12).forEach(pokemon => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h4>${pokemon.name}</h4>
      <button>➕ Agregar</button>
    `;

    card.querySelector("button").addEventListener("click", () => agregarAlEquipo(pokemon));
    resultados.appendChild(card);
  });
});

function agregarAlEquipo(pokemon) {
  if (equipo.length >= 6) {
    alert("Máximo 6 Pokémon por equipo.");
    return;
  }

  if (equipo.find(p => p.nombre === pokemon.name)) {
    alert("Este Pokémon ya está en el equipo.");
    return;
  }

  equipo.push({
    nombre: pokemon.name,
    imagen_url: pokemon.sprites.front_default
  });

  renderizarPreview();
}

function renderizarPreview() {
  preview.innerHTML = "";
  equipo.forEach(p => {
    const img = document.createElement("img");
    img.src = p.imagen_url;
    img.alt = p.nombre;
    preview.appendChild(img);
  });
}

// 3. Guardar equipo (POST)
botonGuardar.addEventListener("click", async () => {
  const nombre = inputNombre.value.trim();

  if (!nombre) {
    alert("Asignale un nombre al equipo.");
    return;
  }

  if (equipo.length === 0) {
    alert("Selecciona al menos un Pokémon.");
    return;
  }

  const res = await fetch(API_EQUIPOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, pokemones: equipo })
  });

  if (res.ok) {
    alert(" ¡Equipo guardado!");
    equipo = [];
    inputNombre.value = "";
    inputBusqueda.value = "";
    resultados.innerHTML = "";
    renderizarPreview();
  } else {
    alert(" Error al guardar equipo.");
  }
});
