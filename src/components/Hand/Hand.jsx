import React from "react";
import Pokecard from "../Pokecard/Pokecard";

const Hand = ({ pokemons, isWinning }) => {
  const totalExperience = pokemons.reduce(
    (exp, pokemon) => exp + pokemon.exp,
    0,
  );
  return (
    <div className={"hand, container"}>
      {pokemons.map((pokemon, index) => (
        <Pokecard
          key={pokemon.id}
          style={{ "--card-order": index }}
          pokemon={pokemon}
        />
      ))}
      <div
        className={`total-experience-card ${isWinning ? "winning" : "losing"}`}
      >
        Total XP: {totalExperience}
        <br />
        <div>{isWinning ? " (Winning)" : " (Losing)"}</div>
      </div>
    </div>
  );
};

export default Hand;
