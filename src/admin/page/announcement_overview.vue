
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>发布者公告总览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 10px;"></div>

        <div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" >
                <el-table-column label="节点ID" prop="nodeid" width="95px" ></el-table-column>
                <el-table-column label="节点IP" prop="ip" width="172px" ></el-table-column>
                <el-table-column label="端口号" prop="port" width="90px" ></el-table-column>
                <el-table-column label="发布时间" prop="timestamp" width="198px" ></el-table-column>
                <el-table-column label="公告名称" prop="id" width="224px" ></el-table-column>
                <el-table-column label="所处阶段" prop="stage" width="145px" ></el-table-column>
                <el-table-column label="角色" prop="role" width="85px" ></el-table-column>
                <el-table-column label="操作" width="135px">
                    <template slot-scope="scope" width="100px">
                        <router-link :to="`/publisher_detail/${scope.row.id}`" class="link">详情</router-link>
                        <el-button type="text" @click="downloadfile(scope.row)" class="button">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import main from "../../main";

export default {
    data() {
        return {
            data: []
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
                    for(let i=0;i<this.data.length;i++){
                        if(this.data[i].nodeid==="1")
                            this.data[i].nodeid = "CN";
                        else if(this.data[i].nodeid==="2")
                            this.data[i].nodeid = "RU";
                        else if(this.data[i].nodeid==="3")
                            this.data[i].nodeid = "PK";
                        else if(this.data[i].nodeid==="4")
                            this.data[i].nodeid = "KZ";
                        else if(this.data[i].nodeid==="5")
                            this.data[i].nodeid = "MO";

                        if(this.data[i].ip==="stack_node1")
                            this.data[i].ip = "43.139.2.243";
                        else if(this.data[i].ip==="stack_node2")
                            this.data[i].ip = "43.139.138.127";
                        else if(this.data[i].ip==="stack_node3")
                            this.data[i].ip = "43.139.9.116";
                        else if(this.data[i].ip==="stack_node4")
                            this.data[i].ip = "159.75.128.168";
                        else if(this.data[i].ip==="stack_node5")
                            this.data[i].ip = "159.75.131.241";

                        if(this.data[i].stage==="1")
                            this.data[i].stage = "发布公告";
                        else if(this.data[i].stage==="3")
                            this.data[i].stage = "发布者确认接收";
                        else if(this.data[i].stage==="5")
                            this.data[i].stage = "已完成";
                    }
                }
            )
        },
        downloadfile(row){
            this.$http.post(main.url+"/announcement/check",
                {
                    'filename': row.id + ".zone"
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(response => {
                    const blob = new Blob([response.data]);

                    // 创建 URL 对象
                    const url = window.URL.createObjectURL(blob);

                    // 创建 <a> 元素
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = row.id + ".zone"; // 设置下载文件名

                    // 将 <a> 元素添加到 DOM 中，模拟点击
                    document.body.appendChild(link);
                    link.click();

                    // 清理工作
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                });
        }
    },

    // sockets:{
    //     connect:function () {
    //         console.log('连接成功')   // 判断是否正确连接上后端
    //     },
    //
    //     current_stage:function (stage) {    // api为对应后端发出的信息接口
    //         this.currentStage = stage      // 获取后端发出的信息
    //     }
    // },

    // mounted () {    // 在组件开始渲染时进行调用
    //
    //     this.$socket.connect() // socket连接
    //
    //     setInterval(() => {
    //         this.$socket.emit('get_current_stage');
    //     }, 1000); // 每隔5秒发送一次消息
    //     // this.$socket.emit('get_current_stage')  // 发送消息:对应后端test测试函数
    //     console.log('连接中')
    // },
    //
    // destroyed () {    // 当离开组件时，结束调用
    //     if (this.$socket) this.$socket.disconnect()  // 如果socket连接存在，销毁socket连接
    //     console.log('连接已断开')
    // }
};
</script>
<style>
/* 减小按钮的大小 */
.el-button {
    padding: 7px 13px; /* 设置按钮内边距，控制按钮大小 */
    font-size: 12px; /* 设置按钮文字大小 */
}
.link, .button {
    font-size: 12px; /* 调整为你想要的大小 */
}
</style>
