import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HoardIndex from '../../../pages/sandbox/hoard'
import HoardDetail from '../../../pages/sandbox/hoard/hoarddetail'
import HoardCompose from '../../../pages/sandbox/hoard/hoardcompose'

function Hoard() {
  return (
    <Routes>
      <Route path="/detail/:id" element={<HoardDetail />} />
      <Route path="/compose/:cateid/:topicid" element={<HoardCompose />} />
      <Route path="/" element={<HoardIndex />} />
    </Routes>
  )
}

export default Hoard
