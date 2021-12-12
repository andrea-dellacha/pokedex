
export const state = () => ({
  error: {}
})

export const getters = {
  getError: state => state.error
}

export const mutations = {
  setError(state, err) {
    state.error = err
  }
}

export const actions = {
}
