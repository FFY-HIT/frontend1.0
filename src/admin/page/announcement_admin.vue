<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 管理</el-breadcrumb-item>
                <el-breadcrumb-item>公告管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            编辑公告
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column label="HOST" prop="HOST" width="228px">
                    <template slot-scope="scope">
                        <input v-model="scope.row.HOST" class="light-input" style="width: 188px;" />
                    </template>
                </el-table-column>
                <el-table-column label="TTL" prop="TTL" width="229px">
                    <template slot-scope="scope">
                        <input v-model="scope.row.TTL" class="light-input" style="width: 189px;" />
                    </template>
                </el-table-column>
                <el-table-column label="CLASS" prop="CLASS" width="229px">
                    <template slot-scope="scope">
                        <input v-model="scope.row.CLASS" class="light-input" style="width: 189px;" />
                    </template>
                </el-table-column>
                <el-table-column label="TYPE" prop="TYPE" width="229px">
                    <template slot-scope="scope">
                        <input v-model="scope.row.TYPE" class="light-input" style="width: 189px;" />
                    </template>
                </el-table-column>
                <el-table-column label="RDATA" prop="RDATA" width="229px">
                    <template slot-scope="scope">
                        <input v-model="scope.row.RDATA" class="light-input" style="width: 189px;" />
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin-bottom: 10px;"></div>
        <el-button @click="addNewRow()" align="center">新建表格</el-button>
        <el-button @click="deleteRow()" align="center">删除表格</el-button>
        <el-button @click="generateFile()" align="center">生成公告</el-button>
        <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
        <el-button @click="selectfile()" align="center">选择文件</el-button>
        <el-button @click="publish()" align="center">发布公告</el-button>
        <div style="margin-bottom: 10px;"></div>

        <div style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 10px;">
            查看公告
        </div>
        <div>
            <el-table :data="announcementData" border style="width: 100%" ref="multipleTable">
                <el-table-column label="公告名称" prop="filename" width="382px"></el-table-column>
                <el-table-column label="版本号" prop="version" width="381px"></el-table-column>
                <el-table-column label="操作" width="381px">
                    <template slot-scope="scope" width="100px">
                        <el-button type="text" @click="checkdata(scope.row)" >查看</el-button>
                        <el-button type="text" @click="downloadfile(scope.row)" >下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            width="30%"
            title="查看公告"
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
            form:{
                ip:'',
                port:''
            },
            tableData: [
                { HOST: '', TTL: '', CLASS: '', TYPE: '', RDATA: '' }
            ],
            announcementData: [],
            fileContent: ''  // 存储文件内容的变量
        }
    },
    created(){
        if(localStorage.getItem('username')===""){
            this.$router.replace('/login')
        }else{this.init();}
    },
    methods:{
        init() {
            this.$http.post(main.url+"/announcement/list", null).then(
                success=>{
                    this.announcementData=success.data;
                    for(let i=0;i<this.announcementData.length;i++){}
                }
            );
        },
        checkdata(row) {
            this.dialogFormVisibleed=true
            this.fileContent = ''
            this.$http.post(main.url+"/announcement/check",
            {
                'filename': row.filename
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
            this.$http.post(main.url+"/announcement/check",
                {
                    'filename': row.filename
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
                    link.download = row.filename; // 设置下载文件名

                    // 将 <a> 元素添加到 DOM 中，模拟点击
                    document.body.appendChild(link);
                    link.click();

                    // 清理工作
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                });
        },
        addNewRow() {
            this.tableData.push({ HOST: '', TTL: '', CLASS: '', TYPE: '', RDATA: '' });
        },
        deleteRow() {
            if (this.tableData.length > 0) {
                this.tableData.pop(); // 删除数组中的最后一个元素
            }
        },
        handleFileChange() {
            const formData = new FormData();
            formData.append('file', this.$refs.fileInput.files[0]);

            this.uploadFile(formData);
        },

        selectfile(){
            this.$refs.fileInput.click();
        },
        uploadFile(formData) {
            this.$http.post(main.url + "/file/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.data === "1") {
                    this.$message({type: 'success', message: '文件上传成功'});
                    this.init();
                } else if (response.data === "-1") {
                    this.$message.error('文件上传失败');
                } else {
                    this.$message.error('未知错误');
                }
            });
        },
        publish() {
            this.$http.post(main.url + "/test/publish", null)
            .then(response => {
                if (response.data === "1") {
                    this.$message({type: 'success', message: '公告发布成功'});
                    this.init();
                } else if (response.data === "-1") {
                    this.$message.error('公告发布失败');
                } else {
                    this.$message.error('未知错误');
                }
            });
        },

        generateFile() {
            // 获取每列的最大长度
            const columnLengths = {};
            this.tableData.forEach(row => {
                for (const key in row) {
                    if (row.hasOwnProperty(key)) {
                        const value = String(row[key]);
                        columnLengths[key] = Math.max(columnLengths[key] || 0, value.length);
                    }
                }
            });

            let zoneContent = '';
            this.tableData.forEach(row => {
                for (const key in row) {
                    if (row.hasOwnProperty(key)) {
                        const value = String(row[key]);
                        const padding = ' '.repeat(columnLengths[key] - value.length); // 计算需要补充的空格数量
                        zoneContent += value + padding + '\t'; // 使用字段值和空格填充连接，并添加制表符
                    }
                }
                zoneContent = zoneContent.trim() + '\n'; // 去除末尾多余的制表符，添加换行符
            });
            const fileName = window.prompt('请输入文件名:');
            if (fileName) {
                // 创建文件并下载
                const blob = new Blob([zoneContent], { type: 'text/plain' });
                const formData = new FormData();
                formData.append('file', blob, fileName);

                this.$http.post(main.url + "/file/add", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    response => {
                        if (response.data === "1") {
                            this.$message({type: 'success', message: '文件上传成功'});
                            this.init();
                        } else if (response.data === "-1") {
                            this.$message.error('文件上传失败');
                        } else {
                            this.$message.error('未知错误');
                        }
                    }
                );
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
    .light-input {
        opacity: 0.5; /* 设置输入框的透明度，值在0到1之间，越小越浅 */
    }
</style>
