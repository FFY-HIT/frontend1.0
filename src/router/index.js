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
                    path: '/account_admin',
                    component: resolve => require(['../admin/page/account_admin.vue'], resolve)
                },
                {
                    path: '/announcement_overview',
                    component: resolve => require(['../admin/page/announcement_overview.vue'], resolve)
                },
                {
                    path: '/announcement_admin',
                    component: resolve => require(['../admin/page/announcement_admin.vue'], resolve)
                },
                {
                    path: '/trust_admin',
                    component: resolve => require(['../admin/page/trust_admin.vue'], resolve)
                },
                {
                    path: '/strategy_admin',
                    component: resolve => require(['../admin/page/strategy_admin.vue'], resolve)
                },
                {
                    path: '/key_admin',
                    component: resolve => require(['../admin/page/key_admin.vue'], resolve)
                },
                {
                    path: '/welcome',
                    component: resolve => require(['../admin/page/welcome.vue'], resolve)
                }
            ]
        }
    ]
})
