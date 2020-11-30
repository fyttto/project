// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//饿了么ui框引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

//Vuex的使用
import store from './store/index'

//日历组件以及日历样式的引入
import { Calendar } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


//echart框架引入
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//axios框架引入
import axios from 'axios'
Vue.prototype.$axios = axios;

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

//日历组件的ant-design调用
Vue.component(Calendar);
Vue.use(Calendar);

//element-ui的使用
Vue.use(ElementUI);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})