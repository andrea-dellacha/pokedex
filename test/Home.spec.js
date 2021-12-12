import { shallowMount } from '@vue/test-utils'
import HomePage from '@/pages/index.vue'

describe('HomePage', () => {
  const dispatch = jest.fn((n) => {})

  const wrapper = shallowMount(HomePage, {
    mocks: {
      $store: {
        dispatch,
        state: {
          pokemon: {
            pokemons: [],
            pokemonsQuantity: 0
          }
        }
      }
    },
    computed: {
      pokemons () {
        return this.$store.state.pokemon.pokemons
      },
      pokemonsQuantity () {
        return this.$store.state.pokemon.pokemonsQuantity
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
