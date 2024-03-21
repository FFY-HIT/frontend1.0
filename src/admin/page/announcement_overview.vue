
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>公告总览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 10px;"></div>
<!--        <StageBar :stages="['阶段一', '阶段二', '阶段三', '阶段四', '阶段五']" :currentStage="currentStage" />-->
<!--        <div style="margin-bottom: 50px;"></div>-->
        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            发布公告总览
        </div>
        <div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" >
                <el-table-column label="节点ID" prop="nodeid" width="95px" ></el-table-column>
                <el-table-column label="节点IP" prop="ip" width="172px" ></el-table-column>
                <el-table-column label="端口号" prop="port" width="100px" ></el-table-column>
                <el-table-column label="发布时间" prop="timestamp" width="188px" ></el-table-column>
                <el-table-column label="公告名称" prop="id" width="130px" ></el-table-column>
                <el-table-column label="版本号" prop="version" width="144px" ></el-table-column>
                <el-table-column label="所处阶段" prop="stage" width="95px" ></el-table-column>
                <el-table-column label="角色" prop="role" width="85px" ></el-table-column>
                <el-table-column label="操作" width="135px">
                    <template slot-scope="scope" width="100px">
                            <el-button type="text" @click="viewAnnouncement(scope.row)">公告内容</el-button><br>
                            <el-button type="text" @click="viewReceivers(scope.row)">接收列表</el-button><br>
                            <el-button type="text" @click="viewpublics(scope.row)">公开列表</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-bottom: 10px;"></div>
        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            记录公告总览
        </div>
        <div>
            <el-table :data="data1" border style="width: 100%" ref="multipleTable" >
                <el-table-column label="节点ID" prop="nodeid" width="95px" ></el-table-column>
                <el-table-column label="节点IP" prop="ip" width="172px" ></el-table-column>
                <el-table-column label="端口号" prop="port" width="100px" ></el-table-column>
                <el-table-column label="发布时间" prop="timestamp" width="188px" ></el-table-column>
                <el-table-column label="公告名称" prop="id" width="130px" ></el-table-column>
                <el-table-column label="版本号" prop="version" width="144px" ></el-table-column>
                <el-table-column label="所处阶段" prop="stage" width="95px" ></el-table-column>
                <el-table-column label="角色" prop="role" width="85px" ></el-table-column>
                <el-table-column label="操作" width="135px">
                    <template slot-scope="scope" width="100px">
                        <el-button type="text" @click="viewAnnouncement(scope.row)">公告内容</el-button><br>
                        <el-button type="text" @click="viewRecords(scope.row)">记录列表</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            width="30%"
            title="公告内容"
            :visible.sync="dialogFormVisibleed">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>

        <el-dialog
            width="30%"
            title="接收列表"
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
        </el-dialog>
        <el-dialog
            width="30%"
            title="公开列表"
            :visible.sync="dialogFormVisibleed2">
            <el-table
                :data="jsonContent"
                border
                style="width: 100%; height: 441px; overflow: auto;"
                v-bind:default-sort="{prop: 'nodeid', order: 'ascending'}"
                ref="multipleTable">
                <el-table-column label="节点ID" prop="nodeid" width="172px"></el-table-column>
                <el-table-column label="节点IP" prop="nodeip" width="172px"></el-table-column>
                <el-table-column label="端口号" prop="port" width="172px"></el-table-column>
                <el-table-column label="是否公开" prop="ispublic" width="171px"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
            width="30%"
            title="记录列表"
            :visible.sync="dialogFormVisibleed3">
            <el-table
                :data="jsonContent"
                border
                style="width: 100%; height: 441px; overflow: auto;"
                v-bind:default-sort="{prop: 'nodeid', order: 'ascending'}"
                ref="multipleTable">
                <el-table-column label="节点ID" prop="nodeid" width="172px"></el-table-column>
                <el-table-column label="节点IP" prop="nodeip" width="172px"></el-table-column>
                <el-table-column label="端口号" prop="port" width="172px"></el-table-column>
                <el-table-column label="是否一致" prop="isequal" width="171px"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
