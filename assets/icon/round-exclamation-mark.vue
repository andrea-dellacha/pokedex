<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9999 36.6668C29.2047 36.6668 36.6666 29.2049 36.6666 20.0002C36.6666 10.7954 29.2047 3.3335 19.9999 3.3335C10.7952 3.3335 3.33325 10.7954 3.33325 20.0002C3.33325 29.2049 10.7952 36.6668 19.9999 36.6668Z"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 13.3335V20.0002"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 26.6665H20.0167"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#FF0303'
    }
  }
}
</script>
