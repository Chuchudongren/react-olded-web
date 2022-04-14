import React, { useEffect, useState } from 'react'
import qs from 'qs'
import './index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function NewsCommunityPart() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        axios.post('/news/index', qs.stringify({ categoryid: 3 })).then(res => {
            setData(res.data.results[0])
        })
    }, [])
    return (
        <div className="news_community">
            <div onClick={() => {
                navigate('/news/detail/' + data.newsid)
                document.getElementById('scrollTop').scrollIntoView(true)
            }} className="news_community_title">{data.title}</div>
            <span className="news_community_content">{data.summary}</span>
            <img src={data.pic} alt="" />
        </div>
    )
}
