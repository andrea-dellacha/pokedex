import Vue from 'vue'

export default function dividedBy10 (value) {
  if (value && typeof value === 'number') {
    return value / 10
  } else {
    return 0
  }
}

Vue.filter('dividedBy10', dividedBy10)
