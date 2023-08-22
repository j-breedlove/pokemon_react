import React, { useState, useEffect } from "react";
import axios from "axios";
import Hand from "../Hand/Hand";
import { logDOM } from "@testing-library/react"; // Make sure to have this component created as outlined earlier

const Game = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [hand1, setHand1] = useState([]);
  const [hand2, setHand2] = useState([]);

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

    const fetchPokemons = async () => {
      const pokemons = [];
      // Fetch details for a larger range, e.g., 1 to 30, so you have a bigger pool for randomness
      for (let id = 1; id <= 250; id++) {
        const pokemon = await fetchPokemonDetails(id);
        if (pokemon) pokemons.push(pokemon);
      }

      return pokemons;
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    fetchPokemons().then((fetchedPokemons) => {
      shuffleArray(fetchedPokemons);
      setPokemonList(fetchedPokemons);
      setHand1(fetchedPokemons.slice(0, 4));
      setHand2(fetchedPokemons.slice(4, 8));
    });
  }, []);

  const totalExp = (hand) => {
    return hand.reduce((sum, pokemon) => sum + pokemon.exp, 0);
  };

  const winner =
    totalExp(hand1) > totalExp(hand2) ? "Hand 1 Wins!" : "Hand 2 Wins!";

  console.log("Hand 1 Length:", hand1.length);
  console.log("Hand 1 Draws: ", hand1);
  console.log("Hand 2 Length:", hand2.length);
  console.log("Hand 2 Draws: ", hand2);
  return (
    <div>
      <Hand pokemons={hand1} />
      <Hand pokemons={hand2} />
      <h1>{winner}</h1>
    </div>
  );
};

export default Game;
