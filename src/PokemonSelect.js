import React, { useState } from "react";
import pokemonList from "./pokemonList";
import { formatPokemon, choice } from "./helpers";

/* Select element to choose from common pokemon. */
function PokemonSelect({ add, pokemon = pokemonList }) {
  const [pokeIdx, setPokeIdx] = useState(0);

  const handleChange = (evt) => {
    setPokeIdx(evt.target.value);
  };

  const handleCatchOne = () => {
    add(formatPokemon, pokemon[pokeIdx]);
  };

  const handleFeelingLucky = () => {
    const randomPokemon = choice(pokemon);
    add(formatPokemon, randomPokemon);
  };

  return (
    <div>
      <select onChange={handleChange} value={pokeIdx}>
        {pokemon.map((p, idx) => (
          <option key={idx} value={idx}>
            {p}
          </option>
        ))}
      </select>
      <button onClick={handleCatchOne}>Catch one!</button>
      <button onClick={handleFeelingLucky}>I'm feeling lucky</button>
    </div>
  );
}

export default PokemonSelect;
