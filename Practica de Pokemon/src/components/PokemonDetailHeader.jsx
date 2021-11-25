import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { selectPokemon } from '../actions';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import '../../assets/styles/components/PokemonDetailsHeader.scss';

function PokemonDetailHeader({ pokemonId }) {

  return (
    <section className="PokemonDetailHeader">
      <div className="PokemonDetailHeader__pagination">
        {pokemonId > 1 && (
          <NavLink
            className="PokemonDetailHeader__wrapper"
            to={`/pokemon/${pokemonId - 1}`}
          >
         
            <span className="icon icon_arrow_sm_left">
              <BsFillArrowLeftCircleFill />
            </span>
            <span className="PokemonDetailHeader__number">#{pokemonId - 1}</span>
            <span className="PokemonDetailHeader__name hidden-mobile">
              Previous Pokemon
            </span>
           
          </NavLink>
        )}

        <NavLink
          className="PokemonDetailHeader__wrapper"
          to={`/pokemon/${pokemonId + 1}`}
        >
          <span className="PokemonDetailHeader__number">#{pokemonId + 1}</span>
          <span className="pokemon__name hidden-mobile">Next Pokemon</span>
          <span className="icon icon_arrow_sm_right">
            <BsFillArrowRightCircleFill />
          </span>
        </NavLink>
      </div>
    </section>
  );
}

export default PokemonDetailHeader;
