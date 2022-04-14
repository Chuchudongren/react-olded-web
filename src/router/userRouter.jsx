import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { changeBackgroundAction, chooseMusicAction } from '../redux/action/action'
import { Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/user/user-register'
import UserLose from '../pages/user/user-lose'
import UserLogin from '../pages/user/user-login'
function User(props) {
  useEffect(() => {
    props.changeBackgroundAction('user')
    props.chooseMusicAction('1')
  }, [props])
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />}></Route>
      <Route path="/lose" element={<UserLose />}></Route>
    </Routes>
  )
}

export default connect((state) => ({ background: state.Background }), {
  changeBackgroundAction, chooseMusicAction
})(User)
