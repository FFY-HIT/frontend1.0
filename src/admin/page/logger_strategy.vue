<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>记录者策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            记录者确认记录策略
        </div>
        <label>
            <input type="radio" v-model="selectedOption1" value="option1" @change="changestrategy3()"> 指定节点数量
            <p style="font-size: 12px;">此选项用于设置节点数量，并基于通信列表中节点数量的百分比进行检验，检验条件在0，1之间。</p>
        </label>
        <label>
            <input type="radio" v-model="selectedOption1" value="option2" @change="changestrategy3()"> 指定具体节点
            <p style="font-size: 12px;">此选项用于设置具体检验的节点，节点需在通信列表中。</p>
        </label>
        <div style="margin-bottom: 10px;"></div>
        <div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable">
                <el-table-column label="策略" prop="stage" width="572px"></el-table-column>
                <el-table-column label="检验条件" width="572px">
                    <template slot-scope="scope" width="100px">
                        <el-button v-if="scope.row.stage === '指定节点数量'" type="text" @click="check1()">编辑</el-button>
                        <el-button v-if="scope.row.stage === '指定具体节点'" type="text" @click="check2()">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            width="30%"
            title="查看检验条件"
            :visible.sync="dialogFormVisibleed">
             <div class="form-box">
                <el-form :model="form" ref="form" label-width="150px">
                    <el-form-item label="原检验条件" prop="condition">
                        <el-input v-model="condition1" type="condition1" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="新检验条件" prop="condition">
                        <el-input v-model="form.condition" type="condition" placeholder="请输入新检验条件"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center" >
                        <el-button type="info" @click="dialogFormVisibleed = false" >取消</el-button>
                        <el-button type="warning" @click="submit1(form)">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <el-dialog
            width="30%"
            title="查看检验条件"
            :visible.sync="dialogFormVisibleed1">
            <el-table
                :data="jsonContent"
                border
                style="width: 100%; height: 441px; overflow: auto;"
                v-bind:default-sort="{prop: 'nodeid', order: 'ascending'}"
                ref="multipleTable">
                <el-table-column label="节点ID" prop="nodeid" width="229px"></el-table-column>
                <el-table-column label="节点IP" prop="nodeip" width="229px"></el-table-column>
                <el-table-column label="端口号" prop="port" width="229px"></el-table-column>
            </el-table>
            <div style="text-align: center;">
                <el-button type="info" @click="dialogFormVisibleed1 = false">取消</el-button>
                <el-button type="success" @click="add_mem()">添加</el-button>
                <el-button type="danger" @click="del_mem()">删除</el-button>
            </div>
        </el-dialog>
        <el-dialog
            width="30%"
            title="添加节点"
            :visible.sync="dialogFormVisibleed2">
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
                        <el-button type="info" @click="dialogFormVisibleed2 = false" >取消</el-button>
                        <el-button type="success" @click="addlist_submit()">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
            width="30%"
            title="删除节点"
            :visible.sync="dialogFormVisibleed3">
            <div class="form-box">
                <el-form :model="form" :rules="rules" ref="form" label-width="150px">

                    <el-form-item label="节点id" prop="id">
                        <el-input v-model="form.id" type="id" placeholder="请输入id"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center" >
                        <el-button type="info" @click="dialogFormVisibleed3 = false" >取消</el-button>
                        <el-button type="danger" @click="dellist_submit()">删除</el-button>
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
            option: null,
            fileContent: '',
            condition1: '',
            jsonContent: [],
            data: [
                {stage: '指定节点数量'},
                {stage: '指定具体节点'}
            ],
            dialogFormVisibleed:false,
            dialogFormVisibleed1: false,
            dialogFormVisibleed2: false,
            dialogFormVisibleed3: false,
            form: {
                condition: '',
                stage: '',
                id:'',
                ip:'',
                port:''
            },
            selectedOption1: '',
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
        init() {
            this.$http.post(main.url+"/strategy/list", null)
                .then(
                    success=> {
                        if (success.data[2]["strategy"] === 0) {
                            this.selectedOption1 = 'option1'
                        } else if (success.data[2]["strategy"] === 1) {
                            this.selectedOption1 = 'option2'
                        }
                    }
                )
        },
        check1() {
            this.dialogFormVisibleed = true
            this.$http.post(main.url+"/strategy/check1",
                {
                    'id': localStorage.getItem('id')
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(
                    response=> {
                        this.condition1 = response.data
                    }
                )
            this.form = {
                condition: ""
            };
        },
        submit1(form) {
            if(this.form.condition==="")
                this.$message({type: 'error', message: '检验条件不能为空！'});
            else {
                this.$http.post(main.url+"/strategy/add1",
                    {
                        'id': localStorage.getItem('id'),
                        'condition': this.form.condition,
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '修改成功'});
                            this.form = {
                                condition: ""
                            };
                        } else if (response.data === "-1") {
                            this.$message.error('修改失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                    }
                );
                this.dialogFormVisibleed = false
            }
        },
        check2(){
            this.dialogFormVisibleed1=true
            this.jsonContent = []
            this.$http.post(main.url+"/strategy/check2",
                {
                    'id': localStorage.getItem('id')
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(response => {
                    this.jsonContent = response.data;
                    for(let i=0;i<this.jsonContent.length;i++){

                        if(this.jsonContent[i].nodeip==="stack_node1")
                            this.jsonContent[i].nodeip = "43.139.2.243";
                        else if(this.jsonContent[i].nodeip==="stack_node2")
                            this.jsonContent[i].nodeip = "43.139.138.127";
                        else if(this.jsonContent[i].nodeip==="stack_node3")
                            this.jsonContent[i].nodeip = "43.139.9.116";
                        else if(this.jsonContent[i].nodeip==="stack_node4")
                            this.jsonContent[i].nodeip = "159.75.128.168";
                        else if(this.jsonContent[i].nodeip==="stack_node5")
                            this.jsonContent[i].nodeip = "159.75.131.241";
                    }
                });
        },
        changestrategy3() {
            this.$http.post(main.url+"/strategy3/change", null)
                .then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '修改成功'});
                        } else if (response.data === "-1") {
                            this.$message.error('修改失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                    }
                )
        },
        add_mem(){
            this.form = {
                id:'',
                ip:'',
                port:''
            };
            this.dialogFormVisibleed2=true
        },
        addlist_submit(){
            if(this.form.id==="")
                this.$message({type: 'error', message: 'id不能为空！'});
            else if(this.form.ip==="")
                this.$message({type: 'error', message: 'ip不能为空！'});
            else if(this.form.port==="")
                this.$message({type: 'error', message: '端口号不能为空！'});
            else {
                this.$http.post(main.url+"/strategy/add2",
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
                        } else if (response.data === "-1") {
                            this.$message.error('添加失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                        this.check2();
                    }
                );
                this.dialogFormVisibleed2 = false
            }
        },
        del_mem(){
            this.form = {
                id:''
            };
            this.dialogFormVisibleed3=true
        },
        dellist_submit(){
            if(this.form.id==="")
                this.$message({type: 'error', message: 'id不能为空！'});
            else {
                this.$http.post(main.url+"/strategy/del1",
                    {
                        'uid': localStorage.getItem('id'),
                        'id': this.form.id,
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '删除成功'});
                            this.form = {
                                id: ''
                            };
                        } else if (response.data === "-1") {
                            this.$message.error('删除失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                        this.check2();
                    }
                );
                this.dialogFormVisibleed3 = false
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
.selected {
    color: green; /* 这里可以设置选中时的样式 */
}

.editable {
    cursor: pointer; /* 鼠标悬停时显示手型指示可点击 */
}
</style>


