// 当前这个模块：API进行统一管理
import requests from './request';

// 获取一周签到状态
export const reqWeekState = () => requests({url:'/points/getSignInAWeekList',method:'get'})

// 启动或者关闭签到开关
export const reqFlagBtn = (flag) => requests({url:'/points/openSwitch',method:'put',data:{flag:flag}})

// 积分签到
export const reqPointSignIn = () => requests({url:'/points/signIn',method:'post'})

// 获取剩余积分及抽奖次数
export const reqPointsAmount = () => requests({url:'/points/getPointsAmount',method:'get'})

// 新手任务
export const reqNewTask = () => requests({url:'/points/getNewbieTaskList',method:'get'})

// 每日任务
export const reqEveryDayTask = () => requests({url:'/points/getDailyTasksList',method:'get'})

// 获取当前积分多少
export const reqMyPoints = () => requests({url:'/points/getMyPoints',method:'get'})

// 获取积分兑换商品列表
export const reqGoodsList = () => requests({url:'/points/goodsList',method:'get'})

// 获取今日签到情况
export const reqIsSignToday = () => requests({url:'/points/isSignToday',method:'get'})

// 获取积分详情
export const reqPointsDetail = (page,limit) => requests({url:`/points/getPointsDetail?page=${page}&limit=${limit}`,method:'get'})

// 我要兑换商品操作
export const reqGenerateOrder = (data) => requests({url:'/points/generateOrder',method:'post',data})

