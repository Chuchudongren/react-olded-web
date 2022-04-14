import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoseForm from '../../../components/login/lose'
import './index.css'
function UserLose() {
  const navigate = useNavigate()
  return (
    <div className="lose_body">
      <div className="lose_core">
        <div className="lose_title"></div>
        <div className="lose_From">
          <LoseForm />
        </div>
        <div className="lose_back">
          <div
            className="lose_btn1"
            onClick={() => {
              navigate('/user/login')
            }}
          >
            返回登录
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLose
