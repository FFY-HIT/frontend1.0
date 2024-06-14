
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>发布公告详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 10px;"></div>
        <div style="font-size: 12px; font-weight: bold; color: black; margin-bottom: 10px;">
            进度条
        </div>
        <StageBar :stages="['发布者发布公告', '记录者记录公告', '发布者确认接收', '记录者确认记录', '发布者确认公开']" :currentStage="currentStage" :timeStamp="timeStamp" />
        <div style="margin-bottom: 40px;"></div>

        <div>
            <div class="note-card" >
                <p><strong>节点ID:</strong> {{ data.nodeid }}</p>
                <p><strong>节点IP:</strong> {{ data.ip }}</p>
                <p><strong>端口号:</strong> {{ data.port }}</p>
                <p><strong>协议:</strong> HTTP协议</p>
                <p><strong>公告名称:</strong> {{ data.id }}</p>
                <p><strong>发布时间:</strong> {{ data.timestamp }}</p>
                <p><strong>所处阶段:</strong> {{ data.stage }}</p>
                <p>
                    <strong>发布策略:</strong>
                    <el-button type="text" @click="viewStrategy1(data)">确认接收策略</el-button>
                    <el-button type="text" @click="viewStrategy2(data)">确认公开策略</el-button>
                </p>
                <p>
                    <strong>查看:</strong>
                    <el-button type="text" @click="viewAnnouncement1(data)">公告内容</el-button>
                    <el-button type="text" @click="viewReceivers(data)">接收列表</el-button>
                    <el-button type="text" @click="viewpublics(data)">公开列表</el-button>
                </p>
                <p>
                    <strong>各阶段详细日志:</strong>
                    <el-button type="text" @click="log1(data)">发布者发布公告</el-button>
                    <el-button type="text" @click="log2(data)">发布者确认接收</el-button>
                    <el-button type="text" @click="log3(data)">发布者确认公开</el-button>
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
            title="确认接收策略"
            :visible.sync="dialogFormVisibleed3">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="确认公开策略"
            :visible.sync="dialogFormVisibleed4">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="发布者发布公告"
            :visible.sync="dialogFormVisibleed5">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="发布者确认接收"
            :visible.sync="dialogFormVisibleed6">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>
        <el-dialog
            width="30%"
            title="发布者确认公开"
            :visible.sync="dialogFormVisibleed7">
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
            currentStage: Number,
            timeStamp: [],
            dialogFormVisibleed: false,
            dialogFormVisibleed1: false,
            dialogFormVisibleed2: false,
            dialogFormVisibleed3: false,
            dialogFormVisibleed4: false,
            dialogFormVisibleed5: false,
            dialogFormVisibleed6: false,
            dialogFormVisibleed7: false,
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
                        for(let i=0;i<success.data.length;i++){
                            if(success.data[i].id !== this.$route.params.id)
                                continue;
                            this.data=success.data[i]
                            break;
                        }

                        this.currentStage = this.data.stage;
                        console.log(this.currentStage);

                        if(this.data.ip==="stack_node1")
                            this.data.ip = "43.139.2.243";
                        else if(this.data.ip==="stack_node2")
                            this.data.ip = "43.139.138.127";
                        else if(this.data.ip==="stack_node3")
                            this.data.ip = "43.139.9.116";
                        else if(this.data.ip==="stack_node4")
                            this.data.ip = "159.75.128.168";
                        else if(this.data.ip==="stack_node5")
                            this.data.ip = "159.75.131.241";

                        if(this.data.stage==="1")
                            this.data.stage = "发布公告";
                        else if(this.data.stage==="3")
                            this.data.stage = "发布者确认接收";
                        else if(this.data.stage==="5")
                            this.data.stage = "发布者确认公开";
                    }
                );
            this.$http.post(main.url+"/timestamp/publisher",
                {
                    'id': this.$route.params.id
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(
                    success=>{
                        // this.data = ["111", "222", "333", "444", "555"]
                        this.data = success.data
                        this.timeStamp[0] = this.data[0]
                        this.timeStamp[2] = this.data[1]
                        this.timeStamp[4] = this.data[2]
                    }
                )
        },
        log1(row) {
            this.dialogFormVisibleed5=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/log1",
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
        log2(row) {
            this.dialogFormVisibleed6=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/log2",
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
        log3(row) {
            this.dialogFormVisibleed7=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/log3",
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
        viewStrategy1(row){
            this.dialogFormVisibleed3=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/strategy1",
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
        viewStrategy2(row){
            this.dialogFormVisibleed4=true
            this.fileContent = ''
            this.$http.post(main.url+"/view/strategy2",
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
        viewAnnouncement1(row){
            this.dialogFormVisibleed=true
            this.fileContent = ''
            this.$http.post(main.url+"/an1/check",
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
        viewReceivers(row){
            this.dialogFormVisibleed1=true
            this.jsonContent = []
            this.$http.post(main.url+"/receiver/check",
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
        viewpublics(row){
            this.dialogFormVisibleed2=true
            this.jsonContent = []
            this.$http.post(main.url+"/public/check",
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
                        if(this.jsonContent[i].ispublic==="True")
                            this.jsonContent[i].ispublic = "已公开";
                        else
                            this.jsonContent[i].ispublic = "未公开";

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
    },
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
