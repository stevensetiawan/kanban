<template>
    <form v-on:submit.prevent="login()">
            <div class="form-group" id="login">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" v-model="loginEmail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" v-model="loginPassword" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button @click="login()" class="btn btn-primary">Submit</button>
    </form>
</template>
<script>
export default {
    props:['data'],
    data() {
        return{
            loginEmail:'',
            loginPassword:''
        }
    },
    methods:{
        login(){
            this.$emit("changeIsLogin", {value:true})
        }
    }
}
</script>