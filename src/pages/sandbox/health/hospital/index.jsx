import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Tabs, Modal, message } from 'antd'
import qs from 'qs'
import { changeBackgroundAction } from '../../../../redux/action/action'
import axios from 'axios'
import './index.css'
import readTex from '../../../../components/readTex'
const { TabPane } = Tabs;
function Hospital(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hospitalList, setHospitalList] = useState([])
  const [currentTel, setCurrentTel] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [noRead, setNoRead] = useState(false);
  const token = qs.parse(localStorage.getItem('token'))
  const list = useRef()
  useEffect(() => {
    props.changeBackgroundAction('health_index')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!token.userid || typeof token.userid === 'undefined') {
      message.error('请先登录以获取定位')
    }
    if (token.userid && (token.ad_info === undefined || !token.ad_info)) {
      // eslint-disable-next-line no-undef
      $.ajax({
        type: "get",//接口规定，只能用get
        async: true,//异步
        url: "https://apis.map.qq.com/ws/location/v1/ip",//接口地址
        data: { "key": "FYFBZ-GSOEW-BCFRH-RSUI2-TRFD5-TUFMX", "output": "jsonp" },//参数格式必须用到output传参为jsonp，否则会报跨域问题
        dataType: "jsonp",//跨域，必须用到jsonp
        success: function (result) {
          if (result.status === 121) {
            console.log(result.message)
          } else {
            const ad_info = result.result.ad_info
            token.ad_info = ad_info
            localStorage.setItem('token', qs.stringify(token))
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios.post('/health/getHospitalList', qs.stringify({ key: '全国' })).then(res => {
      setHospitalList(res.data.results)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const callThem = (tel, twoDcode) => {
    setCurrentTel(tel)
    setCurrentCode(twoDcode)
    setIsModalVisible(true);
  }
  const screen = (key) => {
    if (key === '-1' || key === '-2') {
      message.error('请先登录以获取定位')
    } else {
      axios.post('/health/getHospitalList', qs.stringify({ key })).then(res => {
        setHospitalList(res.data.results)
      })
    }
  }
  const onCancel = () => {
    setIsModalVisible(false);
  }
  // 防止用户狂点
  const readTexA = (currentTel) => {
    if (!noRead) {
      setNoRead(true)
      readTex(currentTel)
      let timer = setTimeout(() => {
        setNoRead(false)
        clearTimeout(timer)
      }, 4000)
    }
  }
  const onPageWheel = (e) => {
    if (e.nativeEvent.deltaY >= 0) {
      if (Math.round(list.current.scrollTop + list.current.clientHeight) === list.current.scrollHeight) {
        list.current.style.overflowY = 'hidden'
      } else {
        list.current.style.overflowY = 'scroll'
      }
    } else {
      if (list.current.scrollTop === 0) {
        list.current.style.overflowY = 'hidden'
      } else {
        list.current.style.overflowY = 'scroll'
      }
    }
  }
  return (
    <div onWheel={e => { onPageWheel(e) }} className="hospital_bg">
      <div className="hospital_local">
        <b>{token && typeof token.ad_info !== "undefined" && typeof token.ad_info.city !== "undefined" ? token.ad_info.city : '未知'}</b> <span>[切换城市]</span>
      </div>
      <div className="hospital_container">
        <div className="hospital_tab">
          <Tabs type="card" onChange={key => { screen(key) }} size='large'>
            <TabPane tab={'全国'} key={'全国'}></TabPane>
            <TabPane tab={token && typeof token.ad_info !== "undefined" && typeof token.ad_info.city !== "undefined" ? token.ad_info.province : '未知'} key={token && typeof token.ad_info !== "undefined" && typeof token.ad_info.city !== "undefined" ? token.ad_info.province + '0' : '-1'}></TabPane>
            <TabPane tab={token && typeof token.ad_info !== "undefined" && typeof token.ad_info.city !== "undefined" ? token.ad_info.city : '未知'} key={token && typeof token.ad_info !== "undefined" && typeof token.ad_info.city !== "undefined" ? token.ad_info.city + '1' : '-2'}></TabPane>
          </Tabs>
        </div>
        <div ref={list} className="hospital_list">
          {hospitalList && hospitalList.length > 0 ?
            hospitalList.map(item =>
              <div key={item.hospitallistid} className="hospital_item">
                <img src={item.pic} alt="" />
                <div className="hospital_right">
                  <span className="hospital_title">{item.hospitalname}</span>
                  <div className="hospital_intro">医院介绍：<span>{item.introduce}</span></div>
                  <div className="hospital_address">地址：<span>{item.hospitaladdress}</span></div>
                  <a href={item.website} className="hospital_website">网址：{item.website}</a>
                  <button onClick={() => { callThem(item.tel, item.twoDcode) }} className="hospital_btn">联系商家</button>
                </div>
              </div>
            )
            : <></>}

        </div>
        <Modal title="联系商家" visible={isModalVisible} onCancel={onCancel}>
          <span className="hospital_model_tel">商家电话：<span>{currentTel}</span></span>
          <button className="hospital_model_readbtn" onClick={() => { readTexA(currentTel) }}>语音播放</button>
          <div className="hospital_model_2dcode">
            <span>请手机微信扫描医院官方二维码</span>
            <img src={currentCode} alt="" />
          </div>
        </Modal>
      </div>
    </div >)
}

export default connect(() => ({}), {
  changeBackgroundAction
})(Hospital)
