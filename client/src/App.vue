<template>
  <div class>
    <!-- <p>hello world</p> -->
    <Navbar v-if="isLogin" @emitLogout="allLogout"></Navbar>
    <Login @changeLogin="changeLogin" v-if="openLogin"></Login>
    <button v-if="openRegisterBtn" @click="showRegister">Register</button>
    <Register v-if="openRegister" @emitShowLogin="showLogin" @changeLogin="changeLogin"></Register>
    <KanbanList v-if="isLogin"></KanbanList>

  </div>
</template>
<script>
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorMessage from "./components/ErrorMessage"
import Navbar from "./components/Navbar"
import KanbanList from "./components/KanbanList";

export default {
  components: {
    Login,
    KanbanList,
    Register,
    Navbar,
    ErrorMessage
  },created(){
    this.getKanban()
  } ,
  data() {
    return {
      openLogin: true,
      openRegister: false,
      openKanban: false,
      openRegisterBtn: true,
      updateKanban: false,
      currentEditTask: {},
      isLogin: false,

    };
  },
  methods: {
    showRegister() {
      this.openLogin = !this.openLogin;
      this.openRegisterBtn = !this.openRegisterBtn;
      this.openRegister = !this.openRegister;
    },
    showLogin() {
      this.openRegister = !this.openRegister;
      this.openRegisterBtn = !this.openRegisterBtn;
      this.openLogin = !this.openLogin;
    },
    changeLogin() {
      this.openRegister = false;
      this.openLogin = false;
      this.openKanban = true;
      this.openRegisterBtn = false;
      this.isLogin = true;
    },
    taskUpdated(){
      console.log('zzzz')
      this.updateKanban = false
      this.openKanban = true
    },
    allLogout(){
      this.isLogin = false
      this.openLogin = true
      this.openRegisterBtn = true
    }
  },
  created() {
    if (localStorage.token) {
      this.changeLogin();
    }
  }
};
</script>
