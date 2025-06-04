import { useEffect } from "react";
import { useState } from "react";

function useFetchCards() {
    const [pokemonCard, setPokemonCard] = useState([]);

    const pokemonList = [
        "kabuto", "charmander", "charizard", "squirtle",
        "blastoise", "bulbasaur", "venusaur", "rattata",
        "pikachu", "magneton", "alakazam", "spearow"
    ];

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
                const data = await response.json();
                const selectedPokemon = data.results.filter(char => pokemonList.includes(char.name));

                const pokemonData = await Promise.all(
                    selectedPokemon.map(async (pokemon) => {
                        const response = await fetch(pokemon.url);
                        const pokemonDetail = await response.json();
                        return {
                            id: pokemonDetail.id,
                            name: pokemonDetail.name,
                            image: pokemonDetail.sprites.other['official-artwork'].front_default
                        };
                    })
                );

                setPokemonCard(pokemonData);

            } catch (error) {
                console.log("error fetching pokémon data:", error);

            }
        }
        fetchPokemon();

    }, []);
    return pokemonCard;
}

export default useFetchCards