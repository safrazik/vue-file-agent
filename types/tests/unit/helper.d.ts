import Vue from 'vue';
import { VueClass, Wrapper } from '@vue/test-utils';
declare const _default: {
    getWrapper(Component: VueClass<Vue>, propsData: any, stubs?: any): Wrapper<Vue>;
    getText(wrapper: Wrapper<Vue>, selector: string): string;
};
export default _default;
