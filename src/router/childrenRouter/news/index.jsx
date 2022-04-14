import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewsIndex from '../../../pages/sandbox/news'
import NewsList from '../../../pages/sandbox/news/newslist'
import NewsDetail from '../../../pages/sandbox/news/newsdetail'
import NewsSearch from '../../../pages/sandbox/news/newssearchlist'
function News() {
  return (
    <Routes>
      <Route path="/:category" element={<NewsList />} />
      <Route path="/detail/:newsid" element={<NewsDetail />} />
      <Route path="/search/:search" element={<NewsSearch />} />
      <Route path="/" element={<NewsIndex />} />
    </Routes>
  )
}

export default News
