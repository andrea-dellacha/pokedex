import { shallowMount, createLocalVue } from '@vue/test-utils'
import PokemonCard from '@/components/PokemonCard.vue'
import capitalize from '@/plugins/filters/capitalize'
import formatPokemonId from '@/plugins/filters/formatPokemonId'

describe('PokemonCard', () => {
  const localVue = createLocalVue()

  // Filter import
  localVue.filter('capitalize', capitalize)
  localVue.filter('formatPokemonId', formatPokemonId)

  const wrapper = shallowMount(PokemonCard, {
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
})
