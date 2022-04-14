import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, AutoComplete, message } from 'antd'
import axios from 'axios'
import qs from 'qs'
import './index.css'
const { Option } = AutoComplete;
function Msg() {
  const navigate = useNavigate()
  const [historyList, setHistoryList] = useState([])
  const [result, setResult] = useState([]);
  const [datalist1, setDatalist1] = useState([]);
  const [datalist2, setDatalist2] = useState([]);
  const [datalist3, setDatalist3] = useState([]);
  const token = qs.parse(localStorage.getItem('token'))
  const search = useRef()
  useEffect(() => {
    axios.post('/health/getUserHistorySearch', qs.stringify({ userid: token.userid })).then(res => {
      setHistoryList(res.data.results)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios.get('/health/getMsg').then(res => {
      setDatalist1(res.data.results[0])
      setDatalist2(res.data.results[1])
      setDatalist3(res.data.results[2])
    })
  }, [])
  const handleSearch = (value) => {
    let res = [];
    if (!value) {
      res = [];
    } else {
      let newVArr = getValue(value)
      newVArr.forEach(newV => {
        historyList.forEach((item) => {
          if (item.indexOf(newV) !== -1) {
            if (res.indexOf(item) === -1) {
              res.push(item)
            }
          }
        })
      })
    }
    res = res.slice(0, 6)
    setResult(res);
  };
  const getValue = (value) => {
    let newVArr = []
    for (let i = value.length; i > 0; i--) {
      for (let j = 0; j < value.length - i + 1; j++) {
        newVArr.push(value.slice(j, j + i))
      }
    }
    return newVArr
  }
  const searchHealth = () => {
    let historyListIsHas = 0
    let historyList1 = historyList
    let value = search.current.childNodes[0].childNodes[0].childNodes[0].childNodes[0].value
    if (value.trim() === '') {
      message.error('搜索内容不能为空')
    } else {
      historyList1.forEach(item => {
        if (item === value) {
          historyListIsHas = 1
        }
      })
      if (!historyListIsHas) {
        historyList1.push(value)
        setHistoryList(historyList1)
        axios.post('/health/addUserHistorySearch', qs.stringify({ userid: token.userid, value }))
      }
      navigate('/health/msg/search/' + value)
    }
  }
  return (
    <div className="health_msg_bg">
      <div className="container">
        <header ref={search} className="health_msg_header">
          <AutoComplete
            style={{ width: '900px' }}
            onSearch={handleSearch}
            placeholder="请输入关键词"

          >
            {result.map((email) => (
              <Option key={email} value={email}>
                {email}
              </Option>
            ))}
          </AutoComplete>
          <button onClick={searchHealth}>搜索</button>
        </header>
        <section className="health_msg_section">
          <div className="health_msg_news">
            <Divider orientation="left">健康常识</Divider>
            <ul>
              {datalist1 && datalist1.length > 0 ?
                datalist1.map(item =>
                  <li key={item.healthmsgid} onClick={() => {
                    navigate('/health/msg/detail/' + item.healthmsgid)
                    document.getElementById('scrollTop').scrollIntoView(true)
                  }}>{item.title}</li>
                )
                : <></>}
            </ul>
            <Divider orientation="right">热点</Divider>
            <ul>
              {datalist2 && datalist2.length > 0 ?
                datalist2.map(item =>
                  <li key={item.healthmsgid} onClick={() => {
                    navigate('/health/msg/detail/' + item.healthmsgid)
                    document.getElementById('scrollTop').scrollIntoView(true)
                  }}>{item.title}</li>
                )
                : <></>}
            </ul>
            <Divider orientation="left">膳食知识</Divider>
            <ul>
              {datalist3 && datalist3.length > 0 ?
                datalist3.map(item =>
                  <li key={item.healthmsgid} onClick={() => {
                    navigate('/health/msg/detail/' + item.healthmsgid)
                    document.getElementById('scrollTop').scrollIntoView(true)
                  }}>{item.title}</li>
                )
                : <></>}
            </ul>
          </div>
          <div className="health_msg_consult"></div>
        </section>
      </div>
    </div >
  );
}

export default Msg;
