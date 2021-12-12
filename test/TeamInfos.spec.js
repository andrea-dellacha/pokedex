import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import TeamInfos from '@/components/TeamInfos.vue'

describe('TeamInfos', () => {
  const commit = jest.fn((n) => {})
  const wrapper = shallowMount(TeamInfos, {
    mocks: {
      $store: {
        commit,
        state: {
          team: {
            pokemonTeam: []
          }
        }
      }
    },
    computed: {
      pokemonTeam () {
        return this.$store.state.team.pokemonTeam
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

  test('should commit updateTeamPosition', () => {
    commit.mockReset()
    wrapper.vm.updateTeamPosition()
    expect(commit).toHaveBeenCalledWith('team/updatePokemonTeam', wrapper.vm.team)
  })

  test('should emmit closeTeamInfos', async () => {
    wrapper.vm.closeTeamInfos()
    await Vue.nextTick()
    expect(wrapper.emitted().closeTeamInfos).toBeTruthy()
  })
})
