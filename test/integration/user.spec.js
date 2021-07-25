import { mount } from '@vue/test-utils';
import expect from 'expect';
import AddUser from '@/components/AddUser.vue';
import UserLists from '@/components/UserLists.vue';
import App from '@/App.vue';
import 'regenerator-runtime/runtime';

describe ('user', () => {
    let wrapper;
    let wrapper2;
    let wrapper3;
    beforeEach(() => {
        wrapper = mount(AddUser);
        wrapper2 = mount(UserLists);
        wrapper3 = mount(App);
    })
    test('should add user to users list when add a user', async() => {
        let userName = wrapper.find('input#userName');
        let password = wrapper.find('input#password');
        let email = wrapper.find('input#email');
        // let signUp = wrapper.find('button#signUp');
        await userName.setValue('user');
        await password.setValue('pass');
        await email.setValue('email');
        expect(userName.element.value).toBe("user");
        wrapper.vm.addUser();
        console.log(wrapper.emitted().add[0]);
        wrapper3.vm.addToUserList(wrapper.emitted().add[0]);
        console.log(wrapper3.vm.allUser);
        await wrapper2.setProps({users: wrapper.emitted().add[0]})
        console.log(wrapper2.vm.users);
        expect(wrapper2.find('.password').text()).toBe('password: pass');
    })

    // test('test', async () => {
    //     wrapper3.findComponent(AddUser).vm.$emit('add', {userName: 'user1', password: '1233', email: 'dfe'});
    //     // const list = wrapper3.findComponent(UserLists)
    //     expect(wrapper3.find('.password').text()).toBe('password: 1233');
    // })

    // test('test emit', async () => {
    //     wrapper.vm.addUser();
    //     // const list = wrapper3.findComponent(UserLists)
    //     // expect(wrapper.find('.password').text()).toBe('password: 1233');
    //     console.log(wrapper.emitted());
    // })
}) 
