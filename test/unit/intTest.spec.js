import { mount } from '@vue/test-utils';
import expect from 'expect';
import Text from '@/components/Text';

describe('text', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Text);
    })
    test('should generate a valid text output', () => {
        const text = wrapper.vm.checkAndGenerate('max', 29);
        expect(text).toBe('max (29 years old)');
    })
})