<template>
    <div>
        <input type="text" class="coupon-code" v-model="code" @input="validate" @keyup.enter="message">
        <p v-if="valid" class="message">
            Coupon Redeemed: {{ message }}
        </p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            code: '',
            coupons: [
                {
                    code: '50OFF',
                    message: '50% off',
                    discount: 50
                }, 
                {
                    code: 'FREE',
                    message: 'Entirely Free!',
                    discount: 100
                }
            ],
            valid: false
        }
    },
    computed: {
        selectedCoupon() {
            return this.coupons.find(coupon => coupon.code == this.code)
        }
    },
    methods: {
        validate () {
            this.valid = !! this.selectedCoupon;
            if(this.valid)
                this.$emit('applied', this.selectedCoupon().discount);
        },
        message() {
            return this.selectedCoupon().message;
        }
    }
}
</script>