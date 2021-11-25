import React, { useState, useEffect, useRef } from 'react';
import Pokemon from '../components/Pokemon'
import { useSelector,useDispatch } from 'react-redux';
import { getPokemonData } from '../pokemonapi';
import { loadPokemons,orderHighestPokemon,orderAlphabeticallyPokemon,orderAlphabeticallyPokemonBetweenZandA } from '../actions'
import ClipLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react";
import '../../assets/styles/App.scss';
import '../../assets/styles/components/Pokemons.scss';

function Pokemons() {
  //const [pokemons, setPokemons] = useState([]);
  const [morePokemons, setMorePokemons] = useState({limit:24,offset:0,order:"initial"});
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const NUMBER_POKEMONS= 898;

  
  
 const getPokemons = async () => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${morePokemons.limit}&offset=${morePokemons.offset}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};

const fetchPokemons  = async () => {
  setLoading(false);
  try {
    const data = await getPokemons();
    const promises = data.results.map(async (pokemon) => {
      return await getPokemonData(pokemon.url);
    });
    const results = await Promise.all(promises);
   
    switch (morePokemons.order) {
      case "initial":
        dispatch(loadPokemons(results))
        break;
      case "Highest":
        dispatch(orderHighestPokemon(results))
        break;
      case "Alphabetically":
        dispatch(orderAlphabeticallyPokemon({results:results,slice:morePokemons.slice}))
        break;
      case "AlphabeticallyBetweenZandA":
        dispatch(orderAlphabeticallyPokemonBetweenZandA({results:results,slice:morePokemons.slice}))
        break;
      default:
        break;
    }
    setLoading(true);

   
  } catch (error) {
    
  }
}

const handleLoadPokemon = () => {
  switch (morePokemons.order) {
    case "initial":
        setMorePokemons(prev => ({limit: prev.limit + 24,order:"initial"}))
      break;
    case "Highest":
        setMorePokemons(prev => ({limit:prev.limit + 24 ,offset:prev.offset - 24, order:"Highest"}))
      break;
    case "Alphabetically":
        setMorePokemons(prev => ({limit:898,offset:0,order:"Alphabetically", slice: prev.slice + 24}))
      break;
    case "AlphabeticallyBetweenZandA":
      setMorePokemons(prev => ({limit:898,offset:0,order:"AlphabeticallyBetweenZandA", slice: prev.slice + 24}))
      break;
    default:
      break;
  }
 
}

const handleRandomPokemon = async() => {
  setLoading(false);
  var randomPokemons = [];
  for (let index = 0; index <= 25; index++) {
      const number = randomintfrominterval(1,NUMBER_POKEMONS)
      let url = `https://pokeapi.co/api/v2/pokemon/${number}`
      randomPokemons[index] =  url; 
  }
  const promises = randomPokemons.map(async (url) => {
      return await getPokemonData(url);
    });

  const results = await Promise.all(promises);
    dispatch(loadPokemons(results))
  //dispatch(loadPokemons(randomPokemons));
  setLoading(true);
}

const randomintfrominterval = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

const handleFilterPokemon = async() => {
  switch (event.target.value) {
    case "Lowest Number":
      setMorePokemons(prev => ({limit:25,offset:0,order:"initial"}))
      break;
    case "Highest Number":
      setMorePokemons(prev => ({limit:24,offset:874,order:"Highest"}))
      break;
    case "A-Z":
      setMorePokemons(prev => ({limit:898,offset:0,order:"Alphabetically",slice:24}))
      break;
    case "Z-A":
      setMorePokemons(prev => ({limit:898,offset:0,order:"AlphabeticallyBetweenZandA",slice:24}))
    break;
    default:
      break;
  }
}
useEffect(async () => {
  fetchPokemons()
}, [morePokemons])

const pokemons = useSelector(state => state.pokemonData);

  return (
    <div className="pokemon">
      <div className="pokemon__buttons">
        <button className="pokemon__surprise" ref={selectRef} onClick={()=> handleRandomPokemon() }>Surprise Me</button>
        <select className="pokemon__select" onChange={()=> handleFilterPokemon()}>
          <option value="">-- Select --</option>
          <option value="Lowest Number">Lowest Number (First)</option>
          <option value="Highest Number">Highest Number (First)</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      
      <div className="pokemon__List">
      {
        loading ? (
          pokemons.map(pokemon => (
        <Pokemon key={pokemon.id} pokemon={pokemon}/>
        ))):
      ( <ClipLoader size={150}/>)
      }
      </div>
      <div className="pokemon__actions">
        <button className="pokemon__load" onClick={() => handleLoadPokemon()}>Load More Pokemon</button>
      </div>
      
      
    </div>
  );
}

export default Pokemons;
