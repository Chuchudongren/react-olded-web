// 这个注释 将吧A标签暂时 warnning 给 不提示
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useParams, useNavigate } from 'react-router-dom'
import { getHoardData } from './gethoarddata.js'
import './index.css'
import { ReadOutlined, createFromIconfontCN } from '@ant-design/icons'
import { message } from 'antd'

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_3249569_c34mxk2irlt.js',
    ],
});
function HoardDetail() {
    const token = qs.parse(localStorage.getItem('token'))
    const params = useParams()
    const navigate = useNavigate()
    const [topicdata, setTopicData] = useState({})
    const [topicFollowdata, setTopicFollowData] = useState([])
    const [topicCommentdata, setTopicCommentData] = useState([])
    const [isStar, setIsStar] = useState(false)
    const [stars, setStars] = useState(0)
    const [allData, setAllData] = useState({})
    const [flash, setFlash] = useState(false)
    const [topicCommentFonts, setTopicCommentFonts] = useState(96)
    useEffect(() => {
        if (token.userid !== undefined) {
            axios.post('/hoard/isStar', qs.stringify({ userid: token.userid, objectid: params.id, cateid: 3 })).then(res => {
                if (res.data.status === 200) {
                    setIsStar(res.data.isStar)
                }
            })
        }
        axios.post('hoard/getTopicByid', qs.stringify({ topicid: params.id })).then(res => {
            setStars(res.data.results.star)
            setTopicData(res.data.results);

        })
        axios.post('hoard/getTopicFollowByid', qs.stringify({ topicid: params.id })).then(res => {
            setTopicFollowData(res.data.results);
        })
        axios.post('hoard/getTopicCommentByid', qs.stringify({ topicid: params.id })).then(res => {
            setTopicCommentData(res.data.results);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flash])
    useEffect(() => {
        setAllData(getHoardData(topicdata, topicFollowdata, topicCommentdata))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topicCommentdata, flash])
    //点赞的函数
    const starClick = () => {
        if (token.userid === undefined) {
            message.info('请登录后再点赞')
        } else {
            if (!isStar) {
                axios.post('hoard/setBehavior', qs.stringify({ userid: token.userid, objectid: params.id, cateid: 3, behavior: 'great', add: 1 })).then(res => {
                    if (res.data.status === 200) {
                        setIsStar(true)
                        setStars(stars + 1)
                        message.success('点赞成功')
                    }
                })
            } else {
                message.success('你已经点过赞了，请不要重复点赞')
            }
        }
    }
    // 显示二级评论列表  两个函数分别控制拉开 和收起
    const showSonCommentDown = (e) => {
        e.target.className = 'hidden'
        e.target.nextElementSibling.className = 'hoard_detail_comment_lookcomment'
        e.target.nextElementSibling.nextElementSibling.className = ''
    }
    const showSonCommentUp = (e) => {
        e.target.className = 'hidden'
        e.target.previousSibling.className = 'hoard_detail_comment_lookcomment'
        e.target.nextElementSibling.className = 'hidden'
    }
    // 显示 评论 一级评论的组件  两个函数分别控制拉开 和收起
    const showWriteSonCommentDown = (e) => {
        e.target.className = 'hidden'
        e.target.nextElementSibling.className = 'hoard_detail_comment_writecomment'
        e.target.parentNode.childNodes[6].className = 'hoard_detail_comment_write'
    }
    const showWriteSonCommentUp = (e) => {
        e.target.className = 'hidden'
        e.target.previousSibling.className = 'hoard_detail_comment_writecomment'
        e.target.parentNode.childNodes[6].className = 'hidden hoard_detail_comment_write'
    }
    // 提交二级评论
    const pushSonComment = (parentid, topicfollowid, e) => {
        if (e.target.previousSibling.value && e.target.previousSibling.value.trim() !== '') {
            axios.post('/hoard/pushSonComment', qs.stringify({ userid: token.userid, parentid, value: e.target.previousSibling.value, topicfollowid })).then(res => {
                if (res.data.status === 200) {
                    setFlash(!flash)
                    message.success('提交成功！')
                }
            })
        } else {
            message.error('评论不能为空')
        }
    }
    // 显示一级评论 组件
    const topicCommentDown = (e) => {
        e.target.nextElementSibling.className = 'hoard_detail_comment_textarea'
    }
    // 控制textarea 的可输入的字数
    const surplus = (e) => {
        if (e.target.value.length <= 96) {
            setTopicCommentFonts(96 - e.target.value.length)
        } else {
            e.target.value = e.target.value.slice(0, 96)
        }
    }
    // 提交一级评论
    const pushTopicFollowComment = (topicfollowid, e) => {
        if (e.target.previousSibling.value && e.target.previousSibling.value.trim() !== '') {
            axios.post('/hoard/pushComment', qs.stringify({ userid: token.userid, value: e.target.previousSibling.value, topicfollowid })).then(res => {
                if (res.data.status === 200) {
                    setFlash(!flash)
                    message.success('提交成功！')
                }
            })
        } else {
            message.error('评论不能为空')
        }
    }
    // 显示跟帖组件
    const topicFollowDown = (e) => {
        e.target.nextElementSibling.className = 'hoard_detail_writeFollow'
        e.target.nextElementSibling.nextElementSibling.className = 'hoard_detail_pushFollowTopic'
    }
    // 提交跟帖
    const pushTopicFollow = (mainUserid, e) => {
        if (e.target.previousSibling.value && e.target.previousSibling.value.trim() !== '') {
            axios.post('/hoard/pushTopicFollow', qs.stringify({ userid: token.userid, topicid: params.id, content: e.target.previousSibling.value, isMain: mainUserid })).then(res => {
                if (res.data.status === 200) {
                    setFlash(!flash)
                    message.success('提交成功！')
                    e.target.className = 'hidden'
                    e.target.previousSibling.className = 'hidden'
                }
            })
        } else {
            message.error('内容不能为空')
        }

    }
    return (
        <div key={flash} className="container hoard_detail_bg">
            {

                typeof allData !== 'undefined' && allData !== {} ?
                    <div className="hoard_detail_body">
                        {console.log(allData)}
                        <header className="msg_detail_header">
                            <span onClick={() => { navigate('/hoard') }} className="msg_detail_back"><ReadOutlined />论坛首页</span><span>&gt;&gt;&gt;</span><span>{allData.hoardcate}</span>
                        </header>
                        <div className="hoard_detail_main">
                            <div className="hoard_detail_title"><span>{allData.title}</span></div>
                            <div className="hoard_detail_info">
                                <h2 className={allData.ishot ? 'hoard_detail_hot' : 'hoard_detail_nohot'}><IconFont type="icon-huo" /> </h2>
                                <h2>楼主:<span><a href={"/my/" + allData.userid}>{allData.nickname}</a></span></h2>
                                <h2>时间:<span>{allData.pushtime}</span></h2>
                                <h2>点击量:<span>{allData.hits}</span></h2>
                            </div>
                            <section className="hoard_detail_content">
                                <div className="hoard_detail_content_1">
                                    <div dangerouslySetInnerHTML={{ __html: allData.content }}></div>
                                    <section>
                                        <h2><b>{stars}</b> 人已点赞</h2>
                                        <h1 onClick={starClick}><IconFont type="icon-dianzan" /></h1>
                                    </section>
                                </div>
                                <button onClick={e => { topicFollowDown(e) }} className="hoard_detail_followTopic_btn">我要跟帖</button>
                                <textarea className="hidden hoard_detail_writeFollow"></textarea>
                                <button onClick={e => { pushTopicFollow(allData.userid, e) }} className="hidden hoard_detail_pushFollowTopic">提交</button>
                                <div className="clearfix"></div>
                            </section>

                            {
                                allData.topicfollowdata && typeof allData.topicfollowdata !== 'undefined' ? allData.topicfollowdata.map(item =>
                                    <div className="hoard_detail_followtopic" key={item.topicfollowid}>
                                        <header className="hoard_detail_followtopic_header">
                                            <span className="hoard_detail_followtopic_type">{item.isMain ? '楼主' : '作者'}</span>
                                            <span className="hoard_detail_followtopic_nickname"><a href={"/my/" + item.userid}>{item.nickname}</a></span>
                                            <span className="hoard_detail_followtopic_pushtime">时间:<span>{item.pushtime}</span></span>
                                        </header>
                                        <section className="hoard_detail_followtopic_content">
                                            <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                            <div>
                                                {
                                                    item.commentdata && typeof item.commentdata !== 'undefined' ?
                                                        item.commentdata.map(item1 =>
                                                            <div className="hoard_detail_comment" key={item1.topiccommentid}>
                                                                <span className="hoard_detail_comment_nickname"><a href={"/my/" + item1.userid}>{item1.nickname}</a></span>
                                                                <span className="hoard_detail_comment_pushtime">{item1.pushtime}</span>
                                                                <div className="clearfix"></div>
                                                                <div className="hoard_detail_comment_content">{item1.content}</div>
                                                                <div>
                                                                    <button className="hoard_detail_comment_writecomment" onClick={e => { showWriteSonCommentDown(e) }}>评论</button>
                                                                    <button className="hidden hoard_detail_comment_writecomment" onClick={e => { showWriteSonCommentUp(e) }}>评论</button>
                                                                    <button className="hoard_detail_comment_lookcomment" onClick={e => { showSonCommentDown(e) }}><IconFont type="icon-xiaosanjiaodown" />查看评论</button>
                                                                    <button className="hidden hoard_detail_comment_lookcomment" onClick={e => { showSonCommentUp(e) }}><IconFont type="icon-xiaosanjiaoup" />收起评论</button>
                                                                    <div className="hidden">
                                                                        {
                                                                            item1.sonComment && typeof item1.sonComment !== 'undefined' ?
                                                                                item1.sonComment.map(item2 =>
                                                                                    <div className="hoard_detail_soncomment" key={item2.topiccommentid}>
                                                                                        <span className="hoard_detail_soncomment_nickname"><a href={"/my/" + item2.userid}>{item2.nickname}</a></span>
                                                                                        <span className="hoard_detail_soncomment_pushtime">{item2.pushtime}</span>
                                                                                        <div className="clearfix"></div>
                                                                                        <div className="hoard_detail_soncomment_content">{item2.content}</div>
                                                                                    </div>
                                                                                )
                                                                                : <></>
                                                                        }
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                    <div className="hidden hoard_detail_comment_write">
                                                                        <textarea ></textarea>
                                                                        <button onClick={(e) => { pushSonComment(item1.topiccommentid, item.topicfollowid, e) }}>提交</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        : <></>
                                                }
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="hoard_detail_compose_comment">
                                                <button onClick={e => { topicCommentDown(e) }} className="hoard_detail_compose_btn">我要发表评论</button>
                                                <div className="hidden hoard_detail_comment_textarea">
                                                    <textarea onChange={e => { surplus(e) }}></textarea>
                                                    <button onClick={e => { pushTopicFollowComment(item.topicfollowid, e) }}>发 表</button>
                                                    <span>还可以输入<i>{topicCommentFonts}</i>字 </span>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                ) : <></>

                            }
                        </div>
                    </div>
                    : <></>
            }


        </div>
    )
}

export default HoardDetail