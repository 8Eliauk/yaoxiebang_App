import React,{useState,useEffect} from 'react'
import './index.css'
import { Route } from 'react-router-dom'
import IntegrateTicket from '../IntegrateTicket'
import {reqPointsAmount,reqGoodsList} from '../../api'
function Integrate(props) {

    useEffect(()=> {
        getPointsAmoun();
        // 获取积分兑换商品列表
        getGoodsList();
    },[])

    const [Point,setPoint] = useState({});
    async function getPointsAmoun() {
        let result = await reqPointsAmount()
        if(result.msg === 'ok') {
            setPoint(result.data)
        }
    }

    const [GoodsList,setGoodsList] = useState([]);
    async function getGoodsList() {
        let result = await reqGoodsList();
        if(result.msg === 'ok') {
            setGoodsList(result.data);
        }
    }
    console.log(GoodsList);
    
    
    // 存储数据
    // 积分商城超值优惠数据
    const integrateState = [
        {
            id:1,
            name: 'VIP元优惠券',
            score: 1688,
            oldScore: 6000
        },
        {
            id:2,
            name: 'VIP试用1天',
            score: 1088,
            oldScore: 6000
        },
        {
            id:3,
            name: 'VIP60天加时券',
            score: 1788,
            oldScore: 6000
        },
        {
            id:4,
            name: 'VIP60元优惠券',
            score: 1688,
            oldScore: 6000
        },
    ]



    // 返回首页
    function goBack() {
        props.history.push('/home');
    }

    // 跳转到优惠券
    function pushIntegrateTicket(id) {
        return () => {
            if(id === 1) {
                props.history.push('/integrate/integrateticket')
            }
        }
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
                    <div className='num_right'>
                        <span>兑换记录</span>
                    </div>
                </div>
                <div className='get_Integrate'>
                    <div></div>
                    <div></div>
                </div>
                <div className='sale_price'>
                    <p>超值优惠</p>
                    <ul>
                        {integrateState.map((item) =>
                            <li key={item.id} onClick={pushIntegrateTicket(item.id)} >
                                <div>
                                    <p>{item.name}</p>
                                    <p>
                                        <span>{item.score}</span>
                                        <span>积分</span>
                                        <span>{item.oldScore}积分</span>
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
        </div>
    )
}

export default Integrate