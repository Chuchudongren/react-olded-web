import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Select, message, notification } from 'antd';
import qs from 'qs'
import { useParams } from 'react-router-dom'
import { changeBackgroundAction } from '../../../../../redux/action/action'
import './index.css'
import { porvince } from './pro'
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
        let currentPro = porvince.filter(item => item.name === value)[0].city
        setCity(currentPro)
    }
    const onCityChange = (value) => {
        selectArea.current.style.display = 'block'
        let currentCity = city.filter(item => item.name === value)[0].area
        setArea(currentCity)
    }
    const onFinish = (values) => {
        if (!TestReg(values.tel, 'tel')) {
            message.error('手机号格式输入有误！')
        } else if (!TestReg(values.idnumber, 'idnumber')) {
            message.error('身份证号格式输入有误！')
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
            message: '通知:',
            description:
                `${msg}！将在 3 秒后跳转到之前的页面`,
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
                    <span className="volunt_info_title">请完善真实个人信息</span>
                    <div className="volunt_info_form">
                        <Form ref={infoForm} name="" onFinish={onFinish} >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        name="realname"
                                        label="真实姓名"
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
                                        name="gender"
                                        label="性别"
                                    >
                                        <Select
                                            placeholder="请选择"
                                        >
                                            <Option value='男'>男</Option>
                                            <Option value='女'>女</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="volunttype"
                                        label="志愿者类型"
                                        rules={[{ required: true, message: '请选择志愿者类型', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                        >
                                            <Option value='市州志愿者'>市州志愿者</Option>
                                            <Option value='省直志愿者'>省直志愿者</Option>
                                            <Option value='高校志愿者'>高校志愿者</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item
                                        name="residence0"
                                        label="居住地"
                                        rules={[{ required: true, message: '请选择居住地', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            onChange={onProvinceChange}
                                            allowClear
                                        >
                                            {
                                                porvince.map(item =>
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
                                            rules={[{ required: true, message: '请选择居住地', whitespace: true }]}
                                        >
                                            <Select
                                                placeholder="请选择"
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
                                            rules={[{ required: true, message: '请选择居住地', whitespace: true }]}
                                        >
                                            <Select
                                                placeholder="请选择"
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
                                        label="学历"
                                        name="education"
                                    >
                                        <Select
                                            placeholder="请选择"
                                        >
                                            <Option value='小学'>小学</Option>
                                            <Option value='初中'>初中</Option>
                                            <Option value='高中'>高中</Option>
                                            <Option value='中专'>中专</Option>
                                            <Option value='大专'>大专</Option>
                                            <Option value='本科'>本科</Option>
                                            <Option value='硕士'>硕士</Option>
                                            <Option value='博士'>博士</Option>
                                            <Option value='博士后'>博士后</Option>
                                            <Option value='院士'>院士</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="政治面貌"
                                        name="politicalstatus"
                                        rules={[{ required: true, message: '请选择政治面貌', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                        >
                                            <Option value='群众'>群众</Option>
                                            <Option value='少先队员'>少先队员</Option>
                                            <Option value='共青团员'>共青团员</Option>
                                            <Option value='共产党员'>共产党员</Option>
                                            <Option value='民革'>民革</Option>
                                            <Option value='民盟'>民盟</Option>
                                            <Option value='民建'>民建</Option>
                                            <Option value='民进'>民进</Option>
                                            <Option value='农工党'>农工党</Option>
                                            <Option value='致公党'>致公党</Option>
                                            <Option value='九三学社'>九三学社</Option>
                                            <Option value='台盟'>台盟</Option>
                                            <Option value='无党派'>无党派</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="民族"
                                        name="nationality"
                                        rules={[{ required: true, message: '请选择民族', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                        >
                                            <Option value='汉族'>汉族</Option>
                                            <Option value='蒙古族'>蒙古族</Option>
                                            <Option value='回族'>回族</Option>
                                            <Option value='藏族'>藏族</Option>
                                            <Option value='维吾尔族'>维吾尔族</Option>
                                            <Option value='苗族'>苗族</Option>
                                            <Option value='彝族'>彝族</Option>
                                            <Option value='壮族'>壮族</Option>
                                            <Option value='布依族'>布依族</Option>
                                            <Option value='朝鲜族'>朝鲜族</Option>
                                            <Option value='满族'>满族</Option>
                                            <Option value='同族'>同族</Option>
                                            <Option value='白族'>白族</Option>
                                            <Option value='土家族'>土家族</Option>
                                            <Option value='哈尼族'>哈尼族</Option>
                                            <Option value='哈萨克族'>哈萨克族</Option>
                                            <Option value='傣族'>傣族</Option>
                                            <Option value='黎族'>黎族</Option>
                                            <Option value='傈傈族'>傈傈族</Option>
                                            <Option value='佤族'>佤族</Option>
                                            <Option value='其他'>其他</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item
                                        label="身份证号"
                                        name="idnumber"
                                        rules={[{ required: true, message: '请输入您的身份证号', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="从业状况"
                                        name="employment"
                                        rules={[{ required: true, message: '请选择从业状态', whitespace: true }]}
                                    >
                                        <Select
                                            placeholder="请选择" >

                                            <Option value='国家公务人员'>国家公务人员</Option>
                                            <Option value='专业技术人员'>专业技术人员</Option>
                                            <Option value='职员'>职员</Option>
                                            <Option value='企业管理人员'>企业管理人员</Option>
                                            <Option value='工人'>工人</Option>
                                            <Option value='农民'>农民</Option>
                                            <Option value='学生'>学生</Option>
                                            <Option value='现役军人'>现役军人</Option>
                                            <Option value='自由职业者'>自由职业者</Option>
                                            <Option value='个体经营者'>个体经营者</Option>
                                            <Option value='无业人员'>无业人员</Option>
                                            <Option value='退(离)休人员'>退(离)休人员</Option>
                                            <Option value='其他'>其他</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="特长"
                                        name="specialty"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <button className="volunt_info_submit" type="submit">提交</button>
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