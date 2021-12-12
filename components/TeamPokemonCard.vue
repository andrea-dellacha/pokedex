<template>
  <div class="cardPokemon">
    <div class="card__image">
      <img
        :id="`pokemon#${pokemon.id}`"
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
        :alt="pokemon.name"
      />
    </div>
    <div class="card__title">
      <div class="card__name">{{ pokemon.name | capitalize }}</div>
      <div class="card__id">
        #{{ pokemon.id | formatPokemonId }}
        <div class="card__hp">
          <div class="cardHP__bar" />
          <div class="cardHP__text">{{ `${pokemon.hp} / ${pokemon.hp}` }}</div>
        </div>
      </div>
    </div>
    <div class="card__delete" @click="deletePokemon()">
      <TrashIcon />
    </div>
  </div>
</template>

<script>
import TrashIcon from '@/assets/icon/trash.vue'
export default {
  name: 'PokemonCard',
  components: {
    TrashIcon
  },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePokemon () {
      this.$store.commit('team/deletePokemon', this.pokemon)
    }
  }
}
</script>

<style scoped>
.cardPokemon {
  width: 420px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 90px 290px 30px;
  align-items: center;
  padding: 5px;
  color: black;
  cursor: move;
}

.card__image, .card__id {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__image img {
  max-width: 80px;
  max-height: 80px;
}

.card__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  font-size: 24px;
  padding-right: 10px;
}

.card__name {
  white-space: nowrap;
}
.card__id {
  font-size: var(--font-size);
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 10px);
}

.card__hp {
  display: flex;
  align-items: center;
  gap: 2px;

}

.cardHP__bar {
  height: 8px;
  border-radius: 5px;
  width: 100px;
  background-color: var(--green-color);
}

.cardHP__text {
  width: 70px;
}

.card__delete {
  display: grid;
  place-items: center;
  height: 100%;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .card__title {
    font-size: 16px;
  }

  .cardPokemon {
    width: 250px;
    grid-template-columns: 30px 200px 20px;
  }

  .card__image img {
    max-width: 30px;
    max-height: 30px;
  }

  .cardHP__text {
    width: 55px;
  }

  .cardHP__bar {
    width: 75px;
  }

  .card__delete svg {
    width: 15px;
  }
}
</style>
