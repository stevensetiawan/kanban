<template>
  <button @click="logout">Log Out</button>
</template>

<script>
export default {
  methods: {
    logout() {
    localStorage.clear();
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
      this.$emit("emitLogout");
    }
  }
};
</script>