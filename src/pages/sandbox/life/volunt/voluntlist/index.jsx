import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, Dropdown } from 'antd';
import axios from 'axios'
import qs from 'qs'
import { changeBackgroundAction } from '../../../../../redux/action/action'
import { DownOutlined, SmileFilled } from '@ant-design/icons';
import './index.css'
function VlountList(props) {
    const navigate = useNavigate()
    const [voluntStatus, setVoluntStatus] = useState('进行中')
    const [voluntTime, setVoluntTime] = useState('不限时间')
    const [data, setData] = useState([])
    const list = useRef()
    useEffect(() => {
        props.changeBackgroundAction('vlount_list')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        axios.post('/life/volunt/list', qs.stringify({ voluntStatus })).then(res => {
            setData(res.data.results)
        })
    }, [voluntStatus])
    const menu = (
        <Menu>
            <Menu.Item key="进行中">
                <div onClick={() => {
                    setVoluntStatus('进行中')
                }}>进行中</div>
            </Menu.Item>
            <Menu.Item key="未开始">
                <div onClick={() => {
                    setVoluntStatus('未开始')
                }}>未开始</div>
            </Menu.Item>
            <Menu.Item key="已结束">
                <div onClick={() => {
                    setVoluntStatus('已结束')
                }}>已结束</div>
            </Menu.Item>
        </Menu>
    )
    const time = (
        <Menu>
            <Menu.Item key="最近一周">
                <div onClick={() => {
                    setVoluntTime('最近一周')
                }}>最近一周</div>
            </Menu.Item>
            <Menu.Item key="最近一月">
                <div onClick={() => {
                    setVoluntTime('最近一月')
                }}>最近一月</div>
            </Menu.Item>
            <Menu.Item key="最近一年">
                <div onClick={() => {
                    setVoluntTime('最近一年')
                }}>最近一年</div>
            </Menu.Item>
        </Menu>
    )
    const onPageWheel = (e) => {
        if (e.nativeEvent.deltaY >= 0) {
            if (Math.round(list.current.scrollTop + list.current.clientHeight) === list.current.scrollHeight) {
                list.current.style.overflowY = 'hidden'
            } else {
                list.current.style.overflowY = 'scroll'
            }
        } else {
            if (list.current.scrollTop === 0) {
                list.current.style.overflowY = 'hidden'
            } else {
                list.current.style.overflowY = 'scroll'
            }
        }
    }
    return (
        <div onWheel={e => { onPageWheel(e) }} className="volunt_list_bg">
            <div className="volunt_list_header">
                <div></div>
                <div onClick={() => {
                    navigate('/life')
                }}></div>
            </div>
            <div className="volunt_list_main">
                <div className="volunt_list_container container">
                    <div className="volunt_list_sort">
                        <Dropdown open overlay={menu}>
                            <div className="ant-dropdown-link" >
                                {voluntStatus}<DownOutlined />
                            </div>
                        </Dropdown>
                        <Dropdown open overlay={time}>
                            <div className="ant-dropdown-link" >
                                {voluntTime}<DownOutlined />
                            </div>
                        </Dropdown>
                    </div>
                    <div ref={list} className="volunt_list_list">

                        {data && data.length > 0 ? data.map((item) =>
                            <div key={item.voluntid} className="volunt_list_item">
                                <div className="volunt_list_left">
                                    <img src={item.pic} alt="" />
                                </div>
                                <div className="volunt_list_center">
                                    <div onClick={() => { navigate('/life/volunt/' + item.voluntid) }} className="volunt_list_center_title">{item.title}</div>
                                    <div className="volunt_list_center_info">
                                        <ul>
                                            <li>活动状态：<span>{voluntStatus}</span></li>
                                            <li>地点：<span>{item.space}</span></li>
                                            <li>团队：<span>{item.teamname}</span></li>
                                            <li>截止时间：<span>{item.finishtime}</span></li>
                                        </ul>
                                    </div>
                                    <div className="volunt_list_center_people"><SmileFilled />报名<span>{item.peoplenumber}</span>人</div>
                                </div>
                                <div className="volunt_list_right">
                                    <span>[{item.classification}]</span>
                                    <button onClick={() => { navigate('/life/volunt/' + item.voluntid) }}>查看</button>
                                </div>
                            </div>
                        ) : <></>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default connect(() => ({}), {
    changeBackgroundAction
})(VlountList)