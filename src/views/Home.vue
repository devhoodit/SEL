<template>
  <div class="home">
    <img alt="Vue logo" :src='pic'>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import pic from '@/assets/logo.png'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      pic: pic
    }
  }
}
</script>
