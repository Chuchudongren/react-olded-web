import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LifeIndex from '../../../pages/sandbox/life'
import VoluntDetail from '../../../pages/sandbox/life/volunt/voluntdetail'
import VoluntList from '../../../pages/sandbox/life/volunt/voluntlist'

import VoluntInfo from '../../../pages/sandbox/life/volunt/voluntinfo'

import LawDetail from '../../../pages/sandbox/life/lawdetail'

import ServiceList from '../../../pages/sandbox/life/servicelist'

function Life() {
  return (
    <Routes>
      <Route path="/volunt/list" element={<VoluntList />} />
      <Route path="/volunt/:voluntid" element={<VoluntDetail />} />
      <Route path="/volunt/info/:id" element={<VoluntInfo />} />
      <Route path="/law/:id" element={<LawDetail />} />
      <Route path="/service/:cate" element={<ServiceList />} />
      <Route path="/" element={<LifeIndex />} />
    </Routes>
  )
}

export default Life
