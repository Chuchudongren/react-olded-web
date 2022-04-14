import React, { useEffect, useState } from 'react';
import './index.css'
import qs from 'qs'
import { message, Table, Switch } from 'antd';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons'

function Msg() {
  const token = qs.parse(localStorage.getItem('token'))
  const [msgData, setMsgData] = useState([])
  const [flash, setFlash] = useState(false)
  useEffect(() => {
    axios.post('/my/getMessage', qs.stringify({ userid: token.userid })).then(res => {
      setMsgData(res.data.results)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flash])
  const deleteMessage = (messageid) => {
    axios.post('/my/deleteMessage', qs.stringify({ messageid })).then(res => {
      if (res.data.status === 200) {
        message.success(res.data.message)
        setFlash(!flash)
      }
    })
  }
  const changeOpen = (checked, messageid) => {
    axios.post('/my/updateMessageOpen', qs.stringify({ messageid, checked })).then(res => {
      if (res.data.status === 200) {
        setFlash(!flash)
      }
    })
  }
  const topicColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (title, item) => {
        let href = '/life/law/' + item.messageid
        return <a className="topictitle" href={href}>{title}</a>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'questiontime',
    },
    {
      title: '回复状态',
      dataIndex: 'isreply',
      render: (isreply) => {
        let mList = {
          '0': ['rgb(248, 122, 122)', '待回复'],
          '1': ['rgb(255, 68, 140)', '已回复'],
        }
        return <span className="my_hoard_modify" style={{ borderColor: mList[isreply][0], color: mList[isreply][0] }}>{mList[isreply][1]}</span>
      }
    },
    {
      title: '是否公开',
      dataIndex: 'isopen',
      render: (isopen, item) => {
        return <Switch checkedChildren="开启" unCheckedChildren="关闭" onClick={(checked) => changeOpen(checked, item.messageid)} checked={isopen} />
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <>
          <button onClick={() => deleteMessage(item.messageid)} className="topic_delete"><DeleteOutlined /></button>
        </>
      }
    }
  ];
  return (
    <div className="my_msg">
      <Table rowKey={item => item.messageid} pagination={{ position: ['bottomCenter'], defaultPageSize: [10] }} columns={topicColumns} dataSource={msgData} />
    </div>
  );
}

export default Msg;
