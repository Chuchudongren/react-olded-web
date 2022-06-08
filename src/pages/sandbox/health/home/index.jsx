import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { falshAction } from '../../../../redux/action/action'
import './index.css'
function HealthHome(props) {
    const [msgList, setMsgList] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/health/getShowMsg').then(res => {
            setMsgList(res.data.results)
        })
    }, [])
    return (
        <div className="health_home">
            <div className="health_home_infoCollect container">
                <div className="health_game_first">
                    <img src="http://127.0.0.1:8002/uploads/body/index/health/index_game.png" alt="" />
                    <h2>智慧问答</h2>
                </div>
                <div className="health_game_second">
                    <img src="http://127.0.0.1:8002/uploads/body/index/health/index_game1.png" alt="" />
                    <h2>数字游戏</h2>
                </div>
                <div className="health_game_third">
                    <img src="http://127.0.0.1:8002/uploads/body/index/health/index_game2.png" alt="" />
                    <h2>吃苹果</h2>
                </div>
                <button onClick={() => {
                    navigate('/health/game')
                    document.getElementById('scrollTop').scrollIntoView(true)
                    props.falshAction()
                }}>开始游戏</button>
            </div>
            <div className="health_home_msg  container">
                <header className="health_home_msg_header">
                    <h2>健康资讯</h2>
                </header>
                <div className="row">
                    {
                        msgList && msgList.length > 0 ?
                            msgList.map(item =>
                                <div key={item.healthmsgid} className="health_home_msg_main col-md-4">
                                    <header>
                                        <h3>{item.title}</h3>
                                    </header>
                                    <p><span>简介：</span>{item.intro}</p>
                                    <button onClick={() => {
                                        navigate('/health/msg/detail/' + item.healthmsgid)
                                        document.getElementById('scrollTop').scrollIntoView(true)
                                        props.falshAction()
                                    }}>查看</button>
                                </div>
                            )
                            : <></>
                    }


                </div>
            </div>
        </div>
    )
}

export default connect(() => ({}), {
    falshAction
})(HealthHome)