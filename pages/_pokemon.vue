<template>
  <div class="pokemon__section">
    <div v-if="pokemon.name">
      <div class="background__texte">#{{ pokemon.id | formatPokemonId }}</div>
      <div class="pokemon__name">
        <div class="pokemon__title">
          {{ pokemon.name | uppercase }}
          <button class="btn__circle" @click="addPokemonToTeam">
            <PlusIcon color="#828282" />
            <div class="tooltip">Add to the team</div>
          </button>
        </div>
        <div class="pokemon__types">
          <div
            v-for="(type, idType) of pokemon.types"
            :key="idType"
            class="pokemon__type"
            :class="`-${type.type.name}`"
          >
            {{ type.type.name | capitalize }}
          </div>
        </div>
      </div>
      <div class="pokemon__infos">
        <div class="description">
          <div class="pokemon__mesure">
            Height: {{ pokemon.height | dividedBy10 }}m
          </div>
          <div class="pokemon__mesure">
            Weight: {{ pokemon.weight | dividedBy10 }}kg
          </div>
          <div class="pokemon__ability">
            Ability:
            <ul class="list">
              <li
                v-for="(ability, idAbility) of pokemon.abilities"
                :key="idAbility"
              >
                {{ ability.ability.name }}
              </li>
            </ul>
          </div>
        </div>
        <div
          class="stats"
          :class="pokemon.types ? `-${pokemon.types[0].type.name}` : null"
        >
          <div
            v-for="(stat, idStat) of pokemon.stats"
            :key="idStat"
            class="stats__line"
          >
            {{ stat.stat.name }}
            <div class="stats__progress">
              <div
                class="statsProgress__bar"
                :style="`width: calc((${stat.base_stat} * 100%) / 255 )`"
                :class="`-${pokemon.types[0].type.name}`"
              />
            </div>
            {{ stat.base_stat }}
          </div>
        </div>
        <div class="image">
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
          />
        </div>
      </div>
    </div>
    <div v-else class="loader" >
      <div class="loader__pokeball -duck1" />
      <div class="loader__pokeball -duck2" />
      <div class="loader__pokeball" />
      <div class="loader__pikachu" />
      <div class="loader__ash" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import PlusIcon from '@/assets/icon/plus-icon'

export default {
  name: 'Index',
  components: {
    PlusIcon,
  },
  layout: 'default',
  data() {
    return {
      pokemon: {},
    }
  },
  computed: {
    ...mapGetters({
      pokedexApi: 'pokemon/getApi',
    }),
  },
  async beforeMount() {
    await this.fetchPokemonInfos()
  },
  methods: {
    fetchPokemonInfos() {
      return this.$axios
        .$get(this.pokedexApi + 'pokemon/' + this.$route.params.pokemon)
        .then((Response) => {
          const res = Response
          this.pokemon = res
          // update background color
          const color = this.updataBgColor(res.types[0])
          document.getElementsByClassName(
            'pokemon__section'
          )[0].style.backgroundColor = color
        })
        .catch((err) => {
          this.$store.commit('error/setError', { title: 'Attention', criticality: 1, message: `An error appened: ${err}` })
        })
    },
    updataBgColor(type) {
      switch (type.type.name) {
        case 'fire':
          return '#EFD3BA'
        case 'water':
          return '#BCD9D8'
        case 'grass':
          return '#C4E4D5'
        case 'electric':
          return 'rgba(249, 190, 0, 0.4)'
        case 'ground':
          return 'rgba(167, 112, 44, 0.5)'
        case 'fairy':
          return 'rgba(151, 23, 68, 0.5)'
        case 'poison':
          return 'rgba(91, 46, 136, 0.6)'
        case 'bug':
          return 'rgba(40, 106, 62, 0.5)'
        case 'dragon':
          return 'rgba(69, 139, 145, 0.6)'
        case 'psychic':
          return 'rgba(171, 40, 104, 0.4)'
        case 'flying':
          return 'rgba(73, 103, 127, 0.7)'
        case 'fighting':
          return 'rgba(155, 60, 42, 0.5)'
        default:
          return 'rgba(0, 0, 0, 0.4)'
      }
    },
    addPokemonToTeam() {
      this.$store.dispatch('team/addPokemon', this.pokemon)
    },
  },
}
</script>

<style scoped>
.pokemon__section {
  font-size: 22px;
  color: white;
  height: calc(90vh - 70px);
  width: 90vw;
}

.pokemon__title {
  display: flex;
  gap: 20px;
  width: min-content;
}

.pokemon__name {
  font-size: 10vw;
  margin-bottom: 3vh;
}
.pokemon__infos {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.image {
  width: calc(80vw - 620px);
  min-width: 400px;
  max-height: 55vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: -10vw;
}
.image img {
  width: 80%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
}

.background__texte {
  position: absolute;
  right: 5vw;
  bottom: 5vh;
  font-size: 17vw;
  color: rgba(255, 255, 255, 0.5);
  line-height: 17vw;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stats__line {
  display: grid;
  align-items: center;
  grid-template-columns: 160px auto 40px;
  grid-template-rows: 2em;
  column-gap: 1em;
}
.stats__progress {
  width: 300px;
  height: 10px;
  background-color: whitesmoke;
}

.statsProgress__bar {
  height: 10px;
  background-color: black;
}

.pokemon__types {
  display: flex;
  gap: 10px;
}

.pokemon__mesure {
  color: white;
}

.stats {
  border-left: 2px solid;
  padding-left: 5px;
  background-color: unset !important;
}
/* Button */
.btn__circle {
  border: 2px solid #828282;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  background-color: black;
  color: white;
  left: calc(100% + 7px);
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  font-size: 8px;
  width: max-content;
}

.tooltip::after {
  content: ' ';
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -3px;
  border-width: 3px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.btn__circle:hover .tooltip {
  visibility: visible;
}
/* class for pokemon type */
.pokemon__type {
  width: max-content;
  padding: 0.5em;
  font-size: var(--font-size);
  border-radius: 16px;
  color: white;
  background-color: black;
}
.-water {
  --color: #2250cb;
  background-color: var(--color);
  border-color: var(--color);
}
.-fire {
  background-color: #b71d25;
}
.-grass {
  background-color: #0a8233;
}
.-electric {
  --color: #f9be00;
  background-color: var(--color);
  border-color: var(--color);
}
.-bug {
  background-color: #1b4b2b;
}
.-dragon {
  background-color: #458b91;
}
.-dark {
  background-color: #03070a;
}
.-fairy {
  background-color: #971744;
}
.-fighting {
  background-color: #9b3c2a;
}
.-flying {
  background-color: #49677f;
}
.-ground {
  background-color: #a7702c;
}
.-rock {
  background-color: #697a74;
}
.-poison {
  background-color: #5b2e88;
}
.-psychic {
  background-color: #ab2868;
}

/* Media queries*/
@media screen and (max-width: 1300px) {
  .image {
    margin-top: 5vh;
  }
}

@media screen and (max-width: 600px) {
  .pokemon__section {
    font-size: 14px;
  }

  .stats__progress {
    width: 150px;
  }
  .stats__line {
    grid-template-columns: 100px auto 40px;
    column-gap: 5px;
  }

  .stats {
    border-left: none;
    padding-left: none;
  }

  .image {
    width: 80%;
    min-width: unset;
  }

  .background__texte {
    bottom: unset;
    top: 50px;
  }

  .btn__circle {
    scale: 0.75;
    transform-origin: top left;
  }

  .pokemon__title {
    gap: 5px;
  }
}
</style>
