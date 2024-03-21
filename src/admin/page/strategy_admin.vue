<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            自定义检验条件
        </div>
        <div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable">
                <el-table-column label="阶段" prop="stage" width="381px"></el-table-column>
                <el-table-column label="检验条件" prop="condition" width="382px"></el-table-column>
                <el-table-column label="操作" width="381px">
                    <template slot-scope="scope" width="100px">
                        <el-button type="text" @click="editdata(scope.row)" >修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            width="30%"
            title="修改检验条件"
            :visible.sync="dialogFormVisibleed">
            <div class="form-box">
                <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                    <el-form-item label="检验条件" prop="condition">
                        <el-input v-model="form.condition" type="condition" placeholder="请输入新检验条件"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center" >
                        <el-button @click="dialogFormVisibleed = false" >取消</el-button>
                        <el-button @click="submit(form)">确认</el-button>
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
            data: [],
            dialogFormVisibleed:false,
            form: {
                condition: '',
                stage: '',
            },
        }
    },
    created(){
        if(localStorage.getItem('username')===""){
            this.$router.replace('/login')
        }else{this.init();}
    },
    methods:{
        init(){
            this.$http.post(main.url+"/strategy/list", null).then(
                success=>{
                    this.data=success.data;
                    for(let i=0;i<this.data.length;i++){}
                }
            )
        },
        editdata(row){
            this.dialogFormVisibleed=true;
            this.form = {
                condition: "",
                stage: row.stage,
            };
        },
        submit(form) {
            if(this.form.condition==="")
                this.$message({type: 'error', message: '检验条件不能为空！'});
            else {
                this.$http.post(main.url+"/strategy/add",
                    {
                        'condition': this.form.condition,
                        'stage': this.form.stage,
                    },
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        emulateJSON: true
                    }).then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '修改成功'});
                            this.form = {
                                id: '',
                                ip: '',
                                port: ''
                            };
                            this.init();
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


