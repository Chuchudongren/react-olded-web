import React, { useEffect, useState } from 'react'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import './index.css'
import axios from 'axios'
import Dotdotdot from 'react-dotdotdot'
import { message } from 'antd'
export default function NewsPoliticsPart() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [current, setCurrent] = useState(0)
    const [currentDate, setCurrentDate] = useState({})
    useEffect(() => {
        axios.post('/news/index', qs.stringify({ categoryid: 1 })).then(res => {
            setData(res.data.results)
            setCurrentDate(res.data.results[current])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onTurn = (i) => {
        if (current === 0 && i < 0) {
            message.warning('已经到顶了')
        } else if (current === data.length - 1 && i > 0) {
            message.warning('已经到底了')
        } else {
            setCurrentDate(data[current + i])
            setCurrent(current + i)
        }
    }
    return (
        <div className="news_politics">
            <div className="news_turn">
                <div onClick={() => { onTurn(-1) }} className="news_turn_up"><CaretUpOutlined style={{ fontSize: '60px' }} /></div>
                <div onClick={() => { onTurn(1) }} className="news_turn_down"><CaretDownOutlined style={{ fontSize: '60px' }} /></div>
            </div>
            <div className="news_content_politics">
                <Dotdotdot clamp={3}>
                    <p className="news_content_politics_title">{currentDate.title}</p>
                </Dotdotdot>
                <Dotdotdot clamp={7}>
                    <p className="news_content_politics_text">{currentDate.summary}</p>
                </Dotdotdot>
                <button onClick={
                    () => {
                        navigate('/news/detail/' + currentDate.newsid)
                        document.getElementById('scrollTop').scrollIntoView(true)
                    }
                }>点击查看</button>
            </div>
            <div className="title"><span>国家政策</span></div>
        </div>
    )
}
