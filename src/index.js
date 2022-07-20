// 引入react核心库
import React from 'react'
// 引入ReactDOM
import ReactDOM from 'react-dom/client'
// 引入App组件
import App from './App'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById("root"))

// 渲染App到页面
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)