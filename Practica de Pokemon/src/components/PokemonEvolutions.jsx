import React from 'react'

function PokemonEvolutions({pokemon}) {

    return (
        <>
        <div className="pokemonEvolutionCard">
            <figure className="pokemonEvolutionCard__photo">
                <img src={`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`} className="pokemonEvolutionCard__img" />
            </figure>
            <div className="pokemonEvolutionCard__details">
                <span className="pokemonEvolutionCard__name">{pokemon}</span>
                
            </div>
            <div className="pokeDetails__abilities">

            </div>
        </div> 
        
    </>
    )
}

export default PokemonEvolutions
