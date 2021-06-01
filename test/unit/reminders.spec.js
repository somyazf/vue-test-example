import { mount } from '@vue/test-utils';
import Reminders from '@/components/Reminders.vue';

describe('Reminders', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Reminders);
    })
    // test('hides the reminders list if there are none', () => {
    //     expect(() => wrapper.get('ul')).toBe(false);
    // })

    // test('can add reminder', () => {
    //     addReminder('Go to store')
    //     expect(wrapper.find('ul').text()).toContain('Go to store');
    // })

    test('setValue on checkbox', () => {
        // let newReminder = wrapper.find('.new-reminder');
        wrapper.setData({ newReminder: 'new' })
        wrapper.find('.add').trigger('click');

        let deleteButton = wrapper.find('ul > li:first-child > .remove');
        deleteButton.trigger('click');
        expect(reminderList()).not.toContain('new');
        expect(reminderList()).toContain('Go to sleep');
    })

    // function addReminder(body) {
    //     let newReminder = wrapper.find('.new-reminder');
    //     newReminder.setValue(body);
    //     newReminder.trigger('input');
    //     wrapper.find('.add').trigger('click');
    // }

    function reminderList() {
        return wrapper.find('ul').text()
    }
})