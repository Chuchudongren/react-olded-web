import React, { useEffect, useRef, useState } from 'react'
import {
    message,
    notification,
} from 'antd'
import { useParams } from 'react-router-dom'
import './index.css'
import axios from 'axios'
import qs from 'qs'
import { ReadOutlined } from '@ant-design/icons'
import NewsEditor from '../../../../components/hoard/newseditor'

export default function Add(props) {
    const params = useParams()
    const [content, setContent] = useState([])
    const token = qs.parse(localStorage.getItem('token'))
    const title = useRef()

    useEffect(() => {
        if (params.topicid !== '-1') {
            axios.post('/hoard/getTopicByid', qs.stringify({ topicid: params.topicid, userid: token.userid })).then(res => {
                if (res.data.status === 200) {
                    title.current.value = res.data.results.title
                    setContent(res.data.results.content)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSave = () => {
        if (title.current.value === null || title.current.value.trim() === '') {
            message.error('标题不能为空！')
        } else if (content.length <= 8) {
            message.error('内容不能为空！')
        } else {
            if (params.topicid !== '-1') {
                axios.post('/hoard/updateTopic', qs.stringify({ userid: token.userid, content, title: title.current.value, topicid: params.topicid })).then(res => {
                    if (res.data.status === 200) {
                        notification.info({
                            message: `通知: 提交成功!`,
                            description: `待审核通过即可查看,3秒后返回首页`,
                            placement: 'topRight',
                        })
                        setTimeout(() => {
                            window.history.back(-1)
                        }, 3000)
                    }
                })
            } else {
                axios.post('/hoard/pushTopic', qs.stringify({ userid: token.userid, content, title: title.current.value, cateid: params.cateid })).then(res => {
                    console.log(res);
                    if (res.data.status === 200) {
                        notification.info({
                            message: `通知: 提交成功!`,
                            description: `待审核通过即可查看,3秒后返回首页`,
                            placement: 'topRight',
                        })
                        setTimeout(() => {
                            window.history.back(-1)
                        }, 3000)
                    }
                })
            }
        }
    }
    // 从 组件中获得 富文本内容
    const getContent = (contents) => {
        setContent(contents)
    }
    return (
        <div className="container compose_bg">
            <header className="msg_detail_header">
                <span onClick={() => { window.history.back(-1) }} className="msg_detail_back"><ReadOutlined />论坛首页</span><span>&gt;&gt;&gt;</span><span>发帖</span>
            </header>
            {/* 主体内容 */}
            <div className="compose_editor">
                <div className="compose_title"><span>标题</span><input ref={title} type="text" /></div>
                <NewsEditor content={content} getContent={getContent}></NewsEditor>
                <button onClick={() => { handleSave() }}>提交审核</button>
            </div>
        </div>
    )
}
