import React from 'react';
import typeColors from './typeColors';
import './cardComponent.css';

function CardPokemon({ pokemonStatProp, id }) {
  let listStat = [];
  listStat = pokemonStatProp[id];

  let imageURL = listStat[1];
  let name = listStat[0];
  let type = listStat[5];
  let weight = listStat[2];
  let height = listStat[3];
  let abilities = listStat[4];

  return (
    <div className="DisplaySection2">
      <img src={imageURL} style={{ backgroundColor: typeColors[type] }} />
      <h1>
        {name}
      </h1>
    </div>
  );
}

export default CardPokemon;

