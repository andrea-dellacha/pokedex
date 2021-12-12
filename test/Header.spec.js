import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header', () => {
  const wrapper = shallowMount(Header, {
    mocks: {
      $store: {
        state: {
          team: {
            teamLength: 5
          }
        }
      }
    },
    computed: {
      teamLength () {
        return this.$store.state.team.teamLength
      }
    },
    stubs: {
      NuxtLink: RouterLinkStub
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
