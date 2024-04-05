
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>记录公告详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 10px;"></div>
        <div style="font-size: 12px; font-weight: bold; color: black; margin-bottom: 10px;">
            进度条
        </div>
        <StageBar :stages="['发布者发布公告', '记录者记录公告', '发布者确认接收', '记录者确认记录', '记录者已反馈消息']" :currentStage="currentStage" />
        <div style="margin-bottom: 40px;"></div>

        <div>
            <div class="note-card" >
                <p><strong>节点ID:</strong> {{ data1.nodeid }}</p>
                <p><strong>节点IP:</strong> {{ data1.ip }}</p>
                <p><strong>端口号:</strong> {{ data1.port }}</p>
                <p><strong>协议:</strong> HTTP协议</p>
                <p><strong>公告名称:</strong> {{ data1.id }}</p>
                <p><strong>发布时间:</strong> {{ data1.timestamp }}</p>
                <p><strong>所处阶段:</strong> {{ data1.stage }}</p>
                <p>
                    <strong>发布策略:</strong>
                    <el-button type="text" @click="viewStrategy1(data1)">确认记录策略</el-button>
                </p>
                <p>
                    <strong>查看:</strong>
                    <el-button type="text" @click="viewAnnouncement2(data1)">公告内容</el-button>
                    <el-button type="text" @click="viewRecords(data1)">记录列表</el-button>
                </p>
                <p>
                    <strong>各阶段详细日志:</strong>
                    <el-button type="text" @click="log4(data1)">记录者记录公告</el-button>
                    <el-button type="text" @click="log5(data1)">记录者确认记录</el-button>
                </p>

            </div>
        </div>

        <el-dialog
            width="30%"
            title="公告内容"
            :visible.sync="dialogFormVisibleed">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="确认记录策略"
            :visible.sync="dialogFormVisibleed1">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="记录者记录公告"
            :visible.sync="dialogFormVisibleed2">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="记录者确认记录"
            :visible.sync="dialogFormVisibleed4">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
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
        <el-dialog
            width="30%"
            title="记录者记录公告"
            :visible.sync="dialogFormVisibleed5">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="记录者确认记录"
            :visible.sync="dialogFormVisibleed6">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
    </div>
</template>

<script>
import StageBar from "../common/Stagebar.vue";
import main from "../../main";

export default {
    components: {
        StageBar
    },
    data() {
        return {
            currentStage: {}, // 这个值可以根据后端到达的阶段进行动态设置
            dialogFormVisibleed: false,
            dialogFormVisibleed1: false,
            dialogFormVisibleed2: false,
            dialogFormVisibleed3: false,
            dialogFormVisibleed4: false,
            dialogFormVisibleed5: false,
            dialogFormVisibleed6: false,
            announcementData: [],
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
            this.$http.post(main.url+"/log/list", null)
                .then(
                    success=>{
                        for(let i=0;i<success.data.length;i++){
                            if(success.data[i].id !== this.$route.params.id)
                                continue;
                            this.data1=success.data[i]
                            break;
                        }
                        if(this.data1.stage==="4"){
                            this.data1.stage = "5";
                        }
                        this.currentStage = this.data1.stage;
                        console.log(this.currentStage);
                        if(this.data1.nodeid==="1")
                            this.data1.nodeid = "CN";
                        else if(this.data1.nodeid==="2")
                            this.data1.nodeid = "RU";
                        else if(this.data1.nodeid==="3")
                            this.data1.nodeid = "PK";
                        else if(this.data1.nodeid==="4")
                            this.data1.nodeid = "KZ";
                        else if(this.data1.nodeid==="5")
                            this.data1.nodeid = "MO";

                        if(this.data1.ip==="stack_node1")
                            this.data1.ip = "43.139.2.243";
                        else if(this.data1.ip==="stack_node2")
                            this.data1.ip = "43.139.138.127";
                        else if(this.data1.ip==="stack_node3")
                            this.data1.ip = "43.139.9.116";
                        else if(this.data1.ip==="stack_node4")
                            this.data1.ip = "159.75.128.168";
                        else if(this.data1.ip==="stack_node5")
                            this.data1.ip = "159.75.131.241";

                        if(this.data1.stage==="2")
                            this.data1.stage = "记录公告";
                        else if(this.data1.stage==="5")
                            this.data1.stage = "记录者确认记录";
                    }
                );
        },
        log4(row) {
            this.dialogFormVisibleed5=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/log4",
                {
                    'id': row.id
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(response => {
                    this.jsonContent = response.data;
                    let fileContent = ""; // 用于存储格式化后的文件内容
                    for(let i = 0; i < this.jsonContent.length; i++) {
                        fileContent += this.jsonContent[i] + "\n";
                    }
                    this.fileContent = fileContent;
                });
        },
        log5(row) {
            this.dialogFormVisibleed6=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/log5",
                {
                    'id': row.id
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(response => {
                    this.jsonContent = response.data;
                    let fileContent = ""; // 用于存储格式化后的文件内容
                    for(let i = 0; i < this.jsonContent.length; i++) {
                        fileContent += this.jsonContent[i] + "\n";
                    }
                    this.fileContent = fileContent;
                });
        },
        viewAnnouncement2(row){
            this.dialogFormVisibleed=true
            this.fileContent = ''
            this.$http.post(main.url+"/an2/check",
                {
                    'id': row.id
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(response => {
                    this.fileContent = response.data;  // 将文件内容显示在文本框中
                });
        },
        viewStrategy1(row){
            this.dialogFormVisibleed1=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/strategy3",
                {
                    'id': row.id
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(response => {
                    this.jsonContent = response.data;
                    for(let i=0;i<this.jsonContent.length;i++){
                        if(this.jsonContent[i].nodeid==="1")
                            this.jsonContent[i].nodeid = "CN";
                        else if(this.jsonContent[i].nodeid==="2")
                            this.jsonContent[i].nodeid = "RU";
                        else if(this.jsonContent[i].nodeid==="3")
                            this.jsonContent[i].nodeid = "PK";
                        else if(this.jsonContent[i].nodeid==="4")
                            this.jsonContent[i].nodeid = "KZ";
                        else if(this.jsonContent[i].nodeid==="5")
                            this.jsonContent[i].nodeid = "MO";

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
                    this.fileContent = JSON.stringify(this.jsonContent);  // 将文件内容显示在文本框中
                });
        },
        viewRecords(row){
            this.dialogFormVisibleed3=true
            this.jsonContent = []
            this.$http.post(main.url+"/record/check",
                {
                    'id': row.id
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

                        if(this.jsonContent[i].nodeid==="1")
                            this.jsonContent[i].nodeid = "CN";
                        else if(this.jsonContent[i].nodeid==="2")
                            this.jsonContent[i].nodeid = "RU";
                        else if(this.jsonContent[i].nodeid==="3")
                            this.jsonContent[i].nodeid = "PK";
                        else if(this.jsonContent[i].nodeid==="4")
                            this.jsonContent[i].nodeid = "KZ";
                        else if(this.jsonContent[i].nodeid==="5")
                            this.jsonContent[i].nodeid = "MO";

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
        }
    }
};
</script>
<style>
/* 减小按钮的大小 */
.el-button {
    padding: 3px 5px;
    font-size: 13px;
}
.note-card {
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    font-family: Arial, sans-serif;
}
.note-card p {
    margin: 5px 0;
}
.note-card .action-buttons {
    margin-top: 10px;
}
.note-card .action-buttons button {
    margin-right: 10px;
}
</style>
