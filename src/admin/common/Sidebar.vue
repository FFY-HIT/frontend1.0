<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.title">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items:
                    [
                        {
                            icon: 'el-icon-setting',
                            index: 'system_overview',
                            title: '系统总览'
                        },
                        {
                            icon: 'el-icon-setting',
                            title: '发布者模块',
                            subs:[
                                {
                                    index: 'announcement_overview',
                                    title: '发布者公告总览'
                                },
                                {
                                    index: 'announcement_admin',
                                    title: '公告管理'
                                },
                                {
                                    index: 'publisher_strategy',
                                    title: '发布者策略管理'
                                }
                            ]
                        },
                        {
                            icon: 'el-icon-setting',
                            title: '记录者模块',
                            subs:[
                                {
                                    index: 'announcemen_overview',
                                    title: '记录者公告总览'
                                },
                                {
                                    index: 'logger_strategy',
                                    title: '记录者策略管理'
                                }
                            ]
                        },
                        {
                            icon: 'el-icon-setting',
                            title: '系统配置',
                            subs:[
                                {
                                    index: 'com_admin',
                                    title: '通信管理'
                                },
                                {
                                    index: 'key_admin',
                                    title: '密钥管理'
                                },
                                {
                                    index: 'account_admin',
                                    title: '用户管理',
                                }
                            ]
                        }
                    ]
            }
        },
        created(){
            if(localStorage.getItem('username')===""){
                this.$router.replace('/login');
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
