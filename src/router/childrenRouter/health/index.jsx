import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HealthIndex from '../../../pages/sandbox/health/home'
import HealthHospital from '../../../pages/sandbox/health/hospital'
import HealthClinic from '../../../pages/sandbox/health/clinic'
import HealthMsg from '../../../pages/sandbox/health/msg'
import HealthSearch from '../../../pages/sandbox/health/msgSearch'
import HealthMsgDetail from '../../../pages/sandbox/health/msgDetail'
import HealthGame from '../../../pages/sandbox/health/game'

function Health() {
  return (
    <Routes>
      <Route path="/hospital" element={<HealthHospital />} />
      <Route path="/clinic" element={<HealthClinic />} />
      <Route path="/msg" element={<HealthMsg />} />
      <Route path="/msg/search/:key" element={<HealthSearch />} />
      <Route path="/msg/detail/:id" element={<HealthMsgDetail />} />
      <Route path="/game" element={<HealthGame />} />
      <Route path="/index" element={<HealthIndex />} />
    </Routes>
  )
}

export default Health
