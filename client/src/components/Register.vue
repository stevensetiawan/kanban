<template>
  <div>
    <form @submit.prevent="loginRegister">
      <div class="form-group" id="login">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          v-model="loginEmail"
          class="form-control"
          id="loginEmail"
          aria-describedby="emailHelp"
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone
          else.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input :type="showPassword?'text':'password'" v-model="loginPassword" class="form-control" id="loginPassword" />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" v-model="showPassword" />Show Password
        <label class="form-check-label" for="exampleCheck1"></label>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
          <button @click.prevent="showLogin" class="btn btn-primary">Login</button>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: 'Register',
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      showPassword:false
    };
  },
  methods: {
    showLogin() {
        this.$emit('emitShowLogin')
    },
    loginRegister() {
      axios.post("https://hidden-scrubland-28835.herokuapp.com/user/register", {
        email: this.loginEmail,
        password: this.loginPassword
      }).then(response=>{
        localStorage.setItem("token",response.data.token)
        this.$emit("changeLogin",{value:true})
      }).catch(err=>{
        // res.status(400).json({msg:"email atau password salah"})
      })
    }
  }
};
</script>
