import './index.css'
import React from 'react'
import {reqGenerateOrder} from '../../api'
import DrawerComponents from '../../components/DrawerComponents'

function IntegrateTicket(props) {

    async function getGenerateOrder(value) {
        const {receiver,phone,address,email} = value
        console.log(value);
        let data = {
            goodsId:id,
            receiver,
            phone,
            address,
            email
        }
        let result = await reqGenerateOrder(data)
        console.log(result);
    }

    function getFormValue(value) {
        getGenerateOrder(value)
    }


    // 返回上一级
    function goBack() {
        props.history.goBack();
    }
    
    // 接收参数
    const {id,name,points,price,imgUrl} = props.location.state || {}
    console.log(id,name,points,price,imgUrl);
    
    return (
        <div className='IntegrateTicket'>
            <div className='Ticket_header'>
                <span onClick={goBack}></span>
                <span>积分商城</span>
                <span></span>
            </div>
            <div className='Integrate_quan'>
                <div className='quan_'>
                    <img src={imgUrl} alt="" />
                </div>
                <div className='quan60_'>
                    <span className='VIP_quan'>{name}</span>
                    <p><span>{points}</span><span>积分</span></p>
                </div>
                <div className='beiying'></div>
                <div className='introduce_box'>
                    <div className='introduce'>
                        <p>产品介绍</p>
                        <p>在购买1年/2年/3年VIP会员服务时，可享受60元优惠， 不与其他优惠同享</p>
                    </div>
                    <div className='introduce'>
                        <p>兑换须知</p>
                        <p>1、本券将于兑换后24小时内发放至【我的-卡券】</p>
                        <p>2、卡券有效期：自兑换日起30天，请及时使用</p>
                        <p>3、本商品每天可兑换一次 </p>
                        <p>4、因积分商品的特殊性，商品一经兑换，概不退換</p>
                    </div>
                </div>
            </div>
            <div className='bottom_btn'>
                {/* <button>我要兑换商品</button> */}
                <DrawerComponents getFormValue={getFormValue} ></DrawerComponents>
            </div>
        </div>
    )
}

// 暴露出去
export default IntegrateTicket