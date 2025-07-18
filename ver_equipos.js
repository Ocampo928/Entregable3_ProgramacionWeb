const API_EQUIPOS = "http://localhost:8000/equipos/";
const container = document.getElementById("equipos-container");

fetch(API_EQUIPOS)
  .then(res => res.json())
  .then(data => {
    if (data.length === 0) {
      container.innerHTML = "<p>No hay equipos guardados aún.</p>";
      return;
    }

    data.forEach(equipo => {
      const card = document.createElement("div");
      card.classList.add("equipo-card");

      const title = document.createElement("h2");
      title.textContent = equipo.nombre;

      const grid = document.createElement("div");
      grid.classList.add("pokemon-grid");

      equipo.pokemones.forEach(pokemon => {
        const img = document.createElement("img");
        img.src = pokemon.imagen_url;
        img.alt = pokemon.nombre;
        grid.appendChild(img);
      });

      card.appendChild(title);
      card.appendChild(grid);
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error al obtener los equipos:", err);
    container.innerHTML = "<p>Error al cargar los equipos.</p>";
  });
