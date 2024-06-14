<template>
    <div class="login-wrap">
        <div class="ms-title" style="font-size: 30px">灵活分布式信任资源发布<span style="font-size: 10px; margin-left: 73px;">
            <u></u></span>
        </div>
        <div class="demo-input-suffix ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item prop="username" label="用户名" >
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" >
                    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="login-btn">
                    <el-button type="primary" @click="submit()" >登录</el-button>
                    <el-button type="info" @click="cancel()" >返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import main from './main';
    export default {
        data: function(){
            return {
                dialogVisible:false,
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },
        created(){
            localStorage.setItem('username',"");
            localStorage.setItem('role',"");
            localStorage.setItem('id',"");
            localStorage.setItem('ip',"");
            localStorage.setItem('port',"");
        },
        methods: {
            submit(){
                if(this.ruleForm.username===""){
                    this.$message({type: 'info', message: '用户名必须输入！'});
                }else if(this.ruleForm.password===""){
                    this.$message({type: 'info', message: '密码必须输入！'});
                }else{
                    // let crypto = require('crypto');
                    // const md5 = crypto.createHash('md5');
                    // md5.update(this.ruleForm.password);
                    // let md5password = md5.digest('hex');
                    this.$http.post(main.url+"/login/login",
                        {'username': this.ruleForm.username, 'password': this.ruleForm.password}, // md5password
                        {
                            headers: {'Content-Type':'application/x-www-form-urlencoded'},
                            emulateJSON: true
                        }).then(
                        success => {
                            if(success.data.id != null){
                                this.$message({type: 'success', message: '登录成功'});
                                localStorage.setItem('username',this.ruleForm.username);
                                localStorage.setItem('role',success.data.role);
                                localStorage.setItem('id',success.data.id);
                                localStorage.setItem('ip', success.data.ip);
                                localStorage.setItem('port', success.data.port);
                                this.$router.push({ path: '/admin' });
                                this.ruleForm.username='';
                            }else{
                                this.$message({type: 'error', message: '用户名或密码错误'});
                            }
                            this.ruleForm.password='';
                            this.dialogVisible=true;
                        }
                    );
                }
            },
            cancel(){
                this.$router.push({ path: '/' });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        background: url("../static/img/ng.jpg") no-repeat center;
        /*background-color: #2E363F;*/
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top: 49%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 14px;
        color: lightblue;
        font-weight: bold;
    }
    .ms-login{
        position: absolute;
        left:48%;
        top:40%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 20px;
        /*background: #fff;*/
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:40%;
        height:35px;
        left:80px;
    }
</style>
