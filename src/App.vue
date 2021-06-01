<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AddUser @add="addToUserList" />
    <UserLists :users="allUser" />
  </div>
</template>

<script>
import AddUser from './components/AddUser.vue'
import UserLists from './components/UserLists.vue'

export default {
  name: 'App',
  components: {
    UserLists,
    AddUser
  },
  data() {
    return {
      allUser:[]
    }
  },
    methods:{
      addToUserList(data){
        this.allUser.push(data)
      }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0f375f;
  margin-top: 60px;
}
</style>
