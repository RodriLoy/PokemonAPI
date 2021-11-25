import React from 'react'
import { Link , NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { selectPokemon } from '../actions'

function Pokemon({pokemon}) {
    
    //const navigate = useNavigate();
    //const dispatch = useDispatch();

    /*function handleClickPokemon(pokemonId,pokemonName) {
        dispatch(selectPokemon(pokemonId))
        navigate(`/pokemon/${pokemonName}`)
    }*/

    return (
        <div className="pokemon__card">
            <NavLink to={`/pokemon/${pokemon.name}`}>
                <figure className="pokemon__image">
                    <img className="pokemon__photo" src={ `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg` }  />
                </figure>
            </NavLink>
            <div className="pokemon__info">
                <p className="pokemon__id">
                    <span className="pokemon__number-prefix">#</span>{ pokemon.id }
                </p>
                <h5>{ pokemon.name }</h5>
                {pokemon.types.map(gtype => (
                    <div className="pokemon__abilities">
                        <span className={`pokemon__type--${gtype.type.name}`}>{gtype.type.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pokemon
