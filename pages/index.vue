<template>
  <div class="homePage">
    <input v-model="pokemonNameFilter" type="search" placeholder="Search by pokemon name (only loaded pokemons)">
    <div class="pokedex">
      <PokemonCardVue v-for="pokemon in pokemonsList" :key="pokemon.id" :pokemon="pokemon"/>
    </div>
    <div v-show="pokemonNameFilter === ''" class="loader" :class="pokemonsQuantity === 649 ? '-end' : null">
      <div class="loader__pokeball -duck1" />
      <div class="loader__pokeball -duck2" />
      <div class="loader__pokeball" />
      <div class="loader__pikachu" />
      <div class="loader__ash" />
      <div v-show="pokemonsQuantity === 649" class="loader__chen" />
    </div>
    <div v-show="pokemonNameFilter === ''" class="pagination__msg">
      <div v-if="pokemonsQuantity === 649">
        Pokédex end...
      </div>
      <div v-else class="loadMore">
        <LoadMoreIcon />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LoadMoreIcon from '@/assets/icon/loadMore-icon.vue'
import PokemonCardVue from "@/components/PokemonCard.vue"

export default {
  name: 'Index',
  components: {
    PokemonCardVue,
    LoadMoreIcon
  },
  layout: 'default',
  data () {
    return {
      pokemonsList: [],
      pokemonNameFilter: '',
      apiOffset: 0
    }
  },
  computed: {
    ...mapGetters({
      pokemons: 'pokemon/getPokemons',
      pokemonsQuantity: 'pokemon/getPokemonsQuantity'
    })
  },
  watch: {
    pokemons () {
      this.pokemonNameFilter = ''
      this.pokemonsList = JSON.parse(JSON.stringify(this.pokemons))
    },
    pokemonNameFilter () {
      const tempList = JSON.parse(JSON.stringify(this.pokemons))
      this.pokemonsList = tempList.filter(e => e.name.toLowerCase().includes(this.pokemonNameFilter.toLowerCase()))
    }
  },
  beforeMount () {
    this.$store.dispatch('pokemon/fetchPokemons', { limit: 100, offset: this.apiOffset })
  },
  mounted () {
    this.fetchNextPokemons()
  },
  methods: {
    fetchNextPokemons() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        /* Load more Pokemons if:
              - User scroll to the end of the page
              - All available pokemons are not load yet
              - No filters are applied
        */
        if (bottomOfWindow && this.pokemonsQuantity < 649 && this.pokemonNameFilter === '') {
          let limit = 100
          this.apiOffset === 500 ? limit = 49 : limit = 100
          this.apiOffset += 100
          this.$store.dispatch('pokemon/fetchPokemons', { limit, offset: this.apiOffset })
        }
      }
    }
  }
}
</script>

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
}
.pokedex {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.loader.-end {
  margin-left: -120px;
}

.pagination__msg {
  font-size: var(--font-size-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loadMore {
  width: 50px;
  transform: rotate(90deg);
  margin-top: 15px;
}
</style>
