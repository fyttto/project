import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router'


let loadingInstance = null; //加载全局的loading

const instance = axios.create({
    timeout: 10000,
    baseURL: 'http://192.168.1.217:8080'
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.withCredentials = true
instance.defaults.crossDomain = true


const instance2 = axios.create({
    timeout: 10000,
    baseURL: 'http://192.168.1.217:8080'
})

instance2.defaults.headers.post['Content-Type'] = 'application/json'
instance2.defaults.withCredentials = true
instance2.defaults.crossDomain = true


const instance3 = axios.create({
    timeout: 10000,
    baseURL: 'http://192.168.1.217:8080'
})

instance2.defaults.headers.post['Content-Type'] = 'application/json'
instance2.defaults.withCredentials = true
instance2.defaults.crossDomain = true



//添加一个请求拦截器
instance.interceptors.request.use(config => {
    loadingInstance = Loading.service({ // 发起请求时加载全局loading，请求失败或有响应时会关闭
        spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })

    // if (config.method === 'get') {
    //     //设置时间防止浏览器(ie)缓存
    //     config.params = {
    //         ...config.params,
    //         t: new Date().getTime()
    //     }
    // }

    return config;
}, error => {
    return Promise.reject(error)
})

//添加响应拦截器
instance.interceptors.response.use(async response => {
        loadingInstance.close()
        if (response.data.status == '2000') {
            // console.log(123)
            Message({
                message: '登录成功',
                type: 'success'
            })
            try {
                return Promise.resolve(response);
            } catch (reason) {
                console.log('catch', reason);
            }
        } else {
            Message({
                    message: response.data.extend.error,
                    type: 'error'
                })
                // console.log(response);
            try {
                return Promise.reject(response.data.extend.error);
            } catch (reason_1) {
                console.log(reason_1);
            }
        }
    }, async error => {
        loadingInstance.close()
        if (error.extend) {
            // 根据请求失败的http状态码去给用户相应的提示
            let tips = error.extend.status in httpCode ? httpCode[error.data.extend.status] : error.data.extend.error
            Message({
                message: tips,
                type: 'error'
            })
            if (error.data.extend.status === 401) { // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
                router.push({
                    path: `/login`
                })
            }
            try {
                return Promise.reject(error);
            } catch (reason) {
                console.log(reason);
            }
        } else {
            Message({
                message: '请求超时, 请刷新重试',
                type: 'error'
            })
            try {
                return Promise.reject(new Error('请求超时, 请刷新重试'));
            } catch (reason_1) {
                console.log(reason_1);
            }
        }

    })
    //添加一个请求拦截器
instance2.interceptors.request.use(config => {
    // config.headers['token'] = sessionStorage.getItem('token') || ''
    loadingInstance = Loading.service({ // 发起请求时加载全局loading，请求失败或有响应时会关闭
        spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    let token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.token = `${token}`;
    }

    // if (config.method === 'get') {
    //     //设置时间防止浏览器(ie)缓存
    //     config.params = {
    //         ...config.params,
    //         t: new Date().getTime()
    //     }
    // }
    // if (store.state.token) {
    //     config.headers.Authorization = store.state.token;
    // }
    return config;
}, error => {
    return Promise.reject(error)
})

//添加响应拦截器
instance2.interceptors.response.use(async response => {
    loadingInstance.close()
        // if (response.data.status == "4000") {
        //     console.log(response.data.extend.error)
        // }
    if (response.data.status == '2000') {

        try {
            return Promise.resolve(response.data);
        } catch (reason) {
            console.log('catch', reason);
        }
    } else {
        if (response.data.extend.error.length >= 2)
            Message({
                message: response.data.extend.error,
                type: 'error'
            })
        console.log(response);

        try {
            return Promise.reject(response.data.extend.error);
        } catch (err) {
            console.log(err);
        }
    }

}, async error => {
    loadingInstance.close()
    if (error.extend) {
        // 根据请求失败的http状态码去给用户相应的提示
        let tips = error.data.extend.error[0]
        Message({
            message: tips,
            type: 'error'
        })
        try {
            return Promise.reject(error);
        } catch (reason) {
            console.log(reason);
        }
    } else {
        Message({
            message: '请求超时, 请刷新重试',
            type: 'error'
        })
        try {
            return Promise.reject(new Error('请求超时, 请刷新重试'));
        } catch (reason_1) {
            console.log(reason_1);
        }
    }

})



//添加一个请求拦截器
instance3.interceptors.request.use(config => {
    // config.headers['token'] = sessionStorage.getItem('token') || ''
    loadingInstance = Loading.service({ // 发起请求时加载全局loading，请求失败或有响应时会关闭
        spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    let token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.token = `${token}`;
    }

    // if (config.method === 'get') {
    //     //设置时间防止浏览器(ie)缓存
    //     config.params = {
    //         ...config.params,
    //         t: new Date().getTime()
    //     }
    // }
    // if (store.state.token) {
    //     config.headers.Authorization = store.state.token;
    // }
    return config;
}, error => {
    return Promise.reject(error)
})

//添加响应拦截器
instance3.interceptors.response.use(async response => {
    loadingInstance.close()
        // if (response.data.status == "4000") {
        //     console.log(response.data.extend.error)
        // }

    if (response.data.status == '2000') {
        // console.log(response)
        Message({
            message: '数据获取成功',
            type: 'success'
        })
        try {
            return Promise.resolve(response);
        } catch (reason) {
            console.log('catch', reason);
        }
    } else {
        if (response.data.status == '4000')
            Message({
                message: response.data.extend.error,
                type: 'error'
            })
            // console.log(response);

        try {
            return Promise.reject(response);
        } catch (err) {
            console.log(err);
        }
    }

}, async error => {
    loadingInstance.close()
    if (error.extend) {
        // 根据请求失败的http状态码去给用户相应的提示
        let tips = error.data.extend.error[0]
        Message({
            message: tips,
            type: 'error'
        })
        try {
            return Promise.reject(error);
        } catch (reason) {
            console.log(reason);
        }
    } else {
        Message({
            message: '请求超时, 请刷新重试',
            type: 'error'
        })
        try {
            return Promise.reject(new Error('请求超时, 请刷新重试'));
        } catch (reason_1) {
            console.log(reason_1);
        }
    }

})

export const post3 = (url, data, config = {}) => {
        return new Promise((resolve, reject) => {
            instance3({
                method: 'post',
                url,
                data,
                ...config
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
    /* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })



} /* 统一封装post请求  */
export const post2 = (url, data, config = {}) => {
        return new Promise((resolve, reject) => {
            instance2({
                method: 'post',
                url,
                data,
                ...config
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
    /* 统一封装get请求 */
export const get2 = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance2({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}


export default axios