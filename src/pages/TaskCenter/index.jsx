import React, { useState, useEffect } from 'react'
import './index.css'
import { Route } from 'react-router-dom'
import PopUp from '../PopUp'
import bgImg from './images/havebeensigned.png'
import {
    reqWeekState,
    reqFlagBtn,
    reqPointSignIn,
    reqPointsAmount,
    reqNewTask,
    reqEveryDayTask
} from '../../api'

function TaskCenter(props) {

    useEffect(() => {
        // 获取一周的签到状态
        getWeekState();
        // 获取剩余积分及抽奖次数
        getPointsAmount();
        // 获取新手任务的数据
        getNewTask();
        // 获取每日任务的数据
        getEveryDayTask()
    }, [])

    // 判断是否签到 0 表示签到过期  1表示已签到  2表示未签到
    const [weekState, setWeekState] = useState([2, 2, 2, 2, 2, 2, 2])
    async function getWeekState() {
        let result = await reqWeekState()
        if (result.msg === 'ok') {
            setWeekState((weekState) => weekState = result.data)
        }
    }

    // 把开关的状态传给服务器
    const [flag, setflag] = useState(1)
    async function getFlagBtn(flagC) {
        let result = await reqFlagBtn(flagC);
        console.log(result);
    }

    // 积分签到
    async function getPointSignIn() {
        let result = await reqPointSignIn();
        console.log(result);
    }

    const [PointAndamount, setPointAndamount] = useState({ points: 0 })
    // 获取剩余积分及抽奖次数 
    async function getPointsAmount() {
        let result = await reqPointsAmount();
        if (result.msg === 'ok') {
            setPointAndamount(result.data)
        }
    }

    // 新手任务
    const [task, setTask] = useState({})
    async function getNewTask() {
        let result = await reqNewTask();
        if (result.msg === 'ok') {
            setTask(result.data[0])
        }
    }


    // 每日任务
    const [EveryTask, setEveryTask] = useState([])
    async function getEveryDayTask() {
        let result = await reqEveryDayTask();
        console.log(result);
        if (result.msg === 'ok') {
            setEveryTask(result.data)
        }
    }
    console.log(EveryTask);

    const tabData = ['新手任务', '每日任务']

    const [num, setNum] = useState(0)

    // 已签到的按钮颜色
    let btn_signIn_gray = {
        background: '#CCCCCC',
    }

    // 领取积分后的背景颜色
    let signbgColor = {
        backgroundColor: 'rgba(253, 192, 4, 1)',
        color: '#FFF'
    }

    // 领取积分后的图标
    let signImg = {
        width: '31px',
        height: '31px',
        backgroundImage: `url(${bgImg})`,
    }

    // 返回上一级
    function goBack() {
        props.history.goBack()
    }

    // 跳转到PopUp页面
    function pushPopUp(event) {
        props.history.push('/taskcenter/popup')
        // 限制签到按钮次数
        event.target.disabled = true
        setflag(2)
        getFlagBtn(flag)
        // 点击按钮实现积分签到
        getPointSignIn()
    }

    // 跳转到积分商城
    function pushIntegrate() {
        props.history.push('/integrate')
    }


    // tab栏选中的样式
    let active = {
        color: '#FB8042',
        paddingBottom: '5px',
        borderBottom: '2px solid #FB8042',
    }

    // tab栏切换
    function tabChange(index) {
        return () => {
            setNum(index)
        }
    }

    return (
        <div>
            <div className='TaskCenterBox'>

                <div className='TaskCenter_box'>

                    <div className='TaskCenterHeader'>
                        <span onClick={goBack} ></span>
                        <span>任务中心</span>
                        <span></span>
                    </div>

                    <div className='current_integral'>
                        <div className='box_left'>
                            <div className='left_top'>
                                <span></span>
                                <span>当前积分</span>
                                <span></span>
                            </div>
                            <div className='left_center'>
                                {PointAndamount.points}
                            </div>
                            <div className='left_bottom'>
                                今日待获得积分<span>1170</span>分
                            </div>
                        </div>
                        <div className='right_btn' onClick={pushIntegrate}>积分商城</div>
                    </div>

                    <div className='signIn_box'>
                        <p>已连续签到<span>1天</span></p>
                        <p>每日签到，获得5积分，连续签到7天，获得额外10积分</p>
                        <ul>
                            {
                                weekState.map((item, index) => {
                                    return (
                                        <li key={index} style={item === 1 ? signbgColor : null}>
                                            <span style={item === 1 ? signImg : null} ></span>
                                            {
                                                item === 0 ?
                                                    <span style={{ fontSize: '10px' }}>已过期</span> :
                                                    item === 1 ?
                                                        <span style={{ color: '#FFF' }}>已签到</span> :
                                                        <span>+5</span>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className='btn_signIn'>
                            <button onClick={pushPopUp} style={flag === 1 ? null : btn_signIn_gray} >{flag === 1 ? '签到' : '已签到'}</button>
                        </div>
                    </div>

                    <div className='tab_box'>
                        <ul>
                            {tabData.map((item, index) =>
                                <li key={index} onClick={tabChange(index)} style={num === index ? active : null} >{item}</li>
                            )}
                        </ul>
                        <div className="tab_content">
                            <div className='newTask' style={{ display: (num === 0) ? 'block' : 'none' }}>
                                <p>新手任务</p>
                                <ul>
                                    <li></li>
                                    <li>
                                        <span>{task.name}</span>
                                        <p>每完善一项<span>+{task.points}</span>分，最高180分</p>
                                    </li>
                                    <li>去完成</li>
                                </ul>
                            </div>
                            <div className='everyTask_box' style={{ display: (num === 1) ? 'block' : 'none' }}>
                                <ul>
                                    {
                                        EveryTask.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <span></span>
                                                    <span>
                                                        <p>{item.name}</p>
                                                        <p>完成此项<em>+{item.points}</em>分</p>
                                                    </span>
                                                    <span>去完成</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='league'>
                        <button>我要加盟</button>
                    </div>
                </div>
            </div>
            <Route path={'/taskcenter/popup'} component={PopUp} ></Route>
        </div>
    )
}

// 暴露出去
export default TaskCenter