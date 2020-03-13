<template>
  <div>
    <ErrorMessage v-if="errorMessage" :message="errorMessage"></ErrorMessage>
    <form @submit.prevent="login">
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
      <button type="submit" class="btn btn-primary">Login</button>
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >Sign in with Google</g-signin-button>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import ErrorMessage from "./ErrorMessage"
export default {
  components:{
    ErrorMessage
  },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      googleSignInParams: {
        client_id:
          "795212405793-5749k8v2m0h0pv9m1e7g2940scvgc36g.apps.googleusercontent.com"
      },
      showPassword:false,
      errorMessage:null
    };
  },
  methods: {
    login() {
      axios
        .post("https://hidden-scrubland-28835.herokuapp.com/user/login", {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$emit("changeLogin", { value: true });
        })
        .catch(err => {
          console.log(err.response.data)
          this.errorMessage = err.response.data.message
        });
    },

    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      console.log(googleUser);
      axios({
        method: "POST",
        url: "https://hidden-scrubland-28835.herokuapp.com/user/googleSign",
        data: {
          googleToken: googleUser.getAuthResponse().id_token
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$emit("changeLogin", { value: true });
        })
        .catch(err => {});
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },

    googleLogin() {
      axios({
        method: "POST",
        url: "https://hidden-scrubland-28835.herokuapp.com/user/googleSign",
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      }).then(data => {});
    }
  }
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
