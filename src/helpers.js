import { v4 as uuidv4 } from 'uuid';

function choice(values) {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}

function formatCard(data) {
  return {
    image: data.cards[0].image,
    id: uuidv4()
  };
}

function formatPokemon(data) {
  return {
    id: uuidv4(),
    front: data.sprites.front_default,
    back: data.sprites.back_default,
    name: data.name,
    stats: data.stats.map(stat => ({
      value: stat.base_stat,
      name: stat.stat.name
    }))
  };
}

export { choice, formatCard, formatPokemon };
