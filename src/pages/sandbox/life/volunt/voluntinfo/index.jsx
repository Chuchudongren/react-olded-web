import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Select, message, notification } from 'antd';
import qs from 'qs'
import { useParams } from 'react-router-dom'
import { changeBackgroundAction } from '../../../../../redux/action/action'
import './index.css'
import { province } from '../../../../../components/pro'
import TestReg from '../../../../../components/testReg'
import axios from 'axios';
const { Option } = Select;
function VoluntInfo(props) {
    const params = useParams()
    const selectCity = useRef()
    const selectArea = useRef()
    const infoForm = useRef()
    const [city, setCity] = useState([]);
    const [area, setArea] = useState([]);
    const token = qs.parse(localStorage.getItem('token'))
    // const [voluntInfo, setVoluntInfo] = useState({});
    useEffect(() => {
        props.changeBackgroundAction('vlount_list')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (params.id === '-1') {
        } else if (params.id === token.userid) {
            axios.post('/life/volunt/getVoluntInfo', qs.stringify({ userid: params.id })).then(res => {
                const data = res.data.result
                if (res.data.status === 200) {
                    infoForm.current.setFieldsValue({
                        ...data
                    })
                }
            })
        } else {
            window.history.back(-1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])
    const onProvinceChange = (value) => {
        selectCity.current.style.display = 'block'
        let currentPro = province.filter(item => item.name === value)[0].city
        setCity(currentPro)
    }
    const onCityChange = (value) => {
        selectArea.current.style.display = 'block'
        let currentCity = city.filter(item => item.name === value)[0].area
        setArea(currentCity)
    }
    const onFinish = (values) => {
        if (!TestReg(values.tel, 'tel')) {
            message.error('??????????????????????????????')
        } else if (!TestReg(values.idnumber, 'idnumber')) {
            message.error('?????????????????????????????????')
        } else {
            values.userid = token.userid
            axios.post('/life/voluntaddinfo', qs.stringify({ ...values })).then(res => {
                openNotification(res.data.msg)
                token.isvolunt = '1'
                localStorage.setItem('token', qs.stringify(token))
                const timer = setTimeout(() => {
                    window.history.back(-1)
                    clearTimeout(timer)
                }, 3000)
            })
        }
    }
    const openNotification = (msg) => {
        notification.open({
            message: '??????:',
            description:
                `${msg}????????? 3 ??????????????????????????????`,
            duration: 3.5,
        });
    };
    return (
        <div className="volunt_info_bg">
            <div className="volunt_info_header">
                <div onClick={() => {
                    window.history.back(-1)
                }} className="volunt_info_goback"></div>
            </div>
            <div className="volunt_info_main">
                <div className="volunt_info_container container">
                    <span className="volunt_info_title">???????????????????????????</span>
                    <div className="volunt_info_form">
                        <Form ref={infoForm} name="" onFinish={onFinish} >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        name="realname"
                                        label="????????????"
                                        rules={[{ required: true, message: '?????????????????????', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="tel"
                                        label="????????????"
                                        rules={[{ required: true, message: '???????????????????????????', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        name="gender"
                                        label="??????"
                                    >
                                        <Select
                                            placeholder="?????????"
                                        >
                                            <Option value='???'>???</Option>
                                            <Option value='???'>???</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="volunttype"
                                        label="???????????????"
                                        rules={[{ required: true, message: '????????????????????????', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="?????????"
                                        >
                                            <Option value='???????????????'>???????????????</Option>
                                            <Option value='???????????????'>???????????????</Option>
                                            <Option value='???????????????'>???????????????</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item
                                        name="residence0"
                                        label="?????????"
                                        rules={[{ required: true, message: '??????????????????', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="?????????"
                                            onChange={onProvinceChange}
                                            allowClear
                                        >
                                            {
                                                province.map(item =>
                                                    <Option key={item.name} value={item.name}>{item.name}</Option>
                                                )
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>

                                    <div ref={selectCity} className="volunt_residence_dis">
                                        <Form.Item
                                            valuePropName='option'
                                            name="residence1"
                                            rules={[{ required: true, message: '??????????????????', whitespace: true }]}
                                        >
                                            <Select
                                                placeholder="?????????"
                                                onChange={onCityChange}
                                                allowClear
                                            >
                                                {
                                                    city.map(item =>
                                                        <Option key={item.name} value={item.name}>{item.name}</Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>

                                </Col>
                                <Col span={8}>

                                    <div ref={selectArea} className="volunt_residence_dis">
                                        <Form.Item
                                            name="residence2"
                                            valuePropName='option'
                                            rules={[{ required: true, message: '??????????????????', whitespace: true }]}
                                        >
                                            <Select
                                                placeholder="?????????"
                                                allowClear
                                            >
                                                {
                                                    area.map(item =>
                                                        <Option key={item} value={item}>{item}</Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item
                                        label="??????"
                                        name="education"
                                    >
                                        <Select
                                            placeholder="?????????"
                                        >
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='??????'>??????</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="????????????"
                                        name="politicalstatus"
                                        rules={[{ required: true, message: '?????????????????????', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="?????????"
                                        >
                                            <Option value='??????'>??????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='?????????'>?????????</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="??????"
                                        name="nationality"
                                        rules={[{ required: true, message: '???????????????', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="?????????"
                                        >
                                            <Option value='??????'>??????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='?????????'>?????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item
                                        label="????????????"
                                        name="idnumber"
                                        rules={[{ required: true, message: '???????????????????????????', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="????????????"
                                        name="employment"
                                        rules={[{ required: true, message: '?????????????????????', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="?????????" >

                                            <Option value='??????????????????'>??????????????????</Option>
                                            <Option value='??????????????????'>??????????????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????????????????'>??????????????????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='??????'>??????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='???????????????'>???????????????</Option>
                                            <Option value='???????????????'>???????????????</Option>
                                            <Option value='????????????'>????????????</Option>
                                            <Option value='???(???)?????????'>???(???)?????????</Option>
                                            <Option value='??????'>??????</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="??????"
                                        name="specialty"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <button className="volunt_info_submit" type="submit">??????</button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default connect(() => ({}), {
    changeBackgroundAction
})(VoluntInfo)