export const getPokemons = async (limit = 25, offset = 0) => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${morePokemons.limit}&offset=${offset}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {}
  };
  
  export const getPokemonData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {}
  };