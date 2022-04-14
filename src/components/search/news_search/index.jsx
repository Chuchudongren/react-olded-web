import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import './index.css'
export default function NewsSearch() {
    const navigate = useNavigate()
    const input = useRef()
    const search = () => {
        navigate('/news/search/' + input.current.value)
    }
    return (
        <div className='news_search'>
            <input ref={input} type="text" />
            <div onClick={search}><SearchOutlined /></div>
        </div>
    )
}
