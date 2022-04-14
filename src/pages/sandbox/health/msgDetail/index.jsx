import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import qs from 'qs'
import axios from 'axios'
import { ReadOutlined, FontColorsOutlined, WeiboOutlined, createFromIconfontCN } from '@ant-design/icons';

import './index.css'

export default function MsgDetail() {
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3249569_ir8rs0v932.js',
    });
    const paragraph = useRef()
    const [fontSize, setFontSize] = useState(26)
    const [data, setData] = useState({})
    const params = useParams()
    useEffect(() => {
        axios.post('/health/getMsgDetail', qs.stringify({ healthmsgid: params.id })).then(res => {
            setData(res.data.result[0])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const setFont = (i) => {
        if (i) {
            if (fontSize < 34) {
                paragraph.current.style.fontSize = (fontSize + 2) + 'px'
                setFontSize(fontSize + 2)
            }
        } else {
            if (fontSize > 18) {
                paragraph.current.style.fontSize = (fontSize - 2) + 'px'
                setFontSize(fontSize - 2)
            }
        }
    }
    return (
        <div className="msg_detail_bg">
            <div className="container">
                <header className="msg_detail_header">
                    <span onClick={() => { window.history.back(-1) }} className="msg_detail_back"><ReadOutlined />健康资讯</span><span>&gt;&gt;&gt;</span><span>正文</span>
                </header>
                {
                    data && data !== {} ?
                        <section className="msg_detail_body">
                            <h1>{data.title}</h1>
                            <div className="msg_detail_btn">
                                <span className="date">{data.pushtime}</span>
                                <span className="webname">老来乐</span>
                                <span className="feedback">举报/反馈</span>
                                <a target="_blank" href={'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + data.intro} className="qqshare" rel="noreferrer"><IconFont type='icon-qzone' /></a>
                                <a target="_blank" href={'https://service.weibo.com/share/share.php?&title=' + data.intro + '&pic=https://pimg.39.net/PictureLib/A/f76/20180403/org_3789482.png#_loginLayer_1649162201182'} className="wbshare" rel="noreferrer"><WeiboOutlined /></a>
                                <span onClick={() => { setFont(1) }} className="font2"><FontColorsOutlined />+</span>
                                <span onClick={() => { setFont(0) }} className="font1"><FontColorsOutlined />-</span>
                            </div>
                            <div className="msg_detail_intro">简介:{data.intro}</div>
                            <p ref={paragraph} className="msg_detail_paragraph">{data.content}</p>
                        </section>
                        : <></>
                }


            </div>
        </div >
    )
}
