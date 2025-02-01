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
const errorMessage = document.getElementById("errorMessage");
const errorMessageText = document.getElementById("errorMessageText");
const favoritesModalArea = document.getElementById("favoritesModalArea");
const baseFormDisplayArea = document.getElementById("baseFormDisplayArea");
const firstEvolutionDisplayArea = document.getElementById("firstEvolutionDisplayArea");
const secondEvolutionDisplayArea = document.getElementById("secondEvolutionDisplayArea");
const displayFavoritesBtn = document.getElementById("displayFavoritesBtn");


// Variables
let userInput = "";
let pokemon = {};
let pokemonId = "";
let localStorageElementsCount = 0;
let favoritePokemonCount = 0;

const errorMessageOutOfBounds = "This application showcases pokemon from Generations 1 through 5 (ID #s < 650). The pokemon you entered appears to be from a later generation. Try searching for a different Pokemon!";
const errorMessageSearchQuery = "There was an issue with your search query. Please check the spelling of your query and try again."


// Functions
function saveToLocalStorage(pokemonName) {
    let favoritesListArr = getFromLocalStorage();

    if (!favoritesListArr.includes(pokemonName)) {
        favoritesListArr.push(pokemonName);
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

function removeFromLocalStorage(inputPokemonName) {
    let localStorageData = getFromLocalStorage();

    let idToRemove = localStorageData.indexOf(inputPokemonName);

    localStorageData.splice(idToRemove, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData));
    if(inputPokemonName == pokemonName.innerText) {
        addToFavoritesBtn.classList.add("grayscale");
        addToFavoritesBtn.classList.add("opacity-50");
    }
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

function getPokemonTypes(inputPokemon) {
    if(inputPokemon["past_types"].length > 0) {
        typePill2.classList.add("hidden");
        removeBackgroundColors(typePill1);
        removeBackgroundColors(pokemonSprite);
        pokemonSprite.classList.add(`bg-pokemon${inputPokemon.past_types[0].types[0].type.name}`);
        typePill1.classList.add(`bg-pokemon${inputPokemon.past_types[0].types[0].type.name}`);
        pokemonType1.innerText = `${inputPokemon.past_types[0].types[0].type.name}`;
    } else if(inputPokemon["types"].length > 1) {
        typePill2.classList.remove("hidden");
        removeBackgroundColors(typePill1);
        removeBackgroundColors(typePill2);
        removeBackgroundColors(pokemonSprite);
        pokemonSprite.classList.add(`bg-pokemon${inputPokemon.types[0].type.name}`);
        typePill1.classList.add(`bg-pokemon${inputPokemon.types[0].type.name}`);
        typePill2.classList.add(`bg-pokemon${inputPokemon.types[1].type.name}`);
        pokemonType1.innerText = `${inputPokemon.types[0].type.name}`;
        pokemonType2.innerText = `${inputPokemon.types[1].type.name}`;
    } else {
        typePill2.classList.add("hidden");
        removeBackgroundColors(typePill1);
        removeBackgroundColors(pokemonSprite);
        pokemonSprite.classList.add(`bg-pokemon${inputPokemon.types[0].type.name}`);
        typePill1.classList.add(`bg-pokemon${inputPokemon.types[0].type.name}`);
        pokemonType1.innerText = `${inputPokemon.types[0].type.name}`;
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

function createFavoritesList() {
    let favoritesList = getFromLocalStorage();
    console.log(favoritesList);
    favoritesModalArea.innerHTML = "";
    favoritesList.map((pokemonFaveListElement) => {
        console.log(favoritePokemonCount)
        console.log(localStorageElementsCount);
        // if(favoritePokemonCount <= localStorageElementsCount) {
            
            let pill = document.createElement('div');
            pill.className = "rounded-full bg-pillGray flex justify-between items-center py-4 px-5";
            
            
            let favePokemonName = document.createElement('p');
            favePokemonName.className = "text-center text-xl font-montserrat";
            favePokemonName.innerText = pokemonFaveListElement;
            pill.addEventListener('click', async () => {
                pokemon = await getPokemon(pokemonFaveListElement);
                let favoritesListArr = getFromLocalStorage();
                if (!favoritesListArr.includes(pokemon.name)) {
                    addToFavoritesBtn.classList.add("grayscale");
                    addToFavoritesBtn.classList.add("opacity-50");
                } else {
                    addToFavoritesBtn.classList.remove("grayscale");
                    addToFavoritesBtn.classList.remove("opacity-50");
                }
                pokemonId = `${pokemon.id}`;
                    pokemonInfoArea.classList.remove("hidden");
                    pokemonInfoArea.classList.add("grid");
                    errorMessage.classList.add("hidden");
                    errorMessage.classList.remove("flex");
                    idNumber.innerText = `#${pokemon.id}`;
                    pokemonName.innerText = `${pokemon.name}`;
                    pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
                    getPokemonTypes(pokemon);
                    getEvolutionChain(pokemon);
                    encounterText.innerText = await getLocationData(pokemon.id);
                    abilitiesText.innerText = getPokemonAbilitiesList(pokemon.abilities);
                    movesText.innerText = getPokemonMovesList(pokemon.moves);
            });
            
            let deletePokemonBtn = document.createElement('button');
            deletePokemonBtn.className = "z-50";

            let deletePokemonIcon = document.createElement('img');
            deletePokemonIcon.src = "./assets/icons/delete.png";
            deletePokemonIcon.alt = "Remove Pokemon from list";
            deletePokemonIcon.className = "size-12";
            
            deletePokemonBtn.addEventListener('click', function () {
                removeFromLocalStorage(favePokemonName.innerText);
                pill.remove();
            });
    
            favoritesModalArea.appendChild(pill);
    
            pill.appendChild(favePokemonName);
            pill.appendChild(deletePokemonBtn);
    
            deletePokemonBtn.appendChild(deletePokemonIcon);
        }
    )
    // }
}

const onLoadDisplay = async (inputPokemonStr) => {
    pokemon = await getPokemon(inputPokemonStr);
    let favoritesListArr = getFromLocalStorage();
    if (!favoritesListArr.includes(pokemon.name)) {
        addToFavoritesBtn.classList.add("grayscale");
    } else {
        addToFavoritesBtn.classList.remove("grayscale");
        addToFavoritesBtn.classList.remove("opacity-50");
    }
    pokemonId = `${pokemon.id}`;
        pokemonInfoArea.classList.remove("hidden");
        pokemonInfoArea.classList.add("grid");
        errorMessage.classList.add("hidden");
        errorMessage.classList.remove("flex");
        idNumber.innerText = `#${pokemon.id}`;
        pokemonName.innerText = `${pokemon.name}`;
        pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
        getPokemonTypes(pokemon);
        getEvolutionChain(pokemon);
        encounterText.innerText = await getLocationData(pokemon.id);
        abilitiesText.innerText = getPokemonAbilitiesList(pokemon.abilities);
        movesText.innerText = getPokemonMovesList(pokemon.moves);

}




const getEvolutionChain = async (pokemon) => {
    console.log(pokemon.species.url);
    const speciesUrl = pokemon.species.url;
    const response = await fetch(speciesUrl);
    const speciesData = await response.json();
    console.log(speciesData);
    console.log(speciesData.evolution_chain.url);
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChain = await evolutionChainResponse.json();
    console.log(evolutionChain);
    const firstEvolution = await getPokemon(evolutionChain.chain.species.name);
    baseFormDisplayArea.innerHTML = "";
    firstEvolutionDisplayArea.innerHTML = "";
    secondEvolutionDisplayArea.innerHTML = "";
    if(firstEvolution != "error") {
        let firstEvo =  document.createElement('img'); 
        firstEvo.src = `${firstEvolution.sprites.other["official-artwork"].front_default}`;
        firstEvo.alt = "Base Form";
        firstEvo.className = "xl:size-40 size-30"
        baseFormDisplayArea.appendChild(firstEvo);

        if(evolutionChain.chain.evolves_to.length == 0) {
            let secondEvo =  document.createElement('p');
            secondEvo.innerText = "N/A"; 
            firstEvolutionDisplayArea.appendChild(secondEvo);
        } else {
            for(let i = 0; i < evolutionChain.chain.evolves_to.length; i++) {
                const secondEvolution = await getPokemon(evolutionChain.chain.evolves_to[i].species.name);
                if(secondEvolution.id <= 649) {
                    let secondEvo =  document.createElement('img'); 
                    secondEvo.src = `${secondEvolution.sprites.other["official-artwork"].front_default}`;
                    secondEvo.alt = "First evolution";
                    secondEvo.className = "xl:size-40 size-30"
                    firstEvolutionDisplayArea.appendChild(secondEvo);
                }
                if(evolutionChain.chain.evolves_to[i].evolves_to.length == 0) {
                    let thirdEvo =  document.createElement('p');
                    thirdEvo.innerText = "N/A"; 
                    secondEvolutionDisplayArea.appendChild(thirdEvo);
                } else {
                    for(let j = 0; j < evolutionChain.chain.evolves_to[i].evolves_to.length; j++) {
                        const thirdEvolution = await getPokemon(evolutionChain.chain.evolves_to[i].evolves_to[j].species.name);
                        if(thirdEvolution.id <= 649) {
                            let thirdEvo =  document.createElement('img'); 
                            thirdEvo.src = `${thirdEvolution.sprites.other["official-artwork"].front_default}`;
                            thirdEvo.alt = "First evolution";
                            thirdEvo.className = "xl:size-40 size-30"
                            secondEvolutionDisplayArea.appendChild(thirdEvo);
                        }
                
                    }
                }
            }
        }
    } else {
        let firstEvo =  document.createElement('p');
        firstEvo.innerText = "N/A"; 
        baseFormDisplayArea.appendChild(firstEvo);
    }
}

// Event Listeners
searchBtn.addEventListener("click", async () => {
    const searchQuery = userInput.trim().toLowerCase();
    pokemon = await getPokemon(searchQuery);
    pokemonId = `${pokemon.id}`;
    if(pokemon == "error") {
        pokemonInfoArea.classList.add("hidden");
        pokemonInfoArea.classList.remove("grid");
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("flex");
        errorMessageText.innerText = errorMessageSearchQuery;
    } else if(parseInt(pokemonId) <= 649) {
        toggleShinyBtn.src = "./assets/icons/shining.png";
        let favoritesListArr = getFromLocalStorage();
        if (!favoritesListArr.includes(pokemon.name)) {
            addToFavoritesBtn.classList.add("grayscale");
            addToFavoritesBtn.classList.add("opacity-50");
        } else {
            addToFavoritesBtn.classList.remove("grayscale");
            addToFavoritesBtn.classList.remove("opacity-50");
        }
        pokemonInfoArea.classList.remove("hidden");
        pokemonInfoArea.classList.add("grid");
        errorMessage.classList.add("hidden");
        errorMessage.classList.remove("flex");
        idNumber.innerText = `#${pokemon.id}`;
        pokemonName.innerText = `${pokemon.name}`;
        pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
        getPokemonTypes(pokemon);

        getEvolutionChain(pokemon);

        encounterText.innerText = await getLocationData(pokemon.id);
        abilitiesText.innerText = getPokemonAbilitiesList(pokemon.abilities);
        movesText.innerText = getPokemonMovesList(pokemon.moves);
    } else {
        pokemonInfoArea.classList.add("hidden");
        pokemonInfoArea.classList.remove("grid");

        getEvolutionChain(pokemon);

        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("flex");
        errorMessageText.innerText = errorMessageOutOfBounds;
    }
});

displayFavoritesBtn.addEventListener("click", () => {
    createFavoritesList();
});

getRandomPokemonBtn.addEventListener("click", async () => {
        toggleShinyBtn.src = "./assets/icons/shining.png";
        let randomId = Math.floor(Math.random() * 650);
        pokemon = await getPokemon(randomId);
        let favoritesListArr = getFromLocalStorage();
        if (!favoritesListArr.includes(pokemon.name)) {
            addToFavoritesBtn.classList.add("grayscale");
            addToFavoritesBtn.classList.add("opacity-50");
        } else {
            addToFavoritesBtn.classList.remove("grayscale");
            addToFavoritesBtn.classList.remove("opacity-50");
        }
        pokemonId = `${pokemon.id}`;
            pokemonInfoArea.classList.remove("hidden");
            pokemonInfoArea.classList.add("grid");
            errorMessage.classList.add("hidden");
            errorMessage.classList.remove("flex");
            idNumber.innerText = `#${pokemon.id}`;
            pokemonName.innerText = `${pokemon.name}`;
            pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
            getPokemonTypes(pokemon);
            getEvolutionChain(pokemon);
            encounterText.innerText = await getLocationData(pokemon.id);
            abilitiesText.innerText = getPokemonAbilitiesList(pokemon.abilities);
            movesText.innerText = getPokemonMovesList(pokemon.moves);
});

inputField.addEventListener("input", () => {
    userInput = inputField.value;
});

toggleShinyBtn.addEventListener("click", () => {
    
    if (toggleShinyBtn.src.includes("shining.png") && (userInput != "")) {
        toggleShinyBtn.src = "./assets/icons/shining_filled.png";
        toggleShinyBtn.classList.remove("opacity-50");
        pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_shiny}`;
    } else {
        toggleShinyBtn.src = "./assets/icons/shining.png";
        toggleShinyBtn.classList.add("opacity-50");
        pokemonSprite.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
    }
});

addToFavoritesBtn.addEventListener("click", () => {
    if (addToFavoritesBtn.classList.contains("grayscale") && (userInput != "")) {
        addToFavoritesBtn.classList.remove("grayscale");
        addToFavoritesBtn.classList.remove("opacity-50");
        saveToLocalStorage(pokemonName.innerText);
    } else {
        addToFavoritesBtn.classList.add("grayscale");
        addToFavoritesBtn.classList.add("opacity-50");
        removeFromLocalStorage(pokemonName.innerText);
        localStorageElementsCount--;
    }
});

// Api Calls
const getPokemon = async (nameOrId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    if(!response.ok) {
        return "error";
    }
    const data = await response.json();
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

onLoadDisplay("bulbasaur");