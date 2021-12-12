import { shallowMount } from '@vue/test-utils'
import PokemonPage from '@/pages/_pokemon.vue'

const get = jest.fn(() => Promise.resolve({}))
describe('PokemonPage', () => {
  const dispatch = jest.fn((n) => {})
  const commit = jest.fn((n) => {})

  const wrapper = shallowMount(PokemonPage, {
    mocks: {
      $store: {
        dispatch,
        commit,
        state: {
          pokemon: {
            pokedexApi: 'http',
          }
        }
      },
      $axios: {
        $get: get
      },
      $route: {
        params: {
          pokemon: 5
        }
      }
    },
    computed: {
      pokedexApi () {
        return this.$store.state.pokemon.pokedexApi
      }
    }
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly', () => {
    expect(wrapper.element).toBeDefined()
    expect(wrapper.element).toMatchSnapshot()
  })
})
