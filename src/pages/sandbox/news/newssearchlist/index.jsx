import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import NewsSearchListDisplay from '../../../../components/news/news_search_list_display'
import { connect } from 'react-redux'
import { changeBackgroundAction } from '../../../../redux/action/action'
import './index.css'
function NewsSearch(props) {
    const params = useParams()
    const navigate = useNavigate()
    const input = useRef()
    const [flash, setFlash] = useState(0)
    const search = () => {
        navigate('/news/search/' + input.current.value)
        setFlash(flash + 1)
    }
    useEffect(() => {
        props.changeBackgroundAction('news_search')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div key={flash} className="news_search_container container">
            <div onClick={() => {
                navigate('/news')
            }} className="news_search_goback"></div>
            <div className='news_search_list_header'>
                <input ref={input} type="text" /><div onClick={search} className='news_search_btn' >搜索</div>
            </div>
            <div className="news_search_list_title"></div>
            <NewsSearchListDisplay searchkey={params.search} />
        </div>
    )
}

export default connect(() => ({}), {
    changeBackgroundAction
})(NewsSearch)
