import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { changeBackgroundAction, chooseMusicAction } from '../../../redux/action/action'
import NewsLocal from '../../../components/news/news_local'
import NewsCommunity from '../../../components/news/news_community'
import NewsPolitics from '../../../components/news/news_politics'

import Tab from '../../../components/news/tab'
import './index.css'
function News(props) {
  useEffect(() => {
    props.changeBackgroundAction('news')
    props.chooseMusicAction('2')
  }, [props])
  return (
    <div className="news">
      <div className="news_left">
        <img className="news_img" src="http://127.0.0.1:8002/uploads/body/index/news/news_img.jpg" alt="新闻图片" />
        <NewsPolitics />
      </div>
      <div className="news_right">

        <Tab />
        <NewsLocal />
        <NewsCommunity />
      </div>
    </div>
  )
}

export default connect(() => ({}), {
  changeBackgroundAction, chooseMusicAction
})(News)
