<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>信任管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            信任列表
        </div>
        <div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" >
                <el-table-column label="节点ID" prop="id" width="381px" ></el-table-column>
                <el-table-column label="节点IP" prop="ip" width="382px" ></el-table-column>
                <el-table-column label="端口号" prop="port" width="381px" ></el-table-column>
            </el-table>
        </div>
        <div style="margin-bottom: 10px;"></div>
        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            通信列表
        </div>
        <div>
            <el-table :data="data1" border style="width: 100%" ref="multipleTable" >
                <el-table-column label="节点ID" prop="id" width="381px" ></el-table-column>
                <el-table-column label="节点IP" prop="ip" width="382px" ></el-table-column>
                <el-table-column label="端口号" prop="port" width="381px" ></el-table-column>
            </el-table>
        </div>
        <div style="margin-bottom: 10px;"></div>
        <div>
            <el-button @click="trustlist_config()" align="center">信任列表配置</el-button>
            <el-button @click="list_config()" align="center">通信列表配置</el-button>
        </div>
        <el-dialog
            width="30%"
            title="通信列表配置"
            :visible.sync="dialogFormVisibleed">
            <div class="form-box">
                <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                    <el-form-item label="新id" prop="id">
                        <el-input v-model="form.id" type="id" placeholder="请输入新id"></el-input>
                    </el-form-item>
                    <el-form-item label="新ip" prop="ip">
                        <el-input v-model="form.ip" type="ip" placeholder="请输入新ip"></el-input>
                    </el-form-item>
                    <el-form-item label="新端口号" prop="port">
                        <el-input v-model="form.port" type="port" placeholder="请输入新端口号"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center" >
                        <el-button @click="dialogFormVisibleed = false" >取消</el-button>
                        <el-button @click="addlist_submit('form')">添加</el-button>
                        <el-button @click="dellist_submit('form')">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
            width="30%"
            title="信任列表配置"
            :visible.sync="dialogFormVisibleed1">
            <div class="form-box">
                <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                    <el-form-item label="id" prop="id">
                        <el-input v-model="form.id" type="id" placeholder="请输入id"></el-input>
                    </el-form-item>
                    <el-form-item label="ip" prop="ip">
                        <el-input v-model="form.ip" type="ip" placeholder="请输入ip"></el-input>
                    </el-form-item>
                    <el-form-item label="端口号" prop="port">
                        <el-input v-model="form.port" type="port" placeholder="请输入端口号"></el-input>
                    </el-form-item>

                    <el-form-item style="text-align: center" >
                        <el-button @click="dialogFormVisibleed1 = false" >取消</el-button>
                        <el-button @click="adduser_submit(form)">添加</el-button>
                        <el-button @click="deluser_submit(form)">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import main from "../../main";
export default {
    data: function(){
        return {
            data:[],
            data1:[],
            dialogFormVisibleed:false,
            dialogFormVisibleed1:false,
            form:{
                id:'',
                ip:'',
                port:''
            },
            rules:{
                id:[
                    {required:true, message:'请输入新id',trigger:'blur'}
                ],
                ip:[
                    {required:true, message:'请输入新ip',trigger:'blur'}
                ],
                port:[
                    {required:true, message:'请输入新端口号',trigger:'blur'}
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem('username')===""){
            this.$router.replace('/login')
        }else{this.init();}
    },
    methods:{
        init(){
            this.$http.post(main.url+"/trust/list",
                {'id': localStorage.getItem('id')},
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                }).then(
                success=>{
                    this.data=success.data;
                    for(let i=0;i<this.data.length;i++){}
                }
            );
            this.$http.post(main.url+"/list/list",
                {'id': localStorage.getItem('id')},
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                }).then(
                success=>{
                    this.data1=success.data;
                    for(let i=0;i<this.data1.length;i++){}
                }
            );
        },

        trustlist_config(){
            this.form = {
                id:'',
                ip:'',
                port:''
            };
            this.dialogFormVisibleed1=true
        },
        adduser_submit(form){
            if(this.form.id==="")
                this.$message({type: 'error', message: 'id不能为空！'});
            else if(this.form.ip==="")
                this.$message({type: 'error', message: 'ip不能为空！'});
            else if(this.form.port==="")
                this.$message({type: 'error', message: '端口号不能为空！'});
            else {
                this.$http.post(main.url+"/trust/add",
                    {
                        'uid': localStorage.getItem('id'),
                        'id': this.form.id,
                        'ip': this.form.ip,
                        'port': this.form.port
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '添加成功'});
                            this.form = {
                                id: '',
                                ip: '',
                                port: ''
                            };
                            this.init();
                        } else if (response.data === "-1") {
                            this.$message.error('添加失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                    }
                );
                this.dialogFormVisibleed1 = false
            }
        },
        deluser_submit(form){ //添加新容器
            if(this.form.id==="")
                this.$message({type: 'error', message: 'id不能为空！'});
            else if(this.form.ip==="")
                this.$message({type: 'error', message: 'ip不能为空！'});
            else if(this.form.port==="")
                this.$message({type: 'error', message: '端口号不能为空！'});
            else {
                this.$http.post(main.url+"/trust/del",
                    {
                        'uid': localStorage.getItem('id'),
                        'id': this.form.id,
                        'ip': this.form.ip,
                        'port': this.form.port
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '删除成功'});
                            this.form = {
                                id: '',
                                ip: '',
                                port: ''
                            };
                            this.init();
                        } else if (response.data === "-1") {
                            this.$message.error('删除失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                    }
                );
                this.dialogFormVisibleed1 = false
            }
        },
        list_config(){
            this.form = {
                id:'',
                ip:'',
                port:''
            };
            this.dialogFormVisibleed=true
        },
        addlist_submit(form){
            if(this.form.id==="")
                this.$message({type: 'error', message: 'id不能为空！'});
            else if(this.form.ip==="")
                this.$message({type: 'error', message: 'ip不能为空！'});
            else if(this.form.port==="")
                this.$message({type: 'error', message: '端口号不能为空！'});
            else {
                this.$http.post(main.url+"/list/add",
                    {
                        'uid': localStorage.getItem('id'),
                        'id': this.form.id,
                        'ip': this.form.ip,
                        'port': this.form.port
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '添加成功'});
                            this.form = {
                                id: '',
                                ip: '',
                                port: ''
                            };
                            this.init();
                        } else if (response.data === "-1") {
                            this.$message.error('添加失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                    }
                );
                this.dialogFormVisibleed = false
            }
        },
        dellist_submit(form){
            if(this.form.id==="")
                this.$message({type: 'error', message: 'id不能为空！'});
            else if(this.form.ip==="")
                this.$message({type: 'error', message: 'ip不能为空！'});
            else if(this.form.port==="")
                this.$message({type: 'error', message: '端口号不能为空！'});
            else {
                this.$http.post(main.url+"/list/del",
                    {
                        'uid': localStorage.getItem('id'),
                        'id': this.form.id,
                        'ip': this.form.ip,
                        'port': this.form.port
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '删除成功'});
                            this.form = {
                                id: '',
                                ip: '',
                                port: ''
                            };
                            this.init();
                        } else if (response.data === "-1") {
                            this.$message.error('删除失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                    }
                );
                this.dialogFormVisibleed = false
            }
        }
    }
}
</script>
<style>
    /* 减小按钮的大小 */
    .el-button {
        padding: 7px 13px; /* 设置按钮内边距，控制按钮大小 */
        font-size: 12px; /* 设置按钮文字大小 */
    }
</style>
