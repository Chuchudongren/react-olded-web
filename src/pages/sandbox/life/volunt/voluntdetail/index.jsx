import axios from 'axios'
import qs from 'qs'
import { Avatar, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { StarTwoTone } from '@ant-design/icons'
import { changeBackgroundAction } from '../../../../../redux/action/action'
import MapUtil from './mapUtil'
import './index.css'
function VlountDetail(props) {
    const navigate = useNavigate()
    const params = useParams()
    const [data, setData] = useState({})
    const token = qs.parse(localStorage.getItem('token'))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [countdown, setCountdown] = useState(5)
    const [isJoin, setisJoin] = useState(false)
    const [isCollect, setisCollect] = useState(false)
    const [partners, setpartners] = useState([])

    let tiemr
    useEffect(() => {
        props.changeBackgroundAction('vlount_list')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        axios.post('/life/voluntdetail', qs.stringify({ voluntid: params.voluntid })).then(res => {
            setData(res.data.results)
            setpartners(res.data.results.partners)
        })
        if (token.userid) {
            axios.post('/life/isVolunt', qs.stringify({ userid: token.userid, voluntid: params.voluntid })).then(res => {
                setisJoin(res.data.isvolunt)
            })
            axios.post('/life/isCollect', qs.stringify({ userid: token.userid, objectid: params.voluntid, cateid: 2 })).then(res => {
                setisCollect(res.data.iscollect)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const apply = () => {
        if (data.status === 0 || 1) {
            clearInterval(tiemr)
            setCountdown(5)
            let count = 4
            tiemr = setInterval(() => {
                if (count < 0) {
                    clearInterval(tiemr)
                } else {
                    setCountdown(count)
                    count -= 1
                }
            }, 1000)
            showModal()
        } else {
            message.info('活动已结束！')
        }

    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        navigate('/life/volunt/info')
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        clearInterval(tiemr)
    };
    const joinin = () => {
        setIsModalVisible(false);
        setisJoin(!isJoin)
        axios.post('/life/volunt/joinin', qs.stringify({ userid: token.userid, voluntid: params.voluntid, join: true })).then(res => {
            res.data.status === 200 ? message.success(res.data.msg) : message.error(res.data.msg)
            setpartners(res.data.partners)
        })
    }
    const disapply = () => {
        setisJoin(!isJoin)
        axios.post('/life/volunt/joinin', qs.stringify({ userid: token.userid, voluntid: params.voluntid, join: false })).then(res => {
            res.data.status === 200 ? message.success(res.data.msg) : message.error('出错')
            setpartners(res.data.partners)
        })
    }
    const voluntcollect = () => {
        axios.post('/life/turnCollect', qs.stringify({ userid: token.userid, objectid: params.voluntid, cateid: 2, turn: !isCollect }))
        setisCollect(!isCollect)
    }
    return (
        <div className="volunt_detail_bg">
            <div className="volunt_detail_header">
                <div onClick={() => { navigate('/life/volunt/list') }} className="volunt_detail_goback"></div>
            </div>
            <div className="volunt_detail_main">
                <div className="volunt_detail_container container">
                    <div className="volunt_detail_top">
                        <img src={data.pic} alt="" />
                        <div key={isJoin} className="volunt_detail_info">
                            <span>{data.title}</span>
                            <ul>
                                <li>活动状态：{data.status === 1 ? '进行中' : data.status === 2 ? '已结束' : '未开始'}</li>
                                <li>开始时间：{data.begintime}</li>
                                <li>结束时间：{data.finishtime}</li>
                                <li>发起团队：{data.teamname}</li>
                                <li>活动类型：{data.classification}</li>
                                <li>参加人数：{data.peoplenumber}</li>
                            </ul>
                            <StarTwoTone key={isCollect} onClick={voluntcollect} className={isCollect ? "volunt_detail_collect" : "volunt_detail_discollect"} twoToneColor="#ccc" />
                            {isJoin ? <button onClick={disapply}>已报名</button> : <button onClick={apply}>报名</button>}
                        </div>
                    </div>
                    <div className="volunt_detail_content">
                        <div className="volunt_detail_map">
                            <span>活动地点:{data.space}</span>
                            <div>
                                <MapUtil />
                            </div>
                        </div>
                        <div className="volunt_detail_right">
                            <span>联系电话：{data.tel}</span><br />
                            <span>活动内容：<br />&nbsp;&nbsp;&nbsp;{data.content}</span>
                        </div>
                    </div>
                    <div className="volunt_detail_people">
                        <span>参与者:</span>
                        <ul key={isJoin} >
                            {partners && partners.length > 0 ? partners.map(item =>
                                <li onClick={() => {
                                    navigate('/my/' + item.userid)
                                    document.getElementById('scrollTop').scrollIntoView(true)
                                }} key={item.userid}>
                                    <Avatar
                                        size={64}
                                        src={item.avatar}
                                    /></li>) :
                                <></>
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <Modal title="提示信息" visible={isModalVisible} onCancel={handleCancel}>
                {token.isvolunt === '1' ?
                    <div className="volunt_apply_modal">
                        <span>请阅读协议后同意即可报名：</span>
                        <p>根据中央文明委的指示精神，为健全我省志愿者服务组织体系，规范志愿者组织管理，壮大志愿者队伍，加强对志愿者的注册、培训、管理、评选、表彰、奖励等工作，进一步推动全省志愿者服务活动的开展，建立全省统一志愿者网络注册和管理系统，建立全省志愿者信息库，开发建设了湖南省志愿服务网。
                            湖南省志愿服务网系湖南省文明办省志工办所属，管理全湖南省志愿者的平台，建立湖南省600万志愿者的档案管理、参与活动管理以及服务时间管理，以网上平台为中心统一管理志愿者，以地市县，高校青年志愿者、省直志愿者为分类。并实现以志愿者活动为基本事件，实现志愿者之间的高度互动交流，让志愿者依托网络可以更好的了解信息与参与活动。</p>
                        <button onClick={joinin} className={countdown === 0 ? 'volunt_apply_modal_agree' : 'volunt_apply_modal_wait'}>同意并报名({countdown})</button>
                    </div> :
                    <div className="volunt_detail_modal">
                        <span>您还不是志愿者，是否前往填写信息</span>
                        <button onClick={handleCancel}>取消</button>
                        <button onClick={handleOk}>确定</button>
                    </div>
                }

            </Modal>
        </div>
    )
}

export default connect(() => ({}), {
    changeBackgroundAction
})(VlountDetail)