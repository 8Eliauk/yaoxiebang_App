import './index.css'
import { Pagination } from 'antd';
import React,{useEffect, useState} from 'react'
import {reqPointsDetail} from '../../api'

function ForRecord(props) {

    // let [page,setpage] = useState(1)
    // let [limit,setlimit] = useState(5)

    useEffect(()=> {
        getPointsDetail(1,5);
    },[])

    
    // 接收积分兑换记录的数据
    const [paging,setPaging] = useState([] || undefined )
    const [totalCount,setTotalCount] = useState(0)

    // 初始化分页的数据
    let [page,setpage] = useState(1)
    let [limit,setlimit] = useState(5)

    async function getPointsDetail(a,b) {
        console.log(a,b);
    //    let result = await reqPointsDetail(page=1,limit=5);
       let result = await reqPointsDetail(a,b);
       if(result.msg === 'ok') {
        setPaging(result.data.data)
        setTotalCount(result.data.totalCount)
       }
    }

    // // changePage 改变分页
    function changePage() {
        return async (page,pageSize) => {
            setpage(page)
            setlimit(pageSize)
            let result = await reqPointsDetail(page,pageSize)
            if(result.msg === 'ok') {
                setPaging(result.data.data)
                setTotalCount(result.data.totalCount)
            }
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
                                                <div>{item1.msg}，积分<span>-{item1.points}</span></div>
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
                    // current={page} 
                    current={page} // 当前页数
                    // pageSize={limit} 
                    pageSize={limit} // 每页条数
                    // total={Math.ceil(totalCount/limit)}
                    total={totalCount} // 数据总数
                    onChange={changePage(page,limit)}
                />
            </div>
        </div>
    )
}

export default ForRecord