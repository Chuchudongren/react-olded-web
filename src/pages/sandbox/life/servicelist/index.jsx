import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { connect } from 'react-redux'
import { Tabs, Tag, Modal } from 'antd'
import qs from 'qs'
import { changeBackgroundAction } from '../../../../redux/action/action'
import axios from 'axios'
import './index.css'
import readTex from '../../../../components/readTex'
const { TabPane } = Tabs;
function ServiceList(props) {
  const params = useParams()
  const [bar, setBar] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [currentBar, setcurrentBar] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTel, setCurrentTel] = useState('');
  const [noRead, setNoRead] = useState(false);
  const navigate = useNavigate()
  const token = qs.parse(localStorage.getItem('token'))
  const list = useRef()
  const page = useRef()
  useEffect(() => {
    props.changeBackgroundAction('service_list')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios.get('/life/service').then(res => {
      const results = res.data.results
      setBar(results)
    })
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
    // eslint-disable-next-line array-callback-return
    bar.map((item, index) => item.list.map(item1 => {
      if (item1.serviceid.toString() === params.cate) {
        setcurrentBar(index)
      }
    }))
  }, [bar, params.cate])
  useEffect(() => {
    // token.ad_info = { city: '天津市' }
    if (token && typeof token.ad_info !== "undefined" && typeof token.ad_info.city !== "undefined") {
      axios.post('/life/service/list', qs.stringify({ serviceid: params.cate, city: token.ad_info.city })).then(res => {
        const results = res.data.results
        setServiceList(results)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.cate])
  const callThem = (tel) => {
    setCurrentTel(tel)
    setIsModalVisible(true);
  }

  const onCancel = () => {
    setIsModalVisible(false);
  }
  const onPageWheel = (e) => {
    if (e.nativeEvent.deltaY >= 0) {
      list.current.style.overflowY = 'scroll'
      if (list.current.scrollTop + list.current.clientHeight === list.current.scrollHeight) {
        list.current.style.overflowY = 'hidden'
      }
    } else {
      list.current.style.overflowY = 'scroll'
      if (list.current.scrollTop === 0) {
        list.current.style.overflowY = 'hidden'
      } else {
        list.current.style.overflowY = 'scroll'
      }
    }
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
  return (
    <div ref={page} onWheel={e => { onPageWheel(e) }} className="service_bg">
      <div className="service_local">
        <b>{token && typeof token.ad_info !== "undefined" && typeof token.ad_info.city !== "undefined" ? token.ad_info.city : '未知'}</b> <span>[切换城市]</span>
      </div>
      <button onClick={() => { navigate('/life') }} className="service_goback">返回首页</button>
      <div className="service_container">
        <div className="service_tab">
          <div className="service_category">
            <Tabs activeKey={'' + currentBar} onChange={(key) => { navigate('/life/service/' + bar[key].list[0].serviceid) }} type="card" size='large'>
              {bar ? bar.map((item, index) =>
                <TabPane tab={item.category} key={index}>
                  <div className="service_categoryid">
                    <Tabs activeKey={params.cate} onChange={key => { navigate('/life/service/' + key) }}>
                      {item.list.map(item1 =>
                        <TabPane tab={item1.name} key={item1.serviceid}>
                        </TabPane>
                      )}
                    </Tabs>
                  </div>
                </TabPane>
              ) : <></>}
            </Tabs>
          </div>
        </div>
        <div ref={list} className="service_list">
          {serviceList ?
            serviceList.map(item =>
              <div key={item.servicelistid} className="service_item">
                <img src={item.pic} alt="" />
                <div className="service_right">
                  <span className="service_title">{item.title}</span>
                  <div className="service_area">服务区域：<span>{item.servicearea}</span></div>
                  <div className="service_company">{item.conpany}</div>
                  <div className="service_tag">
                    {
                      item.tabs.map(item1 =>
                        <Tag key={item1.tabid} color="gold">{item1.tabname}</Tag>
                      )
                    }
                  </div>
                  <button onClick={() => { callThem(item.tel) }} className="service_btn">联系商家</button>
                </div>
              </div>
            )
            : <></>}
        </div>
        <Modal title="联系商家" visible={isModalVisible} onCancel={onCancel}>
          <span className="service_model_tel">商家电话：<span>{currentTel}</span></span>
          <button className="service_model_readbtn" onClick={() => { readTexA(currentTel) }}>语音播放</button>
          <div className="service_model_2dcode">
            <span>请手机微信扫描二维码-&gt;获取商家微信</span>
            <img src="http://127.0.0.1:8003/pic/2dcode.jpg" alt="" />
          </div>
        </Modal>
      </div>
    </div >)
}

export default connect(() => ({}), {
  changeBackgroundAction
})(ServiceList)
