import './index.css'

function ForRecord(props) {

    // 返回上一级
    function goBack() {
        props.history.goBack();
    }

    return (
        <div className="ForRecord_box">
            <div className="ForRecord_header">
                <span onClick={goBack} ></span>
                <span>积分兑换记录</span>
                <span></span>
            </div>
            <ul className='ForRecord_content'>
                <li>
                    兑换记录1
                </li>
                <li>
                    兑换记录2
                </li>
                <li>
                    兑换记录3
                </li>
                <li>
                    兑换记录4
                </li>
                <li>
                    兑换记录5
                </li>
            </ul>
        </div>
    )
}

export default ForRecord