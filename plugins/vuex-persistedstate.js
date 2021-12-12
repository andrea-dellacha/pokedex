import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'current_session',
    paths: ['team']
  })(store)
}
