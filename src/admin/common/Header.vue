<template>
    <div class="header">
        <img class="user-logo" src="../../../static/img/ing.png">
        <div class="logo">基于灵活分布式信任的域名资源数据发布系统&nbsp;&nbsp;&nbsp;&nbsp;{{ id }}</div>

        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="change_pass">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog
            width="30%"
            title="修改密码"
            :visible.sync="dialogFormVisibleed1">
            <div class="form-box">
                <el-form :model="form1" ref="form1" label-width="150px">
                    <el-form-item label="新密码" prop="name">
                        <el-input v-model="password1" type="password" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="name">
                        <el-input v-model="password2" type="password" placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center" >
                        <el-button type="info" @click="dialogFormVisibleed1 = false">取消</el-button>
                        <el-button type="success" @click="submit()">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import main from "../../main";
    export default {
        data() {
            return {
                id: '',
                name: '用户名',
                dialogFormVisibleed1:false,
                password1:'',
                password2:'',
                form1:{},
            }
        },
        mounted() {
            this.id = localStorage.getItem('id');
            if(this.id === "1"){
                this.id = "CN节点"
            }
            else if(this.id === "2"){
                this.id = "RU节点"
            }
            else if(this.id === "3"){
                this.id = "PK节点"
            }
            else if(this.id === "4"){
                this.id = "KZ节点"
            }
            else if(this.id === "5"){
                this.id = "MO节点"
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command === 'loginout'){
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    localStorage.removeItem('id');
                    localStorage.removeItem('ip');
                    localStorage.removeItem('port');
                    this.$router.push('/');
                }
                else if(command === 'change_pass'){this.dialogFormVisibleed1 = true}
            },
            submit(){
                if(this.password1==="")
                    this.$message({type: 'info', message: '密码不能为空！'});
                else if(this.password1!==this.password2)
                    this.$message({type: 'info', message: '确认密码与新密码不一致！'});
                else{
                    this.$http.post(main.url+"/login/update",
                        {
                            'id': localStorage.getItem('id'),
                            'password': this.password1,
                        },
                        {
                            headers: {'Content-Type':'application/x-www-form-urlencoded'},
                            emulateJSON: true
                        }).then(
                        success=>{this.$message({type: 'success', message: '密码修改成功！'})}
                    );
                    this.dialogFormVisibleed1 = false;
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 200px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .user-logo{
        float: left;
        position: absolute;
        left:15px;
        top:19px;
        width:30px;
        height:30px;
        border-radius: 50%;
    }
    .header .logo{
        float: left;
        width: 500px;
        font-size: 16px;
        text-align: center;
        color: floralwhite;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }

</style>
