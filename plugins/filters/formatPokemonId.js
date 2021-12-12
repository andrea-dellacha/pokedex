import Vue from 'vue'

export default function formatPokemonId (value) {
  if (value) {
    switch (value.toString().length) {
      case 1:
        return `00${value}`
      case 2:
        return `0${value}`
      case 3:
        return `${value}`
    }
  }  
}

Vue.filter('formatPokemonId', formatPokemonId)
