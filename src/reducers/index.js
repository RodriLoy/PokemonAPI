const reducer = (state, action) => {
    switch (action.type) {
      case 'LOAD_POKEMONS':
          return {
              ...state,
              pokemonData: [...action.payload]
          }
      case 'SELECT_POKEMON':
            return {
                ...state,
                pokemonSelected: state.pokemonData.find(pokemon => pokemon.id === Number(action.payload))
            }
      case 'ORDER_POKEMON_HIGHEST':
            return {
                ...state,
                pokemonData: [...action.payload.sort((a, b) => Number(b.id) - Number(a.id))]
            }
      case 'ORDER_ALPHABETICALLY_A-Z':
            return {
                ...state,
                pokemonData: [...action.payload.results.sort((a, b) => a.name.localeCompare(b.name)).slice(1,action.payload.slice)]
            }
      case 'ORDER_ALPHABETICALLY_Z-A':
            return {
                ...state,
                pokemonData: [...action.payload.results.sort((a, b) => b.name.localeCompare(a.name)).slice(1,action.payload.slice)]
            }
      default:
           return state;
    }
 
  
  }
  
  export default reducer