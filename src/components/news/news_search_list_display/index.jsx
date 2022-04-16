import React, { useEffect, useState } from 'react'
import { Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import { createFromIconfontCN } from '@ant-design/icons'
import Dotdotdot from 'react-dotdotdot'
import './index.css'

export default function NewsListDisplay(props) {
    const token = qs.parse(localStorage.getItem('token'))
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [nowData, setNowData] = useState([])
    const [page, setPage] = useState(1)
    const [flash, setFlash] = useState(false)
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3249569_4mjazitevem.js',
    });
    useEffect(() => {
        setPage(1)
    }, [props.category])
    useEffect(() => {
        axios.post('/news/search', qs.stringify({ searchkey: props.searchkey, userid: token.userid })).then(res => {
            if (res.data.status === 200) {
                setData(res.data.results)
                res.data.result ?
                    setNowData(res.data.result.length > 3 ? res.data.result.slice(0, 3) : res.data.result) : (setNowData(res.data.result))
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.category, flash, props.flash])
    useEffect(() => {
        if (data.length > 0) {
            setNowData(data.slice((page - 1) * 3, page * 3))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, data])
    const onTurnPage = (i) => {
        setPage(page + i)
        document.getElementById('scrollTop').scrollIntoView(true);
    }
    const onegreat = (newsid, isgreat) => {
        if (isgreat === 1) {
            message.success('取消点赞成功！')
            if (token.userid) {
                axios.post('/news/great', qs.stringify({ newsid, value: - 1, userid: token.userid }))
            }
        } else {
            message.success('点赞成功！')
            if (token.userid) {
                axios.post('/news/great', qs.stringify({ newsid, value: 1, userid: token.userid }))
            }
        }
        setFlash(!flash)
        // setPage(page)
    }
    const oneCollect = (newsid, iscollect) => {
        if (token.userid) {
            console.log(iscollect);
            if (iscollect === 1) {
                message.success('取消收藏成功！')
                axios.post('/news/collect', qs.stringify({ newsid, value: -1, userid: token.userid }))
            } else {
                message.success('收藏成功！')
                axios.post('/news/collect', qs.stringify({ newsid, value: 1, userid: token.userid }))
            }
            setFlash(!flash)
            // setPage(page)
        } else {
            message.error('登录之后才能收藏')
        }
    }
    return (
        <div key={flash} className="container search_news_list_comment">
            {
                nowData.length > 0 ? nowData.map((item) => {
                    return (
                        <div key={item.newsid} className="search_news_list_item">
                            {console.log(nowData)}
                            <div className="search_item_left">
                                <img src={item.pic} alt="" />
                            </div>
                            <div className="search_item_right">
                                <div className='search_item_content'>
                                    <Dotdotdot clamp={2}>
                                        <p onClick={() => {
                                            navigate('/news/detail/' + item.newsid)
                                        }} className="search_item_content_title">{item.title}</p>
                                    </Dotdotdot>

                                    <Dotdotdot clamp={5}>
                                        <p className="search_item_content_summary">
                                            {item.summary}
                                        </p>
                                    </Dotdotdot>
                                    <span className="search_item_content_date">{item.pushtime}</span>
                                    <span className="search_item_content_source">{item.source}</span>
                                </div>

                                <Space >
                                    <div className='search_item_btn'>
                                        <div className={item.isGreat === 1 ? 'isearch_tem_btn_active' : ''} onClick={() => { onegreat(item.newsid, item.isGreat) }}><IconFont className='search_icon-good' type="icon-good" /></div>
                                        <div className={item.isCollect === 1 ? 'isearch_tem_btn_active' : ''} onClick={() => { oneCollect(item.newsid, item.isCollect) }}><IconFont className='search_icon-collection' type="icon-collection" /></div>
                                        <div onClick={() => { }}><IconFont className='search_icon-pinglun' type="icon-pinglun" /></div>
                                        <div><IconFont className='search_icon-zhuanfa' type="icon-zhuanfa" /></div>
                                    </div>
                                </Space>

                            </div>
                        </div>
                    )
                })
                    : <div className="search_miss">很抱歉，没有搜索到相关内容<br />请更换搜索词重新搜索...</div>
            }
            {data.length > 0 ? <div className='search_news_list_page'>
                <button disabled={page === 1} className={page === 1 ? 'disabled' : 'page_prev'} onClick={() => { onTurnPage(-1) }}>上一页</button>
                <button disabled={page === Math.ceil(data.length / 3)} onClick={() => { onTurnPage(1) }} className={page === Math.ceil(data.length / 3) ? 'disabled' : 'page_next'}>下一页</button>
            </div> : <></>}
        </div>

    )
}
