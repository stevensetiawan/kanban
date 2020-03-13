<template>
    <nav class="navbar navbar-dark bg-primary">
  <Logout @emitLogout="navLogOut"> <Logout>
</nav>
</template>

<script>
import Logout from "./Logout"
export default {
  components:{
      Logout
  },
  methods:{
      navLogOut(){
          this.$emit('emitLogout')
      }
  }  
}
</script>