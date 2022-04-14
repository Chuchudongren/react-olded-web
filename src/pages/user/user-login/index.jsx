import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import LoginForm from '../../../components/login/username'
import './index.css'
function UserLogin() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('current_left')

  return (
    <div className="login_body">
      <div className="login_core">
        <Row justify="space-around">
          <Col span={12}>
            <div
              onClick={() => {
                setCurrent('current_left')
              }}
              className="item1"
            >
              <span>账号登录</span>
            </div>
          </Col>
          <div className="division"></div>
          <div className={current}></div>
          <Col span={12}>
            <div
              onClick={() => {
                setCurrent('current_right')
              }}
              className="item2"
            >
              <span>短信登录</span>
            </div>
          </Col>
        </Row>
        <div className="usernameFrom">
          <LoginForm current={current} />
        </div>
        <div className="btn">
          <span
            className="btn1"
            onClick={() => {
              navigate('/user/register')
            }}
          >
            注册账号
          </span>
          <span
            className="btn2"
            onClick={() => {
              navigate('/user/lose')
            }}
          >
            忘记密码
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
