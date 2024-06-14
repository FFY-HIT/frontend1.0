<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>密钥管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            查看密钥对
        </div>
        <div>
            <el-table :data="Data" border style="width: 100%" ref="multipleTable">
                <el-table-column label="密钥" prop="key" width="572px"></el-table-column>
                <el-table-column label="操作" width="572px">
                    <template slot-scope="scope" width="100px">
                        <el-button type="text" @click="checkdata(scope.row)" >查看</el-button>
                        <el-button type="text" @click="downloadfile(scope.row)" >下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-bottom: 10px;"></div>
        <div>
            <el-button type="warning" @click="generatekey()">更新密钥对</el-button>
        </div>

        <el-dialog
            width="30%"
            title="查看密钥"
            :visible.sync="dialogFormVisibleed">
            <textarea v-model="fileContent" rows="30px" cols="95px" :style="{ resize: 'none' }" :readonly="true"></textarea>
        </el-dialog>

    </div>
</template>

<script>
import main from "../../main";
export default {
    data: function(){
        return {
            dialogFormVisibleed:false,
            Data: [
                {"key": "公钥"},
                {"key": "私钥"}
            ],
            fileContent: ''  // 存储文件内容的变量
        }
    },
    created(){
        if(localStorage.getItem('username')===""){
            this.$router.replace('/login')
        }
    },
    methods:{
        checkdata(row) {
            this.dialogFormVisibleed=true
            this.$http.post(main.url+"/key/check",
                {
                    'filename': row.key
                },
                {
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    emulateJSON: true
                })
                .then(response => {
                    this.fileContent = response.data;  // 将文件内容显示在文本框中
                });
        },
        downloadfile(row) {
            this.$http.post(main.url+"/key/check",
                {
                    'filename': row.key
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
                    if(row.key === "公钥")
                        link.download = "public_key.asc"; // 设置下载文件名
                    else
                        link.download = "private_key.asc";
                    // 将 <a> 元素添加到 DOM 中，模拟点击
                    document.body.appendChild(link);
                    link.click();

                    // 清理工作
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                });
        },
        generatekey() {
            this.$http.post(main.url+"/key/generate",null)
                .then(response => {
                    if (response.data === "1") {
                        this.$message({type: 'success', message: '密钥更新成功'});
                        this.init();
                    } else if (response.data === "-1") {
                        this.$message.error('密钥更新失败');
                    } else {
                        this.$message.error('未知错误');
                    }
                });
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

