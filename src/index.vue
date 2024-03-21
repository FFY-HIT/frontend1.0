<template>
    <div class="login-wrap">
        <el-button type="primary" @click="submit()" >进入</el-button>
    </div>
</template>

<script>
    import main from './main';
    export default {
        data: function(){
            return {
                dialogVisible:false,
                data:[]
            }
        },
        methods: {
            submit(){
                this.$router.push({ path: '/login' });
            }
        }
    }
</script>

<style scoped>
    .tab{
        position: absolute;
        top: 20%;
        left: 25%;
        width: 805px;
        height: 100%;
    }
    .login-wrap{
        position: relative;
        background: url("../static/img/ng.jpg") no-repeat center;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top: 40%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
    }
    .login-btn button{
        position: absolute;
        width: 40%;
        height: 35px;
        right: 10%;
        top: 10%;
    }
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
