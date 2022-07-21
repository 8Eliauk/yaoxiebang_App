import React, { useState, useEffect } from 'react'
import './index.css'
import { Route } from 'react-router-dom'
import IntegrateTicket from '../IntegrateTicket'
import ForRecord from '../ForRecord'
import { reqPointsAmount, reqGoodsList } from '../../api'
function Integrate(props) {

    useEffect(() => {
        // 获取剩余积分及抽奖次数 
        getPointsAmoun();
        // 获取积分兑换商品列表
        getGoodsList();
    }, [])

    // 获取剩余积分及抽奖次数
    const [Point, setPoint] = useState({});
    async function getPointsAmoun() {
        let result = await reqPointsAmount()
        if (result.msg === 'ok') {
            setPoint(result.data)
        }
    }

    // 获取积分兑换商品列表
    const [GoodsList, setGoodsList] = useState([]);
    async function getGoodsList() {
        let result = await reqGoodsList();
        if (result.msg === 'ok') {
            setGoodsList(result.data);
        }
    }


    // 存储数据
    // 积分商城超值优惠数据

    // 返回首页
    function goBack() {
        props.history.push('/home');
    }

    // 跳转到优惠券
    function pushIntegrateTicket(id) {
        return () => {
            if (id === 1) {
                props.history.push('/integrate/integrateticket')
            }
        }
    }

    // 跳转到兑换记录页面
    function pushForRecord() {
        // console.log(props);
        console.log(123);
        props.history.push('/integrate/forrecord')
    }

    return (
        <div>
            <div className='Integrate_box'>
                <div className='header'>
                    <span onClick={goBack}></span>
                    <span>积分商城</span>
                    <span>积分说明</span>
                </div>
                <div className='Integrate_num'>
                    <div className='num_left'>
                        <h3>{Point.points}</h3>
                    </div>
                    <div className='num_right' onClick={pushForRecord} >
                        <span>兑换记录 <em></em></span>
                    </div>
                </div>
                <div className='get_Integrate'>
                    <div></div>
                    <div></div>
                </div>
                <div className='sale_price'>
                    <p>超值优惠</p>
                    <ul>
                        {GoodsList.map((item) =>
                            <li key={item.id} onClick={pushIntegrateTicket(item.id)} >
                                <div className='picture'>
                                    <img src={item.imgUrl} alt="" />
                                </div>
                                <div className='content'>
                                    <p>{item.name}</p>
                                    <p>
                                        <span>{item.points}</span>
                                        <span>积分</span>
                                        <span>{item.price}￥</span>
                                    </p>
                                </div>
                            </li>
                        )}

                    </ul>
                </div>
                <div className='bottom_btn'>
                    <button>我要加盟</button>
                </div>
            </div>
            <Route path={'/integrate/integrateticket'} component={IntegrateTicket}></Route>
            <Route path={'/integrate/forrecord'} component={ForRecord}></Route>
        </div>
    )
}

export default Integrate