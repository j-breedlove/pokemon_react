import React from "react";
import "./Pokedex.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Pokecard from "../Pokecard/Pokecard";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async (id) => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        );
        const formattedID = String(id).padStart(3, "0");
        const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedID}.png`;
        return {
          name: response.data.name,
          exp: response.data.base_experience,
          id: response.data.id,
          image: imageUrl,
        };
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        return null; // or a default/fallback object
      }
    };

    // Fetch details for Pokémon IDs from 1 to 10 as an example
    const fetchPokemons = async () => {
      const pokemons = [];
      for (let id = 1; id <= 150; id++) {
        const pokemon = await fetchPokemonDetails(id);
        if (pokemon) pokemons.push(pokemon);
      }

      shuffleArray(pokemons);
      setPokemonList(pokemons);
    };

    fetchPokemons().then(() => {
      shuffleArray(pokemonList);
    });
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      // Swap elements array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(pokemonList);
  const randomDeck = pokemonList.slice(0, 4);

  return (
    <div className={"pokedex"}>
      <h1>Pokedex</h1>
      {randomDeck.length > 0 &&
        randomDeck.map((pokemons) => (
          <Pokecard key={pokemons.id} pokemon={pokemons} />
        ))}
    </div>
  );
};

export default Pokedex;
