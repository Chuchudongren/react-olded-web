import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import NewsListDisplay from '../../../../components/news/news_list_display'
import { connect } from 'react-redux'
import { changeBackgroundAction } from '../../../../redux/action/action'
import './index.css'
function NewsList(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(1)
  useEffect(() => {
    props.changeBackgroundAction('news')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    switch (params.category) {
      case '国家政策':
        setCurrent(1)
        break
      case '城区新闻':
        setCurrent(2)
        break
      case '社区新闻':
        setCurrent(3)
        break
      default:
        break
    }
  }, [params])
  return (
    <div className="news_list_container container">
      <div onClick={() => {
        navigate('/news')
      }} className="news_list_goback"></div>
      <div className="news_list_title"><span>{params.category}</span>列表</div>
      <div className="news_list_tab">
        <button className={current === 1 ? 'active' : ''} onClick={() => { navigate('/news/国家政策') }}>国家政策</button>
        <button className={current === 2 ? 'active' : ''} onClick={() => { navigate('/news/城区新闻') }}>城区新闻</button>
        <button className={current === 3 ? 'active' : ''} onClick={() => { navigate('/news/社区新闻') }}>社区新闻</button>
      </div>
      <NewsListDisplay category={current} />
    </div>
  )
}

export default connect(() => ({}), {
  changeBackgroundAction
})(NewsList)
