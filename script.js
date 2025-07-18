const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
const pokemonGrid = document.getElementById("pokemon-grid");
const detailSection = document.getElementById("pokemon-details");
const detailImage = document.getElementById("detail-image");
const detailInfo = document.getElementById("detail-info");
const backBtn = document.getElementById("back-btn");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(pokemon => {
      fetch(pokemon.url)
        .then(res => res.json())
        .then(pokeData => {
          const card = document.createElement("div");
          card.classList.add("pokemon-card");

          card.innerHTML = `
            <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
            <h3>${pokeData.name}</h3>
          `;

          card.addEventListener("click", () => showDetails(pokeData));
          pokemonGrid.appendChild(card);
        });
    });
  });

function showDetails(pokemon) {
  pokemonGrid.classList.add("hidden");
  detailSection.classList.remove("hidden");

  detailImage.src = pokemon.sprites.other["official-artwork"].front_default;
  detailInfo.innerHTML = `
    <h2>${pokemon.name}</h2>
    <p><strong>Altura:</strong> ${pokemon.height}</p>
    <p><strong>Peso:</strong> ${pokemon.weight}</p>
    <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
  `;
}

backBtn.addEventListener("click", () => {
  detailSection.classList.add("hidden");
  pokemonGrid.classList.remove("hidden");
});
