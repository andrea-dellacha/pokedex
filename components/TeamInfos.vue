<template>
  <div class="o-modal" @keydown.esc="closeTeamInfos">
    <draggable
      v-if="team.length > 0"
      class="dragArea teamInfos list-group"
      :list="team"
      @end="updateTeamPosition"
    >
      <TeamPokemonCard v-for="(pokemon, id) of team" :key="id" :pokemon="pokemon" />
    </draggable>
    <div v-else class="teamInfos">
      Your team is empty !
    </div>
    <div class="modal-backdrop" @click="closeTeamInfos" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TeamPokemonCard from '@/components/TeamPokemonCard.vue'
export default {
  name: 'TeamInfos',
  components: {
    TeamPokemonCard
  },
  data () {
    return {
      team: []
    }
  },
  computed: {
    ...mapGetters({
      pokemonTeam: 'team/getTeam'
    })
  },
  watch: {
    pokemonTeam () {
      this.team = JSON.parse(JSON.stringify(this.pokemonTeam))
    }
  },
  mounted() {
    this.team = JSON.parse(JSON.stringify(this.pokemonTeam))
    this.team.sort(this.comparePosition('position'))
  },
  methods: {
    comparePosition (key, order = 'asc') {
      return function innerSort (a, b) {
        // eslint-disable-next-line no-prototype-builtins
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    },
    updateTeamPosition () {
      this.$store.commit('team/updatePokemonTeam', this.team)
    },
    closeTeamInfos () {
      this.$emit('closeTeamInfos')
    }
  }
}
</script>

<style scoped>

.o-modal {
  position: fixed;
  top: 0vh;
  bottom: 0vh;
  left: 0vh;
  right: 0vh;
  z-index: 10;
}
.modal-backdrop {
  position: fixed;
  top: 0vh;
  bottom: 0vh;
  left: 0vh;
  right: 0vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
}

.teamInfos {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 56px;
  right: 0;
  background-color: #ee1515;
  padding: 10px;
  z-index: 100;
}

.m-product {
  width: 100%;
  margin: 1rem;
}

.m-productTile {
  display: flex;
  width: calc(100% - 2rem);
  align-items: center;
}

.m-productTile svg {
  min-width: 12px;
}

.a-title {
  width: 100%;
  max-width: max-content;
  white-space: nowrap;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
}

.a-line {
  background-color: var(--primary-light-color);
  height: 1px;
  margin: 1rem;
  width: 100%;
  flex-shrink: 2;
}

.m-productPrice {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-end;
  width: calc(100% - 2rem);
  margin: 1rem 0;
}

.m-productPrice div {
  width: fit-content;
  padding: 0 1rem;
}

.a-priceInfos {
  color: var(--font-light-color);
}

.m-total {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 5px solid var(--primary-light-color);
  margin: 1rem;
  padding-top: 1rem;
}

.a-total {
  margin-right: 5vw;
  font-weight: 500;
}

.a-price {
  font-weight: 700;
  color: var(--primary-color);
  margin-right: 1.25rem;
}

/* mobile */
@media all and (max-width: 475px)
{
  .teamInfos {
    top: calc(25px + 2rem);
  }
}
</style>
