import React, { useRef, useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, Radio, message } from 'antd';
import './index.css'
import { porvince } from '../../pro'
import axios from 'axios'
import qs from 'qs'
import TestReg from '../../../components/testReg'
const { Option } = Select;
const { TextArea } = Input;
export default function IndexLawForm(props) {
    const lawFormRef = useRef()
    const [flash, setFlash] = useState(true)
    const [city, setCity] = useState([]);
    const token = qs.parse(localStorage.getItem('token'))
    const handleOk = (values) => {
        values.userid = token.userid
        values.cateid = 0
        values.isopen = values.isopen === 'a' ? 0 : 1
        if (!TestReg(values.tel, 'tel')) {
            message.error('输入的手机号格式有误！')
        } else {
            axios.post('/life/law/message', qs.stringify({ ...values })).then(res => {
                message.success(res.data.message)
            })
            setFlash(!flash)
            props.setIsModalVisible(false)
        }
    };
    const handleCancel = () => {
        props.setIsModalVisible(false)
    };
    const onProvinceChange = (value) => {
        lawFormRef.current.setFieldsValue({
            city: '',
        });
        let currentPro = porvince.filter(item => item.name === value)[0].city
        setCity(currentPro)
    }
    return (
        <Modal className="law_form" title="填写信息" visible={props.isModalVisible} onCancel={handleCancel}>
            <Form ref={lawFormRef} key={flash} name="" onFinish={handleOk} >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="realname"
                            label="姓名"
                            rules={[{ required: true, message: '请输入您的姓名', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tel"
                            label="联系电话"
                            rules={[{ required: true, message: '请输入您的联系电话', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="province"
                            label="归属省/市"
                            rules={[
                                {
                                    required: true, message: '请选择您所在的省份'
                                },
                            ]}
                        >
                            <Select
                                defaultOpen
                                style={{ width: '200px' }}
                                placeholder="请选择"
                                onChange={onProvinceChange}
                                allowClear
                            >
                                {
                                    porvince.map(item =>
                                        <Option style={{ width: '200px' }} key={item.name} value={item.name}>{item.name}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="city"
                            label="所属市/区"
                            rules={[{ required: true, message: '请选择您所在的市区' }]}
                        >
                            <Select
                                placeholder="请选择"
                                allowClear
                            >
                                {
                                    city.map(item =>
                                        <Option key={item.name} value={item.name}>{item.name}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="工作单位"
                            name="job"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="通讯地址"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="电子邮箱"
                            name="Email"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="title"
                            label="标题"
                            rules={[{ required: true, message: '请输入标题' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="content"
                            label="内容"
                            rules={[{ required: true, message: '请输入内容' }]}
                        >
                            <TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item name="isopen" label="是否公开" rules={[{ required: true, message: '请输入是否公开' }]}>
                            <Radio.Group>
                                <Radio value="a">公开</Radio>
                                <Radio value="b">不公开</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <button className="law_form_submit" type="submit">提交</button>
                    </Col>
                </Row>
            </Form>
        </Modal >

    )
}
