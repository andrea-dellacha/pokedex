<template>
  <div class="cardPokemon" @click="$router.push(`/${pokemon.id}`)">
    <div class="card__image">
      <img
        :id="`pokemon#${pokemon.id}`"
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
        :alt="pokemon.name"
      />
    </div>
    <div class="card__title">
      {{ pokemon.name | capitalize }}
    </div>
    <div class="card__id">
      {{ pokemon.id | formatPokemonId }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>
.cardPokemon {
  height: 300px;
  width: 200px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  display: grid;
  grid-template-rows: 200px 40px 40px;
  padding: 10px;
}

.card__image, .card__id, .card__title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__image img {
  max-width: 180px;
  max-height: 180px;
}

.card__title {
  font-size: 24px;
}

/* Media queries*/
@media screen and (max-width: 600px) {
  .cardPokemon {
    height: 150px;
    width: 100px;
    grid-template-rows: 100px 20px 20px;
    font-size: var(--font-size);
  }

  .card__image img{
    max-width: 90px;
    max-height: 90px;
  }

  .card__title {
    font-size: 16px;
  }
}
</style>
