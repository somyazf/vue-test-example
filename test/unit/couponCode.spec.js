import { mount } from '@vue/test-utils'
import CouponCode from '@/components/CouponCode.vue'
import expect from 'expect'

describe('CouponCode', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(CouponCode);
    })

    test('accepts a coupon code', () => {
        expect(wrapper.find('input.coupon-code').exists()).toBe(true)
    })

    // test.only('validates a user coupon code', () => {
    //     // let couponCode = wrapper.find('input.coupon-code');
    //     // couponCode.element.value = '50OFF';
    //     // couponCode.trigger('input');
    //     wrapper.setData({
    //         code: '50OFF'
    //     })
    //     // expect(wrapper.html()).toContain('Coupon Redeemed: 50% off');
    //     expect(wrapper.find('p.message').text()).toBe('Coupon Redeemed: 50% off')
    // })

    test('broadcasts the percentage discount when a valid coupon is applied', () => {
        let couponCode = wrapper.find('input.coupon-code');
        couponCode.element.value = '50OFF';
        couponCode.trigger('input');
        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    })
})

