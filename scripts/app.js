// Id Section
const inputField = document.getElementById("inputField");
const pokemonName = document.getElementById("pokemonName");
const searchBtn = document.getElementById("searchBtn");
const idNumber = document.getElementById("idNumber");
const toggleShinyBtn = document.getElementById("toggleShinyBtn");
const pokemonSprite = document.getElementById("pokemonSprite");

// Variables
let userInput = "";
let pokemon = {};


// Event Listeners
searchBtn.addEventListener("click", async () => {
    console.log("Test")
    const searchQuery = userInput.trim().toLowerCase();
    console.log(searchQuery);
    pokemon = await getPokemon(searchQuery);
    pokemonName.innerText = `${pokemon.species.name}`;
    idNumber.innerText = `#${pokemon.id}`;
    pokemonSprite.src = `${pokemon.sprites.front_default}`;
});

inputField.addEventListener("input", () => {
    userInput = inputField.value;
    console.log(userInput);
});

toggleShinyBtn.addEventListener("click", () => {
    
    if (toggleShinyBtn.src.includes("shining.png") && (userInput != "")) {
        toggleShinyBtn.src = "./assets/icons/shining_filled.png";
        pokemonSprite.src = `${pokemon.sprites.front_shiny}`;
    } else {
        toggleShinyBtn.src = "./assets/icons/shining.png";
        pokemonSprite.src = `${pokemon.sprites.front_default}`;
    }
});

// Api Calls
const getPokemon = async (nameOrId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await response.json();
    console.log(data);
    return data;
}
