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
let newTips = {}
function LoseFrom(props) {
  const navigation = useNavigate()
  const username = useRef()
  const password = useRef()
  const rePassword = useRef()
  const tel = useRef()
  const code = useRef()
  const agree = useRef()
  const [sendTime, setSendTime] = useState(-1)
  const [step, setStep] = useState(0)
  const [tips, setTips] = useState({
    disabled: false,
    msg: '',
    position: 'lose',
  })
  const changePassword = () => {
    const pwd = password.current.input.value
    const rePwd = rePassword.current.input.value
    const IAgree = agree.current.state.checked
    const phone = tel.current.input.value
    const data = {
      password: pwd,
      tel: phone,
      type: 'update',
    }
    if (step === 2) {
      if (!TestReg(pwd, 'password')) {
        let newTips = {
          disabled: true,
          msg: '密码需要输入6-12位',
          position: 'lose',
        }
        setTips(newTips)
      } else {
        if (pwd !== rePwd) {
          let newTips = {
            disabled: true,
            msg: '两次密码输入不一致',
            position: 'lose',
          }
          setTips(newTips)
        } else {
          if (typeof IAgree == 'undefined' || IAgree === false) {
            let newTips = {
              disabled: true,
              msg: '请勾选同意协议',
              position: 'lose',
            }
            setTips(newTips)
          } else {
            setTips({})
          }
        }
      }
      if (TestReg(pwd, 'password') && pwd === rePwd && IAgree === true) {
        axios.post('/user/lose', qs.stringify(data)).then((res) => {
          if (res.data.status === 401) {
            newTips = {
              disabled: true,
              msg: res.data.message,
              position: 'lose',
            }
            setTips(newTips)
          }
          if (res.data.status === 200) {
            navigation('/user/login')
          }
        })
      }
    }
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
    const phone = tel.current.input.value
    if (!TestReg(phone, 'tel')) {
      setTips({
        disabled: true,
        msg: '请输入正确的手机号',
        position: 'lose',
      })
    } else {
      setSendTime(5)
      axios.post('/user/getCode', qs.stringify({ tel: phone })).then((res) => {
        console.log(res.data.code)
      })
    }
  }
  const next_step = () => {
    newTips.position = 'lose'
    const name = username.current.input.value
    const phone = tel.current.input.value
    const co = code.current.input.value
    if (step === 0) {
      if (!TestReg(name, 'username')) {
        let newTips = {
          disabled: true,
          msg: '账号只能输入6-12位数字或者字母或者下划线',
          position: 'lose',
        }
        setTips(newTips)
      } else {
        setTips({})
      }
      if (TestReg(name, 'username')) {
        axios
          .post(
            '/user/lose',
            qs.stringify({ username: name, type: 'findUsername' })
          )
          .then((res) => {
            if (res.data.status === 401) {
              let newTips = {
                disabled: true,
                msg: res.data.message,
                position: 'lose',
              }
              setTips(newTips)
            } else {
              setStep(step + 1)
            }
          })
      }
    }
    if (step === 1) {
      if (!TestReg(phone, 'tel')) {
        let newTips = {
          disabled: true,
          msg: '请输入正确的手机号',
          position: 'lose',
        }
        setTips(newTips)
      } else {
        if (!TestReg(co, 'code')) {
          let newTips = {
            disabled: true,
            msg: '请输入正确的验证码',
            position: 'lose',
          }
          setTips(newTips)
        } else {
          setTips({})
        }
      }
      if (TestReg(phone, 'tel') && TestReg(co, 'code')) {
        axios
          .post(
            '/user/lose',
            qs.stringify({
              tel: phone,
              code: co,
              username: name,
              type: 'checkCode',
            })
          )
          .then((res) => {
            if (res.data.status === 401) {
              newTips.disabled = true
              newTips.msg = res.data.message
              newTips.position = 'lose'
              setTips(newTips)
            }
            if (res.data.status === 200) {
              setStep(step + 1)
            }
            if (res.data.status !== 401 && res.data.status !== 200) {
              console.log(res.data)
            }
          })
      }
    }
  }
  return (
    <div>
      {tips.disabled === true ? <Tip tips={tips} /> : <></>}
      <Form name="normal_lose" className="lose-form">
        <Form.Item
          style={step === 0 ? {} : { display: 'none' }}
          name="username"
        >
          <Input
            ref={username}
            className="lose_input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入您的账号"
          />
        </Form.Item>

        <Form.Item name="tel" style={step === 1 ? {} : { display: 'none' }}>
          <Input
            ref={tel}
            className="lose_input1"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="请输入您的手机号"
          />
        </Form.Item>
        <Form.Item name="code" style={step === 1 ? {} : { display: 'none' }}>
          <Row gutter={24}>
            <Col span={12}>
              <Input
                ref={code}
                className="lose_input2"
                prefix={<SelectOutlined className="site-form-item-icon" />}
                placeholder="验证码"
              />
            </Col>
            <Col span={12}>
              {sendTime === -1 ? (
                <button
                  type="button"
                  className="lose_sendCodeBtn"
                  onClick={() => sendCode(true)}
                >
                  发送验证码
                </button>
              ) : (
                <button disabled className="lose_sendCodeBtn">
                  重新发送 {sendTime}
                </button>
              )}
            </Col>
          </Row>
        </Form.Item>

        <div style={{ display: step === 2 ? '' : 'none' }}>
          <Form.Item name="password">
            <Input
              ref={password}
              className="lose_input3"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item name="rePassword">
            <Input
              ref={rePassword}
              className="lose_input4"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="重新输入密码"
            />
          </Form.Item>
          <Form.Item name="IAgree" valuePropName="checked">
            <Checkbox ref={agree} className="lose_checkbox">
              <span>
                我已阅读
                <a href="http://127.0.0.1:8002/uploads/protocol/user.txt">
                  老来乐用户协议
                </a>
                和<a href="http://privacy.baidu.com/policy">隐私政策</a>
              </span>
            </Checkbox>
          </Form.Item>
        </div>

        <Form.Item name="btn">
          <Row gutter={24}>
            <Col span={12} style={{ display: step === 0 ? 'none' : '' }}>
              <button
                type="button"
                onClick={() => {
                  setStep(step - 1)
                  setTips({})
                }}
                className="prev_btn"
              >
                上一步
              </button>
            </Col>
            <Col span={12} style={{ display: step === 2 ? '' : 'none' }}>
              <button
                onClick={changePassword}
                type="submit"
                className="lose_btn"
              >
                更&nbsp;改
              </button>
            </Col>
            <Col span={12} style={{ display: step === 2 ? 'none' : '' }}>
              <button onClick={next_step} className="next_btn">
                下一步
              </button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoseFrom
