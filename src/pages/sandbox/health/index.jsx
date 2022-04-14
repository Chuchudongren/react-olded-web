import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import HealthMain from '../../../router/childrenRouter/health'
import { changeBackgroundAction, chooseMusicAction, falshAction } from '../../../redux/action/action'
import './index.css'
function Health(props) {
  const navigate = useNavigate()
  const nav = useRef()
  const pagesIndex = {
    'index': 0,
    'hospital': 1,
    'clinic': 2,
    'msg': 3,
    'game': 4,
  }
  const [prevPage, setPrevPage] = useState(0)
  useEffect(() => {
    props.chooseMusicAction(4)
    props.changeBackgroundAction('health_index')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    let hrefIndex
    nav.current.childNodes[prevPage].childNodes[0].className = ''
    if (window.location.href.split('/').slice(-2)[0] === 'health') {
      hrefIndex = pagesIndex[window.location.href.split('/').slice(-1)[0]]
    } else {
      hrefIndex = pagesIndex[window.location.href.split('/').slice(-3)[0]]
    }
    nav.current.childNodes[hrefIndex].childNodes[0].className = 'health_index_active'
    setPrevPage(hrefIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.flash])
  const navClick = (str, index) => {
    navigate(str)
    nav.current.childNodes[prevPage].childNodes[0].className = ''
    nav.current.childNodes[index].childNodes[0].className = 'health_index_active'
    setPrevPage(index)
  }
  return (
    <div className="health_index_bg">
      <div className="health_index_nav">
        <ul ref={nav}>
          <li onClick={() => { navClick('/health/index', 0) }}><span>健康管理</span></li>
          <li onClick={() => { navClick('/health/hospital', 1) }}><span>找医院</span></li>
          <li onClick={() => { navClick('/health/clinic', 2) }}><span>预约上门看诊</span></li>
          <li onClick={() => { navClick('/health/msg', 3) }}><span>健康资讯</span></li>
          <li onClick={() => { navClick('/health/game', 4) }}><span>益智游戏</span></li>
        </ul>
      </div>
      <div className="health_index_main">
        <HealthMain />
      </div>
    </div>
  )
}

export default connect((state) => ({ flash: state.Flash }), {
  changeBackgroundAction,
  chooseMusicAction,
  falshAction
})(Health)
