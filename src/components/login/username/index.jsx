import React, { useEffect, useState } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Tip from '../tips'
import Tel from '../tel'
import './index.css'
import TestReg from '../../testReg.js'
function LoginForm(props) {
  const navigation = useNavigate()
  const token = qs.parse(localStorage.getItem('token'))
  useEffect(() => {
    if (token.userid) {
      navigation('/')
    }
  }, [navigation, token])
  const [tips, setTips] = useState({
    disabled: false,
    msg: '',
    position: '',
  })
  const onFinish = (values) => {
    let isRes = true
    let newTips = {}
    const data = {
      username: values.username,
      password: values.password,
    }
    if (!values.checked) {
      newTips = {
        disabled: true,
        msg: '请勾选同意协议',
      }
      isRes = false
    }
    if (!TestReg(values.password, 'password')) {
      newTips = {
        disabled: true,
        msg: '密码需要输入6-12位',
      }
      isRes = false
    }
    if (!TestReg(values.username, 'username')) {
      newTips = {
        disabled: true,
        msg: '账号只能输入6-12位数字或者字母或者下划线',
      }
      isRes = false
    }
    if (isRes) {
      axios.post('/user/login/username', qs.stringify(data)).then((res) => {
        if (res.data.status === 401) {
          newTips = {
            disabled: true,
            msg: '密码错误',
            position: 'login',
          }
          isRes = false
          setTips(newTips)
        }
        if (res.data.status === 200) {
          localStorage.setItem('token', res.data.token)
          navigation('/')
        }
      })
    }
    newTips.position = 'login'
    setTips(newTips)
  }
  return (
    <div>
      {props.current === 'current_left' ? (
        <>
          <Tip tips={tips} />
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item name="username">
              <Input
                className="input1"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="账号"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input
                className="input1"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item valuePropName="checked" name="checked">
              <Checkbox className="checkbox">
                <span>
                  我已阅读
                  <a href="http://127.0.0.1:8002/uploads/protocol/user.txt">
                    老来乐用户协议
                  </a>
                  和<a href="http://privacy.baidu.com/policy">隐私政策</a>
                </span>
              </Checkbox>
            </Form.Item>
            <Form.Item name="login">
              <button className="login_btn">登&nbsp;录</button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <Tel />
      )}
    </div>
  )
}

export default LoginForm
