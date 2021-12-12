<template>
  <div class="o-header">
    <div class="m-header">
      <NuxtLink to="/">
        <Pokeball />
      </NuxtLink>
    </div>
    <NuxtLink to="/">
      <div class="m-header -title">
        Pokédex
      </div>
    </NuxtLink>
    <div class="m-header -team" @click="isTeamOpen = !isTeamOpen">
      <div class="team__section">
        <div>
          Team
        </div>
        <div class="team__quantity">
          {{ teamLength }}
        </div>
      </div>
    </div>
    <TeamInfos v-show="isTeamOpen" @closeTeamInfos="isTeamOpen = !isTeamOpen" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Pokeball from '@/assets/icon/pokeball'
import TeamInfos from '@/components/TeamInfos'
export default {
  name: 'Header',
  components: {
    TeamInfos,
    Pokeball
  },
  data () {
    return {
      isTeamOpen: false
    }
  },
  computed: {
    ...mapGetters({
      teamLength: 'team/getTeamQuantity'
    })
  }
}
</script>

<style scoped>
.o-header {
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-bottom: 5px solid var(--black-pokeball);
  background-color: var(--red-pokeball);
  height: 65px;
  color: white;
}

.m-header {
  padding: 5px;
}

.m-header.-team {
  background-color: var(--red-pokeball);
  z-index: 100;
  position: relative;
}

.m-header.-title {
  font-size: var(--font-size-xl);
}

.team__section {
  display: flex;
  align-items: center;
  border-left: 1px solid var(--black-pokeball);
  gap: 1.3rem;
  padding: 0 1.3rem;
  font-size: var(--font-size);
}

.m-header.-team:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.team__quantity {
  background-color: var(--black-pokeball);
  display: grid;
  place-items: center;
  border-radius: 50%;
  height: 2.25rem;
  aspect-ratio: 1;
}

/* Team Modal */
.dragArea {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