// import StageBar from "../common/Stagebar.vue";
import main from "../../main";

export default {
    // components: {
    //     StageBar
    // },
    data() {
        return {
            currentStage: {}, // 这个值可以根据后端到达的阶段进行动态设置
            dialogFormVisibleed: false,
            dialogFormVisibleed1: false,
            dialogFormVisibleed2: false,
            dialogFormVisibleed3: false,
            announcementData: [],
            data: [],
            data1: [],
            fileContent: '',  // 存储文件内容的变量
            jsonContent: [],
            form: {
                nodeid:'',
                ip:'',
                port:'',
                timestamp:'',
                id:'',
                version:'',
                role: '',
                stage: ''
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
            this.$http.post(main.url+"/pub/list", null)
                .then(
                success=>{
                    this.data=success.data;
                    for(let i=0;i<this.data.length;i++){}
                }
            );
            this.$http.post(main.url+"/log/list", null)
                .then(
                success=>{
                    this.data1=success.data;
                    for(let i=0;i<this.data1.length;i++){}
                }
            );
        },
        viewAnnouncement(row){
            this.dialogFormVisibleed=true
            this.fileContent = ''
            this.$http.post(main.url+"/an/check",
            {
                'id': row.id,
                'version': row.version
            },
            {
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                emulateJSON: true
            })
            .then(response => {
                this.fileContent = response.data;  // 将文件内容显示在文本框中
            });
        },
        viewReceivers(row){
            this.dialogFormVisibleed1=true
            this.jsonContent = []
            this.$http.post(main.url+"/receiver/check",
            {
                'id': row.id,
                'version': row.version
            },
            {
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                emulateJSON: true
            })

            .then(response => {
                this.jsonContent = response.data;
                for(let i=0;i<this.jsonContent.length;i++){}
            });
        },
        viewpublics(row){
            this.dialogFormVisibleed2=true
            this.jsonContent = []
            this.$http.post(main.url+"/public/check",
            {
                'id': row.id,
                'version': row.version
            },
            {
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                emulateJSON: true
            })

            .then(response => {
                this.jsonContent = response.data;
                for(let i=0;i<this.jsonContent.length;i++){
                    if(this.jsonContent[i].ispublic==="True")
                        this.jsonContent[i].ispublic = "已公开";
                    else
                        this.jsonContent[i].ispublic = "未公开";
                }
            });
        },
        viewRecords(row){
            this.dialogFormVisibleed3=true
            this.jsonContent = []
            this.$http.post(main.url+"/record/check",
            {
                'id': row.id,
                'version': row.version
            },
            {
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                emulateJSON: true
            })

            .then(response => {
                this.jsonContent = response.data;
                for(let i=0;i<this.jsonContent.length;i++){
                    if(this.jsonContent[i].isequal==="True")
                        this.jsonContent[i].isequal = "一致";
                    else
                        this.jsonContent[i].isequal = "不一致";
                }
            });
        }
    },

    sockets:{
        connect:function () {
            console.log('连接成功')   // 判断是否正确连接上后端
        },

        current_stage:function (stage) {    // api为对应后端发出的信息接口
            this.currentStage = stage      // 获取后端发出的信息
        }
    },

    mounted () {    // 在组件开始渲染时进行调用

        this.$socket.connect() // socket连接

        setInterval(() => {
            this.$socket.emit('get_current_stage');
        }, 1000); // 每隔5秒发送一次消息
        // this.$socket.emit('get_current_stage')  // 发送消息:对应后端test测试函数
        console.log('连接中')
    },

    destroyed () {    // 当离开组件时，结束调用
        if (this.$socket) this.$socket.disconnect()  // 如果socket连接存在，销毁socket连接
        console.log('连接已断开')
    }
};
</script>
<style>
/* 减小按钮的大小 */
.el-button {
    padding: 7px 13px; /* 设置按钮内边距，控制按钮大小 */
    font-size: 12px; /* 设置按钮文字大小 */
}
</style>
