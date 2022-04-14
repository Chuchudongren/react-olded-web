import React, { useEffect, useState } from 'react';
import './index.css'
import qs from 'qs'
import { message, Table } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

function Hoard() {
  const navigate = useNavigate()
  const token = qs.parse(localStorage.getItem('token'))
  const [topicData, setTopicData] = useState([])
  const [followData, setFollowData] = useState([])
  const [flash, setFlash] = useState(false)
  useEffect(() => {
    axios.post('/my/getHoard', qs.stringify({ userid: token.userid })).then(res => {
      setTopicData(res.data.topicresults)
      setFollowData(res.data.followresults)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flash])
  const modifyTopic = (cateid, id) => {
    navigate('/hoard/compose/' + cateid + '/' + id)
  }
  const deleteTopic = (id) => {
    axios.post('/my/updateTopic', qs.stringify({ userid: token.userid, topicid: id, modify: 2 })).then(res => {
      if (res.data.status === 200) {
        message.success(res.data.message)
        setFlash(!flash)
      }
    })
  }
  const deleteFollowTopic = (id) => {
    axios.post('/my/deleteFollowTopic', qs.stringify({ userid: token.userid, topicfollowid: id })).then(res => {
      message.success(res.data.message)
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
        let href = '/hoard/detail/' + item.topicid
        return <a className="topictitle" href={href}>{title}</a>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pushtime',
    },
    {
      title: '审核状态',
      dataIndex: 'modify',
      render: (modify) => {
        let mList = {
          '-1': ['red', '未通过'],
          '0': ['green', '已通过'],
          '1': ['blue', '审核中'],
          '3': ['blue', '审核中']
        }
        return <span className="my_hoard_modify" style={{ borderColor: mList[modify][0], color: mList[modify][0] }}>{mList[modify][1]}</span>
      }
    },
    {
      title: '点击',
      dataIndex: 'hits',
    },
    {
      title: '收藏',
      dataIndex: 'star',
    },
    {
      title: '操作',
      render: (item) => {
        let cateid = item.cateid
        let topicid = item.topicid
        return <>
          <button onClick={() => modifyTopic(cateid, topicid)} className="topic_update"><EditOutlined /></button>
          <button onClick={() => deleteTopic(topicid)} className="topic_delete"><DeleteOutlined /></button>
        </>
      }
    }
  ];
  const followColumns = [
    {
      title: '内容',
      dataIndex: 'content',
      render: (content, item) => {
        let href = '/hoard/detail/' + item.topicid
        return <a className="topictitle" href={href}>{content}</a>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pushtime',
    },
    {
      title: '操作',
      render: (item) => {
        let topicid = item.topicfollowid
        return <>
          <button onClick={() => deleteFollowTopic(topicid)} className="topic_delete"><DeleteOutlined /></button>
        </>
      }
    }
  ];

  return (
    <div className="my_hoard_bg">
      <div className="my_hoard_topic">
        <h1>我发表的帖子</h1>
        <Table rowKey={item => item.topicid} pagination={{ position: ['bottomCenter'], defaultPageSize: [5] }} columns={topicColumns} dataSource={topicData} />
      </div>
      <div className="my_hoard_follow">
        <h1>我发表的跟帖</h1>
        <Table rowKey={item => item.topicfollowid} pagination={{ position: ['bottomCenter'], defaultPageSize: [5] }} columns={followColumns} dataSource={followData} />
      </div>
    </div>
  );
}

export default Hoard;
