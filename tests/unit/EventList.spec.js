import { mount } from '@vue/test-utils'
import EventList from '@/views/EventList'
import store from '@/store'
import router from '@/router'

describe('EventList', () => {
  it('should render the events', () => {
    const wrapper = mount(EventList, {
      global: {
        plugins: [store, router],
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('page title', () => {
    it('is rendered with the correct text', () => {
      const wrapper = mount(EventList, {
        global: {
          plugins: [store, router],
        },
      })
      const title = wrapper.find('[data-testid="event-list-title"]')
      expect(title.exists()).toBeTruthy()
      expect(title.text()).toContain('Events for Good')
    })
  })
})
