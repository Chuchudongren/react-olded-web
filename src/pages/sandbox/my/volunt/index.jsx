import React, { useEffect, useState } from 'react';
import './index.css'
import qs from 'qs'
import { Table } from 'antd';
import axios from 'axios';

function Volunt() {
  const token = qs.parse(localStorage.getItem('token'))
  const [voluntData, setVoluntData] = useState([])
  useEffect(() => {
    axios.post('/my/getVoluntByUserid', qs.stringify({ userid: token.userid })).then(res => {
      setVoluntData(res.data.results)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const topicColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (title, item) => {
        let href = '/life/volunt/' + item.voluntid
        return <a className="topictitle" href={href}>{title}</a>
      }
    },
    {
      title: '开始时间',
      dataIndex: 'begintime',
    },
    {
      title: '结束时间',
      dataIndex: 'finishtime',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      render: (status) => {
        let mList = {
          '0': ['red', '未开始'],
          '1': ['green', '进行中'],
          '2': ['blue', '已结束'],
        }
        return <span className="my_hoard_modify" style={{ borderColor: mList[status][0], color: mList[status][0] }}>{mList[status][1]}</span>
      }
    },
  ];


  return (
    <div className="my_volunt">
      <h1>我参加的志愿活动</h1>
      <Table rowKey={item => item.voluntid} pagination={{ position: ['bottomCenter'], defaultPageSize: [12] }} columns={topicColumns} dataSource={voluntData} />
    </div>
  );
}

export default Volunt;
