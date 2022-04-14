import React, { useState, useEffect } from 'react'
import { Carousel, Tabs, Collapse } from 'antd';
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import ModalForm from '../index_law_form'
import './index.css'
import axios from 'axios';
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function IndexLaw() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [dynamics, setDynamics] = useState([])
    useEffect(() => {
        axios.post('/life/getmessage', qs.stringify({ cateid: 0 })).then(res => {
            setMessages(res.data.results)
        })
        axios.get('life/getdynamic').then(res => {
            setDynamics(res.data.results)
        })
    }, [])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const setDisplay = (i) => {
        setIsModalVisible(i)
    }
    return (
        <div className="index_law">
            <div className="index_law_list">
                <span>热点咨询</span>
                <div>
                    <ul>
                        {
                            messages !== null && messages.length > 0 ? messages.map(
                                (item, index) => index < 8 ? <li onClick={() => {
                                    navigate('/life/law/' + item.messageid)
                                    document.getElementById('scrollTop').scrollIntoView(true)
                                }} key={item.messageid}>{item.title}</li> : <></>) :
                                <></>
                        }
                    </ul>
                </div>
            </div>
            <div className="index_law_carousel">
                <Carousel autoplay >
                    <div>
                        <img src="http://127.0.0.1:8003/pic/news/12.jpg" alt="" />
                    </div>
                    <div>
                        <img src="http://127.0.0.1:8003/pic/news/12.jpg" alt="" />
                    </div>
                    <div>
                        <img src="http://127.0.0.1:8003/pic/news/12.jpg" alt="" />
                    </div>
                    <div>
                        <img src="http://127.0.0.1:8003/pic/news/12.jpg" alt="" />
                    </div>
                </Carousel>,
            </div>
            <div className="clearfix"></div>
            <div className="index_law_popularize">
                <div className="index_law_popularize_header">
                    <span>普法动态</span>
                    <button>查看更多&gt;&gt;</button>
                </div>
                <div className="clearfix"></div>
                <div className="index_law_popularize_body">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="主题活动" key="1">
                            <Collapse defaultActiveKey={['-1']} >
                                {
                                    dynamics[0] && dynamics[0].length > 0 ?
                                        dynamics[0].map((item, index) =>
                                            index < 8 ?
                                                <Panel header={item.title} key={item.dynamicid}>
                                                    <p>{item.content}</p>
                                                </Panel> : console.log()
                                        )
                                        : <></>
                                }
                            </Collapse>
                        </TabPane>
                        <TabPane tab="普法锦集" key="2">
                            <Collapse defaultActiveKey={['-2']}>
                                {
                                    dynamics[1] && dynamics[1].length > 0 ?
                                        dynamics[1].map((item, index) =>
                                            index < 6 ?
                                                <Panel header={item.title} key={item.dynamicid}>
                                                    <p>{item.content}</p>
                                                </Panel> : console.log()
                                        )
                                        : <></>
                                }
                            </Collapse>
                        </TabPane>
                        <TabPane tab="环球法治" key="3">
                            <Collapse defaultActiveKey={['-3']}>
                                {
                                    dynamics[2] && dynamics[2].length > 0 ?
                                        dynamics[2].map((item, index) =>
                                            index < 6 ?
                                                <Panel header={item.title} key={item.dynamicid}>
                                                    <p>{item.content}</p>
                                                </Panel> : console.log()
                                        )
                                        : <></>
                                }
                            </Collapse>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <div className="index_law_entry">
                <button onClick={showModal}>留言咨询</button>
                <a href="https://flk.npc.gov.cn/">国家法律法规入口</a>
                <span>@友情链接:</span>
            </div>
            <ModalForm isModalVisible={isModalVisible} setIsModalVisible={(i) => { setDisplay(i) }} />
        </div>
    )
}
