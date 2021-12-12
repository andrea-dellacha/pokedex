<template>
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="10.5" x2="10.5" y2="21" :stroke="color" stroke-width="3" />
    <line x1="21" y1="10.5" y2="10.5" :stroke="color" stroke-width="3" />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black'
    }
  }
}
</script>
