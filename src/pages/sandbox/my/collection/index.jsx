import React, { useEffect, useState } from 'react';
import './index.css'
import qs from 'qs'
import { Table } from 'antd';
import axios from 'axios';


const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    render: (title, item) => {
      let href = (item.cateid === 1 ? '/news/detail/' : '/life/volunt/') + item.objectid
      return <a href={href}>{title}</a>
    }
  }
];

function Collection() {
  const token = qs.parse(localStorage.getItem('token'))
  const [newsData, setNewsData] = useState([])
  const [voluntData, setVoluntData] = useState([])
  useEffect(() => {
    axios.post('/my/getCollect', qs.stringify({ userid: token.userid })).then(res => {
      setNewsData(res.data.newsresults)
      setVoluntData(res.data.voluntresults)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="my_collection_bg">
      <h1>我收藏的新闻</h1>
      <Table rowKey={item => item.id} pagination={{ position: ['bottomCenter'], defaultPageSize: [4] }} columns={columns} dataSource={newsData} />
      <h1>我收藏的志愿活动</h1>
      <Table rowKey={item => item.id} pagination={{ position: ['bottomCenter'], defaultPageSize: [3] }} columns={columns} dataSource={voluntData} />
    </div>
  );
}

export default Collection;
