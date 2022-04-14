import React, { useEffect, useRef, useState } from 'react'
import { Divider, Row, Col, Upload, message } from 'antd';
import qs from 'qs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function MyHome(props) {
    const token = qs.parse(localStorage.getItem('token'))
    const navigate = useNavigate()
    const nickname = useRef()
    const avatar = useRef()
    const uploadAva = useRef()
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (props.data.avatar) {
            setAvatarUrl(props.data.avatar)
            nickname.current.value = props.data.nickname
        }
    }, [props.data])
    const changeNickname = (e) => {
        e.target.className = 'hidden'
        e.target.nextSibling.className = ''
        nickname.current.disabled = false
    }
    const UploadNickname = (e) => {
        e.target.className = 'hidden'
        e.target.previousSibling.className = ''
        nickname.current.disabled = true
        axios.post('/my/updateNickname', qs.stringify({ nickname: nickname.current.value, userid: token.userid })).then(res => {
            if (res.data.status === 200) {
                message.success('修改成功！')
                token.nickname = nickname.current.value
                localStorage.setItem('token', qs.stringify({ ...token }))
            }
        })
    }
    // 检测上传的图片
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('你只能上传JPG/PNG格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片需要小于2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false)
            setImageUrl(info.file.response.url)
        };
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    );
    const changeAvatar = (e, i) => {
        if (!i) {
            avatar.current.className = 'hidden'
            e.target.className = 'hidden'
            e.target.nextSibling.className = 'myhome_ava'
            uploadAva.current.className = ''
        } else {
            // 点击确定
            avatar.current.className = 'user_avatar'
            e.target.className = 'hidden'
            e.target.previousSibling.className = 'myhome_ava'
            uploadAva.current.className = 'hidden'
            axios.post('/my/saveUserAvatar', qs.stringify({ avatar: imageUrl, userid: token.userid })).then(res => {
                if (res.data.status === 200) {
                    message.success(res.data.message + '请刷新网页')
                    setAvatarUrl(imageUrl)
                    token.avatar = imageUrl
                    localStorage.setItem('token', qs.stringify({ ...token }))
                } else {
                    message.info(res.data.message + '请刷新之后重试')
                }
            })
        }
    }
    const changeVolunt = () => {
        navigate('/life/volunt/info/' + token.userid)
    }
    return (
        <>
            {
                props.data !== undefined ?
                    <div>
                        <Row gutter={24} className="myhome_part1">
                            <Col span={token.userid && props.id === token.userid ? 4 : 9}>
                                <img className='user_avatar' ref={avatar} style={token.userid && props.id === token.userid ? {} : { marginLeft: '100px' }} src={avatarUrl} alt="" />
                                <div ref={uploadAva} className="hidden">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="/uploadAvatar"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img className='change_avatar' src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                            </Col>
                            {
                                token.userid && props.id === token.userid ?
                                    <Col span={5}>
                                        <button onClick={e => { changeAvatar(e, 0) }} className="myhome_ava">更换头像</button>
                                        <button onClick={e => { changeAvatar(e, 1) }} className="hidden myhome_ava">确定</button>
                                    </Col>
                                    : <></>
                            }

                            <Col span={15}>
                                <span className="myhome_nickname">昵称：<input ref={nickname} type="text" disabled /></span>
                                {
                                    token.userid && props.id === token.userid ?
                                        <div className="myhome_changeNick"><button onClick={e => changeNickname(e)}>修改昵称</button><button className="hidden" onClick={e => UploadNickname(e)}>确定</button></div>
                                        : <></>
                                }
                            </Col>
                        </Row>
                        <Divider className="myhome_divider" orientation="left">基本信息</Divider>
                        <Row gutter={24} className="myhome_part2">
                            <Col span={5}>
                                <span>年龄:{props.data.age}</span>
                            </Col>
                            <Col span={5}>
                                <span>性别:{props.data.gender}</span>
                            </Col>
                            <Col span={6}>
                                <span>志愿者:{props.data.isvolunt === '1' ? '是' : '非'}</span>
                            </Col>
                            <Col span={8}>
                                <span>参加志愿活动：{props.data.voluntcount}</span>
                            </Col>
                        </Row>
                        <Divider className="myhome_divider" orientation="left">志愿者信息</Divider>
                        <div className="myhome_part3">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <span>真实姓名：{token.userid === props.id ? props.data.realname : '***********'}</span>
                                </Col>
                                <Col span={12}>
                                    <span>联系电话：{
                                        token.userid === props.id ? props.data.tel : '***********'
                                    }</span>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <span>民族：{props.data.nationality}</span>
                                </Col>
                                <Col span={12}>
                                    <span>志愿者类型：{props.data.volunttype}</span>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <span>居住地：{
                                        token.userid === props.id ? props.data.residence0 + props.data.residence1 + props.data.residence2 : '***********'
                                    }</span>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <span>学历：{props.data.education}</span>
                                </Col>
                                <Col span={12}>
                                    <span>政治面貌：{props.data.politicalstatus}</span>
                                </Col>

                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <span>身份证号：{
                                        token.userid === props.id ? props.data.idnumber : '***********'
                                    }</span>
                                </Col>
                                <Col span={12}>
                                    <span>从业状况：{props.data.employment}</span>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <span>特长：{props.data.specialty}</span>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    {
                                        token.userid && props.id === token.userid ?
                                            <button onClick={changeVolunt}>修改信息</button>
                                            : <></>
                                    }
                                </Col>
                            </Row>
                        </div>
                    </div>
                    : <></>
            }
        </>

    )
}
