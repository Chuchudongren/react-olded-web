import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { QuestionCircleFilled } from '@ant-design/icons'
import { changeBackgroundAction } from '../../../../redux/action/action'
import './index.css'

function LawDetail(props) {
    // lawdetail_bg
    const navigate = useNavigate()
    const [isplay, setIsplay] = useState(false)
    const params = useParams()
    const audio = useRef()
    const [data, setData] = useState({})
    useEffect(() => {
        props.changeBackgroundAction('law_detail')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        axios.post('/life/lawdetail', qs.stringify({ messageid: params.id })).then(res => {
            setData(res.data.result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const playpause = () => {
        isplay ? audio.current.pause() : audio.current.play()
        setIsplay(!isplay)
    }
    return (
        <div className="law_detail_bg">
            {data ?
                <div className="law_detail_main">
                    <div className="law_detail_header">
                        <span><b onClick={() => { navigate('/life') }} >返回首页 </b>&gt;&gt;&gt;咨询解答</span>
                    </div>
                    <div className="law_detail_center">
                        <div className="law_detail_title"><QuestionCircleFilled />{data.title}</div>
                        <div className="law_detail_content">&nbsp;&nbsp;&nbsp;{data.content}</div>
                        <div>咨询时间:{data.questiontime}</div>
                    </div>
                    <div className="law_detail_footer">
                        <span>咨询回复</span>
                        <div className="law_detail_reply">
                            {data.isreply === 0 ? <><span>还未回复，请耐心等待...</span></> :
                                <>
                                    <span>工号:{data.adminid}</span>
                                    <div onClick={playpause}>语音朗读</div>
                                    <p dangerouslySetInnerHTML={{ __html: data.reply }}></p>
                                    <b>回复时间:{data.replytime}</b>
                                </>
                            }

                        </div>
                    </div>
                    <audio ref={audio} src={data.read} controls="controls" loop={true} hidden={true}>
                    </audio>
                </div>
                : <>123</>
            }
        </div >
    )
}
export default connect(() => ({}), {
    changeBackgroundAction
})(LawDetail)