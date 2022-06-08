import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Space, message, Drawer } from 'antd'
import qs from 'qs'
import { connect } from 'react-redux'
import { changeBackgroundAction } from '../../../../redux/action/action'
import NewsComment from '../../../../components/news/news_comment'
import { createFromIconfontCN } from '@ant-design/icons'
import './index.css'
function NewsDetail(props) {
    const token = qs.parse(localStorage.getItem('token'))
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3249569_4mjazitevem.js',
    });
    const params = useParams()
    const [newsData, setNewsData] = useState({})
    const [greats, setgreats] = useState(0)
    const [isgreat, setIsgreat] = useState(false)
    const [flash, setFlash] = useState(false)
    const [collects, setCollects] = useState(0)
    const [iscollect, setIsCollect] = useState(false)
    const [comments, setComments] = useState(0)
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        props.changeBackgroundAction('news_detail')
    }, [props])
    useEffect(() => {
        axios.post('/news/detail', qs.stringify({ newsid: params.newsid, userid: token.userid })).then((res => {
            setgreats(res.data.result.great)
            setCollects(res.data.result.collect)
            setComments(res.data.result.comment)
            setNewsData(res.data.result)
            setIsCollect(res.data.result.isCollect === 1 ? true : false)
            setIsgreat(res.data.result.isGreat === 1 ? true : false)
        }))
        // 测试是否收藏 如果收藏就点亮小心心
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flash])
    const onegreat = () => {
        setIsgreat(!isgreat)
        if (isgreat) {
            setgreats(greats - 1)
            message.success('取消点赞成功！')
            axios.post('/news/great', qs.stringify({ newsid: params.newsid, value: - 1, userid: token.userid }))

        } else {
            setgreats(greats + 1)
            message.success('点赞成功！')
            axios.post('/news/great', qs.stringify({ newsid: params.newsid, value: 1, userid: token.userid }))
        }
    }
    const oneCollect = () => {
        if (token.userid) {
            setIsCollect(!iscollect)
            if (iscollect) {
                setCollects(collects - 1)
                message.success('取消收藏成功！')
                axios.post('/news/collect', qs.stringify({ newsid: params.newsid, value: -1, userid: token.userid }))
            } else {
                setCollects(collects + 1)
                message.success('收藏成功！')
                axios.post('/news/collect', qs.stringify({ newsid: params.newsid, value: 1, userid: token.userid }))
            }
        } else {
            message.error('登录之后才能收藏')
        }
    }
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
        setFlash(!flash)
    };
    return (
        <div className="news_detail_bg">
            <div onClick={() => {
                window.history.back(-1)
            }} className="news_detail_goback"></div>
            <Space>
                <div className='news_detail_right_btn'>
                    <div className={isgreat ? 'news_detail_icon-good_ture' : ''} onClick={onegreat} ><IconFont className="news_detail_icon-good" type="icon-good" /> </div>
                    <div className={iscollect ? 'news_detail_icon-collection_ture' : ''} onClick={oneCollect}><IconFont className="news_detail_icon-collection" type="icon-collection" /></div>
                    <div onClick={showDrawer}><IconFont className='news_detail_icon-pinglun' type="icon-pinglun" /></div>
                    <div><IconFont className='news_detail_icon-zhuanfa' type="icon-zhuanfa" /></div>
                </div>
            </Space>
            <div className="news_detail_title"><span>{newsData.title}</span></div>
            <div className="news_detail_info">
                <div className="news_detail_info_like"><div></div>{greats}</div>
                <div className="news_detail_info_collect"><div></div>{collects}</div>
                <div className="news_detail_info_comment"><div></div>{comments}</div>
            </div>
            <div className="news_detail_content">
                <div dangerouslySetInnerHTML={{ __html: newsData.content }} className="news_detail_content_body">
                </div>
                <div className="news_detail_content_footer">
                    <div className="news_detail_content_time">{newsData.pushtime}</div>
                    <div className="news_detail_content_source">来自于{newsData.source}</div>
                </div>
            </div>
            <Drawer width="600" title="评论区" placement="right" onClose={onClose} visible={visible}>
                <NewsComment newsid={params.newsid} />
            </Drawer>
        </div >
    )
}

export default connect(() => ({}), {
    changeBackgroundAction
})(NewsDetail)