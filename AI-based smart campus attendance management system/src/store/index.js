import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    //初始化获取sessionStorage.getItem('token')，这样子刷新页面无需重新登录
    user: window.sessionStorage.getItem('user'),
    token: window.sessionStorage.getItem('token'),
    date: '',
    barData: {},
    lineData: {},
    pieData: {},
    subjectNow: {},
    subjectFutrue: {},
    chooseClass: "",
    tableData: [],
    purchCardlastData: [],
    normalData: []
}
const getters = {
    getChangeDate(state) {
        return state.date
    },
    getChangebarData(state) {
        return state.barData
    },
    getChangelineData(state) {
        return state.lineData
    },
    getChangepieData(state) {
        return state.pieData
    }
}
const mutations = {
    // 将数据保存在seesionStorge里， token表示登陆状态
    SET_TOKEN: (state, data) => {
        state.token = data;
        window.sessionStorage.setItem('token', data)
    },
    //获取用户名
    GET_USER: (state, data) => {
        state.user = data;
        window.sessionStorage.setItem('user', data)
    },
    LOGOUT: (state) => {
        state.token = null
        state.user = null
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('user')
    },
    save_date(state, newdate) {
        state.date = newdate;
    },
    save_barData(state, newdata) {
        state.barData = newdata;
    },
    save_lineData(state, newdata) {
        state.lineData = newdata;
    },
    save_pieData(state, newdata) {
        state.pieData = newdata;
    },
    //获取当前上课的班级
    GET_SUBJECTNOW: (state, data) => {
        state.subjectNow = data;
        // window.sessionStorage.setItem('user', data)
    },
    //获取当前上课的班级
    GET_SUBJECTFUTURE: (state, data) => {
        state.subjectFutrue = data;
        // window.sessionStorage.setItem('user', data)
    },
    GET_CHOOSECLASS: (state, data) => {
        state.chooseClass = data;

    },
    GET_TABLEDATA: (state, data) => {
        state.tableData = data;
    },
    GET_PURCHDATA: (state, data) => {
        state.purchCardlastData = data;
    },
    GET_NORMALDATA: (state, data) => {
        state.normalData = data;
    }

}
const actions = {
    newDate(context) {
        context.commit(newDate)
    },
    newbarData(context) {
        context.commit(newData)
    },
    newlineData(context) {
        context.commit(newData)
    },
    newpieData(context) {
        context.commit(newData)
    },
    newCollapse(context) {
        context.commit(newData)
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;