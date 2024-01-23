// sin axis.js
class Pokemon {
    constructor(id, image, name, types, abilities){
        this.id = id;
        this.image = image;
        this.name = name;
        this.types = types;
        this.abilities = abilities;
    }
}

const form = document.getElementById('pokemonForm');
form.addEventListener('submit', getPokemon);

async function getPokemon(e){
    // to prevent the default reload
    e.preventDefault();

    var pokemonInput = document.getElementById('input').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    const param = {
        headers:{'content-type': 'application/json; charset=UTF-8'},
        method: 'GET'
    }

    try {
        let data = await fetch(url, param);
        let result = await data.json();

        let pokemon = new Pokemon(
            result.id,
            result.sprites.front_shiny,
            result.name,
            result.types.map((type) => type.type.name),
            result.abilities.map((ability) => ability.ability.name)
        );

        displayPokemon(pokemon);

    } catch (error){
        console.error(error);
    }
}


function displayPokemon(pokemon){
    document.getElementById('pokemonId').textContent = `#${pokemon.id}`;
    document.getElementById('pokemonImage').src = `${pokemon.image}`;
    document.getElementById('pokemonName').textContent = `${pokemon.name}`;
    document.getElementById('pokemonType').textContent = `${pokemon.types.join(', ')}`;
    document.getElementById('pokemonAbilities').textContent = `${pokemon.abilities.join(', ')}`;
    // document.getElementById('effectEntries').textContent = `${pokemon.effectEntries}`
}



// function fetchPokemon(pokemonName) {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//         .then(response => response.json())
//         .then(data => {
//             // データをHTMLに表示する処理
//         })
//         .catch(error => console.error('Error:', error));
// }
