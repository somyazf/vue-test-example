<template>
   <div style="width: 400px; margin: 0 auto;">
        <div class="wrapper">
            <input type="text" name="userName" id="userName" ref="userName" v-model="userName">
            <input type="password" name="password" id="password" v-model="password">
            <input type="email" name="email" id="email" v-model="email">
        </div>
        <button @click="addUser" id="signUp">Sign Up</button>
   </div>
</template>
<script>
export default {
    data() {
        return {
            user: {},
            userName: '',
            password: '',
            email: '',
            // allUser:[]
        }
    },
    methods: {
        addUser() {
            this.user = {}
            this.user.userName = this.userName
            this.user.password = this.password
            this.user.email = this.email
            this.$emit('add', this.user)
        }
    }
}
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 126px;
}
.wrapper > input {
    height: 25px;
    width: 230px;
    border-radius: 4px;
    border-color: blue;
    outline: none;
}
#signUp {
    font-size: 19px;
    margin-top: 12px;
    padding: 8px;
}
</style>