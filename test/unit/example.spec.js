import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('HelloWorld.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Counter);
  })
  // it('decrement count ', () => {
  //   // const msg = 'new message'
  //   // const wrapper = shallowMount(HelloWorld, {
  //   //   props: { msg }
  //   // })
  //   expect(wrapper.vm.count).toBe(2)
  // })

  it('decrement the counter by clicking', () => {
    wrapper.setData({ count: 5 })
    wrapper.find('.decrement').trigger('click');
    expect(wrapper.vm.count).toBe(4)
  })

  it('never goes below zero', () => {
    // expect(wrapper.vm.count).toBe(0);
    wrapper.setData({ count: 3 })
    expect(wrapper.find('.decrement').isVisible()).toBe(false)
  })
})
