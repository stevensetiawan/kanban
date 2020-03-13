<template>
<div class="">
    <Login v-if="isLogin == false" :data="isLogin" @changeIsLogin="changeIsLogin"></Login>
    <Register v-if="isLogin == false" :isLogin="isLogin" @changeIsLogin="changeIsLogin"></Register>
    <h1>{{message}}</h1>
</div>
</template>
<script>
import Login from './components/Login'
import Register from './components/Register'
export default {
    components:{
        Login,
        Register
    },
    data() {
        return {
            isLogin:false,
            message:''
        }
    },
    created(){
        this.message= 'Hello'
    },
    methods:{
        changeIsLogin(data){
            this.isLogin = data.value;
            console.log(this.isLogin)
        }
    }
}
</script>