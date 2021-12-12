export const state = () => ({
  pokemons: [],
  apiPokedex: 'https://pokeapi.co/api/v2/'
})

export const getters = {
  getPokemons: state => state.pokemons,
  getPokemonsQuantity: state => state.pokemons.length,
  getApi: state => state.apiPokedex
}

export const mutations = {
  setPokemons (state, pokemonsList) {
    state.pokemons = pokemonsList
  }
}

export const actions = {
  fetchPokemons ({ state, commit }, data) {
    return this.$axios.$get(`${state.apiPokedex}pokemon?limit=${data.limit}&offset=${data.offset}`)
      .then((Response) => {
        const res = Response.results.map(pokemon => ({ name: pokemon.name, id: pokemon.url.split('/')[6]}))
        if (data.offset > 0) {
          commit('setPokemons', state.pokemons.concat(res))
        } else {
          commit('setPokemons', res)
        }
      })
      .catch((err) => {
        this.commit('error/setError', { title: 'Error', criticality: 1, message: `An error appened: \n${err}` })
      })
  }
}
