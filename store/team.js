import Vue from 'vue'
export const state = () => ({
  team: []
})

export const getters = {
  getTeam: state => state.team,
  getTeamQuantity: state => state.team.length
}

export const mutations = {
  addPokemonToTeam (state, item) {
    const pokemon = {}
    Vue.set(pokemon, 'name', item.name)
    Vue.set(pokemon, 'id', item.id)
    Vue.set(pokemon, 'hp', item.stats.filter(stat => stat.stat.name === 'hp')[0].base_stat)
    Vue.set(pokemon, 'position', state.team.length + 1)
    state.team.push(pokemon)
    this.commit('error/setError', { title: 'Confirmed', criticality: 2, message: `${pokemon.name} has been added to your team` })
  },
  updatePokemonTeam (state, team) {
    state.team = team
  },
  deletePokemon (state, pokemon) {
    const pokemonIndex = state.team.findIndex(item => item.position === pokemon.position)
    state.team.splice(pokemonIndex, 1)
  }
}

export const actions = {
  addPokemon ({ state, commit }, pokemon) {
    if (state.team.length < 6 && pokemon) {
      commit('addPokemonToTeam', pokemon)
    } else {
      this.commit('error/setError', { title: 'Watch out !', criticality: 1, message: 'You can\'t add more than 6 pokemons to your team' })
    }
    
  },
  updatePokemonTeam ( {state, commit}, team) {
    let position = 1
    team.forEach(element => {
      element.position = position
      position += 1
    });
  }
}
