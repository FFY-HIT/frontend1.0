<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>容器管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-table :data="data" border style="width: 90%" ref="multipleTable" >
                <el-table-column label="容器ID" prop="id" width="80px" ></el-table-column>
                <el-table-column label="容器IP" prop="ip" width="150px" ></el-table-column>
                <el-table-column label="端口号" prop="port" width="80px" ></el-table-column>
                <el-table-column label="运行状态" prop="running" width="100px" ></el-table-column>
                <el-table-column label="创建时间" prop="ctime" width="250px" ></el-table-column>
                <el-table-column label="操作" width="370px" >
                    <template slot-scope="scope" width="100px">
                        <el-button type="text" @click="openedit(scope.row)" >修改</el-button>
                        <el-button type="text" @click="del_user(scope.row)" >删除</el-button>
                        <el-button type="text" @click="system_init(scope.row)" >初始化</el-button>
                        <el-button type="text" @click="upload_key(scope.row)" >上传公钥</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="adduser()" align="center">添加容器</el-button>
            <el-button type="primary" @click="system_init()" align="center">系统初始化</el-button>
            <el-button type="primary" @click="upload_key()" align="center">上传公钥</el-button>
            <template>
            </template>
        </div>
        <el-dialog
            width="30%"
            title="修改"
            :visible.sync="dialogFormVisibleed">
            <div>
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
                    <el-form-item label="运行状态" prop="running">
                        <el-select v-model="form.running" placeholder="请选择运行状态">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align: center" >
                        <el-button @click="dialogFormVisibleed = false" >取消</el-button>
                        <el-button type="primary" @click="change_pass('form')">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
            width="30%"
            title="添加容器"
            :visible.sync="dialogFormVisibleed1">
            <div class="form-box">
                <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                    <el-form-item label="id" prop="id">
                        <el-input v-model="form.id" placeholder="请输入id"></el-input>
                    </el-form-item>
                    <el-form-item label="ip" prop="ip">
                        <el-input v-model="form.ip" placeholder="请输入ip"></el-input>
                    </el-form-item>
                    <el-form-item label="端口号" prop="port">
                        <el-input v-model="form.port" type="port" placeholder="请输入端口号"></el-input>
                    </el-form-item>
                    <el-form-item label="运行状态" prop="running">
                        <el-select v-model="form.running" placeholder="请选择运行状态">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align: center" >
                        <el-button @click="dialogFormVisibleed1 = false" >取消</el-button>
                        <el-button type="primary" @click="adduser_submit(form)">添加</el-button>
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
            dialogFormVisibleed:false,
            dialogFormVisibleed1:false,
            options:[{value: 0, label: "未运行"},{value: 1, label: "运行中"}],
            form:{
                id:'',
                ip:'',
                port:'',
                running:''
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
                ],
                running:[
                    {required:true, message:'请选择运行状态',trigger:'blur'}
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
            this.$http.post(main.url+"/container/list",
                {'uid': localStorage.getItem('id')},
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                }).then(
                success=>{
                    this.data=success.data;
                    for(let i=0;i<this.data.length;i++){
                        if(this.data[i].running===0)
                            this.data[i].running = "未运行";
                        else
                            this.data[i].running = "运行中";
                    }
                }
            );
        },
        openedit(row){
            this.dialogFormVisibleed=true;
            this.form={
                id: row.id,
                ip: row.ip,
                port: row.port,
                running: row.running
            };
        },
        change_pass(form){ //ip,port
            this.$http.post(main.url+"/container/update",
                {
                    'id': this.form.id,
                    'ip': this.form.ip,
                    'port': this.form.port,
                    'running': this.form.running
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                }).then(
                success=> {
                    this.$message({type: 'success', message: '修改成功'});
                    this.form={
                        id:'',
                        ip:'',
                        port:'',
                        running:''
                    };
                    this.init();
                    this.dialogFormVisibleed = false;
                }
            );

        },
        adduser(){
            this.form = {
                id:'',
                ip:'',
                port:'',
                running: 1
            };
            this.dialogFormVisibleed1=true
        },
        adduser_submit(form){ //添加新容器
            if(this.form.id==="")
                this.$message({type: 'error', message: 'id不能为空！'});
            else if(this.form.ip==="")
                this.$message({type: 'error', message: 'ip不能为空！'});
            else if(this.form.port==="")
                this.$message({type: 'error', message: '端口号不能为空！'});
            else if(this.form.running==="")
                this.$message({type: 'error', message: '运行状态不能为空！'});
            else {
                this.$http.post(main.url+"/container/add",
                    {
                        'id': this.form.id,
                        'ip': this.form.ip,
                        'port': this.form.port,
                        'running': this.form.running
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    success => {
                        this.$message({type: 'success', message: '添加成功'});
                        this.form = {
                            id:'',
                            ip:'',
                            port:'',
                            running:1
                        };
                        this.init();
                    }
                );
                this.dialogFormVisibleed1 = false
            }
        },
        del_user(row){  //删除用户

            this.$confirm('请确认是否要删除该容器！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(main.url+"/container/del",
                    {'id': row.id,},
                    {
                        headers: {'Content-Type':'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    success=> {
                        this.$message({type: 'success', message: '已删除'});
                        this.init();
                    }
                );
            }).catch(() => {
                this.$message({type: 'info', message: '已取消'});
            });
        }
    }
}
</script>
