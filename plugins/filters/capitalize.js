import Vue from 'vue'

export default function capitalize (value) {
  if (!value) { return '' }
  value = value.toString()

  return value.charAt(0).toUpperCase() + value.slice(1)
}

Vue.filter('capitalize', capitalize)
