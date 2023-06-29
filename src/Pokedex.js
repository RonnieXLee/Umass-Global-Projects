import React from "react";
import Pokecard from "./Pokecard";
import "./Pokedex.css";

function Pokedex({ exp, isWinner, pokemon }) {
  const winMessage = isWinner ? <p className="Pokedex-winner">THIS HAND WINS!</p> : null;

  const renderPokemonCards = () => {
    return pokemon.map((p) => (
      <Pokecard
        key={p.id}
        id={p.id}
        name={p.name}
        type={p.type}
        exp={p.base_experience}
      />
    ));
  };

  return (
    <div className="Pokedex">
      <h2 className="Pokedex-title">Pokedex</h2>
      <div className="Pokedex-cards">{renderPokemonCards()}</div>
      <h4>Total experience: {exp}</h4>
      {winMessage}
    </div>
  );
}

export default Pokedex;
