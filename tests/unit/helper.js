// import Vue from 'vue'
import { createLocalVue, shallowMount, mount } from '@vue/test-utils'

const localVue = createLocalVue();

export default {

  // getVm(Component, propsData) {
  //   const Constructor = Vue.extend(Component)
  //   const vm = new Constructor({ propsData: propsData }).$mount()
  //   return vm
  // },

  // to support stubs
  getWrapper(Component, propsData, stubs = true){
    if(stubs === true){
      return shallowMount(Component, {
        localVue,
        propsData
      })
    }
    return mount(Component, {
      localVue,
      propsData,
      stubs
    })
  },

  getText(wrapper, selector) {
    return wrapper.find(selector).text().trim('');
    // return vm.$el.querySelector(selector).textContent.trim('')
  },

}