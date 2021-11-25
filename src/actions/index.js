export const loadPokemons = payload => (
    {
        type: 'LOAD_POKEMONS',
        payload,
    });
export const selectPokemon = payload => (
    {
        type: 'SELECT_POKEMON',
        payload,
    });
export const orderHighestPokemon = payload => (
    {
            type: 'ORDER_POKEMON_HIGHEST',
            payload,
    });
export const orderAlphabeticallyPokemon = payload => (
    {
            type: 'ORDER_ALPHABETICALLY_A-Z',
            payload,
    });
export const orderAlphabeticallyPokemonBetweenZandA = payload => (
    {
            type: 'ORDER_ALPHABETICALLY_Z-A',
            payload,
    });
