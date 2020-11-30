import {get, get2, post, post2, post3 } from '@/network/request'

//用户注册模块

// export const role = (params) => get('/role/roles', params) //年龄复选框
export const college = (url) => get2(url) //学院复选框
export const class_name = (url) => get2(url) //班级复选框
export const grade = (params) => get2('/grade/grades', params) //年级复选框
export const register = (data) => post2('/register', data) //注册信息模块


//用户登录模块
export const loginStu = (data) => post('/admin/login', data) //学生登录模块
export const loginadmin = (data) => post('/admin/login', data) //教师登录模块

//数据获取模块
export const dateFind = (data) => post2('/admin/records', data) //日历查询数据
export const havingdefaultClass = (url) => get2(url) // 获取上课班级模块
export const havingClass = (url) => get2(url) // 获取上课班级模块
export const purchCardClass = (url, data) => post3(url, data) // 获取打卡信息模块
export const absentClass = (url, data) => post3(url, data) //获取缺勤数据
export const picStateClass = (url, data) => post2(url, data) // 获取上课图片
export const picJudged = (data) => post2('222.24.63.62:10040/receiveImg', data) // 获取上课状态图