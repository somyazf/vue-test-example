import { mount } from '@vue/test-utils';
import expect from 'expect';
import Question from '@/components/Question';
import 'regenerator-runtime/runtime';

describe('Question', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });
    })

    // test('title and the body', () => {
    //     see('The title');
    //     see('The body');
    // })

    // test('can be edited', async () => {
    //     // click('#edit');
    //     const edit = wrapper.find('#edit')
    //     await edit.trigger('click');
    //     expect(wrapper.find('input[name=title]').element.value).toBe('The title');
    //     expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');
    // })

    // test('hides edit button while editing', () => {
    //     click('#edit');
    //     expect(wrapper.find('#edit').isVisible()).toBe(false)
    // })

    // test('update question after being edited', () => {
    //     click('#edit');
    //     type('input[name=title]', 'updated title');
    //     type('textarea[name=body]', 'updated body');
    //     click('#update');
    //     see('updated title')
    //     see('updated body')
    // })

    test('cancel out of edit mode', (done) => {
        wrapper.vm.$nextTick(() => {
            try {
                click('#edit');
                type('input[name=title]', 'updated title');
                type('textarea[name=body]', 'updated body');
                done();
            } catch (e) {
                done(e);
            }
        })
        // click('#cancel');
        // see('The title');
        // see('The body');
    })

    // let see = (text, selector) => {
    //     let wrap = selector ? wrapper.find(selector) : wrapper;
    //     expect(wrap.html()).toContain(text);
    // }

    function type(selector, text) {
        let node = wrapper.find(selector);
        node.element.value = text;
        node.trigger('input');
    }
    
    function click(selector) {
        let node = wrapper.find(selector);
        node.trigger('click');
    }
})