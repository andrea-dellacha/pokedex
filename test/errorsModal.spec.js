import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import ErrorModal from '@/components/errors-modal.vue'
import capitalize from '@/plugins/filters/capitalize'

describe('ErrorModal', () => {
  const localVue = createLocalVue()

  // Filter import
  localVue.filter('capitalize', capitalize)
  const wrapper = shallowMount(ErrorModal, {
    mocks: {
      $store: {
        state: {
          error: {
            error: { title: 'Error', criticality: 1, message: 'an error appened' }
          }
        }
      }
    },
    computed: {
      errorGeneral () {
        return this.$store.state.error.error
      }
    },
    data() {
      return {
        isOpen: true
      }
    },
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly', () => {
    expect(wrapper.element).toBeDefined()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should close the modal and clean data', async () => {
    wrapper.vm.isOpen = true
    wrapper.vm.errorsData = { title: 'Error', criticality: 1, message: 'an error appened' }
    expect(wrapper.vm.errorsData).toEqual({ title: 'Error', criticality: 1, message: 'an error appened' })
    expect(wrapper.vm.isOpen).toStrictEqual(true)
    wrapper.vm.closeModal()
    await Vue.nextTick()
    expect(wrapper.vm.isOpen).toStrictEqual(false)
    expect(wrapper.vm.errorsData).toEqual({ title: '', criticality: 1, message: '' })
  })
})
