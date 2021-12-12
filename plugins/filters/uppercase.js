import Vue from 'vue'

export default function uppercase (value) {
  if (!value) { return '' }
  value = value.toString()

  return value.toUpperCase()
}

Vue.filter('uppercase', uppercase)
