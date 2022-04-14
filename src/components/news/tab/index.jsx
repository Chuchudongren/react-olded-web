import React from 'react'
import { useNavigate } from 'react-router-dom'
import NewsSearch from '../../search/news_search'
import './index.css'
export default function NewsTab() {
    const naviage = useNavigate()
    return (
        <div>
            <div className="tab">
                <button onClick={() => { naviage('/news/国家政策') }} className="tab_btn1">国家政策</button>
                <button onClick={() => { naviage('/news/城区新闻') }} className="tab_btn2">城区新闻</button>
                <button onClick={() => { naviage('/news/社区新闻') }} className="tab_btn3">社区新闻</button>
                <NewsSearch />
            </div>
        </div>

    )
}
