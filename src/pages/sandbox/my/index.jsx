import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { chooseMusicAction, changeBackgroundAction } from '../../../redux/action/action'
import qs from 'qs'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Home from './home'
import Collection from './collection'
import Hoard from './hoard'
import Msg from './msg'
import Volunt from './volunt'
import { createFromIconfontCN } from '@ant-design/icons';
import './index.css'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_3249569_kz2y0sc9yf.js'
  ],
});

function My(props) {
  const params = useParams()
  const token = qs.parse(localStorage.getItem('token'))

  const [nav, setNav] = useState(0)
  const [infoData, setInfoData] = useState({})
  const navs = useRef()
  // 设置背景图片和背景音乐的切换
  useEffect(() => {
    props.chooseMusicAction(6)
    props.changeBackgroundAction('my_index')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios.post('/my/getAllInfo', qs.stringify({ id: params.id, userid: token.userid })).then(res => {
      setInfoData(res.data.result);
    })
    if (params.id !== token.userid) {
    }
    navs.current.childNodes[nav].childNodes[0].className = 'my_nav_btn_active'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 切换导航的函数
  const turnNav = (index) => {
    navs.current.childNodes[nav].childNodes[0].className = ''
    navs.current.childNodes[index].childNodes[0].className = 'my_nav_btn_active'
    setNav(index)
  }
  return (
    <div className="container my_bg">
      <div className="my_left">
        <header className="my_left_header">
          {
            infoData !== {} ?
              <>
                <div><img src={infoData.avatar} alt="" /></div>
                <h1>{infoData.nickname}</h1>
                <span>关注：<b>{infoData.attention}</b></span>
                <span>粉丝：<b>{infoData.fans}</b></span>
                {
                  !token.userid || params.id !== token.userid ?
                    <i>
                      <IconFont type='icon-kehuguanzhu' />
                    </i>
                    : <></>
                }
              </>
              : <>
                <div><img src="http://127.0.0.1:8002/uploads/header/avatar_demo.png" alt="" /></div>
                <h1>nickname</h1>
                <span>关注：<b>0</b></span>
                <span>粉丝：<b>0</b></span>
              </>
          }

        </header>
        <nav className="my_left_nav">
          <ul ref={navs}>
            <li><button onClick={() => { turnNav(0) }}><span><IconFont type='icon-gerenzhongxin-gerenxinxi' />&nbsp;个人主页</span></button></li>
            {
              token.userid === params.id ?
                <>
                  <li><button onClick={() => { turnNav(1) }}><span><IconFont type='icon-shoucangjia' />&nbsp;&nbsp;收&nbsp;&nbsp;藏</span></button></li>
                  <li><button onClick={() => { turnNav(2) }}><span><IconFont type='icon-luntan' />&nbsp;&nbsp;论&nbsp;&nbsp;坛</span></button></li>
                  <li><button onClick={() => { turnNav(3) }}><span><IconFont type='icon-liuyanban' />&nbsp;&nbsp;留&nbsp;&nbsp;言</span></button></li>
                  <li><button onClick={() => { turnNav(4) }}><span><IconFont type='icon-zhiyuan' />&nbsp;志愿活动</span></button></li>
                </>
                : <></>
            }
          </ul>
        </nav>
        <footer className="my_left_footer">
        </footer>
      </div>
      <div className="my_right">
        {nav === 0 && <Home id={params.id} data={infoData} />}
        {nav === 1 && <Collection />}
        {nav === 2 && <Hoard />}
        {nav === 3 && <Msg />}
        {nav === 4 && <Volunt />}
      </div>
    </div>
  )
}

export default connect(() => ({}), {
  chooseMusicAction,
  changeBackgroundAction
})(My)
