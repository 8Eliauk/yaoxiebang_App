import './index.css'

function PopUp(props) {
    // 返回上一级
    function goBack() {
        props.history.goBack();
    }
    // 跳转到积分商城
    function pushIntegrate () {
        props.history.push('/integrate')
    }

    return (
        <div className='popup_box'>
            <div className='box_center'>
                <ul className='popup_content'>
                    <li></li>
                    <li>
                        <p>恭喜您完成任务，积分+10</p>
                        <p>今日还可获得<span>1195</span>积分</p>
                    </li>
                    <li>
                        <button>完成更多任务</button>
                        <button onClick={pushIntegrate}>逛逛积分商城</button>
                    </li>
                </ul>
                <div className='shut' onClick={goBack}></div>
            </div>

        </div>
    )
}

// 暴露
export default PopUp