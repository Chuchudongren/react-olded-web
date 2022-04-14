import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Checkbox, Row, Col } from 'antd'
import { PhoneOutlined, SelectOutlined } from '@ant-design/icons'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import './index.css'
import Tip from '../tips'
import TestReg from '../../testReg.js'
let showTip = false
function Tel(props) {
  const navigation = useNavigate()
  const [sendTime, setSendTime] = useState(-1)
  const agree = useRef()
  const tel = useRef()
  const [tips, setTips] = useState({
    disabled: false,
    msg: '',
    position: '',
  })
  const onFinish = (values) => {
    showTip = false
    let newTips = {}
    const data = {
      tel: values.tel,
      code: values.code,
    }
    if (!agree.current.state.checked) {
      newTips = {
        disabled: true,
        msg: '请勾选同意协议',
      }
      showTip = true
    }
    if (!TestReg(values.code, 'code')) {
      newTips = {
        disabled: true,
        msg: '请输入正确的验证码',
      }
      showTip = true
    }
    if (!TestReg(values.tel, 'tel')) {
      newTips = {
        disabled: true,
        msg: '请输入正确的手机号',
      }
      showTip = true
    }
    if (!showTip) {
      axios.post('/user/login/tel', qs.stringify(data)).then((res) => {
        if (res.data.status === 401) {
          newTips = {
            disabled: true,
            msg: res.data.message,
            position: 'login',
            isShow: true, //用来专门标识 请求之后验证码的错误提示
          }
          setTips(newTips)
        }
        if (res.data.status === 200) {
          localStorage.setItem('token', res.data.token)
          navigation('/')
        }
      })
    }
    newTips.position = 'login'
    if (showTip) {
      setTips(newTips)
    }
    showTip = false
  }
  useEffect(() => {
    let timer = null
    if (sendTime !== -1) {
      timer = setInterval(() => {
        setSendTime(sendTime - 1)
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [sendTime])
  const sendCode = () => {
    showTip = false
    if (!TestReg(tel.current.input.value, 'tel')) {
      showTip = true
      setTips({
        disabled: true,
        msg: '请输入正确的手机号',
        position: 'login',
      })
    } else {
      setSendTime(5)
      axios
        .post('/user/getCode', qs.stringify({ tel: tel.current.input.value }))
        .then((result) => {
          console.log(result.data.code)
        })
    }
  }
  return (
    <div>
      {showTip || tips.isShow ? <Tip tips={tips} /> : <></>}
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item name="tel">
          <Input
            ref={tel}
            className="input1"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="请输入您的手机号"
          />
        </Form.Item>
        <Form.Item name="code">
          <Row gutter={24}>
            <Col span={12}>
              <Input
                className="input1"
                prefix={<SelectOutlined className="site-form-item-icon" />}
                placeholder="验证码"
              />
            </Col>
            <Col span={12}>
              {sendTime === -1 ? (
                <button
                  type="button"
                  className="sendCodeBtn"
                  onClick={() => sendCode(true)}
                >
                  发送验证码
                </button>
              ) : (
                <button disabled className="sendCodeBtn">
                  重新发送 {sendTime}
                </button>
              )}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item valuePropName="checked" name="agree">
          <>
            <Checkbox ref={agree} className="checkbox">
              <span>
                我已阅读
                <a href="http://127.0.0.1:8002/uploads/protocol/user.txt">
                  老来乐用户协议
                </a>
                和<a href="http://privacy.baidu.com/policy">隐私政策</a>
              </span>
            </Checkbox>
            <span className="noReg">若未注册，将自动注册</span>
          </>
        </Form.Item>
        <Form.Item name="telLogin">
          <button type="submit" className="login_btn">
            登&nbsp;录
          </button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Tel
