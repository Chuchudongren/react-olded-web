import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd';
import qs from 'qs'
import { changeBackgroundAction, chooseMusicAction, sethoardcateAction } from '../../../redux/action/action'
import { useNavigate } from 'react-router-dom'
import './index.css'
import axios from 'axios';


function Hoard(props) {
  const [prevNav, setPrevNav] = useState(0)
  const [cateList, setCateList] = useState([])
  const [data, setData] = useState([])
  const nav = useRef()
  const menu = useRef()
  const navigate = useNavigate()
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (text, item) => {
        let href = '/hoard/detail/' + item.topicid

        return <a href={href} onClick={() => { addHits(item.topicid) }}>{text}</a>
      },
    },
    {
      title: '作者',
      dataIndex: 'nickname',
    },
    {
      title: '点击',
      dataIndex: 'hits',
    },
    {
      title: '回复时间',
      dataIndex: 'pushtime',
    }

  ];
  useEffect(() => {
    props.chooseMusicAction(5)
    props.changeBackgroundAction('hoard_index')

    axios.get('/hoard/getHoardCate').then(res => {
      setCateList(res.data.results)
      nav.current.childNodes[prevNav].className = 'nav_active'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios.post('/hoard/getTopicListByCate', qs.stringify({ cateid: props.cate })).then(res => {
      console.log(res);
      setData(res.data.results)
    })
  }, [props.cate])
  const turnNav = (index) => {
    nav.current.childNodes[prevNav].className = ''
    nav.current.childNodes[index].className = 'nav_active'
    setPrevNav(index)
  }
  const turnMenu = (index) => {
    props.sethoardcateAction(index)
  }
  const addHits = (index) => {
    axios.post('/hoard/addHits', qs.stringify({ topicid: index }))
  }
  return (
    <div className="hoard_bg">
      <div className="container">
        <header className="hoard_title">
          <img src="http://127.0.0.1:8002/uploads/body/index/hoard/hoard_title.png" alt="" />
        </header>
        <section className="hoard_section">
          <ul ref={menu} className="hoard_menu">
            <li>分类</li>
            {
              cateList && cateList.length > 0 ?
                cateList.map(item =>
                  <li className={item.hoardcateid === props.cate ? 'menu_active' : ''} key={item.hoardcateid} onClick={() => { turnMenu(item.hoardcateid) }}>{item.hoardcate}</li>
                )
                : <></>
            }
          </ul>
          <div className="hoard_main">
            <nav ref={nav} className="hoard_nav">
              <span onClick={() => { turnNav(0) }}>最新</span>
              <span onClick={() => { turnNav(1) }}>最热</span>
              <span onClick={() => { navigate('/hoard/compose/' + (props.cate) + '/-1') }}>我要发帖</span>
            </nav>
            <div className="hoard_list">
              <Table onChange={() => { document.getElementById('scrollTop').scrollIntoView(true) }} rowKey={(item) => item.topicid} columns={columns} defaultPageSize={14} pageSize={14} dataSource={data} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default connect((state) => ({ cate: state.HoardCate }), {
  changeBackgroundAction,
  chooseMusicAction,
  sethoardcateAction
})(Hoard)
