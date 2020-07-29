import { shallowMount } from '@vue/test-utils'
import NewTask from '@/components/NewTask.vue'

describe('NewTask.vue', () => {
  	it('empties text when task is aborted', () => {
	    let wrapper = shallowMount(NewTask)
	    wrapper.vm.$data.message = 'blah'
	    wrapper.vm.abortTask()
    	expect(wrapper.vm.$data.text).toMatch('')
  	})

  	it('empties text when task is saved', () => {
	    let wrapper = shallowMount(NewTask)
	    wrapper.vm.$data.message = 'foo'
	    wrapper.vm.saveTask()
    	expect(wrapper.vm.$data.text).toMatch('')
  	})
})
