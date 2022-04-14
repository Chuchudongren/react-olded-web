import React from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../../components/login/register'
import './index.css'
function UserRegister() {
  const navigate = useNavigate()
  return (
    <div className="register_body">
      <div className="register_core">
        <div className="reg_title">
          <span>账号注册</span>
        </div>
        <div className="reg_From">
          <RegisterForm />
        </div>
        <div className="btn">
          <span
            className="btn1"
            onClick={() => {
              navigate('/user/login')
            }}
          >
            返回登录
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

export default UserRegister
