import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Divider, Table } from 'antd'
import { ReadOutlined } from '@ant-design/icons';
import qs from 'qs'
import './index.css'
import axios from 'axios';

export default function MsgSearch() {
    const params = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        axios.post('/health/getMsgForKey', qs.stringify({ key: params.key })).then(res => {
            setData(res.data.results)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            render: (title, item) => {
                let href = '/health/msg/detail/' + item.healthmsgid
                return <a key={item.healthmsgid} href={href} className="msg_search_title" >{title}</a >
            }
        },
        {
            title: '简介',
            dataIndex: 'intro',
            render: intro => <span className="msg_search_intro">{intro}</span>
        },
        {
            title: '时间',
            dataIndex: 'pushtime',
            render: pushtime => <span className="msg_search_pushtime">{pushtime}</span>
        },
    ];
    const onPageChange = () => {
        document.getElementById('scrollTop').scrollIntoView(true)
    }
    return (
        <div className="msg_search_bg">
            <div className="container">
                <header className="msg_search_header">
                    <span className="msg_search_back" onClick={() => { window.history.back(-1) }}><ReadOutlined />健康资讯</span>
                    <span className="msg_search_gt">&gt;&gt;&gt;</span>
                    <span>搜索列表</span>
                    <Divider orientation="left">搜索结果</Divider>
                </header>
                <section className="msg_search_main">
                    <Table rowKey={(item) => item.healthmsgid} onChange={onPageChange} columns={columns} dataSource={data} />
                </section>
            </div>
        </div>
    )
}
