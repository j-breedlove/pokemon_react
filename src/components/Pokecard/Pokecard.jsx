import React from "react";
import "./Pokecard.css";

const Pokecard = ({ pokemon }) => {
  if (!pokemon) return null;
  return (
    <div>
      <div className={"pokecard"}>
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>EXP: {pokemon.exp}</p>
      </div>
    </div>
  );
};

export default Pokecard;
