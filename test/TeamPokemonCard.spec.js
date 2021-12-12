import { shallowMount, createLocalVue } from '@vue/test-utils'
import TeamPokemonCard from '@/components/TeamPokemonCard.vue'
import capitalize from '@/plugins/filters/capitalize'
import formatPokemonId from '@/plugins/filters/formatPokemonId'

describe('TeamPokemonCard', () => {
  const commit = jest.fn((n) => {})
  const localVue = createLocalVue()

  // Filter import
  localVue.filter('capitalize', capitalize)
  localVue.filter('formatPokemonId', formatPokemonId)

  const wrapper = shallowMount(TeamPokemonCard, {
    mocks: {
      $store: {
        commit
      }
    },
    propsData: {
      pokemon: {
        id: 5,
        name: 'charmander'
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

  test('should commit deletePokemon', () => {
    commit.mockReset()
    wrapper.vm.deletePokemon()
    expect(commit).toHaveBeenCalledWith('team/deletePokemon', wrapper.vm.pokemon)
  })
})
