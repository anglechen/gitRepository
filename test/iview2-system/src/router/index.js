import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/about',
            component: resolve => require(['../components/common/index.vue'], resolve),
            children: [{
                    path: '',
                    component: resolve => require(['../components/common/about.vue'], resolve)
                },
               /* {
                    path: '/form',
                    component: resolve => require(['../components/page/form.vue'], resolve)
                },

                {
                    path: '/viewTable',
                    component: resolve => require(['../components/third/viewTable.vue'], resolve)
                },*/
                {
                    path: '/fullTable',
                    component: resolve => require(['../components/third/fullTable.vue'], resolve)
                }
            ]
        },
        
        {
            path: '/login',
            component: resolve => require(['../components/common/login.vue'], resolve)
        },
    ]
})
