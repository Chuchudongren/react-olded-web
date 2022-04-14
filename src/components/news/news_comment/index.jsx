import React, { useEffect, useState, useRef } from 'react'
import { message } from 'antd'
import qs from 'qs'
import axios from 'axios'
import { Avatar } from 'antd'

import './index.css'
function NewsComment(props) {
    const token = qs.parse(localStorage.getItem('token'))
    const [comments, setComments] = useState([])
    const [flash, setFlash] = useState(0)
    const textArea = useRef()
    useEffect(() => {
        if (token.userid) {
            axios.post('/comments/news', qs.stringify({ newsid: props.newsid })).then((res) => {
                setComments(res.data.result)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flash])
    async function pushComment() {
        const content = textArea.current.value
        if (content === '' || content === null || typeof content === 'undefined') {
            message.error('评论不能为空')
        } else if (content.length > 69) {
            message.error('评论长度不能超过69')
        } else {
            axios.post('/comments/addComment', qs.stringify({ content, userid: token.userid, newsid: props.newsid }))
            textArea.current.value = ''
        }
        await axios.post('/comments/news', qs.stringify({ newsid: props.newsid })).then((res) => {
            setComments(res.data.result)
        })
        setFlash(flash + 1)
    }
    return (
        token.userid ?
            (<div className="news_comment">
                <textarea ref={textArea} className='news_comment_textarea'></textarea>
                <button onClick={pushComment} className='news_comment_button'>发表</button>
                <div className='news_comment_list'>
                    <div className='news_comment_list_title'>新闻评论</div>
                    <div key={flash} className='news_comment_scorll'>
                        {comments ? comments.reverse().map(item =>
                            <div key={item.commentid} className='news_comment_item'>
                                <Avatar
                                    size={42}
                                    src={item.avatar}
                                />
                                <div className='news_comment_name'>{item.nickname}</div>
                                <textarea disabled className='news_comment_text' value={item.content}></textarea>
                            </div>
                        ) : <></>}
                    </div>
                </div>
            </div >)
            : <span className="go_login_title">您尚未登录</span>
    )
}

export default NewsComment