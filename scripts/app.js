// Id Section
const inputField = document.getElementById("inputField");
const pokemonName = document.getElementById("pokemonName");
const pokemonType = document.getElementById("pokemonType");
const searchBtn = document.getElementById("searchBtn");
const idNumber = document.getElementById("idNumber");
const toggleShinyBtn = document.getElementById("toggleShinyBtn");
const pokemonSprite = document.getElementById("pokemonSprite");
const typePill1 = document.getElementById("typePill1");
const typePill2 = document.getElementById("typePill2");
const pokemonType1 = document.getElementById("pokemonType1");
const pokemonType2 = document.getElementById("pokemonType2");
const encounterText = document.getElementById("encounterText");
const abilitiesText = document.getElementById("abilitiesText");
const movesText = document.getElementById("movesText");
const getRandomPokemonBtn = document.getElementById("getRandomPokemonBtn");
const pokemonInfoArea = document.getElementById("pokemonInfoArea");
const outOfRangeMessage = document.getElementById("outOfRangeMessage");


// Variables
let userInput = "";
let pokemon = {};
let pokemonId = "";
let localStorageElementsCount = 0;


// Functions
function saveToLocalStorage(pokemonId) {
    // console.log(`Saving this pokemon id# to local storage ${pokemonId}`);
    let favoritesListArr = getFromLocalStorage();

    if (!favoritesListArr.includes(`${pokemonId}`)) {
        favoritesListArr.push(`${pokemonId}`);
    }

    localStorage.setItem('Favorites', JSON.stringify(favoritesListArr));
}

function getFromLocalStorage() {
    let localStorageData = localStorage.getItem('Favorites');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage() {
    let localStorageData = getFromLocalStorage();

    let idToRemove = localStorageData.indexOf(pokemonId);

    localStorageData.splice(idToRemove, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData))
}

function getPokemonAbilitiesList(inputArray) {
    let tempArray = [];
    for(let i = 0; i < inputArray.length; i++)
    {
        tempArray.push(inputArray[i].ability.name)
    }
    return tempArray.join(", ");
}

function getPokemonMovesList(inputArray) {
    let tempArray = [];
    for(let i = 0; i < inputArray.length; i++)
    {
        tempArray.push(inputArray[i].move.name)
    }
    return tempArray.join(", ");
}

function getPokemonTypes(inputArray) {
    console.log(inputArray.length);
    if(inputArray.length > 1) {
        typePill2.classList.remove("hidden");
        console.log(`${inputArray[0].type.name}`);
        console.log(`${inputArray[1].type.name}`);
        removeBackgroundColors(typePill1);
        removeBackgroundColors(typePill2);
        typePill1.classList.add(`bg-pokemon${inputArray[0].type.name}`);
        typePill2.classList.add(`bg-pokemon${inputArray[1].type.name}`);
        pokemonType1.innerText = `${inputArray[0].type.name}`;
        pokemonType2.innerText = `${inputArray[1].type.name}`;
    } else {
        typePill2.classList.add("hidden");
        console.log(`${inputArray[0].type.name}`);
        removeBackgroundColors(typePill1);
        typePill1.classList.add(`bg-pokemon${inputArray[0].type.name}`);
        pokemonType1.innerText = `${inputArray[0].type.name}`;
    }
}

function removeBackgroundColors(inputElementId) {
    const bgColorArray = ["bg-pokemonnormal", "bg-pokemonfire", "bg-pokemonwater", "bg-pokemonelectric", "bg-pokemongrass", "bg-pokemonice", "bg-pokemonfighting", "bg-pokemonpoison", "bg-pokemonground", "bg-pokemonflying", "bg-pokemonpsychic", "bg-pokemonbug", "bg-pokemonrock", "bg-pokemonghost", "bg-pokemondragon", "bg-pokemondark", "bg-pokemonsteel"];
    bgColorArray.forEach( bgColor => {
        if(inputElementId.classList.contains(bgColor))
        {
            inputElementId.classList.remove(bgColor);
        }
    });
}
// test();

function getEvolutionChain(pokemon)
{
    
}

// Event Listeners
searchBtn.addEventListener("click", async () => {
    // console.log("Test")
    const searchQuery = userInput.trim().toLowerCase();
    // console.log(searchQuery);
    pokemon = await getPokemon(searchQuery);
    pokemonId = `${pokemon.id}`;
    if(parseInt(pokemonId) < 649) {
        pokemonInfoArea.classList.remove("hidden");
        pokemonInfoArea.classList.add("grid");
        outOfRangeMessage.classList.add("hidden");
        outOfRangeMessage.classList.remove("flex");
        idNumber.innerText = `#${pokemon.id}`;
        pokemonName.innerText = `${pokemon.name}`;
        pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
        getPokemonTypes(pokemon.types);
        
        encounterText.innerText = await getLocationData(pokemon.id);
        abilitiesText.innerText = getPokemonAbilitiesList(pokemon.abilities);
        movesText.innerText = getPokemonMovesList(pokemon.moves);
    } else {
        pokemonInfoArea.classList.add("hidden");
        pokemonInfoArea.classList.remove("grid");

        outOfRangeMessage.classList.remove("hidden");
        outOfRangeMessage.classList.add("flex");
    }
});

getRandomPokemonBtn.addEventListener("click", () => {

});

inputField.addEventListener("input", () => {
    userInput = inputField.value;
    // console.log(userInput);
});

toggleShinyBtn.addEventListener("click", () => {
    
    if (toggleShinyBtn.src.includes("shining.png") && (userInput != "")) {
        toggleShinyBtn.src = "./assets/icons/shining_filled.png";
        pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_shiny}`;
    } else {
        toggleShinyBtn.src = "./assets/icons/shining.png";
        pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
    }
});

addToFavoritesBtn.addEventListener("click", () => {
    if (addToFavoritesBtn.classList.contains("grayscale") && (userInput != "")) {
        addToFavoritesBtn.classList.remove("grayscale");
        addToFavoritesBtn.classList.remove("opacity-50");
        saveToLocalStorage(pokemonId);
    } else {
        addToFavoritesBtn.classList.add("grayscale");
        addToFavoritesBtn.classList.add("opacity-50");
        removeFromLocalStorage(pokemonId);
        localStorageElementsCount--;
    }
});

// Api Calls
const getPokemon = async (nameOrId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

const getLocationData = async (inputIdNumber) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputIdNumber}/encounters`);
    const data = await response.json();
    if(data.length > 0) {
        let locationString = data[0].location_area.name;
        return locationString;
    } else {
        return "N/A";
    }
}
