import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sandbox from '../pages/sandbox/index'
import SandBoxRouter from './sandboxRouter'
import UserRouter from './userRouter'
import Blank from '../pages/blank'
export default function IndexRouter() {

  return (
    <Routes>
      <Route path="/user/*" element={<UserRouter />} />
      <Route path="/blank" element={<Blank />} />
      <Route path="/index" element={<Sandbox />} />
      <Route
        path="/*"
        element={<SandBoxRouter />}
      />
      <Route path="*" element={<Blank />} />
    </Routes>
  )
}
