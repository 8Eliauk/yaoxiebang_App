import './index.css'
import { Pagination } from 'antd';
import React,{useEffect, useState} from 'react'
import {reqPointsDetail} from '../../api'

function ForRecord(props) {

    useEffect(()=> {
        getPointsDetail();
    },[])

    
    // 接收积分兑换记录的数据
    const [paging,setPaging] = useState([] || undefined )
    const [totalCount,setTotalCount] = useState(0)

    // 声明分页的数据
    const [page,setpage] = useState(1)
    const [limit,setlimit] = useState(10)

    async function getPointsDetail(page,limit) {
       let result = await reqPointsDetail(page=1,limit=10);
       if(result.msg === 'ok') {
        setPaging(result.data.data)
        setTotalCount(result.data.totalCount)
       }
    }

    // // changePage 改变分页
    function changePage() {
        return async (page,limit) => {
            setpage(page)
            setlimit(limit)
            // console.log(page,limit);
            // reqPointsDetail(page,limit)
            getPointsDetail(page,limit)
        }
    }

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
            <div className='ForRecord_content'>
                {
                    paging.map((item,index)=> {
                        return (
                            <div className='ForRecord_content_item' key={index}>
                                <span className='alltimes'>{item.time}</span>
                                {
                                    item.data.map((item1)=> {
                                        return (
                                            <div  key={item1.id}>
                                                <div>{item1.msg}，积分<span>+{item1.points}</span></div>
                                                <div>{item1.time}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className='Pagination'>
                <Pagination 
                    simple 
                    current={page} 
                    pageSize={limit} 
                    total={Math.ceil(totalCount/limit)}
                    onChange={changePage(page,limit)}
                />
            </div>
        </div>
    )
}

export default ForRecord