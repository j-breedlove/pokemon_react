import React from "react";
import Pokecard from "../Pokecard/Pokecard";

const Hand = ({ pokemons }) => {
  const totalExperience = pokemons.reduce(
    (exp, pokemon) => exp + pokemon.exp,
    0,
  );
  return (
    <div>
      {pokemons.map((pokemon) => (
        <Pokecard key={pokemon.id} pokemon={pokemon} />
      ))}
      <div>Total Experience: {totalExperience}</div>
    </div>
  );
};

export default Hand;
