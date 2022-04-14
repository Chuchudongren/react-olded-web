import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
export default function IndexService() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/life/service').then(res => {
            const results = res.data.results
            setData(results)
        })
    }, [])
    return (
        <div className="index_service_bg">
            <span className="index_service_lookall" onClick={() => {
                navigate('/life/service/' + data[0].list[0].serviceid)
                document.getElementById('scrollTop').scrollIntoView(true)
            }}>查看全部</span>
            <div className="index_service_box">
                {
                    data ? data.map((item, index) =>
                        <div key={index} className="index_service_item">
                            <span onClick={() => { navigate('/life/service/' + item.list[0].serviceid) }}>{item.category}</span>
                            <ul>
                                {item.list.map(item1 => <li onClick={() => {
                                    navigate('/life/service/' + item1.serviceid)
                                    document.getElementById('scrollTop').scrollIntoView(true)
                                }} key={item1.serviceid}>{item1.name}</li>)}
                            </ul>
                            <img src={item.pic} alt="" />
                        </div>
                    ) : <></>
                }
            </div>

        </div>
    )
}
