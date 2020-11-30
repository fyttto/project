import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载

const Home = () =>
    import ('@/views/homePage/home/home')
const Record = () =>
    import ('@/views/homePage/record/record')

import store from '../store/index'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

const constantRoutes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/homePage/login/login'),
        // hidden: true

    },
    {
        name: 'register',
        path: '/register',
        component: () =>
            import ('@/views/homePage/register/register'),

    },
    {
        name: 'welcome',
        path: '/welcome',
        component: () =>
            import ('@/views/homePage/welcome/welcome'),
        redirect: '/home',
        children: [{
            name: 'home',
            path: '/home',
            component: Home,
            children: [{
                name: 'dataShow',
                path: '/datashow',
                component: () =>
                    import ('../../src/components/tabbar/tabbar-top/tabbar-top.vue')
            }],
            meta: {
                title: '首页',
                // allowback: false
            },

        }, {
            name: 'judge',
            path: '/judge',
            component: () =>
                import ('@/views/judge/judge.vue'),
            meta: {
                title: '申诉审核'
            }

        }, {
            name: 'record',
            path: '/record',
            component: Record,
            meta: {
                title: '档案'
            },
        }, {
            name: 'info',
            path: '/info',
            component: () =>
                import ('@/views/homePage/about/about'),
            meta: {
                title: '个人信息',
                // requireAuth: true //添加字段，说明该路由是需要登陆的
            }
        }, {
            name: 'having-class',
            path: '/having-class',
            component: () =>
                import ('../views/having-class/havingClass.vue'),
            meta: {
                title: '上课信息'
            },
        }, {
            name: 'search',
            path: '/search',
            component: () =>
                import ('../views/findPage/findPage.vue'),
            meta: {
                title: '打卡信息'
            },
            children: [{
                name: 'purchCardTable',
                path: '/search/purchCardTable',
                component: () =>
                    import ('../components/purchCardTable/purchCradTable.vue')
            }]
        }, {
            name: 'more',
            path: '/more',
            component: () =>
                import ('@/views/more/more.vue'),
            children: [{
                name: 'showTable',
                path: '/more/showTable',
                component: () =>
                    import ('../components/table/tableCard.vue')
            }, {
                name: 'normalPurchCard',
                path: '/more/normalPurchCard',
                component: () =>
                    import ('../components/table/normalPurchCard.vue')
            }],
            meta: {
                title: '打卡信息查询',
                // requireAuth: true //添加字段，说明该路由是需要登陆的
            }
        }]
    },

    {
        name: '404',
        path: '/404',
        component: () =>
            import ('../views/error-page/notFound.vue')

    }, {
        path: '*',
        redirect: '/404'
    }


    // {
    //     path: '/401',
    //     component: () =>
    //         import ('@/views/error-page/401'),
    //     hidden: true
    // },
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    mode: 'hash'

})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    const token = store.state.token
        // if (to.meta.requireAuth) { //判断是否需要登陆权限
        //     if (token) {
        //         next()
        //     } else {
        //         console.log('该页面需要登录')
        //         next({
        //             path: '/login'
        //                 //query:{redirect:to.fullpath}//将跳转的路由path作为参数，登陆成功后跳转到该路由 
        //         })
        //     }
        // } else {
        //     next()
        // }
    window.document.title = to.meta.title || 'purchcrad'
    next()
})


export default router