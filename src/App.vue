<template>
  <div id="app">
    <PdfGenerator />
  </div>
</template>

<script>
import PdfGenerator from './components/PdfGenerator.vue'

export default {
  name: 'App',
  components: { PdfGenerator },
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
