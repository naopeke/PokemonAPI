// client side

class Pokemon {
    constructor(id, image, name, types, abilities){
        this.id = id;
        this.image = image;
        this.name = name;
        this.types = types;
        this.abilities = abilities;
    }
}

const loadPokemon = async () => {
    try {
        const pokemonInput = document.getElementById('input').value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;
        const param = {
            headers:{'content-type': 'application/json; charset=UTF-8'},
            method: 'GET'
        }
        const response = await axios.get(url);
        
        const pokemonData = response.data;
        const { id, name, types, abilities, sprites } = pokemonData;
        const image = sprites.front_default;

        const pokemonHTML = `
            <div class="card" id="card">
                <img class="pokemonImage" src="${image}" alt="Pokemon Image">
                <div class="hidden">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td id="pokemonId">#${id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Name</th>
                                <td id="pokemonName">${name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Type</th>
                                <td id="pokemonType">${types.map(type => type.type.name).join(', ')}</td>
                            </tr>
                            <tr>
                                <th scope="row">Ability</th>
                                <td id="pokemonAbilities">${abilities.map(ability => ability.ability.name).join(', ')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        const pokemonContainer = document.getElementById('pokemonContainer');
        pokemonContainer.innerHTML = pokemonHTML;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('pokemonForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('input').value.toLowerCase();
    loadPokemon(input);
});