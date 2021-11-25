import React,{ useState, useEffect, useRef } from 'react'
import { useLocation,useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { BsGenderMale,BsGenderFemale } from 'react-icons/bs';
import PokemonDetailHeader from './PokemonDetailHeader';
import PokemonEvolutions from './PokemonEvolutions';
import { getPokemonData } from '../pokemonapi';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import '../../assets/styles/App.scss';
import '../../assets/styles/components/PokemonDetails.scss'
import '../../assets/styles/components/PokemonEvolution.scss'


function PokemonDetails() {
    const params = useParams();
  
    //let data = useSelector(state => state.pokemonSelected);
    
    const [caracteristicsPokemon, setCaracteristicsPokemon] = useState({specie:"",evolution_chain:[]});
    const [pokemon, setPokemon] = useState(null); 
    const names = [];
    const stats = [];

    const dataStats = {
        labels: ['HP','Attack','Defense','Special Attack','Special Defense','Speed'],
        datasets:[{
            label:'Points',
            backgroundColor:'#30A7D7',
            borderColor:'black',
            borderWidth:1,
            hoverBackgroundColor: 'rgba(0,255,0,0.2)',
            hoverBorderColor: '#FF000',
            data: caracteristicsPokemon.stats
        }]
    };
    const options = {
        maintainAspectRadio: false,
        responsive:true
    };

    function getEvolutionNames(list) {
        list.forEach((item) => {
            names.push(item.species.name)
            if(item.evolves_to.length) {
                getEvolutionNames(item.evolves_to);
            }
        });
    }
    function getStats(list) {
        list.forEach((item) => {
            stats.push(item.base_stat)
        })
    }

    useEffect(async () => {
        // IF THE STORE IS EMPTY
        const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
        const response = await getPokemonData(url);
        setPokemon(response);
       
      
    }, [params.id])


    useEffect(async () => {
        if (!pokemon) {
            return null;
        }
        //Get the caracteristics of pokemon like Specie, evolution and save in array the evolution names and stats
       const dataPokemonSpecies = await getPokemonData(pokemon.species.url)
       const dataPokemonEvolution = await getPokemonData(dataPokemonSpecies.evolution_chain.url)
       const chain = [dataPokemonEvolution.chain];
       getEvolutionNames(chain);
       getStats(pokemon.stats);
       setCaracteristicsPokemon({specie:dataPokemonSpecies.flavor_text_entries[0].flavor_text,evolution_chain:names,stats:stats});
      
    }, [pokemon])

   if(!pokemon) {
        return null;
   }
    
    return (
        <>
        <PokemonDetailHeader pokemonId={pokemon.id} />
        <section className="pokemonDetails">
            <div className="pokemonDetails__title">
                <span className="pokemonDetails__name">{pokemon.name}</span>
                <span className="pokemonDetails__id">#{pokemon.id}</span>
            </div>

            <div className="pokemonDetails__details">
                <div className="pokemonDetails__left">
                    <figure>
                    <img className="pokemonDetails__photo" src={ `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg` }  />
                    </figure>
                    <div className="pokemonDetails__stats">
                        <Bar data={dataStats} options={options} />
                    </div>
                 </div>
                 <div className="pokemonDetails__right">
                        <div className="pokemonDetails__description">
                            {caracteristicsPokemon.specie}
                        </div>
                        <div className="pokemonDetails__versions">

                        </div>
                    <div className="pokemonDetails__info">
                            <div className="pokemonDetails__info-group">
                                <span className="pokemonDetails__info-title">Height:</span>
                                <span className="pokemonDetails__info-text">{pokemon.height}</span>
                            </div>
                            <div className="pokemonDetails__info-group">
                                <span className="pokemonDetails__info-title">Habitat:</span>
                                <span className="pokemonDetails__info-text">...</span>
                            </div>
                            <div className="pokemonDetails__info-group">
                                <span className="pokemonDetails__info-title">Weight:</span>
                                <span className="pokemonDetails__info-text">{pokemon.weight}</span>
                            </div>
                            <div className="pokemonDetails__info-group">
                                <span className="pokemonDetails__info-title">Abilities:</span>
                                <span className="pokemonDetails__info-text">{pokemon.abilities[0].ability.name}</span>
                            </div>
                            <div className="pokemonDetails__info-group">
                                <span className="pokemonDetails__info-title">Gender:</span>
                                <span className="pokemonDetails__info-text"><BsGenderMale /><BsGenderFemale /></span>
                            </div>
                        </div>
                        <span className="pokemonDetails__titleType">Type</span>
                        <div className="pokeDetails__abilities">
                        {pokemon.types.map(gtype => (
                            <div className="pokemon__abilitie">
                                <span className={`pokemonDetails__type--${gtype.type.name}`}>{gtype.type.name}</span>
                            </div>
                        ))}
                        </div>    
                        <div className="pokeDetails__weakneses">
                        </div>
                 </div>     
            </div>
        </section>
        <section className="pokemonEvolution">
        {caracteristicsPokemon.evolution_chain.map(pokemon => (
            <PokemonEvolutions pokemon={pokemon} key={pokemon.name} />
        ))}
        </section>
        
        </>
    )
}

export default PokemonDetails
