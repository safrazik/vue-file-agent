import Vue from 'vue';
import {
  createLocalVue,
  VueClass,
  ThisTypedMountOptions,
  shallowMount,
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils';

const localVue = createLocalVue();

export default {
  // getVm(Component, propsData) {
  //   const Constructor = Vue.extend(Component)
  //   const vm = new Constructor({ propsData: propsData }).$mount()
  //   return vm
  // },

  // to support stubs
  getWrapper(Component: VueClass<Vue>, propsData: any, stubs: any = true): Wrapper<Vue> {
    if (stubs === true) {
      return shallowMount(Component, {
        localVue,
        propsData,
      });
    }
    return mount(Component, {
      localVue,
      propsData,
      stubs,
    });
  },

  getText(wrapper: Wrapper<Vue>, selector: string) {
    return wrapper
      .find(selector)
      .text()
      .trim();
  },
};
