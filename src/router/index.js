import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../index.vue'], resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../login.vue'], resolve)
        },
        {
            path: '/admin',
            component: resolve => require(['../admin/common/Home.vue'], resolve),
            children:[
                {
                    path: '/system_overview',
                    component: resolve => require(['../admin/page/system_overview.vue'], resolve)
                },
                {
                    path: '/account_admin',
                    component: resolve => require(['../admin/page/account_admin.vue'], resolve)
                },
                {
                    path: '/announcement_overview',
                    component: resolve => require(['../admin/page/announcement_overview.vue'], resolve),
                },
                {
                    path: '/announcemen_overview',
                    component: resolve => require(['../admin/page/announcemen_overview.vue'], resolve),
                },
                {
                    path: '/announcement_admin',
                    component: resolve => require(['../admin/page/announcement_admin.vue'], resolve)
                },
                {
                    path: '/com_admin',
                    component: resolve => require(['../admin/page/com_admin.vue'], resolve)
                },
                {
                    path: '/publisher_strategy',
                    component: resolve => require(['../admin/page/publisher_strategy.vue'], resolve),
                },
                {
                    path: '/logger_strategy',
                    component: resolve => require(['../admin/page/logger_strategy.vue'], resolve),
                },
                {
                    path: '/key_admin',
                    component: resolve => require(['../admin/page/key_admin.vue'], resolve)
                },
                {
                    path: '/publisher_detail/:id',
                    component: resolve => require(['../admin/page/publisher_detail.vue'], resolve)
                },
                {
                    path: '/logger_detail/:id',
                    component: resolve => require(['../admin/page/logger_detail.vue'], resolve)
                }
            ]
        }
    ]
})
