import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewsRouter from './childrenRouter/news'
import LifeRouter from './childrenRouter/life'
import HealthRouter from '../pages/sandbox/health'
import HoardRouter from './childrenRouter/hoard'
import MyIndex from '../pages/sandbox/my'
import Sandbox from '../pages/sandbox/index'
export default function sandBoxRouter() {
  return (
    <Routes>
      <Route path="/news/*" element={<NewsRouter />} />
      <Route path="/life/*" element={<LifeRouter />} />
      <Route path="/health/*" element={<HealthRouter />} />
      <Route path="/hoard/*" element={<HoardRouter />} />
      <Route path="/my/:id/*" element={<MyIndex />} />
      <Route path="/" element={<Sandbox />} />
    </Routes>
  )
}
