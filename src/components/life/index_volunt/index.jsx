import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'
import './index.css'
export default function IndexVolunt() {
    const [voluntData, setVoluntData] = useState([])
    const call_me = useRef()
    const showCall = () => {
        let i = 0;
        const timer = setInterval(() => {
            i += 0.01
            call_me.current.style.opacity = i
            if (i >= 1) {
                clearInterval(timer)
            }
        }, 1000 / 30);
    }
    const navigate = useNavigate()
    const token = qs.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get('/life/getvolunthot').then(res => {
            setVoluntData(res.data.results)
        })
    }, [])
    return (
        <div className="index_vlount_bg">
            <div className="index_vlount_today">
                <div className="index_vlount_today_header">
                    <span>今日志愿活动</span>
                    <a href="/life/volunt/list">查看更多</a>
                </div>
                {
                    voluntData !== null && voluntData.length > 0 ?
                        <div className="index_vlount_today_item">
                            <div className="index_vlount_today_item_info">
                                <span className="index_vlount_today_item_name">活动名称：<a href={'/life/volunt/' + voluntData[0].voluntid}>{voluntData[0].title}</a></span>
                                <span className="index_vlount_today_item_content">活动内容：<br />&nbsp;&nbsp;<span>{voluntData[0].content}</span></span>
                                <span className="index_vlount_today_item_place">活动地点：<span>{voluntData[0].space}</span></span>
                                <span className="index_vlount_today_item_time">活动时间：<span>{voluntData[0].begintime}</span></span>
                                <button onClick={() => {
                                    navigate('/life/volunt/' + voluntData[0].voluntid)
                                    document.getElementById('scrollTop').scrollIntoView(true)
                                }}>查看内容</button>
                            </div>
                            <img src={voluntData[0].pic} alt="今日志愿活动" />
                        </div> : <></>
                }
                {
                    voluntData !== null && voluntData.length > 0 ?
                        <div className="index_vlount_today_item">
                            <div className="index_vlount_today_item_info">
                                <span className="index_vlount_today_item_name">活动名称：<a href={'/life/volunt/' + voluntData[1].voluntid}>{voluntData[1].title}</a></span>
                                <span className="index_vlount_today_item_content">活动内容：<br />&nbsp;&nbsp;<span>{voluntData[1].content}</span></span>
                                <span className="index_vlount_today_item_place">活动地点：<span>{voluntData[1].space}</span></span>
                                <span className="index_vlount_today_item_time">活动时间：<span>{voluntData[1].begintime}</span></span>
                                <button onClick={() => {
                                    navigate('/life/volunt/' + voluntData[1].voluntid)
                                    document.getElementById('scrollTop').scrollIntoView(true)
                                }}>查看内容</button>
                            </div>
                            <img src={voluntData[1].pic} alt="今日志愿活动" />
                        </div> : <></>
                }


            </div>
            <div className="index_vlount_today_footer">
                <button onClick={() => {
                    token.isvolunt === '1' ? message.success('您已经是志愿者了') : token.isvolunt === undefined ? message.error('您还没有登录，请你先登录') : navigate('/life/volunt/info/-1')
                    token.isvolunt === '0' ? document.getElementById('scrollTop').scrollIntoView(true) : <></>
                }}>我要成为志愿者</button>
                <span onClick={showCall} className="need_help">我要求助</span>
                <span ref={call_me} className="call_me">联系我们：18238671977</span>
            </div>

        </div >
    )
}
