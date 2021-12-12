<template>
  <div class="l-lightMode">
    <Header />
    <nuxt class="main__section" />
    <ErrorModal />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ErrorModal from '@/components/errors-modal.vue'
/**
 * @vuese
 * I'm the white layout
 */
export default {
  name: 'Default',
  components: {
    Header,
    ErrorModal
  }
}
</script>

<style lang="css">
</style>
