import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, Checkbox, Col, Row } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  SelectOutlined,
} from '@ant-design/icons'
import qs from 'qs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './index.css'
import Tip from '../tips'
import TestReg from '../../testReg.js'
let showTip = false
function Register(props) {
  const navigation = useNavigate()
  const tel = useRef()
  const [sendTime, setSendTime] = useState(-1)
  const [tips, setTips] = useState({
    disabled: false,
    msg: '',
    position: '',
  })
  const onFinish = (values) => {
    showTip = false
    let newTips = {}
    const data = {
      username: values.username,
      password: values.password,
      tel: values.tel,
      code: values.code,
    }
    if (!values.IAgree) {
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
    if (!TestReg(values.password, 'password')) {
      newTips = {
        disabled: true,
        msg: '密码需要输入6-12位',
      }
      showTip = true
    }
    if (!TestReg(values.username, 'username')) {
      newTips = {
        disabled: true,
        msg: '账号只能输入6-12位数字或者字母或者下划线',
      }
      showTip = true
    }
    if (!showTip) {
      axios.post('/user/register', qs.stringify(data)).then((res) => {
        if (res.data.status === 401) {
          newTips = {
            disabled: true,
            msg: res.data.message,
            position: 'login',
            isShow: true, //用来专门标识 请求之后的错误提示
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
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="username">
              <Input
                className="reg_input1"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="账号"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input
                className="reg_input1"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tel">
              <Input
                ref={tel}
                className="reg_input1"
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="请输入您的手机号"
              />
            </Form.Item>
            <Form.Item name="code">
              <Input
                className="reg_input1"
                prefix={<SelectOutlined className="site-form-item-icon" />}
                placeholder="验证码"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="IAgree" valuePropName="checked">
          <Row gutter={24}>
            <Col span={12}>
              <Checkbox className="checkbox">
                <span>
                  我已阅读
                  <a href="http://127.0.0.1:8002/uploads/protocol/user.txt">
                    老来乐用户协议
                  </a>
                  和<a href="http://privacy.baidu.com/policy">隐私政策</a>
                </span>
              </Checkbox>
            </Col>
            <Col span={12}>
              {sendTime === -1 ? (
                <button
                  type="button"
                  className="Reg_sendCodeBtn"
                  onClick={sendCode}
                >
                  发送验证码
                </button>
              ) : (
                <button disabled className="Reg_sendCodeBtn">
                  重新发送 {sendTime}
                </button>
              )}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name="register">
          <button className="register_btn">注&nbsp;册</button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register
